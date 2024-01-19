# Getting Started with Using Go for ScalarDB Cluster

This document explains how to write gRPC client code for ScalarDB Cluster by using Go.

## Prerequisites

- ScalarDB Cluster 3.9.0 or later
- Go: any one of the three latest major releases

In this tutorial, we assume that you have a ScalarDB Cluster running on a Kubernetes cluster that you deployed by following the instructions in [Set Up ScalarDB Cluster on Kubernetes by Using a Helm Chart](setup-scalardb-cluster-on-kubernetes-by-using-helm-chart.md).

In addition, you need access to the [ScalarDB Cluster GitHub repository](https://github.com/scalar-labs/scalardb-cluster).
This repository is available only to users with a commercial license and permission.
To get a license and permission, please [contact us](https://scalar-labs.com/contact_us/).

## Sample application

This tutorial illustrates the process of creating an electronic money application, where money can be transferred between accounts.

## Step 1. Create `schema.json`

The following is a simple example schema.

Create `schema.json`, and add the following to the file:

```json
{
  "emoney.account": {
    "transaction": true,
    "partition-key": [
      "id"
    ],
    "clustering-key": [],
    "columns": {
      "id": "TEXT",
      "balance": "INT"
    }
  }
}
```

## Step 2. Create `database.properties`

You need to create `database.properties` for the Schema Loader for ScalarDB Cluster.
But first, you need to get the `EXTERNAL-IP` address of the service resource of the `LoadBalancer` service (`scalardb-cluster-envoy`).

To see the `EXTERNAL-IP` address, run the following command:

```console
$ kubectl get svc scalardb-cluster-envoy
NAME                     TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)           AGE
scalardb-cluster-envoy   LoadBalancer   10.105.121.51   localhost     60053:30641/TCP   16h
```

In this case, the `EXTERNAL-IP` address is `localhost`.

Then, create `database.properties`, and add the following to the file:

```properties
scalar.db.transaction_manager=cluster
scalar.db.contact_points=indirect:localhost
```

To connect to ScalarDB Cluster, you need to specify `cluster` for the `scalar.db.transaction_manager` property.
In addition, you will use the `indirect` client mode and connect to the service resource of Envoy in this tutorial.
For details about the client modes, see [Developer Guide for ScalarDB Cluster with the Java API](developer-guide-for-scalardb-cluster-with-java-api.md).

## Step 3. Load a schema

To load a schema via ScalarDB Cluster, you need to use the dedicated Schema Loader for ScalarDB Cluster (Schema Loader for Cluster). Using the Schema Loader for Cluster is basically the same as using the [Schema Loader for ScalarDB](https://github.com/scalar-labs/scalardb/blob/master/docs/schema-loader.md) except the name of the JAR file is different. You can download the Schema Loader for Cluster at [Releases](https://github.com/scalar-labs/scalardb-cluster/releases). After downloading the JAR file, you can run the Schema Loader for Cluster with the following command:

```shell
$ java -jar scalardb-cluster-schema-loader-3.11.0-all.jar --config database.properties -f schema.json --coordinator
```

## Step 4. Set up a Go environment

Follow the [Prerequisites](https://grpc.io/docs/languages/go/quickstart/#prerequisites) section in the gRPC quick-start document to install the following components:

- Go
- Protocol buffer compiler, `protoc`, version 3.15 or later
- Go plugins for the protocol compiler

## Step 5. Generate the stub code for ScalarDB Cluster gRPC

To communicate with the gRPC server for ScalarDB Cluster, you will need to generate the stub code from the proto file.

First, in a new working directory, create a directory named `scalardb-cluster`, which you will use to generate the gRPC code from, by running the following command:

```console
$ mkdir scalardb-cluster
```

Then, download the [`scalardb-cluster.proto`](https://github.com/scalar-labs/scalardb-cluster/blob/v3.11.0/rpc/src/main/proto/scalardb-cluster.proto) file and save it in the directory that you created.

Generate the gRPC code by running the following command:

```console
$ protoc --go_out=. --go_opt=paths=source_relative \
  --go_opt=Mscalardb-cluster/scalardb-cluster.proto=example.com/scalardb-cluster \
  --go-grpc_out=. --go-grpc_opt=paths=source_relative \
  --go-grpc_opt=Mscalardb-cluster/scalardb-cluster.proto=example.com/scalardb-cluster \
  scalardb-cluster/scalardb-cluster.proto
```

After running the command, you should see two files in the `scalardb-cluster` subdirectory: `scalardb-cluster.pb.go` and `scalardb-cluster_grpc.pb.go`.

## Step 6. Write a sample application

The following is the program that uses the gRPC code. Save it as `main.go` in the working directory. This program does the same thing as the `ElectronicMoney.java` program in [Getting Started with ScalarDB](https://scalardb.scalar-labs.com/docs/latest/getting-started-with-scalardb/). Note that you have to update the value of `SERVER_ADDRESS` based on the `EXTERNAL-IP` value of the ScalarDB Cluster `LoadBalancer` service in your environment.

```go
package main

import (
	"context"
	"errors"
	"flag"
	"fmt"
	"log"
	"os"
	"time"

	pb "emoney/scalardb-cluster"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

const (
	SERVER_ADDRESS = "localhost:60053"
	NAMESPACE      = "emoney"
	TABLENAME      = "account"
	ID             = "id"
	BALANCE        = "balance"
)

var requestHeader = pb.RequestHeader{HopLimit: 10}

type TxFn func(ctx context.Context, client pb.DistributedTransactionClient, transactionId string) error

func withTransaction(fn TxFn) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Set up a connection to the server.
	conn, err := grpc.Dial(SERVER_ADDRESS, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return err
	}
	defer conn.Close()

	client := pb.NewDistributedTransactionClient(conn)

	// Begin a transaction
	beginResponse, err := client.Begin(ctx, &pb.BeginRequest{RequestHeader: &requestHeader})
	if err != nil {
		return err
	}
	transactionId := beginResponse.TransactionId

	// Execute the function
	err = fn(ctx, client, transactionId)
	if err != nil {
		// Rollback the transaction if there is an error
		client.Rollback(ctx, &pb.RollbackRequest{TransactionId: transactionId})
		return err
	}

	// Commit the transaction
	_, err = client.Commit(ctx, &pb.CommitRequest{RequestHeader: &requestHeader, TransactionId: transactionId})
	return err
}

func charge(ctx context.Context, client pb.DistributedTransactionClient, transactionId string, id string, amount int) error {
	partitionKey := pb.Key{Columns: []*pb.Column{{Name: ID, Value: &pb.Column_TextValue_{TextValue: &pb.Column_TextValue{Value: &id}}}}}

	// Retrieve the current balance for id
	get := pb.Get{
		NamespaceName: NAMESPACE, TableName: TABLENAME,
		PartitionKey: &partitionKey, ClusteringKey: nil,
		GetType: pb.Get_GET_TYPE_GET,
	}
	getResponse, err := client.Get(ctx, &pb.GetRequest{RequestHeader: &requestHeader, TransactionId: transactionId, Get: &get})
	if err != nil {
		return err
	}

	// Calculate the balance
	balance := int32(amount)
	if result := getResponse.GetResult(); result != nil {
		for _, column := range result.GetColumns() {
			if column.Name == BALANCE {
				balance += column.GetIntValue().GetValue()
				break
			}
		}
	}

	// Update the balance
	put := pb.Put{
		NamespaceName: NAMESPACE, TableName: TABLENAME,
		PartitionKey: &partitionKey, ClusteringKey: nil,
		Columns: []*pb.Column{
			{Name: BALANCE, Value: &pb.Column_IntValue_{IntValue: &pb.Column_IntValue{Value: &balance}}},
		},
	}
	_, err = client.Put(ctx, &pb.PutRequest{RequestHeader: &requestHeader, TransactionId: transactionId, Puts: []*pb.Put{&put}})
	return err
}

func pay(ctx context.Context, client pb.DistributedTransactionClient, transactionId string, fromId string, toId string, amount int) error {
	fromPartitionKey := pb.Key{Columns: []*pb.Column{{Name: ID, Value: &pb.Column_TextValue_{TextValue: &pb.Column_TextValue{Value: &fromId}}}}}
	toPartitionKey := pb.Key{Columns: []*pb.Column{{Name: ID, Value: &pb.Column_TextValue_{TextValue: &pb.Column_TextValue{Value: &toId}}}}}

	// Retrieve the current balances for ids
	fromGet := pb.Get{
		NamespaceName: NAMESPACE, TableName: TABLENAME,
		PartitionKey: &fromPartitionKey, ClusteringKey: nil,
		GetType: pb.Get_GET_TYPE_GET,
	}
	fromGetResponse, err := client.Get(ctx, &pb.GetRequest{RequestHeader: &requestHeader, TransactionId: transactionId, Get: &fromGet})
	if err != nil {
		return err
	}
	toGet := pb.Get{
		NamespaceName: NAMESPACE, TableName: TABLENAME,
		PartitionKey: &toPartitionKey, ClusteringKey: nil,
		GetType: pb.Get_GET_TYPE_GET,
	}
	toGetResponse, err := client.Get(ctx, &pb.GetRequest{RequestHeader: &requestHeader, TransactionId: transactionId, Get: &toGet})
	if err != nil {
		return err
	}

	// Calculate the balances (it assumes that both accounts exist)
	var (
		fromBalance int32
		toBalance   int32
	)
	for _, column := range fromGetResponse.GetResult().GetColumns() {
		if column.Name == BALANCE {
			fromBalance = column.GetIntValue().GetValue()
			break
		}
	}
	for _, column := range toGetResponse.GetResult().GetColumns() {
		if column.Name == BALANCE {
			toBalance = column.GetIntValue().GetValue()
			break
		}
	}
	newFromBalance := fromBalance - int32(amount)
	newToBalance := toBalance + int32(amount)

	if newFromBalance < 0 {
		return errors.New(fromId + " doesn't have enough balance.")
	}

	// Update the balances
	fromPut := pb.Put{
		NamespaceName: NAMESPACE, TableName: TABLENAME,
		PartitionKey: &fromPartitionKey, ClusteringKey: nil,
		Columns: []*pb.Column{
			{Name: BALANCE, Value: &pb.Column_IntValue_{IntValue: &pb.Column_IntValue{Value: &newFromBalance}}},
		},
	}
	toPut := pb.Put{
		NamespaceName: NAMESPACE, TableName: TABLENAME,
		PartitionKey: &toPartitionKey, ClusteringKey: nil,
		Columns: []*pb.Column{
			{Name: BALANCE, Value: &pb.Column_IntValue_{IntValue: &pb.Column_IntValue{Value: &newToBalance}}},
		},
	}
	_, err = client.Put(ctx, &pb.PutRequest{RequestHeader: &requestHeader, TransactionId: transactionId, Puts: []*pb.Put{&fromPut, &toPut}})
	return err
}

func getBalance(ctx context.Context, client pb.DistributedTransactionClient, transactionId string, id string) (int, error) {
	// Retrieve the current balance for id
	get := pb.Get{
		NamespaceName: NAMESPACE, TableName: TABLENAME,
		PartitionKey:  &pb.Key{Columns: []*pb.Column{{Name: ID, Value: &pb.Column_TextValue_{TextValue: &pb.Column_TextValue{Value: &id}}}}},
		ClusteringKey: nil,
		GetType:       pb.Get_GET_TYPE_GET,
	}
	getResponse, err := client.Get(ctx, &pb.GetRequest{RequestHeader: &requestHeader, TransactionId: transactionId, Get: &get})
	if err != nil {
		return 0, err
	}
	if getResponse.GetResult() == nil || len(getResponse.GetResult().GetColumns()) == 0 {
		return 0, errors.New("Account " + id + " doesn't exist.")
	}

	var balance int
	for _, column := range getResponse.GetResult().GetColumns() {
		if column.Name == BALANCE {
			balance = int(column.GetIntValue().GetValue())
			break
		}
	}
	return balance, nil
}

func main() {
	var (
		action = flag.String("action", "", "Action to perform: charge / pay / getBalance")
		fromId = flag.String("from", "", "From account (needed for pay)")
		toId   = flag.String("to", "", "To account (needed for charge and pay)")
		id     = flag.String("id", "", "Account id (needed for getBalance)")
	)
	var amount int
	flag.IntVar(&amount, "amount", 0, "Amount to transfer (needed for charge and pay)")
	flag.Parse()

	if *action == "charge" {
		if *toId == "" || amount < 0 {
			printUsageAndExit()
		}
		err := withTransaction(func(ctx context.Context, client pb.DistributedTransactionClient, txId string) error {
			return charge(ctx, client, txId, *toId, amount)
		})
		if err != nil {
			log.Fatalf("error: %v", err)
		}
	} else if *action == "pay" {
		if *toId == "" || *fromId == "" || amount < 0 {
			printUsageAndExit()
		}
		err := withTransaction(func(ctx context.Context, client pb.DistributedTransactionClient, txId string) error {
			return pay(ctx, client, txId, *fromId, *toId, amount)
		})
		if err != nil {
			log.Fatalf("error: %v", err)
		}
	} else if *action == "getBalance" {
		if *id == "" {
			printUsageAndExit()
		}
		var balance int
		err := withTransaction(func(ctx context.Context, client pb.DistributedTransactionClient, txId string) error {
			var err error
			balance, err = getBalance(ctx, client, txId, *id)
			return err
		})
		if err != nil {
			log.Fatalf("error: %v", err)
		}
		fmt.Println(balance)
	} else {
		fmt.Fprintln(os.Stderr, "Unknown action "+*action)
		printUsageAndExit()
	}
}

func printUsageAndExit() {
	flag.Usage()
	os.Exit(1)
}
```

After creating the `main.go` file, you need to create the `go.mod` file by running the following commands:

```console
go mod init emoney
go mod tidy
```

Now, the directory structure should be as follows:

```text
.
├── go.mod
├── go.sum
├── main.go
└── scalardb-cluster
    ├── scalardb-cluster.pb.go
    ├── scalardb-cluster.proto
    └── scalardb-cluster_grpc.pb.go
```

You can then run the program as follows:

- Charge `1000` to `user1`:

    ```console
    $ go run main.go -action charge -amount 1000 -to user1
    ```

- Charge `0` to `merchant1` (Just create an account for `merchant1`):

   ```console
   $ go run main.go -action charge -amount 0 -to merchant1
   ```

- Pay `100` from `user1` to `merchant1`:

   ```console
   $ go run main.go -action pay -amount 100 -from user1 -to merchant1
   ```

- Get the balance of `user1`:

   ```console
   $ go run main.go -action getBalance -id user1
   ```

- Get the balance of `merchant1`:

   ```console
   $ go run main.go -action getBalance -id merchant1
   ```

Note that you can also use `go build` to get the binary and then run it:

```console
$ go build
$ ./emoney -action getBalance -id user1
```

## References

- [Getting Started with ScalarDB Cluster](getting-started-with-scalardb-cluster.md)
- [Set Up ScalarDB Cluster on Kubernetes by Using a Helm Chart](setup-scalardb-cluster-on-kubernetes-by-using-helm-chart.md)
- [ScalarDB Cluster gRPC API Guide](scalardb-cluster-grpc-api-guide.md)
