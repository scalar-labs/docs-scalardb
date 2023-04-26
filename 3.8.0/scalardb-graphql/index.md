# ScalarDB GraphQL Server

ScalarDB GraphQL Server is an interface layer that allows client applications to communicate with [ScalarDB](https://github.com/scalar-labs/scalardb) with GraphQL.

## Build & Install

To build and install the ScalarDB GraphQL Server, use `gradle installDist`, which will build the source files and install an executable and required jars:

```console
./gradlew installDist
```

## Run

In addition to the properties in the [ScalarDB database.properties](https://github.com/scalar-labs/scalardb/blob/master/conf/database.properties) file, the GraphQL server reads the following:

* `scalar.db.graphql.port` ... Port number for GraphQL server. The default is `8080`.
* `scalar.db.graphql.path` ... Path component of the URL of the GraphQL endpoint. The default is `/graphql`.
* `scalar.db.graphql.namespaces` ... Comma-separated list of namespaces of tables for which the GraphQL server generates a schema. Note that at least one namespace is required.
* `scalar.db.graphql.graphiql` ... Whether the GraphQL server serves [GraphiQL](https://github.com/graphql/graphiql) IDE. The default is `true`.

To start the ScalarDB GraphQL Server, run the following commands:

```console
cd build/install/graphql
export JAVA_OPTS="<your JVM options>"
bin/scalardb-graphql-server --config <ScalarDB properties file path>
```

## Docker

### Build

This builds the ScalarDB GraphQL Server Docker image:

```console
./gradlew docker
```

### Run

This runs the ScalarDB GraphQL Server (you need to specify your local configuration file path with `-v` flag):

```console
docker run -d -p 8080:8080 \
  -v <ScalarDB properties file path>:/scalardb-graphql/database.properties.tmpl \
  ghcr.io/scalar-labs/scalardb-graphql:<version>

# For DEBUG logging
docker run -d -p 8080:8080 \
  -v <ScalarDB properties file path>:/scalardb-graphql/database.properties.tmpl \
  -e SCALAR_DB_GRAPHQL_LOG_LEVEL=DEBUG \
  ghcr.io/scalar-labs/scalardb-graphql:<version>
```

You can also pass the database settings via environment variables:

```console
docker run -d -p 8080:8080 \
  -e SCALAR_DB_CONTACT_POINTS=cassandra \
  -e SCALAR_DB_CONTACT_PORT=9042 \
  -e SCALAR_DB_USERNAME=cassandra \
  -e SCALAR_DB_PASSWORD=cassandra \
  -e SCALAR_DB_STORAGE=cassandra \
  -e SCALAR_DB_TRANSACTION_MANAGER=consensus-commit \
  -e SCALAR_DB_GRAPHQL_PATH=/graphql \
  -e SCALAR_DB_GRAPHQL_NAMESPACES=namespace1,namespace2 \
  -e SCALAR_DB_GRAPHQL_GRAPHIQL=true \
  -e SCALAR_DB_GRAPHQL_LOG_LEVEL=INFO \
  ghcr.io/scalar-labs/scalardb-graphql:<version>
```

## Docs

* [Getting Started with ScalarDB GraphQL](getting-started-with-scalardb-graphql.md)
* [ScalarDB GraphQL Sample](https://github.com/scalar-labs/scalardb-samples/tree/main/scalardb-graphql-sample)
* [Deployment Guide on AWS](aws-deployment-guide.md)
