# ScalarDB SQL Configurations

This document explains the configurations of ScalarDB SQL.

## Client side configurations

The ScalarDB SQL client-side library offers two connection modes: *Direct* and *Server*.
With Direct mode, the library directly uses the ScalarDB API.
On the other hand, with Server mode, the library uses the ScalarDB API indirectly through [ScalarDB SQL Server](sql-server.mdx).

ScalarDB SQL has Direct mode–specific configurations and Server mode–specific configurations.
The following sections explain the common configurations for the two connection modes, the Direct mode–specific configurations, and the Server mode–specific configurations.

### Common configurations

The common configurations for the connection modes (Direct mode and Server mode) are as follows:

| Name                                     | Description                                                                                              | Default       |
|------------------------------------------|----------------------------------------------------------------------------------------------------------|---------------|
| `scalar.db.sql.connection_mode`          | Connection mode. `DIRECT` or `SERVER` can be set.                                                        |               |
| `scalar.db.sql.default_transaction_mode` | Default transaction mode. `TRANSACTION` or `TWO_PHASE_COMMIT_TRANSACTION` can be set.                    | `TRANSACTION` |
| `scalar.db.sql.default_namespace_name`   | Default namespace name. If you don't specify a namespace name in your SQL statement, this value is used. |               |

If you don't specify the connection mode and if you have only one dependency on the connection mode, the connection mode will be used.

### Configurations for Direct mode

The configurations for Direct mode are as follows:

| Name                                    | Description                          | Default |
|-----------------------------------------|--------------------------------------|---------|
| `scalar.db.sql.statement_cache.enabled` | Enable the statement cache.          | `false` |
| `scalar.db.sql.statement_cache.size`    | Maximum number of cached statements. | `100`   |

Note that in Direct mode, you need to configure the transaction manager, as well.
For details about configurations for the transaction manager, see [Transaction manager configurations](https://github.com/scalar-labs/scalardb/blob/master/docs/configurations.mdx#transaction-manager-configurations).

In addition, for details about ScalarDB SQL Server, see [ScalarDB SQL Server](sql-server.mdx).

### Configurations for Server mode

The configurations for Server mode are as follows:

| Name                                                  | Description                                            | Default                |
|-------------------------------------------------------|--------------------------------------------------------|------------------------|
| `scalar.db.sql.server_mode.host`                      | Host name for ScalarDB SQL Server to connect to.       | `false`                |
| `scalar.db.sql.server_mode.port`                      | Port number for ScalarDB SQL Server.                   | `60052`                |
| `scalar.db.sql.server_mode.deadline_duration_millis`  | Deadline duration (milliseconds) for gRPC connections. | `60000` (60 seconds)   |
| `scalar.db.sql.server_mode.max_inbound_message_size`  | Maximum message size allowed for a single gRPC frame.  | The gRPC default value |
| `scalar.db.sql.server_mode.max_inbound_metadata_size` | Maximum size of metadata allowed to be received.       | The gRPC default value |

##  ScalarDB SQL Server Configurations

ScalarDB SQL Server is a gRPC server that implements the ScalarDB SQL interface.
This section explains the ScalarDB SQL Server configurations.

In addition to the configurations described in [Transaction manager configurations](https://github.com/scalar-labs/scalardb/blob/master/docs/configurations.mdx#transaction-manager-configurations) and [Other configurations](https://github.com/scalar-labs/scalardb/blob/master/docs/configurations.mdx#other-configurations), the following configurations are available for ScalarDB SQL Server:

| Name                                             | Description                                      | Default                |
|--------------------------------------------------|--------------------------------------------------|------------------------|
| `scalar.db.sql.server.port`                      | Port number for the gRPC server.                 | `60052`                |
| `scalar.db.sql.server.prometheus_exporter_port`  | Port number for the Prometheus exporter.         | `8080`                 |
| `scalar.db.sql.server.max_inbound_message_size`  | Maximum message size allowed to be received.     | The gRPC default value |
| `scalar.db.sql.server.max_inbound_metadata_size` | Maximum size of metadata allowed to be received. | The gRPC default value |

For details about ScalarDB SQL Server, see [ScalarDB SQL Server](sql-server.mdx). 

## Configuration examples

This section shows several configuration examples.

### Example 1

```
[App (ScalarDB SQL Library (Direct mode))] ---> [Underlying storage/database]
```

In this configuration, the app (ScalarDB SQL Library) connects to the underlying storage/database (in this case, Cassandra) directly.
Note that this configuration exists only for development purposes and is not recommended for production use.
This is because the app needs to implement the [scalar-admin](https://github.com/scalar-labs/scalar-admin) interface to take transactionally consistent backups for ScalarDB, which requires an extra burden for users.

In this case, an example of configurations in the app is as follows:

```properties
#
# ScalarDB SQL client configurations (Direct mode)
#

# Connection mode.
scalar.db.sql.connection_mode=DIRECT

# Enable the statement cache.
scalar.db.sql.statement_cache.enabled=true

# Maximum number of cached statements.
scalar.db.sql.statement_cache.size=300

#
# Transaction manager configurations
#

# Transaction manager implementation.
scalar.db.transaction_manager=consensus-commit

# Storage implementation.
scalar.db.storage=cassandra

# Comma-separated contact points.
scalar.db.contact_points=<CASSANDRA_HOST>

# Credential information to access the database.
scalar.db.username=<USERNAME>
scalar.db.password=<PASSWORD>
```

### Example 2

```
[App (ScalarDB SQL Library (Server mode))] ---> [ScalarDB SQL Server] ---> [Underlying storage/database]
```

In this configuration, the app (ScalarDB SQL Library) connects to an underlying storage/database through ScalarDB SQL Server.
This configuration is recommended for production use because ScalarDB SQL Server implements the [scalar-admin](https://github.com/scalar-labs/scalar-admin) interface, which enables you to take transactionally consistent backups for ScalarDB by pausing ScalarDB SQL Server.

In this case, an example of configurations for the app is as follows:

```properties
#
# ScalarDB SQL client configurations (Server mode)
#

# Connection mode.
scalar.db.sql.connection_mode=SERVER

# Host name for ScalarDB SQL Server.
scalar.db.sql.server_mode.host=<SCALARDB_SQL_SERVER_HOST>

# Port number for ScalarDB SQL Server.
scalar.db.sql.server_mode.port=<SCALARDB_SQL_SERVER_PORT>
```

And an example of configurations for ScalarDB SQL Server is as follows:

```properties
#
# ScalarDB SQL Server configurations
#

# Enable the statement cache.
scalar.db.sql.statement_cache.enabled=true

# Maximum number of cached statements.
scalar.db.sql.statement_cache.size=300

#
# Transaction manager configurations
#

# Transaction manager implementation.
scalar.db.transaction_manager=consensus-commit

# Storage implementation.
scalar.db.storage=cassandra

# Comma-separated contact points.
scalar.db.contact_points=<CASSANDRA_HOST>

# Credential information to access the database.
scalar.db.username=<USERNAME>
scalar.db.password=<PASSWORD>
```
