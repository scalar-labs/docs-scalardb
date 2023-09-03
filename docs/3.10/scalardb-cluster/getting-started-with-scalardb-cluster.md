# Getting Started with ScalarDB Cluster

This tutorial describes how to create a sample application by using ScalarDB Cluster though the Java API.
You'll be using the same sample application as found in the [ScalarDB Sample](https://github.com/scalar-labs/scalardb-samples/tree/main/scalardb-sample).

## Prerequisites

- Java (OpenJDK 8 or higher)
- Gradle

In this tutorial, we assume that you have a ScalarDB Cluster running on a Kubernetes cluster.
If you don't have ScalarDB Cluster set up, please follow the instructions in [Set Up ScalarDB Cluster on Kubernetes by Using a Helm Chart](setup-scalardb-cluster-on-kubernetes-by-using-helm-chart.md).

In addition, you need access to the [ScalarDB Cluster GitHub repository](https://github.com/scalar-labs/scalardb-cluster) and [packages in the ScalarDB Cluster repository](https://github.com/orgs/scalar-labs/packages?repo_name=scalardb-cluster).
These repositories are available only to users with a commercial license and permission.
To get a license and permission, please [contact us](https://www.scalar-labs.com/contact/).

You also need to set the `gpr.user` property to your GitHub username and the `gpr.key` property to your personal access token.
To do so, you must either add these properties in `~/.gradle/gradle.properties` or specify the properties by using the `-P` option when running the `./gradlew` command as follows:

```shell
$ ./gradlew run ... -Pgpr.user=<YOUR_GITHUB_USERNAME> -Pgpr.key=<YOUR_PERSONAL_ACCESS_TOKEN>
```

Or you can use environment variables, such as `USERNAME` for your GitHub username and `TOKEN` for your personal access token.

```shell
$ export USERNAME=<YOUR_GITHUB_USERNAME>
$ export TOKEN=<YOUR_PERSONAL_ACCESS_TOKEN>
```

For more details, see [Developer Guide for ScalarDB Cluster with the Java API](developer-guide-for-scalardb-cluster-with-java-api.md).

## Sample application

This tutorial illustrates the process of creating a sample e-commerce application, where items can be ordered and paid for with a credit card by using ScalarDB.
For details about the sample application, see the [sample application for ScalarDB](https://github.com/scalar-labs/scalardb-samples/tree/main/scalardb-sample#sample-application).

The following diagram shows the system architecture of the sample application:

```
                                 +------------------------------------------------------------------------------------------------------------------------------+
                                 | [Kubernetes Cluster]                                                                                                         |
                                 |                                                                                                                              |
                                 |                          [Pod]                                                     [Pod]                         [Pod]       |
 +------------------------+      |                                                                                                                              |
 |     Schema Loader      |      |                        +-------+                                          +-----------------------+                          |
 | (indirect client mode) | --+  |                  +---> | Envoy | ---+                               +---> | ScalarDB Cluster Node | ---+                     |
 +------------------------+   |  |                  |     +-------+    |                               |     +-----------------------+    |                     |
                              |  |                  |                  |                               |                                  |                     |
                              |  |   +---------+    |     +-------+    |     +--------------------+    |     +-----------------------+    |     +------------+  |
                              +--+-> | Service | ---+---> | Envoy | ---+---> |      Service       | ---+---> | ScalarDB Cluster Node | ---+---> | PostgreSQL |  |
                              |  |   | (Envoy) |    |     +-------+    |     | (ScalarDB Cluster) |    |     +-----------------------+    |     +------------+  |
 +------------------------+   |  |   +---------+    |                  |     +--------------------+    |                                  |                     |
 |   Sample application   |   |  |                  |     +-------+    |                               |     +-----------------------+    |                     |
 |     with Java API      | --+  |                  +---> | Envoy | ---+                               +---> | ScalarDB Cluster Node | ---+                     |
 | (indirect client mode) |      |                        +-------+                                          +-----------------------+                          |
 +------------------------+      |                                                                                                                              |
                                 +------------------------------------------------------------------------------------------------------------------------------+
```

## Step 1. Clone the ScalarDB Samples repository

```shell
$ git clone https://github.com/scalar-labs/scalardb-samples.git
$ cd scalardb-samples/scalardb-sample
```

## Step 2. Modify `build.gradle`

To use ScalarDB Cluster, you need to modify `build.gradle`:

```shell
$ vim build.gradle
```

First, add the following repository for ScalarDB Cluster to the `repositories` section:

```gradle
repositories {
    ...

    maven {
        url = uri("https://maven.pkg.github.com/scalar-labs/scalardb-cluster")
        credentials {
            username = project.findProperty("gpr.user") ?: System.getenv("USERNAME")
            password = project.findProperty("gpr.key") ?: System.getenv("TOKEN")
        }
    }
}
```

Then, delete the existing dependency for `com.scalar-labs:scalardb:3.10.1` from the `dependencies` section, and add the following dependency to the `dependencies` section:

```gradle
dependencies {
    ...

    implementation 'com.scalar-labs:scalardb-cluster-client:3.10.1'
}
```

## Step 3. Modify `database.properties`

You need to modify `database.properties` to connect to ScalarDB Cluster as well.
But before doing so, you need to get the `EXTERNAL-IP` address of the service resource of Envoy (`scalardb-cluster-envoy`) as follows:

```shell
$ kubectl get svc scalardb-cluster-envoy
NAME                     TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)           AGE
scalardb-cluster-envoy   LoadBalancer   10.105.121.51   localhost     60053:30641/TCP   16h
```

In this case, the `EXTERNAL-IP` address is `localhost`.

Next, open `database.properties`:

```shell
$ vim database.properties
```

Then, modify `database.properties` as follows:

```properties
scalar.db.transaction_manager=cluster
scalar.db.contact_points=indirect:localhost
```

To connect to ScalarDB Cluster, you need to specify `cluster` for the `scalar.db.transaction_manager` property.
In addition, you will use the `indirect` client mode and connect to the service resource of Envoy in this tutorial.
For details about the client modes, see [Developer Guide for ScalarDB Cluster with the Java API](developer-guide-for-scalardb-cluster-with-java-api.md).

## Step 4. Load a schema

To load a schema via ScalarDB Cluster, you need to use the dedicated Schema Loader for ScalarDB Cluster (Schema Loader for Cluster).
Using the Schema Loader for Cluster is basically the same as using the [Schema Loader](https://github.com/scalar-labs/scalardb/blob/master/docs/schema-loader.md) except the name of the JAR file is different.
You can download the Schema Loader for Cluster from [Releases](https://github.com/scalar-labs/scalardb-cluster/releases/tag/v3.10.1).
After downloading the JAR file, you can run Schema Loader for Cluster with the following command:

```shell
$ java -jar scalardb-cluster-schema-loader-3.10.1-all.jar --config database.properties -f schema.json --coordinator
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
{"order_id": "dea4964a-ff50-4ecf-9201-027981a1566e"}
...
```

You can see that running this command shows the order ID.

Let's check the details of the order by using the order ID:

```shell
$ ./gradlew run --args="GetOrder dea4964a-ff50-4ecf-9201-027981a1566e"
...
{"order": {"order_id": "dea4964a-ff50-4ecf-9201-027981a1566e","timestamp": 1650948340914,"customer_id": 1,"customer_name": "Yamada Taro","statement": [{"item_id": 1,"item_name": "Apple","price": 1000,"count": 3,"total": 3000},{"item_id": 2,"item_name": "Orange","price": 2000,"count": 2,"total": 4000}],"total": 7000}}
...
```

Then, let's place another order and get the order history of customer ID `1`:

```shell
$ ./gradlew run --args="PlaceOrder 1 5:1"
...
{"order_id": "bcc34150-91fa-4bea-83db-d2dbe6f0f30d"}
...
$ ./gradlew run --args="GetOrders 1"
...
{"order": [{"order_id": "dea4964a-ff50-4ecf-9201-027981a1566e","timestamp": 1650948340914,"customer_id": 1,"customer_name": "Yamada Taro","statement": [{"item_id": 1,"item_name": "Apple","price": 1000,"count": 3,"total": 3000},{"item_id": 2,"item_name": "Orange","price": 2000,"count": 2,"total": 4000}],"total": 7000},{"order_id": "bcc34150-91fa-4bea-83db-d2dbe6f0f30d","timestamp": 1650948412766,"customer_id": 1,"customer_name": "Yamada Taro","statement": [{"item_id": 5,"item_name": "Melon","price": 3000,"count": 1,"total": 3000}],"total": 3000}]}
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
        at sample.Sample.placeOrder(Sample.java:205)
        at sample.command.PlaceOrderCommand.call(PlaceOrderCommand.java:33)
        at sample.command.PlaceOrderCommand.call(PlaceOrderCommand.java:8)
        at picocli.CommandLine.executeUserObject(CommandLine.java:1783)
        at picocli.CommandLine.access$900(CommandLine.java:145)
        at picocli.CommandLine$RunLast.handle(CommandLine.java:2141)
        at picocli.CommandLine$RunLast.handle(CommandLine.java:2108)
        at picocli.CommandLine$AbstractParseResultHandler.execute(CommandLine.java:1975)
        at picocli.CommandLine.execute(CommandLine.java:1904)
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
{"order_id": "8911cab3-1c2b-4322-9386-adb1c024e078"}
...
```

## Source code of the sample application

To learn more about the ScalarDB Cluster Java API, you can check the [source code of the sample application](https://github.com/scalar-labs/scalardb-samples/tree/main/scalardb-sample/src/main/java/sample).

## Next steps

If you have not tried the other ScalarDB Cluster tutorials, we encourage you to read the following:

* [Getting Started with ScalarDB Cluster GraphQL](getting-started-with-scalardb-cluster-graphql.md)
* [Getting Started with ScalarDB Cluster SQL via JDBC](getting-started-with-scalardb-cluster-sql-jdbc.md)
* [Getting Started with ScalarDB Cluster SQL via Spring Data JDBC for ScalarDB](getting-started-with-scalardb-cluster-sql-spring-data-jdbc.md)

For details about developing applications that use ScalarDB Cluster with the Java API, refer to the following:

* [Developer Guide for ScalarDB Cluster with the Java API](developer-guide-for-scalardb-cluster-with-java-api.md)

For details about the ScalarDB Cluster gRPC API, refer to the following:

* [ScalarDB Cluster gRPC API Guide](scalardb-cluster-grpc-api-guide.md)
* [ScalarDB Cluster SQL gRPC API Guide](scalardb-cluster-sql-grpc-api-guide.md)
