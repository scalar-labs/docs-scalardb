# ScalarDB Auth with ScalarDB SQL

ScalarDB Auth is an authentication and authorization mechanism for ScalarDB.

This document describes how to use ScalarDB Auth with ScalarDB SQL.

## ScalarDB Auth Overview

By using ScalarDB Auth, you can create users and grant or revoke their privileges. You can create a user by using the `CREATE USER` command, and you can grant or revoke one's privileges on a table or a namespace by using the `GRANT` or `REVOKE` command, respectively. For details about such data control language (DCL) commands, see [DCL](https://github.com/scalar-labs/scalardb-sql/blob/main/docs/grammar.md#dcl).

Users can log in to ScalarDB Cluster with a username and a password and execute SQL statements if they have the required privileges.

ScalarDB Auth supports two types of users:

- **Superusers:** This type of user has all privileges. Only superusers can create or drop other users and namespaces.
- **Normal users:** This type of user initially doesn't have any privileges, so they need to be granted privileges by a superuser or another user who has the `GRANT` privilege.

In ScalarDB Auth, the following privileges are available:

- `SELECT`
- `INSERT`
- `UPDATE`
- `DELETE`
- `CREATE`
- `DROP`
- `TRUNCATE`
- `ALTER`
- `GRANT`

For details about privileges, see [Which privileges are required for each type of operation](#which-privileges-are-required-for-each-type-of-operation).

## Configurations

This section describes the available configurations in ScalarDB Cluster.

### ScalarDB Cluster node configurations

To enable ScalarDB Auth, you need to set `scalar.db.cluster.auth.enabled` to `true`.

| Name                             | Description                        | Default              |
|----------------------------------|------------------------------------|----------------------|
| `scalar.db.cluster.auth.enabled` | Whether ScalarDB Auth is enabled.  | `false`              |

You can also set the following configurations:

| Name                                                           | Description                                                                                               | Default            |
|----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|--------------------|
| `scalar.db.cluster.auth.cache_expiration_time_millis`          | Cache expiration time for auth information in milliseconds.                                               | `60000` (1 minute) |
| `scalar.db.cluster.auth.auth_token_expiration_time_minutes`    | Auth token expiration time in minutes.                                                                    | `1440` (1 day)     |
| `scalar.db.cluster.auth.auth_token_gc_thread_interval_minutes` | Auth token garbage collection (GC) thread interval in minutes.                                            | `360` (6 hours)    |
| `scalar.db.cluster.auth.pepper`                                | A secret value added to a password before hashing. If not specified, A password is hashed without pepper. |                    |

{% capture notice--info %}
**Note**

If you enable ScalarDB Auth, you will also need to set `scalar.db.cross_partition_scan.enabled` to `true` for the system namespace (`scalardb` by default) because ScalarDB Auth performs cross-partition scans internally.

{% endcapture %}

<div class="notice--info">{{ notice--info | markdownify }}</div>

### ScalarDB Cluster Java client SDK configurations

To enable ScalarDB Auth on the client side, you need to set `scalar.db.cluster.auth.enabled` to `true`.

| Name                             | Description                       | Default              |
|----------------------------------|-----------------------------------|----------------------|
| `scalar.db.cluster.auth.enabled` | Whether ScalarDB Auth is enabled. | `false`              |

In addition to the configuration in the [ScalarDB Cluster SQL client configurations](developer-guide-for-scalardb-cluster-with-java-api.md#scalardb-cluster-sql-client-configurations) section, you also need to set `scalar.db.sql.cluster_mode.username` and `scalar.db.sql.cluster_mode.password` to specify the username and password of the client.

| Name                                  | Description                 | Default |
|---------------------------------------|-----------------------------|---------|
| `scalar.db.sql.cluster_mode.username` | The username of the client. |         |
| `scalar.db.sql.cluster_mode.password` | The password of the client. |         |

## Initial user

When you enable ScalarDB Auth, the initial user `admin` is created and the initial password of that user is `admin`. This user is a superuser and has all privileges. You can log in with this user and create other users if necessary.

{% capture notice--warning %}
**ATTENTION**

For security purposes, be sure to change the password of the initial user, especially before deploying to a production environment.

{% endcapture %}

<div class="notice--warning">{{ notice--warning | markdownify }}</div>

## Which privileges are required for each type of operation

The following tables show which privileges are required for each type of operation:

### DDL

| Command                       | Superuser required | Required privileges |
|-------------------------------|--------------------|---------------------|
| `CREATE NAMESPACE`            | `true`             |                     |
| `DROP NAMESPACE`              | `true`             |                     |
| `CREATE TABLE`                |                    | `CREATE`            |
| `DROP TABLE`                  |                    | `DROP`              |
| `CREATE INDEX`                |                    | `CREATE`            |
| `DROP INDEX`                  |                    | `DROP`              |
| `TRUNCATE TABLE`              |                    | `TRUNCATE`          |
| `ALTER TABLE`                 |                    | `ALTER`             |
| `CREATE COORDINATOR TABLES`   | `true`             |                     |
| `DROP COORDINATOR TABLES`     | `true`             |                     |
| `TRUNCATE COORDINATOR TABLES` | `true`             |                     |

### DML

| Command          | Superuser required | Required privileges   |
|------------------|--------------------|-----------------------|
| `SELECT`         |                    | `SELECT`              |
| `INSERT`         |                    | `INSERT`              |
| `UPSERT`         |                    | `INSERT`              |
| `UPDATE`         |                    | `SELECT` and `UPDATE` |
| `DELETE`         |                    | `SELECT` and `DELETE` |

### DCL

| Command       | Superuser required                            | Required privileges                                            |
|---------------|-----------------------------------------------|----------------------------------------------------------------|
| `CREATE USER` | `true`                                        |                                                                |
| `ALTER USER`  | `true` (Users can change their own password.) |                                                                |
| `DROP USER`   | `true`                                        |                                                                |
| `GRANT`       |                                               | `GRANT` (Users can grant only the privileges that they have.)  |
| `REVOKE`      |                                               | `GRANT` (Users can revoke only the privileges that they have.) |
