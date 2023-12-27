# ScalarDB Cluster Standalone Mode

Instead of setting up a Kubernetes cluster and deploying ScalarDB Cluster on top of it by using a Helm Chart, you can run ScalarDB Cluster in standalone mode, which simplifies development and testing processes. A primary use case for this would be when you want to start ScalarDB Cluster in standalone mode via Docker on your local machine and use it for development and testing.

To run ScalarDB Cluster in standalone mode, you need to set the `scalar.db.cluster.node.standalone_mode.enabled` property to `true`:

```properties
scalar.db.cluster.node.standalone_mode.enabled=true
```

## Usage with Docker

You can start ScalarDB Cluster in standalone mode by running the following command, replacing `<YOUR_LOCAL_PROPERTIES_FILE_PATH>` with the path to the ScalarDB Cluster properties file and `<VERSION>` with the version of ScalarDB Cluster that you are using:

```console
$ docker run -v <YOUR_LOCAL_PROPERTIES_FILE_PATH>:/scalardb-cluster/node/scalardb-cluster-node.properties -d -p 60053:60053 -p 8080:8080 ghcr.io/scalar-labs/scalardb-cluster-node:<VERSION>
```

In this case, you must include the property `scalar.db.cluster.node.standalone_mode.enabled` and set it to `true` in the properties file.

You can also start ScalarDB Cluster by using environment variables as follows by setting the variable `SCALAR_DB_CLUSTER_NODE_STANDALONE_MODE_ENABLED` to `true`.

```console
$ docker run \
--env SCALAR_DB_CLUSTER_NODE_STANDALONE_MODE_ENABLED=true \
--env SCALAR_DB_STORAGE=cassandra \
--env SCALAR_DB_CONTACT_POINTS=localhost \
--env SCALAR_DB_CONTACT_PORT=9042 \
--env SCALAR_DB_USERNAME=cassandra \
--env SCALAR_DB_PASSWORD=cassandra \
--env SCALAR_DB_GRAPHQL_ENABLED=true \
--env SCALAR_DB_SQL_ENABLED=true \
-d -p 60053:60053 -p 8080:8080 ghcr.io/scalar-labs/scalardb-cluster-node:<VERSION>
```

The following environment variables are available for the Docker image:

| Name                                                              | Corresponding configuration                                       |
|-------------------------------------------------------------------|-------------------------------------------------------------------|
| `SCALAR_DB_CLUSTER_MEMBERSHIP_TYPE`                               | `scalar.db.cluster.membership.type`                               |
| `SCALAR_DB_CLUSTER_MEMBERSHIP_KUBERNETES_ENDPOINT_NAMESPACE_NAME` | `scalar.db.cluster.membership.kubernetes.endpoint.namespace_name` |
| `SCALAR_DB_CLUSTER_MEMBERSHIP_KUBERNETES_ENDPOINT_NAME`           | `scalar.db.cluster.membership.kubernetes.endpoint.name`           |
| `SCALAR_DB_CLUSTER_GRPC_DEADLINE_DURATION_MILLIS`                 | `scalar.db.cluster.grpc.deadline_duration_millis`                 |
| `SCALAR_DB_CLUSTER_NODE_STANDALONE_MODE_ENABLED`                  | `scalar.db.cluster.node.standalone_mode.enabled`                  |
| `SCALAR_DB_STORAGE`                                               | `scalar.db.storage`                                               |
| `SCALAR_DB_CONTACT_POINTS`                                        | `scalar.db.contact_points`                                        |
| `SCALAR_DB_CONTACT_PORT`                                          | `scalar.db.contact_port`                                          |
| `SCALAR_DB_USERNAME`                                              | `scalar.db.username`                                              |
| `SCALAR_DB_PASSWORD`                                              | `scalar.db.password`                                              |
| `SCALAR_DB_CROSS_PARTITION_SCAN_ENABLED`                          | `scalar.db.cross_partition_scan.enabled`                          |
| `SCALAR_DB_CROSS_PARTITION_SCAN_FILTERING_ENABLED`                | `scalar.db.cross_partition_scan.filtering.enabled`                |
| `SCALAR_DB_CROSS_PARTITION_SCAN_ORDERING_ENABLED`                 | `scalar.db.cross_partition_scan.ordering.enabled`                 |
| `SCALAR_DB_CONSENSUS_COMMIT_ISOLATION_LEVEL`                      | `scalar.db.consensus_commit.isolation_level`                      |
| `SCALAR_DB_CONSENSUS_COMMIT_SERIALIZABLE_STRATEGY`                | `scalar.db.consensus_commit.serializable_strategy`                |
| `SCALAR_DB_CONSENSUS_COMMIT_PARALLEL_EXECUTOR_COUNT`              | `scalar.db.consensus_commit.parallel_executor_count`              |
| `SCALAR_DB_CONSENSUS_COMMIT_PARALLEL_PREPARATION_ENABLED`         | `scalar.db.consensus_commit.parallel_preparation.enabled`         |
| `SCALAR_DB_CONSENSUS_COMMIT_PARALLEL_COMMIT_ENABLED`              | `scalar.db.consensus_commit.parallel_commit.enabled`              |
| `SCALAR_DB_CONSENSUS_COMMIT_ASYNC_COMMIT_ENABLED`                 | `scalar.db.consensus_commit.async_commit.enabled`                 |
| `SCALAR_DB_GRAPHQL_ENABLED`                                       | `scalar.db.graphql.enabled`                                       |
| `SCALAR_DB_GRAPHQL_PORT`                                          | `scalar.db.graphql.port`                                          |
| `SCALAR_DB_GRAPHQL_PATH`                                          | `scalar.db.graphql.path`                                          |
| `SCALAR_DB_GRAPHQL_NAMESPACES`                                    | `scalar.db.graphql.namespaces`                                    |
| `SCALAR_DB_GRAPHQL_GRAPHIQL`                                      | `scalar.db.graphql.graphiql`                                      |
| `SCALAR_DB_GRAPHQL_SCHEMA_CHECKING_INTERVAL_MILLIS`               | `scalar.db.graphql.schema_checking_interval_millis`               |
| `SCALAR_DB_SQL_ENABLED`                                           | `scalar.db.sql.enabled`                                           |
| `SCALAR_DB_SQL_STATEMENT_CACHE_ENABLED`                           | `scalar.db.sql.statement_cache.enabled`                           |
| `SCALAR_DB_SQL_STATEMENT_CACHE_SIZE`                              | `scalar.db.sql.statement_cache.size`                              |
| `SCALAR_DB_CLUSTER_AUTH_ENABLED`                                  | `scalar.db.cluster.auth.enabled`                                  |
| `SCALAR_DB_CLUSTER_AUTH_CACHE_EXPIRATION_TIME_MILLIS`             | `scalar.db.cluster.auth.cache_expiration_time_millis`             |
| `SCALAR_DB_CLUSTER_AUTH_AUTH_TOKEN_EXPIRATION_TIME_MINUTES`       | `scalar.db.cluster.auth.auth_token_expiration_time_minutes`       |
| `SCALAR_DB_CLUSTER_AUTH_AUTH_TOKEN_GC_THREAD_INTERVAL_MINUTES`    | `scalar.db.cluster.auth.auth_token_gc_thread_interval_minutes`    |

If you want to specify configurations other than the ones mentioned in the table above, set up your custom properties file by using the configurations described in [ScalarDB Cluster Configurations](scalardb-cluster-configurations.md).

## Usage with Docker Compose

You can start ScalarDB Cluster in standalone mode on Docker Compose by using the `docs/standalone-mode/docker-compose.yaml` file. This file includes PostgreSQL as the backend database for ScalarDB Cluster.

To start ScalarDB Cluster in standalone mode on Docker Compose, first go to the folder that contains the `docker-compose.yaml` file by running the following command:

```console
cd docs/standalone-mode/
```

Then, start Docker Compose by running the following command:

{% capture notice--info %}
**Note**

To change the configuration of ScalarDB Cluster, update the `docs/standalone-mode/scalardb-cluster-node.properties` file before running the command below.
{% endcapture %}

<div class="notice--info">{{ notice--info | markdownify }}</div>

```console
docker compose up -d
```

## Client configurations for the ScalarDB Cluster Java API

You can use the `indirect` client mode to connect to ScalarDB Cluster in standalone mode. For details about client configurations for the ScalarDB Cluster Java API, see [Developer Guide for ScalarDB Cluster with the Java API](developer-guide-for-scalardb-cluster-with-java-api.md).
