# ScalarDB Cluster

ScalarDB Cluster is a distributed transaction state manager for ScalarDB.
It consists of multiple cluster nodes that have ScalarDB capabilities and a routing mechanism.

## Docker images

The docker images are available on [our repository](https://github.com/orgs/scalar-labs/packages/container/package/scalardb-cluster-node).
Since they are available under a commercial license, you need to get the license and permission to access them.
For more details, please [contact us](https://scalar-labs.com/contact_us/).

### How to run ScalarDB Cluster on Kubernetes

This explains how to run ScalarDB Cluster on Kubernetes with an example.
This example uses MySQL as an underlying database.

#### Supported Kubernetes versions
* 1.25.x, 1.24.x, 1.23.x, 1.22.x, 1.21.x

#### Create a Kubernetes configuration file

You can create a Kubernetes configuration file (scalardb-cluster.yaml) as follows:
```yaml
#
# Service Account configurations. We need this because cluster nodes need to access the kubernetes endpoint API for membership
#

apiVersion: v1
kind: ServiceAccount
metadata:
  name: scalardb-cluster

---

apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: role-ep-read
  namespace: default
rules:
  - apiGroups: [""]
    resources: ["endpoints"]
    verbs: ["get", "watch", "list"]

---

apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: scalardb-cluster-rolebinding
  namespace: default
subjects:
  - kind: ServiceAccount
    name: scalardb-cluster
roleRef:
  kind: Role
  name: role-ep-read
  apiGroup: rbac.authorization.k8s.io

---

#
# For ScalarDB Cluster
#

apiVersion: apps/v1
kind: Deployment
metadata:
  name: scalardb-cluster-node
  labels:
    app: scalardb-cluster-node
spec:
  replicas: 3
  selector:
    matchLabels:
      app: scalardb-cluster-node
  template:
    metadata:
      labels:
        app: scalardb-cluster-node
    spec:
      containers:
        - name: scalardb-cluster-node
          image: ghcr.io/scalar-labs/scalardb-cluster-node:3.8.0
          env:
            - name: SCALAR_DB_STORAGE
              value: "jdbc"
            - name: SCALAR_DB_CONTACT_POINTS
              value: "jdbc:mysql://<mysql host>:3306/"
            - name: SCALAR_DB_USERNAME
              value: "<mysql user>"
            - name: SCALAR_DB_PASSWORD
              value: "<mysql password>"
            - name: SCALAR_DB_CLUSTER_MEMBERSHIP_KUBERNETES_ENDPOINT_NAMESPACE_NAME
              value: "default"
            - name: SCALAR_DB_CLUSTER_MEMBERSHIP_KUBERNETES_ENDPOINT_NAME
              value: "scalardb-cluster"
          livenessProbe:
            exec:
              command:
                - /usr/local/bin/grpc_health_probe
                - -addr=:60053
            failureThreshold: 3
            initialDelaySeconds: 10
            periodSeconds: 10
            successThreshold: 1
            timeoutSeconds: 1
          readinessProbe:
            exec:
              command:
                - /usr/local/bin/grpc_health_probe
                - -addr=:60053
            failureThreshold: 3
            initialDelaySeconds: 10
            periodSeconds: 10
            successThreshold: 1
            timeoutSeconds: 1
      serviceAccountName: scalardb-cluster
      terminationGracePeriodSeconds: 90

---

apiVersion: v1
kind: Service
metadata:
  name: scalardb-cluster
spec:
  selector:
    app: scalardb-cluster-node
  type: LoadBalancer
  ports:
    - protocol: TCP
      port: 60053
      targetPort: 60053

---

apiVersion: v1
kind: Service
metadata:
  name: scalardb-cluster-metrics
spec:
  selector:
    app: scalardb-cluster-node
  ports:
    - protocol: TCP
      port: 9080
      targetPort: 9080

---

apiVersion: v1
kind: Service
metadata:
  name: scalardb-cluster-graphql
spec:
  selector:
    app: scalardb-cluster-node
  type: LoadBalancer
  ports:
    - protocol: TCP
      port: 8080
      targetPort: 8080
```

### Run ScalarDB Cluster

You can run ScalarDB Cluster with the following command:
```shell
kubectl apply -f scalardb-cluster.yaml
```

## Client

The client libraries are available on [Packages in this repository](https://github.com/orgs/scalar-labs/packages?repo_name=scalardb-cluster).
Since they are available under a commercial license, you need to get the license and permission to access them.
For more details, please [contact us](https://scalar-labs.com/contact_us/).

Before you add the dependency, you need to add the Maven repository using your build tool such as Gradle and Maven.

To add the Maven repository using Gradle, add the following repository to your `build.gradle`:
```gradle
repositories {
    maven {
        url = uri("https://maven.pkg.github.com/scalar-labs/scalardb-cluster")
        credentials {
            username = project.findProperty("gpr.user") ?: System.getenv("USERNAME")
            password = project.findProperty("gpr.key") ?: System.getenv("TOKEN")
        }
    }
}
```

In this case, you need the `gpr.user` property for your GitHub username and the `gpr.key` property for your personal access token.
So you need to have the properties in `~/.gradle/gradle.properties`, or specify the properties with the `-P` option when running the `./gradlew` command as follows:

```shell
$ ./gradlew build -Pgpr.user=<your GitHub username> -Pgpr.key=<your personal access token>
```

Or you can also use environment variables, `USERNAME` for your GitHub username and `TOKEN` for your personal access token.

```shell
$ export USERNAME=<your GitHub username>
$ export TOKEN=<your personal access token>
```

To add the Maven repository using Maven, edit your `~/.m2/settings.xml` file as follows:
```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                      http://maven.apache.org/xsd/settings-1.0.0.xsd">

  <activeProfiles>
    <activeProfile>github</activeProfile>
  </activeProfiles>

  <profiles>
    <profile>
      <id>github</id>
      <repositories>
        <repository>
          <id>central</id>
          <url>https://repo1.maven.org/maven2</url>
        </repository>
        <repository>
          <id>github</id>
          <url>https://maven.pkg.github.com/scalar-labs/scalardb-cluster</url>
          <snapshots>
            <enabled>true</enabled>
          </snapshots>
        </repository>
      </repositories>
    </profile>
  </profiles>

  <servers>
    <server>
      <id>github</id>
      <username>USERNAME</username>
      <password>TOKEN</password>
    </server>
  </servers>
</settings>
```

In the `servers` tag, add a child `server` tag with an `id`, replacing *USERNAME* with your GitHub username, and *TOKEN* with your personal access token.

Please see also the following documents for more details:
- [Working with the Gradle registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-gradle-registry)
- [Working with the Apache Maven registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-apache-maven-registry)

And then, you can install the library in your application using your build tool such as Gradle and Maven.

To add a dependency on ScalarDB Cluster Client using Gradle, use the following:
```gradle
dependencies {
    implementation 'com.scalar-labs:scalardb-cluster-client:3.8.0'
}
```

To add a dependency using Maven:
```xml
<dependency>
  <groupId>com.scalar-labs</groupId>
  <artifactId>scalardb-cluster-client</artifactId>
  <version>3.8.0</version>
</dependency>
```

### Load schema

To load a schema via ScalarDB Cluster, you need to use the dedicated Schema Loader for ScalarDB Cluster (Schema Loader for Cluster).

The usage of Schema Loader for Cluster is basically the same as [Schema Loader](https://github.com/scalar-labs/scalardb/blob/master/docs/schema-loader.md) except for the name of the jar file.
For example, you can run Schema Loader for Cluster with the following command:

```shell
java -jar scalardb-cluster-schema-loader-<version>-all.jar --config <PATH_TO_CONFIG_FILE> -f <PATH_TO_SCHEMA_FILE> --coordinator
```

The release versions of Schema Loader for Cluster can be downloaded from [the releases page](https://github.com/scalar-labs/scalardb-cluster/releases).

See [this](https://github.com/scalar-labs/scalardb/blob/master/docs/schema-loader.md) for the details.

## Configurations

### Common

The common configurations are as follows. These configurations are needed on the Cluster Node side and the Client side:

| name                                             | description                                               | default                |
|--------------------------------------------------|-----------------------------------------------------------|------------------------|
| scalar.db.cluster.grpc.deadline_duration_millis  | The deadline duration for gRPC in millis.                 | 60000                  |
| scalar.db.cluster.grpc.max_inbound_message_size  | The maximum message size allowed for a single gRPC frame. | the gRPC default value |
| scalar.db.cluster.grpc.max_inbound_metadata_size | The maximum size of metadata allowed to be received.      | the gRPC default value |

### Cluster Node

The configurations for Cluster Node are as follows:

| name                                                            | description                                                                                                      | default                |
|-----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|------------------------|
| scalar.db.cluster.membership.type                               | The membership type. Currently, only `KUBERNETES` can be specified.                                              | KUBERNETES             |
| scalar.db.cluster.membership.kubernetes.endpoint.namespace_name | This configuration is for the `KUBERNETES` membership type. The namespace name for the endpoint.                 | default                |
| scalar.db.cluster.membership.kubernetes.endpoint.name           | This configuration is for the `KUBERNETES` membership type. The name of the endpoint to get the membership info. |                        |
| scalar.db.cluster.node.decommissioning_duration_secs            | The decommissioning duration in seconds.                                                                         | 30                     |
| scalar.db.cluster.node.grpc.max_inbound_message_size            | The maximum message size allowed to be received.                                                                 | the gRPC default value |
| scalar.db.cluster.node.grpc.max_inbound_metadata_size           | The maximum size of metadata allowed to be received.                                                             | the gRPC default value |
| scalar.db.cluster.node.prometheus_exporter_port                 | The port number for prometheus exporter.                                                                         | 9080                   |

#### For GraphQL

The configurations for GraphQL are as follows:

| name                                              | description                                                                                                                                 | default  |
|---------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|----------|
| scalar.db.graphql.enabled                         | Whether GraphQL is enabled.                                                                                                                 | false    |
| scalar.db.graphql.port                            | Port number for GraphQL server.                                                                                                             | 8080     |
| scalar.db.graphql.path                            | Path component of the URL of the GraphQL endpoint.                                                                                          | /graphql |
| scalar.db.graphql.namespaces                      | Comma-separated list of namespaces of tables for which the GraphQL server generates a schema. Note that at least one namespace is required. |          |
| scalar.db.graphql.graphiql                        | Whether the GraphQL server serves [GraphiQL](https://github.com/graphql/graphiql) IDE.                                                      | true     |
| scalar.db.graphql.schema_checking_interval_millis | The interval at which GraphQL server will rebuild the GraphQL schema if any change is detected in the ScalarDB schema.                      | 30000    |

### Client

The configurations for Client are as follows:

| name                          | description                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | default |
|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| scalar.db.transaction_manager | Specify `cluster`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | -       |
| scalar.db.contact_points      | The contact point of the cluster. If you use the `indirect` client mode, specify the IP address of the load balancer in front of your cluster nodes using the format `indirect:<the load balancer IP address>`. If you use the `direct-kubernetes` client mode, specify the namespace name (optional) and the name of the endpoint to get the membership information using the format `direct-kubernetes:<namespace name>/<endpoint name>` or just `direct-kubernetes:<endpoint name>`.  |         |

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