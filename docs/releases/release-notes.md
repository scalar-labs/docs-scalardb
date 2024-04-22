# ScalarDB 3.12 Release Notes

This page includes a list of release notes for ScalarDB 3.12.

## v3.12.2

**Release date:** April 1, 2024

### Summary

This release includes several improvements, including error message improvements and a vulnerability fix.

### Community edition

#### Improvements

- Added error codes to the error messages of Schema Loader. ([#1564](https://github.com/scalar-labs/scalardb/pull/1564))

### Enterprise edition

#### Improvements

##### ScalarDB Cluster

- Added error codes to the error messages of the Auth module.
- Added error codes to the error messages.
- Added TLS support for the Prometheus exporter. With this change, when enabling TLS (setting `scalar.db.cluster.tls.enabled` to `true`) in ScalarDB cluster nodes, the Prometheus exporter also starts with TLS (HTTPS).

##### ScalarDB GraphQL

- Added error codes to the error messages.

##### ScalarDB SQL

- Added error codes to the error messages.

#### Bug fixes

##### ScalarDB Cluster

- Upgraded the Kubernetes Client Java lib to fix security issues: [CVE-2024-25710](https://github.com/advisories/GHSA-4g9r-vxhx-9pgx "CVE-2024-25710") and [CVE-2024-26308](https://github.com/advisories/GHSA-4265-ccf5-phj5 "CVE-2024-26308").

## v3.12.1

**Release date:** February 26, 2024

### Summary

This release has a small improvement and several bug and vulnerability fixes.

### Community edition

#### Improvements

- Removed the hard-coded collation for MySQL and SQL Server in the JDBC adapter. As a result, the collation configured in the underlying database will be used when creating tables. ([#1518](https://github.com/scalar-labs/scalardb/pull/1518))

#### Bug fixes

- Upgraded the base image to fix security issues. [CVE-2023-47038](https://github.com/advisories/GHSA-96fh-9q43-rmjh "CVE-2023-47038") ([#1522](https://github.com/scalar-labs/scalardb/pull/1522) [#1521](https://github.com/scalar-labs/scalardb/pull/1521))
- Upgraded the PostgresSQL lib to fix security issues. [CVE-2024-1597](https://github.com/advisories/GHSA-24rp-q3w6-vc56 "CVE-2024-1597") ([#1547](https://github.com/scalar-labs/scalardb/pull/1547))

### Enterprise edition

#### Bug fixes

##### ScalarDB Cluster

- Upgraded the base image to fix security issues. [CVE-2023-47038](https://github.com/advisories/GHSA-96fh-9q43-rmjh "CVE-2023-47038")

##### ScalarDB GraphQL

- Upgraded the base image to fix security issues. [CVE-2023-47038](https://github.com/advisories/GHSA-96fh-9q43-rmjh "CVE-2023-47038")

##### ScalarDB SQL

- Upgraded the base image to fix security issues. [CVE-2023-47038](https://github.com/advisories/GHSA-96fh-9q43-rmjh "CVE-2023-47038")

## v3.12.0

**Release date:** February 17, 2024

### Summary

This release has several enhancements, improvements, and bug fixes.

### Community edition

#### Enhancements

- Made Cosmos DB consistency level configurable in the Cosmos DB adapter. Users can change the consistency level used for Cosmos DB operations by specifying the property `scalar.db.cosmos.consistency_level`. `STRONG` or `BOUNDED_STALENESS` can be specified. (#1470)

#### Improvements

- Added error codes to the error messages. (#1493)

#### Bug fixes

- Improved some error handling to avoid potential NPE in JDBC storages. (#1442)
- Fixed a bug where lazy recovery is not performed when uncommitted records are read while executing implicit pre-read. (#1476)

### Enterprise edition

#### Enhancements

##### ScalarDB Cluster

- Added support for wire encryption using TLS. When you enable ScalarDB Auth, you should enable wire encryption in production environments to protect the user credentials.
- Added an expiration time for the auth token to the response of the `AuthLogin.Login` endpoint.

#### Improvements

##### ScalarDB GraphQL

- Updated several libraries.

##### ScalarDB SQL

- Updated several libraries.

#### Bug fixes

##### ScalarDB Cluster

- Fixed a bug where the table or namespace privilege is not handled correctly.
