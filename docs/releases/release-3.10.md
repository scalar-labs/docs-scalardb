# ScalarDB 3.10 Release Notes

This page includes a list of release notes for ScalarDB 3.10.

## v3.10.4

**Release date:** April 1, 2024

### Summary

This release includes several improvements and a vulnerability fix.

### Enterprise edition

#### Bug fixes

##### ScalarDB Cluster

- Upgraded the Kubernetes Client Java lib to fix security issues: [CVE-2024-25710](https://github.com/advisories/GHSA-4g9r-vxhx-9pgx "CVE-2024-25710") and [CVE-2024-26308](https://github.com/advisories/GHSA-4265-ccf5-phj5 "CVE-2024-26308").

## v3.10.3

**Release date:** February 26, 2024

### Summary

This release has several bug and vulnerability fixes.

### Community edition

#### Bug fixes

- Improved some error handling to avoid potential NPE in JDBC storages. ([#1442](https://github.com/scalar-labs/scalardb/pull/1442))
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

## v3.10.2

**Release date:** December 26, 2023

### Summary

This release has several bug fixes, vulnerability fixes, and document improvements.

### Community edition

#### Bug fixes

- Fix to ignore empty condition set when building Scan object ([#1006](https://github.com/scalar-labs/scalardb/pull/1006))
- Fix to handle version-specific integration tests ([#1037](https://github.com/scalar-labs/scalardb/pull/1037))
- Fix ScanBuilder bug ([#1045](https://github.com/scalar-labs/scalardb/pull/1045))
- Fix to handle supported data types properly when importing tables in MySQL and SQL Server ([#1055](https://github.com/scalar-labs/scalardb/pull/1055))
- Fix flaky relational scan integration tests ([#1069](https://github.com/scalar-labs/scalardb/pull/1069))
- Upgraded the base image to fix security issues. [CVE-2023-4911](https://github.com/advisories/GHSA-m77w-6vjw-wh2f "CVE-2023-4911") [CVE-2023-29491](https://github.com/advisories/GHSA-vh2x-5rx6-qqhv "CVE-2023-29491") ([#1143](https://github.com/scalar-labs/scalardb/pull/1143) [#1144](https://github.com/scalar-labs/scalardb/pull/1144))
- Upgraded the jetty library to 9.4.53.v20231009 to fix security issue. [CVE-2023-36478](https://github.com/advisories/GHSA-wgh7-54f2-x98r "CVE-2023-36478") ([#1142](https://github.com/scalar-labs/scalardb/pull/1142))
- Upgraded grpc-health-probe to fix security issues. [CVE-2023-39325](https://github.com/advisories/GHSA-4374-p667-p6c8 "CVE-2023-39325") [GHSA-m425-mq94-257g](https://github.com/advisories/GHSA-m425-mq94-257g "GHSA-m425-mq94-257g") ([#1297](https://github.com/scalar-labs/scalardb/pull/1297))
- Upgraded the Cosmos DB client lib to fix security issues. [CVE-2023-34062](https://github.com/advisories/GHSA-xjhv-p3fv-x24r "CVE-2023-34062") ([#1348](https://github.com/scalar-labs/scalardb/pull/1348))

### Enterprise edition

#### Improvements

##### ScalarDB Cluster

- Provide pay-as-you-go containers to AWS Marketplace
- Provide ScalarDB Cluster (BYOL) in Azure Marketplace. You can use ScalarDB Cluster by subscribing to ScalarDB Cluster in Azure Marketplace.
- Provide ScalarDB Cluster (BYOL) in AWS Marketplace. You can use ScalarDB Cluster by subscribing to ScalarDB Cluster in AWS Marketplace.

#### Bug fixes

##### ScalarDB Cluster

- Should pass all properties to SQL client
- Upgraded the base image to fix security issues. [CVE-2023-4911](https://github.com/advisories/GHSA-m77w-6vjw-wh2f "CVE-2023-4911") [CVE-2023-29491](https://github.com/advisories/GHSA-vh2x-5rx6-qqhv "CVE-2023-29491")
- Upgraded the jetty library to 9.4.53.v20231009 to fix security issue. [CVE-2023-36478](https://github.com/advisories/GHSA-wgh7-54f2-x98r "CVE-2023-36478")
- Upgraded grpc-health-probe to fix security issues. [CVE-2023-39325](https://github.com/advisories/GHSA-4374-p667-p6c8 "CVE-2023-39325") [GHSA-m425-mq94-257g](https://github.com/advisories/GHSA-m425-mq94-257g "GHSA-m425-mq94-257g")

##### ScalarDB GraphQL

- Upgraded the base image to fix security issues. [CVE-2023-4911](https://github.com/advisories/GHSA-m77w-6vjw-wh2f "CVE-2023-4911") [CVE-2023-29491](https://github.com/advisories/GHSA-vh2x-5rx6-qqhv "CVE-2023-29491")
- Upgraded the jetty library to 9.4.53.v20231009 to fix security issue. [CVE-2023-36478](https://github.com/advisories/GHSA-wgh7-54f2-x98r "CVE-2023-36478")

##### ScalarDB SQL

- Upgraded the base image to fix security issues. [CVE-2023-4911](https://github.com/advisories/GHSA-m77w-6vjw-wh2f "CVE-2023-4911") [CVE-2023-29491](https://github.com/advisories/GHSA-vh2x-5rx6-qqhv "CVE-2023-29491")
- Upgraded the jetty library to 9.4.53.v20231009 to fix security issue. [CVE-2023-36478](https://github.com/advisories/GHSA-wgh7-54f2-x98r "CVE-2023-36478")
- Upgraded grpc-health-probe to fix security issues. [CVE-2023-39325](https://github.com/advisories/GHSA-4374-p667-p6c8 "CVE-2023-39325") [GHSA-m425-mq94-257g](https://github.com/advisories/GHSA-m425-mq94-257g "GHSA-m425-mq94-257g")

## v3.10.1

**Release date:** August 7, 2023 

### Summary

This release has several small improvements and document improvements.

### Change logs

#### Improvements

- Fix java warnings in MutationConditionsValidatorTest ([#970](https://github.com/scalar-labs/scalardb/pull/970))

#### Documentation

- Revise document for handling exceptions for Two-phase Commit Transactions ([#934](https://github.com/scalar-labs/scalardb/pull/934))
- Revise document for Handle exceptions ([#975](https://github.com/scalar-labs/scalardb/pull/975))

## v3.10.0

**Release date:** July 20, 2023 

### Summary

ScalarDB 3.10 includes many enhancements, improvements, bug fixes, and documentation updates. Please see the following for a list of detailed changes.

ScalarDB provides a Community edition and an Enterprise edition. The Community edition is available as open-source software that you can use under the Apache 2.0 License. The Enterprise edition includes not only the features of the Community edition but also many advanced features. Release notes for the Enterprise edition are available under the “Enterprise edition” section. To use the features in the Enterprise edition, you must have a license agreement with Scalar Inc.

### Community edition

#### Enhancements

- Added functionality to treat the transaction metadata columns in a record as committed if the metadata in ScalarDB is empty (i.e., `null`). This functionality allows ScalarDB to import tables from another existing database. ([#841](https://github.com/scalar-labs/scalardb/pull/841) [#931](https://github.com/scalar-labs/scalardb/pull/931))
- Added validation for the consensus commit mutation operation. ([#873](https://github.com/scalar-labs/scalardb/pull/873))
- Added an interface to `Scan` to allow conditions (AND, OR, etc.) to be specified. ([#889](https://github.com/scalar-labs/scalardb/pull/889) [#900](https://github.com/scalar-labs/scalardb/pull/900) [#925](https://github.com/scalar-labs/scalardb/pull/925))
- Added support for specifying conditions for `Put` and `Delete` in the transaction API. ([#899](https://github.com/scalar-labs/scalardb/pull/899))

#### Bug fixes

- Upgraded the integrated JRE Docker image to 1.1.13 to fix security issues. [CVE-2022-29458](https://nvd.nist.gov/vuln/detail/CVE-2022-29458) ([#881](https://github.com/scalar-labs/scalardb/pull/881) [#882](https://github.com/scalar-labs/scalardb/pull/882))
- Upgraded the integrated JRE Docker image to 1.1.14 to fix security issues. [CVE-2023-0464](https://nvd.nist.gov/vuln/detail/CVE-2023-0464) [CVE-2023-2650](https://nvd.nist.gov/vuln/detail/CVE-2023-2650) ([#902](https://github.com/scalar-labs/scalardb/pull/902) [#903](https://github.com/scalar-labs/scalardb/pull/903))
- Upgraded sqlite-jdbc to 3.42.0.0 to fix security issues. [CVE-2023-32697](https://nvd.nist.gov/vuln/detail/CVE-2023-32697) ([#888](https://github.com/scalar-labs/scalardb/pull/888))
- Revised the method for checking transaction status before rollback to fix a bug that caused a partial commit during `rollback()` in the two-phase commit (2PC) interface. ([#909](https://github.com/scalar-labs/scalardb/pull/909))
- Resolved a race condition in the counter that counts transactions to fix a bug that prevented ScalarDB Server from pausing. ([#935](https://github.com/scalar-labs/scalardb/pull/935))
- Fixed a problem with the metrics for ScalarDB Server not properly displaying the number of aborts and rollbacks. ([#919](https://github.com/scalar-labs/scalardb/pull/919))
- Upgraded gRPC library to 1.53.0 to fix security issues. [CVE-2023-1428](https://nvd.nist.gov/vuln/detail/CVE-2023-1428) [CVE-2023-32731](https://nvd.nist.gov/vuln/detail/CVE-2023-32731) ([#943](https://github.com/scalar-labs/scalardb/pull/943))

#### Documentation

- Improved documentation for handling errors in ScalarDB transactions. ([#897](https://github.com/scalar-labs/scalardb/pull/897) [#932](https://github.com/scalar-labs/scalardb/pull/932))
- Added detailed descriptions for all ScalarDB configurations to the documentation. ([#905](https://github.com/scalar-labs/scalardb/pull/905))

### Enterprise edition

#### Enhancements

##### ScalarDB Cluster

- Implemented AWS Marketplace usage reporting so that users can run a ScalarDB Cluster node (Standard or Premium edition) from AWS Marketplace with pay-as-you-go pricing plan.
- Added support for specifying conditions for Put and Delete in the transaction API.
- Added support for the table-importing feature in ScalarDB.

#### Improvements

##### ScalarDB Cluster

- Updated GraphQL Server to allow graceful shutdown by waiting to shutdown until there are no more requests for the server.

##### ScalarDB GraphQL

- Updated GraphQL Server to allow graceful shutdown by waiting to shutdown until there are no more requests for the server.

##### ScalarDB SQL

- Added a two-phase commit (2PC) high-level API for participants into the `ScalarDbTwoPcRepository` class for `Spring Data JDBC for ScalarDB` so that users can implement a 2PC transaction participant safely and easily.

#### Bug fixes

##### ScalarDB Cluster

- Upgraded the Guava library to 32.1.1-jre to fix security issues. [[CVE-2023-2976](https://github.com/advisories/GHSA-7g45-4rm6-3mm3 "CVE-2023-2976")]

##### ScalarDB GraphQL

- Upgraded the Guava library to 32.1.1-jre to fix security issues. [[CVE-2023-2976](https://github.com/advisories/GHSA-7g45-4rm6-3mm3 "CVE-2023-2976")]
- Modified error handling to fix a bug that caused the GraphQL schema update process to stop.

##### ScalarDB SQL

- Updated ScalarDB SQL Server to always rollback a transaction when an error occurs.
- Added a null check in the `close()` method of the `SqlJdbcDriver` class to fix a bug where `NullPointerException` could occur when executing the `close()` method.
- Fixed a partial commit issue that occurred in 2PC when using `Spring Data JDBC for ScalarDB` by preventing any rollback after the coordinator successfully processes the commit.
- Fixed a problem with the metrics for ScalarDB Server not properly displaying the number of aborts and rollbacks.
- Upgraded the Guava library to 32.1.1-jre to fix security issues. [[CVE-2023-2976](https://github.com/advisories/GHSA-7g45-4rm6-3mm3 "CVE-2023-2976")]

#### Documentation

##### ScalarDB Cluster

- Added the ScalarDB Cluster gRPC API guide.
- Reorganized ScalarDB Cluster documents.
- Added a getting started tutorial for ScalarDB Cluster with Python.

##### ScalarDB SQL

- Revised `Spring Data JDBC for ScalarDB` documentation, such as adding an architectural diagram, adding limitations, and updating some usage guides.
- Added detailed descriptions for all ScalarDB configurations to the documentation.
- Improved documentation for handling errors in ScalarDB transactions.
