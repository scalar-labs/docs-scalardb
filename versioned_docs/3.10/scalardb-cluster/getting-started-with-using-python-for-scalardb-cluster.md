# Getting Started with Using Python for ScalarDB Cluster

This document explains how to write gRPC client code for ScalarDB Cluster by using Python.

## Prerequisites

- ScalarDB Cluster 3.9.0 or later
- Python 3.7 or later

In this tutorial, we assume that you have a ScalarDB Cluster running on a Kubernetes cluster that you deployed by following the instructions in [Set Up ScalarDB Cluster on Kubernetes by Using a Helm Chart](setup-scalardb-cluster-on-kubernetes-by-using-helm-chart.mdx).

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
For details about the client modes, see [Developer Guide for ScalarDB Cluster with the Java API](developer-guide-for-scalardb-cluster-with-java-api.mdx).

## Step 3. Load a schema

To load a schema via ScalarDB Cluster, you need to use the dedicated Schema Loader for ScalarDB Cluster (Schema Loader for Cluster). Using the Schema Loader for Cluster is basically the same as using the [Schema Loader for ScalarDB](https://github.com/scalar-labs/scalardb/blob/master/docs/schema-loader.mdx) except the name of the JAR file is different. You can download the Schema Loader for Cluster at [Releases](https://github.com/scalar-labs/scalardb-cluster/releases). After downloading the JAR file, you can run the Schema Loader for Cluster with the following command:

```shell
$ java -jar scalardb-cluster-schema-loader-3.10.3-all.jar --config database.properties -f schema.json --coordinator
```

## Step 4. Set up a Python environment

You can choose any way you like to manage your Python environment. For the purpose of this guide, we assume that your Python application is running in an environment by using `venv`.

Create a working directory anywhere, and go there. Then, run the following command to activate `venv` by running the following command:

```console
$ python3 -m venv venv
$ source venv/bin/activate
```

Let's install the gRPC packages with the `pip` command:

```console
$ pip install grpcio grpcio-tools
```

## Step 5. Generate the stub code for ScalarDB Cluster gRPC

To communicate with the gRPC server for ScalarDB Cluster, you will need to generate the stub code from the proto file.

First, download the `scalardb-cluster.proto` file, then save it in the working directory. For ScalarDB Cluster users who have a commercial license, please [contact us](https://www.scalar-labs.com/contact) if you need the `scalardb-cluster.proto` file.

You can generate the stub code by running the following command:

```console
$ python -m grpc_tools.protoc -I . --python_out=. --pyi_out=. --grpc_python_out=. scalardb-cluster.proto
```

The following files will be generated:

- `scalardb_cluster_pb2.py`
- `scalardb_cluster_pb2.pyi`
- `scalardb_cluster_pb2_grpc.py`

## Step 6. Write a sample application

The following is the sample Python application (`electronic_money.py`) that uses the stub code. This program does the same thing as the `ElectronicMoney.java` program in [Getting Started with ScalarDB](https://scalardb.scalar-labs.com/docs/latest/getting-started-with-scalardb/). Note that you have to update the value of `SERVER_ADDRESS` based on the `EXTERNAL-IP` value of the ScalarDB Cluster `LoadBalancer` service in your environment.

```python
import argparse
from typing import Optional

import grpc

import scalardb_cluster_pb2_grpc
from scalardb_cluster_pb2 import (
    BeginRequest,
    BeginResponse,
    Column,
    CommitRequest,
    Get,
    GetRequest,
    GetResponse,
    Key,
    Put,
    PutRequest,
    RequestHeader,
    RollbackRequest,
)

SERVER_ADDRESS = "localhost:60053"
NAMESPACE = "emoney"
TABLENAME = "account"
ID = "id"
BALANCE = "balance"

request_header = RequestHeader(hop_limit=10)


def charge(id: str, amount: int) -> None:
    with grpc.insecure_channel(SERVER_ADDRESS) as channel:
        stub = scalardb_cluster_pb2_grpc.DistributedTransactionStub(channel)

        begin_response: BeginResponse = stub.Begin(
            BeginRequest(request_header=request_header)
        )

        transaction_id = begin_response.transaction_id

        try:
            pkey = Key(
                columns=[
                    Column(
                        name=ID,
                        text_value=Column.TextValue(value=id),
                    )
                ]
            )

            # Retrieve the current balance for id
            get = Get(
                namespace_name=NAMESPACE,
                table_name=TABLENAME,
                get_type=Get.GetType.GET_TYPE_GET,
                partition_key=pkey,
            )
            get_response: GetResponse = stub.Get(
                GetRequest(
                    request_header=request_header,
                    transaction_id=transaction_id,
                    get=get,
                )
            )

            # Calculate the balance
            balance = amount
            if get_response.result.columns:
                balance_column = next(
                    c for c in get_response.result.columns if c.name == BALANCE
                )
                current = balance_column.int_value.value
                balance += current

            # Update the balance
            put = Put(
                namespace_name=NAMESPACE,
                table_name=TABLENAME,
                partition_key=pkey,
                columns=[
                    Column(name=BALANCE, int_value=Column.IntValue(value=balance))
                ],
            )
            stub.Put(
                PutRequest(
                    request_header=request_header,
                    transaction_id=transaction_id,
                    puts=[put],
                )
            )

            # Commit the transaction
            stub.Commit(
                CommitRequest(
                    request_header=request_header,
                    transaction_id=transaction_id,
                )
            )
        except Exception as e:
            # Rollback the transaction
            stub.Rollback(
                RollbackRequest(
                    request_header=request_header,
                    transaction_id=transaction_id,
                )
            )
            raise e


def pay(from_id: str, to_id: str, amount: int) -> None:
    with grpc.insecure_channel(SERVER_ADDRESS) as channel:
        stub = scalardb_cluster_pb2_grpc.DistributedTransactionStub(channel)

        begin_response: BeginResponse = stub.Begin(
            BeginRequest(request_header=request_header)
        )

        transaction_id = begin_response.transaction_id

        try:
            from_pkey = Key(
                columns=[
                    Column(
                        name=ID,
                        text_value=Column.TextValue(value=from_id),
                    )
                ]
            )
            to_pkey = Key(
                columns=[
                    Column(
                        name=ID,
                        text_value=Column.TextValue(value=to_id),
                    )
                ]
            )

            # Retrieve the current balances for ids
            from_get = Get(
                namespace_name=NAMESPACE,
                table_name=TABLENAME,
                get_type=Get.GetType.GET_TYPE_GET,
                partition_key=from_pkey,
            )
            from_get_response: GetResponse = stub.Get(
                GetRequest(
                    request_header=request_header,
                    transaction_id=transaction_id,
                    get=from_get,
                )
            )
            to_get = Get(
                namespace_name=NAMESPACE,
                table_name=TABLENAME,
                get_type=Get.GetType.GET_TYPE_GET,
                partition_key=to_pkey,
            )
            to_get_response: GetResponse = stub.Get(
                GetRequest(
                    request_header=request_header,
                    transaction_id=transaction_id,
                    get=to_get,
                )
            )

            # Calculate the balances (it assumes that both accounts exist)
            new_from_balance = (
                next(
                    c for c in from_get_response.result.columns if c.name == BALANCE
                ).int_value.value
                - amount
            )
            new_to_balance = (
                next(
                    c for c in to_get_response.result.columns if c.name == BALANCE
                ).int_value.value
                + amount
            )

            if new_from_balance < 0:
                raise RuntimeError(from_id + " doesn't have enough balance.")

            # Update the balances
            from_put = Put(
                namespace_name=NAMESPACE,
                table_name=TABLENAME,
                partition_key=from_pkey,
                columns=[
                    Column(
                        name=BALANCE, int_value=Column.IntValue(value=new_from_balance)
                    )
                ],
            )
            to_put = Put(
                namespace_name=NAMESPACE,
                table_name=TABLENAME,
                partition_key=to_pkey,
                columns=[
                    Column(
                        name=BALANCE, int_value=Column.IntValue(value=new_to_balance)
                    )
                ],
            )
            stub.Put(
                PutRequest(
                    request_header=request_header,
                    transaction_id=transaction_id,
                    puts=[from_put, to_put],
                )
            )

            # Commit the transaction (records are automatically recovered in case of failure)
            stub.Commit(
                CommitRequest(
                    request_header=request_header,
                    transaction_id=transaction_id,
                )
            )
        except Exception as e:
            # Rollback the transaction
            stub.Rollback(
                RollbackRequest(
                    request_header=request_header,
                    transaction_id=transaction_id,
                )
            )
            raise e


def get_balance(id: str) -> Optional[int]:
    with grpc.insecure_channel(SERVER_ADDRESS) as channel:
        stub = scalardb_cluster_pb2_grpc.DistributedTransactionStub(channel)

        begin_response: BeginResponse = stub.Begin(
            BeginRequest(request_header=request_header)
        )

        transaction_id = begin_response.transaction_id

        try:
            # Retrieve the current balance for id
            get = Get(
                namespace_name=NAMESPACE,
                table_name=TABLENAME,
                get_type=Get.GetType.GET_TYPE_GET,
                partition_key=Key(
                    columns=[
                        Column(
                            name=ID,
                            text_value=Column.TextValue(value=id),
                        )
                    ]
                ),
            )
            get_response: GetResponse = stub.Get(
                GetRequest(
                    request_header=request_header,
                    transaction_id=transaction_id,
                    get=get,
                )
            )

            balance = None
            if get_response.result.columns:
                balance_column = next(
                    c for c in get_response.result.columns if c.name == BALANCE
                )
                balance = balance_column.int_value.value

            # Commit the transaction
            stub.Commit(
                CommitRequest(
                    request_header=request_header,
                    transaction_id=transaction_id,
                )
            )

            return balance

        except Exception as e:
            # Rollback the transaction
            stub.Rollback(
                RollbackRequest(
                    request_header=request_header,
                    transaction_id=transaction_id,
                )
            )
            raise e


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(required=True)

    parser_charge = subparsers.add_parser("charge")
    parser_charge.add_argument("-amount", type=int, required=True)
    parser_charge.add_argument("-to", type=str, required=True, dest="to_id")
    parser_charge.set_defaults(func=lambda args: charge(args.to_id, args.amount))

    parser_pay = subparsers.add_parser("pay")
    parser_pay.add_argument("-amount", type=int, required=True)
    parser_pay.add_argument("-from", type=str, required=True, dest="from_id")
    parser_pay.add_argument("-to", type=str, required=True, dest="to_id")
    parser_pay.set_defaults(
        func=lambda args: pay(args.from_id, args.to_id, args.amount)
    )

    parser_get_balance = subparsers.add_parser("get-balance")
    parser_get_balance.add_argument("-id", type=str, required=True)
    parser_get_balance.set_defaults(func=lambda args: print(get_balance(args.id)))

    args = parser.parse_args()
    args.func(args)

```

You can then run the program as follows:

- Charge `1000` to `user1`:

    ```console
    $ python electronic_money.py charge -amount 1000 -to user1
    ```

- Charge `0` to `merchant1` (Just create an account for `merchant1`):

   ```console
   $ python electronic_money.py charge -amount 0 -to merchant1
   ```

- Pay `100` from `user1` to `merchant1`:

   ```console
   $ python electronic_money.py pay -amount 100 -from user1 -to merchant1
   ```

- Get the balance of `user1`:

   ```console
   $ python electronic_money.py get-balance -id user1
   ```

- Get the balance of `merchant1`:

   ```console
   $ python electronic_money.py get-balance -id merchant1
   ```

## References

- [Getting Started with ScalarDB Cluster](getting-started-with-scalardb-cluster.mdx)
- [Set Up ScalarDB Cluster on Kubernetes by Using a Helm Chart](setup-scalardb-cluster-on-kubernetes-by-using-helm-chart.mdx)
- [ScalarDB Cluster gRPC API Guide](scalardb-cluster-grpc-api-guide.mdx)
