# ScalarDB 3.9 Release Notes

This page includes a list of release notes for ScalarDB 3.9.

## v3.9.1

**Release date:** July 3, 2023

### Summary

This release has several small improvements and vulnerability fixes.

### Change logs

#### Improvements

- Bump com.scalar-labs:scalar-admin from 2.1.0 to 2.1.1 ([#910](https://github.com/scalar-labs/scalardb/pull/910))
- Improve some `toString` expressions of Selection Operators ([#920](https://github.com/scalar-labs/scalardb/pull/920))

#### Bug fixes

- Bump scalar-labs/jre8 from 1.1.12 to 1.1.13 in /server ([#881](https://github.com/scalar-labs/scalardb/pull/881))
- Bump scalar-labs/jre8 from 1.1.12 to 1.1.13 in /schema-loader ([#882](https://github.com/scalar-labs/scalardb/pull/882))
- Bump scalar-labs/jre8 from 1.1.13 to 1.1.14 in /schema-loader ([#903](https://github.com/scalar-labs/scalardb/pull/903))
- Bump scalar-labs/jre8 from 1.1.13 to 1.1.14 in /server ([#902](https://github.com/scalar-labs/scalardb/pull/902))
- Records should not be rolled back in rollback() when the transaction state is marked as COMMITTED in 2PC ([#909](https://github.com/scalar-labs/scalardb/pull/909))
- Should call abort() when aborting transaction in transaction wrapper classes ([#919](https://github.com/scalar-labs/scalardb/pull/919))
- Bump org.xerial:sqlite-jdbc from 3.41.2.1 to 3.42.0.0 ([#888](https://github.com/scalar-labs/scalardb/pull/888))

#### Documentation

- Change HTML syntax to Markdown for images (3.9) ([#879](https://github.com/scalar-labs/scalardb/pull/879))
- Change version in `add-scalardb-to-your-build.md` from `3.8.0` to `3.9.0` ([#893](https://github.com/scalar-labs/scalardb/pull/893))
- Revise configuration related documents ([#905](https://github.com/scalar-labs/scalardb/pull/905))

## v3.9.0

**Release date:** April 27, 2023 

### Summary

ScalarDB 3.9 includes many new features, improvements, bug fixes, vulnerability fixes, and documentation updates. Please see the following for a list of detailed changes.

ScalarDB provides a community edition and an enterprise edition. The community edition is available as open-source software that you can use under the Apache 2.0 License. The enterprise edition includes not only the features of the community edition but also many advanced features. Release notes for the enterprise edition are available under the “Enterprise edition” section. To use the features in the enterprise edition, you must have a license agreement with Scalar Inc.

### Community edition

#### New features

- Added SQLite as a database that ScalarDB supports. ([#762](https://github.com/scalar-labs/scalardb/pull/762))

#### Improvements

- Added `slf4j-simple` to the sample application for getting started with ScalarDB. ([#835](https://github.com/scalar-labs/scalardb/pull/835))
- Updated the supported Java version when getting started to Java 8 or higher. ([#840](https://github.com/scalar-labs/scalardb/pull/840))
- Added the `Decommissioning` state to ScalarDB Server to achieve graceful shutdown. ([#851](https://github.com/scalar-labs/scalardb/pull/851))
- Unified the error-handling behavior of the admin API (e.g., an exception is thrown when dropping a namespace but the namespace has some tables). ([#856](https://github.com/scalar-labs/scalardb/pull/856))

#### Bug fixes

- Upgraded the integrated Java Runtime Environment (JRE) Docker image to 1.1.11 to fix security issues. [CVE-2023-0286](https://nvd.nist.gov/vuln/detail/CVE-2023-0286) ([#821](https://github.com/scalar-labs/scalardb/pull/821))
- Fixed issues where ScalarDB could not handle the write operation correctly when using the columns prefixed with `before_` with Consensus Commit. ([#844](https://github.com/scalar-labs/scalardb/pull/844))

#### Documentation

- Updated the documentation for transaction APIs and exceptions, the Java API guide, and the two-phase commit transaction guide. ([#804](https://github.com/scalar-labs/scalardb/pull/804), [#831](https://github.com/scalar-labs/scalardb/pull/831))
- Updated the Cosmos DB name from `Cosmos DB` to `Cosmos DB for NoSQL` in the supported databases document. ([#813](https://github.com/scalar-labs/scalardb/pull/813))
- Updated the steps to create and configure a Cosmos DB for NoSQL account for ScalarDB in the getting-started guide. ([#814](https://github.com/scalar-labs/scalardb/pull/814))
- Updated the links for ScalarDB Server and Schema Loader in the backup and restore guide. ([#810](https://github.com/scalar-labs/scalardb/pull/810))
- Added how to repair stored procedures when using Cosmos DB for NoSQL in the backup and restore guide. ([#825](https://github.com/scalar-labs/scalardb/pull/825))

### Enterprise edition

#### New features

##### ScalarDB Cluster

- Integrated the ScalarDB GraphQL and ScalarDB SQL interfaces with ScalarDB Cluster. As of ScalarDB 3.9, you no longer need to deploy dedicated components (i.e., containers) to provide GraphQL and SQL interfaces, respectively. In addition, you can more easily manage a ScalarDB Cluster.
- Added the `direct-kubernetes` client mode into the Client mode.
- Added the dedicated Schema Loader for ScalarDB Cluster.
- Added ScalarDB GraphQL integration to ScalarDB Cluster.

##### ScalarDB Analytics with PostgreSQL

- Added ScalarDB Analytics with PostgreSQL. As of ScalarDB 3.9, you can perform analytical queries on data in heterogeneous databases (i.e., RDBMS and NoSQL) managed by ScalarDB transparently by using a PostgreSQL foreign data wrapper (FDW). This feature eliminates the need for you to implement join or aggregation operations in applications, and enables you to easily perform routine or ad-hoc analysis by simply issuing SQL to PostgreSQL.

##### ScalarDB GraphQL

- Added two-phase commit (2PC) support for ScalarDB GraphQL. As of ScalarDB 3.9, you can more easily guarantee data consistency between GraphQL-based microservices. Adding support for 2PC not only reduces system development costs but also facilitates maintenance.
- Added two mechanisms to rebuild the GraphQL schema after a schema metadata change while the server is running.

##### ScalarDB SQL

- Added two-phase commit (2PC) support for Spring Data JDBC for ScalarDB. As of ScalarDB 3.9, you can more easily guarantee data consistency between Spring Framework–based microservices. Adding support for 2PC not only reduces system development costs but also facilitates maintenance.
- Enabled `ScalarDbRepository#findAll()` and `ScalarDbRepository#count()` in Spring Data JDBC for ScalarDB.
- Published JAR files for `ScalarDB SQL CLI` to the Maven repository.
- Added the default namespace name configuration `scalar.db.sql.default_namespace_name`. The value of this configuration is used when a namespace name is not specified in a SQL statement.

#### Improvements

##### ScalarDB Cluster

- Added logging to cluster nodes for recording detailed information.
- Unified `scalar.db.cluster.node_port` and `scalar.db.cluster.node.port` into `scalar.db.cluster.node.port`.
- Added an expiration time to the cluster node cache to wait for the current requests to finish before invalidating the cache.
- Added the `Decommissioning` state to gracefully shut down a cluster node.
- Revised to get the IP addresses of initial members when Kubernetes membership starts.
- Removed an unnecessary `throws` clause from the `Membership#getMembersIpAddresses` method.

##### ScalarDB GraphQL

- Revised to abort transactions that execute a CRUD or transaction operation (i.e., abort and commit) and throw an exception, except if `transaction.commit()` throws an `UnknownTransactionStatusException` error.

##### ScalarDB SQL

- Improved the ScalarDB SQL error mapping table and `AbstractSqlJdbcStatement#execute` error handling.
- Improved the Spring Data fragment repository class for ScalarDB.
- Updated `com.scalar.db.sql.springdata.exception.ScalarDb*Exception` to always have a transactionId field value.
- Revised the ScalarDB SQL API entirely.
- Added the `Decommissioning` state to ScalarDB SQL Server.
- Added a mechanism to expire the `SqlSessionFactory` cache and close the instance in ScalarDB JDBC.
- Updated the exception translator in Spring Data JDBC for ScalarDB.
- Updated the Metadata service interface to make it more intuitive.

#### Bug fixes

##### ScalarDB Cluster

- Upgraded gRPC Health Probe to 0.4.15 to fix security issues. [CVE-2022-41721](https://nvd.nist.gov/vuln/detail/CVE-2022-41721)
- Upgraded the integrated JRE Docker image to 1.1.11 to fix security issues. [CVE-2023-0286](https://nvd.nist.gov/vuln/detail/CVE-2023-0286)

##### ScalarDB GraphQL

- Upgraded the integrated JRE Docker image to 1.1.11 to fix security issues. [CVE-2023-0286](https://nvd.nist.gov/vuln/detail/CVE-2023-0286)
- Upgraded the integrated JRE Docker image to 1.1.12 to fix security issues. [CVE-2023-0361](https://nvd.nist.gov/vuln/detail/CVE-2023-0361)
- Upgraded the `graphql-java` version to 20.2 to fix security issues. [CVE-2023-28867](https://nvd.nist.gov/vuln/detail/CVE-2023-28867)

##### ScalarDB SQL

- Upgraded gRPC Health Probe to 0.4.15 to fix security issues. [CVE-2022-41721](https://nvd.nist.gov/vuln/detail/CVE-2022-41721)
- Upgraded the integrated JRE Docker image to 1.1.11 to fix security issues. [CVE-2023-0286](https://nvd.nist.gov/vuln/detail/CVE-2023-0286)
- Fixed an incorrect error message when an error occurred while executing the SELECT operation.
- Upgraded the integrated JRE Docker image to 1.1.12 and gRPC Health Probe to 0.4.17 to fix security issues. [CVE-2023-0361](https://nvd.nist.gov/vuln/detail/CVE-2023-0361) [CVE-2022-41723](https://nvd.nist.gov/vuln/detail/cve-2022-41723)
- Revised to set the finished status of the failed transaction to avoid timeout error in the bidirectional streams flow in Server mode.

#### Documentation

##### ScalarDB GraphQL

- Added documentation for how to run ScalarDB GraphQL Server.
- Fixed some minor issues, such as typos and unnecessary statements.

##### ScalarDB SQL

- Updated the Spring Data JDBC for ScalarDB guide to mention users can use other retry libraries.
- Added a link to the Spring Data JDBC for ScalarDB guide to the README.
- Revised a heading for clarification when users are getting started with ScalarDB SQL.
- Revised the name of the "Spring Data integration with ScalarDB" feature to "Spring Data JDBC for ScalarDB".
- Updated the Javadoc files to match the changes in the release.
