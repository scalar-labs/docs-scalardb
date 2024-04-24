# Getting Started with ScalarDB Cluster SQL via JDBC

This tutorial describes how to create a sample application by using ScalarDB Cluster SQL via JDBC.
You'll be using the same sample application as found in the [ScalarDB SQL (JDBC) Sample](https://github.com/scalar-labs/scalardb-samples/tree/main/scalardb-sql-jdbc-sample).

## Prerequisites

- One of the following Java Development Kits (JDKs):
  - [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) LTS version (8, 11, or 17)
  - [OpenJDK](https://openjdk.org/install/) LTS version (8, 11, or 17)
- ScalarDB Cluster running on a Kubernetes cluster
  - We assume that you have a ScalarDB Cluster running on a Kubernetes cluster that you deployed by following the instructions in [Set Up ScalarDB Cluster on Kubernetes by Using a Helm Chart](setup-scalardb-cluster-on-kubernetes-by-using-helm-chart.md).

:::note

We recommend using the LTS versions mentioned above, but other non-LTS versions may work.

In addition, other JDKs should work with ScalarDB, but we haven't tested them.

:::

## Sample application

This tutorial illustrates the process of creating a sample e-commerce application, where items can be ordered and paid for with a credit card by using ScalarDB.
For details about the sample application, see the [sample application for ScalarDB SQL (JDBC)](https://github.com/scalar-labs/scalardb-samples/tree/main/scalardb-sql-jdbc-sample#sample-application).

The following diagram shows the system architecture of the sample application:

```
                                 +------------------------------------------------------------------------------------------------------------------------------+
                                 | [Kubernetes Cluster]                                                                                                         |
                                 |                                                                                                                              |
                                 |                          [Pod]                                                     [Pod]                         [Pod]       |
 +------------------------+      |                                                                                                                              |
 |        SQL CLI         |      |                        +-------+                                          +-----------------------+                          |
 | (indirect client mode) | --+  |                  +---> | Envoy | ---+                               +---> | ScalarDB Cluster Node | ---+                     |
 +------------------------+   |  |                  |     +-------+    |                               |     +-----------------------+    |                     |
                              |  |                  |                  |                               |                                  |                     |
                              |  |   +---------+    |     +-------+    |     +--------------------+    |     +-----------------------+    |     +------------+  |
                              +--+-> | Service | ---+---> | Envoy | ---+---> |      Service       | ---+---> | ScalarDB Cluster Node | ---+---> | PostgreSQL |  |
                              |  |   | (Envoy) |    |     +-------+    |     | (ScalarDB Cluster) |    |     +-----------------------+    |     +------------+  |
 +------------------------+   |  |   +---------+    |                  |     +--------------------+    |                                  |                     |
 |   Sample application   |   |  |                  |     +-------+    |                               |     +-----------------------+    |                     |
 |   with ScalarDB JDBC   | --+  |                  +---> | Envoy | ---+                               +---> | ScalarDB Cluster Node | ---+                     |
 | (indirect client mode) |      |                        +-------+                                          +-----------------------+                          |
 +------------------------+      |                                                                                                                              |
                                 +------------------------------------------------------------------------------------------------------------------------------+
```

## Step 1. Clone the ScalarDB Samples repository

```shell
$ git clone https://github.com/scalar-labs/scalardb-samples.git
$ cd scalardb-samples/scalardb-sql-jdbc-sample
```

## Step 2. Modify `build.gradle`

To use ScalarDB Cluster, you need to modify `build.gradle`:

```shell
$ vim build.gradle
```

Then, delete the existing dependency for `com.scalar-labs:scalardb-sql-direct-mode:3.11.1` from the `dependencies` section, and add the following dependency to the `dependencies` section:

```gradle
dependencies {
    ...

    implementation 'com.scalar-labs:scalardb-cluster-java-client-sdk:3.11.1'
}
```

## Step 3. Modify `scalardb-sql.properties`

You need to modify `scalardb-sql.properties` to connect to ScalarDB Cluster as well.
But before doing so, you need to get the `EXTERNAL-IP` address of the service resource of Envoy (`scalardb-cluster-envoy`) as follows:

```shell
$ kubectl get svc scalardb-cluster-envoy
NAME                     TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)           AGE
scalardb-cluster-envoy   LoadBalancer   10.105.121.51   localhost     60053:30641/TCP   16h
```

In this case, the `EXTERNAL-IP` address is `localhost`.

Next, open `scalardb-sql.properties`:

```shell
$ vim scalardb-sql.properties
```

Then, modify `scalardb-sql.properties` as follows:

```properties
scalar.db.sql.connection_mode=cluster
scalar.db.sql.cluster_mode.contact_points=indirect:localhost
```

To connect to ScalarDB Cluster, you need to specify `cluster` for the `scalar.db.sql.connection_mode` property.
In addition, you will use the `indirect` client mode and connect to the service resource of Envoy in this tutorial.
For details about the client modes, see [Developer Guide for ScalarDB Cluster with the Java API](developer-guide-for-scalardb-cluster-with-java-api.md).

## Step 4. Load a schema

To load a schema via ScalarDB Cluster SQL, you need to use the dedicated SQL CLI for ScalarDB Cluster (SQL CLI for Cluster).
Using the SQL CLI for Cluster is basically the same as using the [ScalarDB SQL Command Line Interface](https://github.com/scalar-labs/scalardb-sql/blob/main/docs/command-line-interface.md) except the name of the JAR file is different.
You can download the SQL CLI for Cluster from [Releases](https://github.com/scalar-labs/scalardb-cluster/releases/tag/v3.11.1).
After downloading the JAR file, you can use SQL CLI for Cluster by running the following command:

```shell
$ java -jar scalardb-cluster-sql-cli-3.11.1-all.jar --config scalardb-sql.properties --file schema.sql
```

## Step 5. Load the initial data

Before running the sample application, you need to load the initial data by running the following command:

```shell
$ ./gradlew run --args="LoadInitialData"
```

After the initial data has loaded, the following records should be stored in the tables:

- For the `sample.customers` table:

| customer_id | name          | credit_limit | credit_total |
|-------------|---------------|--------------|--------------|
| 1           | Yamada Taro   | 10000        | 0            |
| 2           | Yamada Hanako | 10000        | 0            |
| 3           | Suzuki Ichiro | 10000        | 0            |

- For the `sample.items` table:

| item_id | name   | price |
|---------|--------|-------|
| 1       | Apple  | 1000  |
| 2       | Orange | 2000  |
| 3       | Grape  | 2500  |
| 4       | Mango  | 5000  |
| 5       | Melon  | 3000  |

## Step 6. Run the sample application

Let's start with getting information about the customer whose ID is `1`:

```shell
$ ./gradlew run --args="GetCustomerInfo 1"
...
{"id": 1, "name": "Yamada Taro", "credit_limit": 10000, "credit_total": 0}
...
```

Then, place an order for three apples and two oranges by using customer ID `1`.
Note that the order format is `<Item ID>:<Count>,<Item ID>:<Count>,...`:

```shell
$ ./gradlew run --args="PlaceOrder 1 1:3,2:2"
...
{"order_id": "454f9c97-f456-44fd-96da-f527187fe39b"}
...
```

You can see that running this command shows the order ID.

Let's check the details of the order by using the order ID:

```shell
$ ./gradlew run --args="GetOrder 454f9c97-f456-44fd-96da-f527187fe39b"
...
{"order": {"order_id": "454f9c97-f456-44fd-96da-f527187fe39b","timestamp": 1685602722821,"customer_id": 1,"customer_name": "Yamada Taro","statement": [{"item_id": 1, "name": "Apple", "price": 1000, "count": 3},{"item_id": 2, "name": "Orange", "price": 2000, "count": 2}],"total": 7000}}
...
```

Then, let's place another order and get the order history of customer ID `1`:

```shell
$ ./gradlew run --args="PlaceOrder 1 5:1"
...
{"order_id": "3f40c718-59ec-48aa-a6fe-2fdaf12ad094"}
...
$ ./gradlew run --args="GetOrders 1"
...
{"order": [{"order_id": "454f9c97-f456-44fd-96da-f527187fe39b","timestamp": 1685602722821,"customer_id": 1,"customer_name": "Yamada Taro","statement": [{"item_id": 1, "name": "Apple", "price": 1000, "count": 3},{"item_id": 2, "name": "Orange", "price": 2000, "count": 2}],"total": 7000},{"order_id": "3f40c718-59ec-48aa-a6fe-2fdaf12ad094","timestamp": 1685602811718,"customer_id": 1,"customer_name": "Yamada Taro","statement": [{"item_id": 5, "name": "Melon", "price": 3000, "count": 1}],"total": 3000}]}
...
```

This order history is shown in descending order by timestamp.

The customer's current `credit_total` is `10000`.
Since the customer has now reached their `credit_limit`, which was shown when retrieving their information, they cannot place anymore orders.

```shell
$ ./gradlew run --args="GetCustomerInfo 1"
...
{"id": 1, "name": "Yamada Taro", "credit_limit": 10000, "credit_total": 10000}
...
$ ./gradlew run --args="PlaceOrder 1 3:1,4:1"
...
java.lang.RuntimeException: Credit limit exceeded
        at sample.Sample.placeOrder(Sample.java:184)
        at sample.command.PlaceOrderCommand.call(PlaceOrderCommand.java:32)
        at sample.command.PlaceOrderCommand.call(PlaceOrderCommand.java:8)
        at picocli.CommandLine.executeUserObject(CommandLine.java:2041)
        at picocli.CommandLine.access$1500(CommandLine.java:148)
        at picocli.CommandLine$RunLast.executeUserObjectOfLastSubcommandWithSameParent(CommandLine.java:2461)
        at picocli.CommandLine$RunLast.handle(CommandLine.java:2453)
        at picocli.CommandLine$RunLast.handle(CommandLine.java:2415)
        at picocli.CommandLine$AbstractParseResultHandler.execute(CommandLine.java:2273)
        at picocli.CommandLine$RunLast.execute(CommandLine.java:2417)
        at picocli.CommandLine.execute(CommandLine.java:2170)
        at sample.command.SampleCommand.main(SampleCommand.java:35)
...
```

After making a payment, the customer will be able to place orders again.

```shell
$ ./gradlew run --args="Repayment 1 8000"
...
$ ./gradlew run --args="GetCustomerInfo 1"
...
{"id": 1, "name": "Yamada Taro", "credit_limit": 10000, "credit_total": 2000}
...
$ ./gradlew run --args="PlaceOrder 1 3:1,4:1"
...
{"order_id": "fb71279d-88ea-4974-a102-0ec4e7d65e25"}
...
```

## Source code of the sample application

To learn more about ScalarDB Cluster SQL JDBC, you can check the [source code of the sample application](https://github.com/scalar-labs/scalardb-samples/tree/main/scalardb-sql-jdbc-sample/src/main/java/sample).

## Next steps

If you have not tried the other ScalarDB Cluster tutorials, we encourage you to read the following:

* [Getting Started with ScalarDB Cluster](getting-started-with-scalardb-cluster.md)
* [Getting Started with ScalarDB Cluster GraphQL](getting-started-with-scalardb-cluster-graphql.md)
* [Getting Started with ScalarDB Cluster SQL via Spring Data JDBC for ScalarDB](getting-started-with-scalardb-cluster-sql-spring-data-jdbc.md)

For details about developing applications that use ScalarDB Cluster with the Java API, refer to the following:

* [Developer Guide for ScalarDB Cluster with the Java API](developer-guide-for-scalardb-cluster-with-java-api.md)

For details about the ScalarDB Cluster gRPC API, refer to the following:

* [ScalarDB Cluster gRPC API Guide](scalardb-cluster-grpc-api-guide.md)
* [ScalarDB Cluster SQL gRPC API Guide](scalardb-cluster-sql-grpc-api-guide.md)
