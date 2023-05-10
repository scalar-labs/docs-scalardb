# Scalar DB SQL Server

Scalar DB SQL Server is a gRPC server that implements Scalar DB SQL interface.
With Scalar DB SQL Server, you can use Scalar DB SQL features from multiple programming languages that are supported by gRPC.

Currently, we provide only a Java client officially, and we will support other language clients officially in the future.
Of course, you can generate language-specific client stubs by yourself.
However, note that it is not necessarily straightforward to implement a client since it's using a bidirectional streaming RPC in gRPC, and you need to be familiar with it.

This document explains how to install and use Scalar DB SQL Server.

## Install prerequisites

Scalar DB SQL Server is written in Java. So the following software is required to run it.

* [Oracle JDK 8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) (OpenJDK 8) or higher

## Install Scalar DB SQL Server

We have Docker images in [our repository](https://github.com/orgs/scalar-labs/packages/container/package/scalardb-sql-server) and zip archives of Scalar DB SQL Server available in [releases](https://github.com/scalar-labs/scalardb-sql/releases).

If you are interested in building from source, run the following command:

```shell
$ ./gradlew installDist
```

Of course, you can archive the jar and libraries by `./gradlew distZip` and so on.

## Configure Scalar DB SQL Server

You need a property file holding the configuration for Scalar DB SQL Server.
It contains two sections, Scalar DB SQL Server configurations and underlying storage/database configurations.

```properties
#
# For Scalar DB SQL Server
#

# Default transaction mode. "TRANSACTION" or "TWO_PHASE_COMMIT_TRANSACTION" can be set. "TRANSACTION" mode is used by default.
scalar.db.sql.default_transaction_mode=TRANSACTION

# Enable the statement cache. Default is false.
scalar.db.sql.statement_cache.enabled=false

# The maximum number of cached statement. Default is 100.
scalar.db.sql.statement_cache.size=100

# Port number for grpc server. Default port number is 60052.
scalar.db.sql.server.port=60052

#
# For underlying storage/database configurations
#

# Comma separated contact points. For DynamoDB, the region is specified by this parameter.
scalar.db.contact_points=localhost

# Port number for all the contact points. Default port number for each database is used if empty.
#scalar.db.contact_port=

# Credential information to access the database. For Cosmos DB, username isn't used. For DynamoDB, AWS_ACCESS_KEY_ID is specified by the username and AWS_ACCESS_SECRET_KEY is specified by the password.
scalar.db.username=cassandra
scalar.db.password=cassandra

# Storage implementation. "cassandra" or "cosmos" or "dynamo" or "jdbc" or "grpc" can be set. Default storage is "cassandra".
scalar.db.storage=cassandra

# The type of the transaction manager. "consensus-commit" or "jdbc" or "grpc" can be set. The default is "consensus-commit".
scalar.db.transaction_manager=consensus-commit

# Isolation level used for ConsensusCommit. Either SNAPSHOT or SERIALIZABLE can be specified. SNAPSHOT is used by default.
scalar.db.consensus_commit.isolation_level=SNAPSHOT

# Serializable strategy used for ConsensusCommit transaction manager.
# Either EXTRA_READ or EXTRA_WRITE can be specified. EXTRA_READ is used by default.
# If SNAPSHOT is specified in the property "scalar.db.consensus_commit.isolation_level", this is ignored.
scalar.db.consensus_commit.serializable_strategy=
```

## Start Scalar DB SQL Server

### Docker images

For Docker images, you need to pull the Scalar DB SQL Server image first:
```shell
$ docker pull ghcr.io/scalar-labs/scalardb-sql-server:<version>
```

And then, you can start Scalar DB SQL Server with the following command:
```shell
$ docker run -v <your local property file path>:/scalardb-sql/server/scalardb-sql-server.properties.tmpl -d -p 60052:60052 -p 8080:8080 ghcr.io/scalar-labs/scalardb-sql-server:<version>
```

You can also start it with DEBUG logging as follows:
```shell
$ docker run -v <your local property file path>:/scalardb-sql/server/scalardb-sql-server.properties.tmpl -e SCALAR_DB_LOG_LEVEL=DEBUG -d -p 60052:60052 -p 8080:8080 ghcr.io/scalar-labs/scalardb-sql-server:<version>
````

You can also start it with your custom log configuration as follows:
```shell
$ docker run -v <your local property file path>:/scalardb-sql/server/scalardb-sql-server.properties.tmpl -v <your custom log4j2 configuration file path>:/scalardb-sql/server/log4j2.properties.tmpl -d -p 60052:60052 -p 8080:8080 ghcr.io/scalar-labs/scalardb-sql-server:<version>
```

You can also start it with environment variables as follows:
```shell
$ docker run --env SCALAR_DB_CONTACT_POINTS=cassandra --env SCALAR_DB_CONTACT_PORT=9042 --env SCALAR_DB_USERNAME=cassandra --env SCALAR_DB_PASSWORD=cassandra --env SCALAR_DB_STORAGE=cassandra -d -p 60052:60052 -p 8080:8080 ghcr.io/scalar-labs/scalardb-sql-server:<version>
```

You can also start it with JMX as follows:
```shell
$ docker run -v <your local property file path>:/scalardb-sql/server/scalardb-sql-server.properties.tmpl -e JAVA_OPTS="-Djava.rmi.server.hostname=<your container hostname or IP address> -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote=true -Dcom.sun.management.jmxremote.local.only=false -Dcom.sun.management.jmxremote.port=9990 -Dcom.sun.management.jmxremote.rmi.port=9990 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false" -d -p 60052:60052 -p 8080:8080 -p 9990:9990 ghcr.io/scalar-labs/scalardb-sql-server:<version>
```

### Zip archives

For zip archives, you can start Scalar DB server with the following commands:

```shell
$ unzip scalardb-sql-server-<version>.zip
$ cd scalardb-sql-server-<version>
$ export JAVA_OPTS="<your JVM options>"
$ bin/scalardb-sql-server --config <your property file path>
```

## Usage of the Java client of Scalar DB SQL Server

You can use the Java client of Scalar DB SQL Server in almost the same way as the `DIRECT` connection mode (that uses Scalar DB API directly).
When you connect to Scalar DB SQL Server, you need to specify the `SERVER` connection mode.
The configurations for the `SERVER` connection mode are as follows:

```properties
# Connection mode. "DIRECT" or "SERVER" can be set. "DIRECT" mode is used by default.
# When you connect to Scalar DB SQL Server, specify the "SERVER" mode.
scalar.db.sql.connection_mode=SERVER

# Host name of Scalar DB SQL Server.
scalar.db.sql.server_mode.host=<hostname of Scalar DB SQL Server>

# Port number of Scalar DB SQL Server. 60052 by default.
scalar.db.sql.server_mode.port=60052

# Default transaction mode. "TRANSACTION" or "TWO_PHASE_COMMIT_TRANSACTION" can be set. "TRANSACTION" mode is used by default.
scalar.db.sql.default_transaction_mode=TRANSACTION
```

## References

* [Getting Started with Scalar DB SQL](getting-started-with-sql.md)
* [Getting Started with Scalar DB JDBC](getting-started-with-jdbc.md)
* [Getting Started with Scalar DB](https://github.com/scalar-labs/scalardb/blob/master/docs/getting-started.md)
* [Scalar DB SQL Configurations](configurations.md)
