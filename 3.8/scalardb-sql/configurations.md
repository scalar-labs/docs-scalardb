# ScalarDB SQL Configurations

This document explains the configurations of ScalarDB SQL.

ScalarDB SQL offers two connection modes: *Direct* and *Server* modes.
With Direct mode, ScalarDB SQL client-side library directly uses ScalarDB API.
On the other hand, with Server mode, ScalarDB SQL client-side library uses ScalarDB API indirectly through ScalarDB SQL Server.

There are Direct mode specific configurations and Server mode specific configurations.
So we first explain the common configurations, then the Direct mode specific configurations, and the Server mode specific configurations.
And lastly, we explain the ScalarDB SQL Server configurations.

## Common configurations

The common configurations are as follows:

| name | description | default |
| ---- | ----------- | ------- |
| scalar.db.sql.default_transaction_mode | Default transaction mode. `TRANSACTION` or `TWO_PHASE_COMMIT_TRANSACTION` can be set. | TRANSACTION |
| scalar.db.sql.connection_mode | Connection mode. `DIRECT` or `SERVER` can be set. | DIRECT |

## Configurations for Direct mode

The configurations for Direct mode are as follows:

| name | description | default |
| ---- | ----------- | ------- |
| scalar.db.sql.statement_cache.enabled | Enable the statement cache. | false |
| scalar.db.sql.statement_cache.size | The maximum number of cached statement. | 100 |

Note that in the Direct mode, you need to configure underlining storage/database, as well.
Please see [Getting Started with ScalarDB](https://github.com/scalar-labs/scalardb/blob/master/docs/getting-started.md) for the details of the underlining storage/database configurations.

Please see also [ScalarDB SQL Server](sql-server.md) for the details of ScalarDB SQL Server.

## Configurations for Server mode

The configurations for Server mode are as follows:

| name | description | default |
| ---- | ----------- | ------- |
| scalar.db.sql.server_mode.host | Host name for ScalarDB SQL Server to connect. | false |
| scalar.db.sql.server_mode.port | Port number for ScalarDB SQL Server. | 60052 |
| scalar.db.sql.server_mode.deadline_duration_millis | a deadline duration (milliseconds) for gRPC connection. | 60000 |

## Configurations for ScalarDB SQL Server

The configurations for ScalarDB SQL Server are as follows:

| name | description | default |
| ---- | ----------- | ------- |
| scalar.db.sql.server.port | Port number for grpc server. | 60052 |
| scalar.db.sql.server.prometheus_exporter_port | Port number for Prometheus exporter. | 8080 |

Please see also [ScalarDB SQL Server](sql-server.md) for the details of ScalarDB SQL Server. 

## Configuration examples

### Example 1

```
[App (ScalarDB SQL Library)] ---> [underlying storage/database]
```

In this setting, App (ScalarDB SQL Library) connects to the underlying storage/database (in this case Cassandra) directly.
Note that this setting exists only for development purposes and is not recommended for production use.
This is because the App needs to implement [scalar-admin](https://github.com/scalar-labs/scalar-admin) interface to take transactionally-consistent backups for ScalarDB, which requires an extra burden for users.

In this case, an example of configurations in App are as follows:
```properties
#
# For underlying storage/database configurations
#

# Comma separated contact points
scalar.db.contact_points=<cassandra host>

# Credential information to access the database
scalar.db.username=<username>
scalar.db.password=<password>

# Storage implementation
scalar.db.storage=cassandra

#
# For ScalarDB SQL
#

# Enable the statement cache
scalar.db.sql.statement_cache.enabled=true

# The maximum number of cached statement
scalar.db.sql.statement_cache.size=300
```

### Example 2

```
[App (ScalarDB SQL Library)] ---> [ScalarDB SQL Server] ---> [ScalarDB Server] ---> [underlying storage/database]
```

In this setting, App (ScalarDB SQL Library) connects to an underlying storage/database through ScalarDB SQL Server and ScalarDB Server.
This setting is recommended for production use.
This is because ScalarDB Server implements [scalar-admin](https://github.com/scalar-labs/scalar-admin) interface, which enables you to take transactionally-consistent backups for ScalarDB by pausing the ScalarDB Server.

Let's assume ScalarDB Server is already set up.
Please see [ScalarDB server](https://github.com/scalar-labs/scalardb/blob/master/docs/scalardb-server.md) for the details of configurations of ScalarDB Server.

In this case, an example of configurations for App is as follows:
```properties
#
# For ScalarDB SQL
#

# Connection mode
scalar.db.sql.connection_mode=SERVER

# Host name for ScalarDB SQL Server
scalar.db.sql.server_mode.host=<ScalarDB SQL Server host>

# Port number for ScalarDB SQL Server
scalar.db.sql.server_mode.port=<ScalarDB SQL Server port>
```

And an example of configurations for ScalarDB SQL Server is as follows:
```properties
#
# For underlying storage/database configurations
#

# Host name for ScalarDB Server
scalar.db.contact_points=<ScalarDB Server host>

# Port number for ScalarDB Server
scalar.db.contact_port=<ScalarDB Server port>

# Storage implementation
scalar.db.storage=grpc

#
# For ScalarDB SQL
#

# Enable the statement cache
scalar.db.sql.statement_cache.enabled=true

# The maximum number of cached statement
scalar.db.sql.statement_cache.size=300
```
