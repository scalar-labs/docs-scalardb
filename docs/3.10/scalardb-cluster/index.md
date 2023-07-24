# ScalarDB Cluster

ScalarDB Cluster is a clustering solution for [ScalarDB](https://github.com/scalar-labs/scalardb) that consists of a set of cluster nodes, each of which provides ScalarDB functionality.
Importantly, each cluster node is equipped with a routing mechanism that allows it to route transaction requests to the appropriate cluster node within the cluster.

## Why ScalarDB Cluster?

When executing a transaction that spans multiple client requests, such as in microservice transactions, all requests for the transaction must be processed on the same server due to the stateful nature of transaction processing.
However, in a distributed environment, routing requests to the same server is not straightforward because a service typically runs on multiple servers (or hosts) for scalability and availability.
In this scenario, all requests within a transaction must be routed to the same server, while different transactions should be distributed to ensure load balancing.

To address this challenge, a routing mechanism such as session affinity (also known as sticky sessions) needs to be configured.
This strategy ensures that requests within a transaction are consistently routed to the same server.
Alternatively, a bidirectional streaming RPC can be used when using gRPC.
However, it is important to note that implementing these configurations typically requires significant time and effort.
In addition, specific configuration adjustments may be required depending on the load balancer product you are using.

For more details on this topic, see [Request Routing in Two-phase Commit Transactions](https://github.com/scalar-labs/scalardb/blob/master/docs/two-phase-commit-transactions.md#request-routing-in-two-phase-commit-transactions).

ScalarDB Cluster addresses this issue by providing a routing mechanism capable of directing requests to the appropriate cluster node within the cluster.
Thus, when any cluster node receives a request, the node can route that request to the correct cluster node in the cluster.

## Architecture

ScalarDB Cluster consists of a set of cluster nodes, each equipped with ScalarDB functionality.
This allows each cluster node to execute transactions independently.
In addition, each cluster node contains a routing mechanism.
So, if a cluster node receives a request but isn't the appropriate cluster node to process the request, it can route the request to the correct cluster node within the cluster.

Currently, ScalarDB Cluster only supports running on Kubernetes.

Membership management plays a critical role in ScalarDB Cluster.
When a cluster node either joins or leaves the cluster, the configuration of the cluster is automatically adjusted to reflect this change.
ScalarDB Cluster currently retrieves membership information by using the Kubernetes API.

Another notable feature of ScalarDB Cluster is the distribution of transaction requests.
When a cluster node receives a request, it can determine whether it's the appropriate cluster node to process the request.
To determine the appropriate cluster node, ScalarDB Cluster uses a consistent hashing algorithm.

![ScalarDB Cluster architecture](images/scalardb-cluster-architecture.png)

## Getting started

Before you start the tutorials, you need to set up ScalarDB Cluster.
The following document explains how to set up ScalarDB Cluster on Kubernetes by using a Helm Chart.

* [Set Up ScalarDB Cluster on Kubernetes by Using a Helm Chart](setup-scalardb-cluster-on-kubernetes-by-using-helm-chart.md)

For tutorials on getting started with ScalarDB Cluster, see the following:

* [Getting Started with ScalarDB Cluster](getting-started-with-scalardb-cluster.md)
* [Getting Started with ScalarDB Cluster GraphQL](getting-started-with-scalardb-cluster-graphql.md)
* [Getting Started with ScalarDB Cluster SQL via JDBC](getting-started-with-scalardb-cluster-sql-jdbc.md)
* [Getting Started with ScalarDB Cluster SQL via Spring Data JDBC for ScalarDB](getting-started-with-scalardb-cluster-sql-spring-data-jdbc.md)

## Additional resources

For details about the ScalarDB Cluster Helm Chart, refer to the following:

* [ScalarDB Cluster Helm Chart](https://github.com/scalar-labs/helm-charts/tree/main/charts/scalardb-cluster)
* [Deploy Scalar products using Scalar Helm Charts](https://github.com/scalar-labs/helm-charts/blob/main/docs/how-to-deploy-scalar-products.md)
* [How to deploy ScalarDB Cluster](https://github.com/scalar-labs/helm-charts/blob/main/docs/how-to-deploy-scalardb-cluster.md)

For details about the configurations for ScalarDB Cluster, refer to the following:

* [ScalarDB Cluster Configurations](scalardb-cluster-configurations.md)

For details about developing applications that use ScalarDB Cluster with the Java API, refer to the following:

* [Developer Guide for ScalarDB Cluster with the Java API](developer-guide-for-scalardb-cluster-with-java-api.md)

For details about the ScalarDB Cluster gRPC API, refer to the following:

* [ScalarDB Cluster gRPC API Guide](scalardb-cluster-grpc-api-guide.md)
* [ScalarDB Cluster SQL gRPC API Guide](scalardb-cluster-sql-grpc-api-guide.md)

<!-- commented out for now since it's private
## Development

### Pre-commit hook

This project uses [pre-commit](https://pre-commit.com/) to automate code format and so on as much as possible. Please [install pre-commit](https://pre-commit.com/#installation) and the git hook script as follows.

```
$ ls -a .pre-commit-config.yaml
.pre-commit-config.yaml
$ pre-commit install
```

The code formatter is automatically executed when committing files. A commit will fail and be formatted by the formatter when any invalid code format is detected. Try to commit the change again.
-->
