# ScalarDB 3.11 Release Notes

This page includes a list of release notes for ScalarDB 3.11.

## v3.11.0

**Release date:** December 27, 2023 

### Summary

This release has a lot of enhancements, improvements, and bug fixes. There are many SQL enhancements including `JOIN` support and cross-partition scan support. This release also includes ScalarDB Auth, which is an authentication and authorization mechanism for ScalarDB Cluster.

### Community edition

#### Enhancements

- Added import functionalities for existing relational databases. ([#841](https://github.com/scalar-labs/scalardb/pull/841) [#931](https://github.com/scalar-labs/scalardb/pull/931) [#1055](https://github.com/scalar-labs/scalardb/pull/1055))
- Added support for cross-partition scan for relational databases with arbitrary conditions, including `LIKE` expressions. ([#889](https://github.com/scalar-labs/scalardb/pull/889) [#900](https://github.com/scalar-labs/scalardb/pull/900) [#925](https://github.com/scalar-labs/scalardb/pull/925) [#984](https://github.com/scalar-labs/scalardb/pull/984) [#1006](https://github.com/scalar-labs/scalardb/pull/1006) [#1045](https://github.com/scalar-labs/scalardb/pull/1045) [#1046](https://github.com/scalar-labs/scalardb/pull/1046))

#### Improvements

- Added support for implicit pre-read in Consensus Commit. With implicit pre-read, users can perform mutations (`Put` and `Delete` operations) without reading the records beforehand. ([#1222](https://github.com/scalar-labs/scalardb/pull/1222))

#### Bug fixes

- Upgraded the base image to fix security issues. [CVE-2023-4911](https://github.com/advisories/GHSA-m77w-6vjw-wh2f "CVE-2023-4911") [CVE-2023-29491](https://github.com/advisories/GHSA-vh2x-5rx6-qqhv "CVE-2023-29491") ([#1143](https://github.com/scalar-labs/scalardb/pull/1143) [#1144](https://github.com/scalar-labs/scalardb/pull/1144))
- Upgraded the Jetty library to 9.4.53.v20231009 to fix a security issue. [CVE-2023-36478](https://github.com/advisories/GHSA-wgh7-54f2-x98r "CVE-2023-36478") ([#1142](https://github.com/scalar-labs/scalardb/pull/1142))
- Upgraded grpc-health-probe to fix security issues. [CVE-2023-39325](https://github.com/advisories/GHSA-4374-p667-p6c8 "CVE-2023-39325") [GHSA-m425-mq94-257g](https://github.com/advisories/GHSA-m425-mq94-257g "GHSA-m425-mq94-257g") ([#1297](https://github.com/scalar-labs/scalardb/pull/1297))
- Upgraded the Cosmos DB client library to fix security issues. [CVE-2023-34062](https://github.com/advisories/GHSA-xjhv-p3fv-x24r "CVE-2023-34062") ([#1348](https://github.com/scalar-labs/scalardb/pull/1348))

### Enterprise edition

#### Enhancements

##### ScalarDB Cluster

- Added support for cross-partition scan for relational databases with arbitrary conditions, including `LIKE` expressions.
- Added import functionalities for existing relational databases.
- Added support for operating a ScalarDB Cluster node in standalone mode to make development and testing more convenient. You can activate standalone mode by setting `scalar.db.cluster.node.standalone_mode.enabled` to `true`.
- Added the `docker-compose.yaml` file to test standalone mode. You can run ScalarDB Cluster for testing purposes in your local environment by using the `docker compose up` command.
- Introduced ScalarDB Auth, an authentication and authorization mechanism for ScalarDB Cluster.

##### ScalarDB SQL

- Added support for cross-partition scan for relational databases with arbitrary conditions, including `LIKE` expressions.
- Added support for table aliases for `UPDATE`, `DELETE`, and `SELECT` statements. User can write a query with table aliase like `SELECT t.col FROM tbl AS t`.
- Added support for the `JOIN` operation. This enhancement supports `INNER JOIN`, `LEFT OUTER JOIN`, and `RIGHT OUTER JOIN`.
- Added support for specifying multiple values in `INSERT` statements.
- Introduced support for the `START TRANSACTION` and `ABORT` commands, which serve as aliases for the `BEGIN` and `ROLLBACK` commands, respectively.
- Added support for cross-partition `WHERE` clauses in `UPDATE` and `DELETE` statements.
- Introduced an `UPSERT` command that creates a new record if it doesn't exist, or updates the record if it does.

#### Improvements

##### ScalarDB Cluster

- Added pay-as-you-go containers to the AWS Marketplace.
- Added ScalarDB Cluster (BYOL) to the Azure Marketplace. You can use ScalarDB Cluster by subscribing to it in the Azure Marketplace.
- Added ScalarDB Cluster (BYOL) to the AWS Marketplace. You can use ScalarDB Cluster by subscribing to it in the AWS Marketplace.
- Added support for implicit pre-read introduced in the enterprise edition. With implicit pre-read, users can perform mutations (Put and Delete operations) without reading the records beforehand.

#### Bug fixes

##### ScalarDB Cluster

- Fixed an issue where some properties were not reflected on the SQL client.
- Upgraded the Jetty library to 9.4.53.v20231009 to fix a security issue. [CVE-2023-36478](https://github.com/advisories/GHSA-wgh7-54f2-x98r "CVE-2023-36478")
- Upgraded the base image to fix security issues. [CVE-2023-4911](https://github.com/advisories/GHSA-m77w-6vjw-wh2f "CVE-2023-4911") [CVE-2023-29491](https://github.com/advisories/GHSA-vh2x-5rx6-qqhv "CVE-2023-29491")
- Upgraded grpc-health-probe to fix security issues. [CVE-2023-39325](https://github.com/advisories/GHSA-4374-p667-p6c8 "CVE-2023-39325") [GHSA-m425-mq94-257g](https://github.com/advisories/GHSA-m425-mq94-257g "GHSA-m425-mq94-257g")

##### ScalarDB GraphQL

- Upgraded the base image to fix security issues. [CVE-2023-4911](https://github.com/advisories/GHSA-m77w-6vjw-wh2f "CVE-2023-4911") [CVE-2023-29491](https://github.com/advisories/GHSA-vh2x-5rx6-qqhv "CVE-2023-29491")
- Upgraded the Jetty library to 9.4.53.v20231009 to fix a security issue. [CVE-2023-36478](https://github.com/advisories/GHSA-wgh7-54f2-x98r "CVE-2023-36478")

##### ScalarDB SQL

- Upgraded the base image to fix security issues. [CVE-2023-4911](https://github.com/advisories/GHSA-m77w-6vjw-wh2f "CVE-2023-4911") [CVE-2023-29491](https://github.com/advisories/GHSA-vh2x-5rx6-qqhv "CVE-2023-29491")
- Upgraded the Jetty library to 9.4.53.v20231009 to fix a security issue. [CVE-2023-36478](https://github.com/advisories/GHSA-wgh7-54f2-x98r "CVE-2023-36478")
- Upgraded grpc-health-probe to fix security issues. [CVE-2023-39325](https://github.com/advisories/GHSA-4374-p667-p6c8 "CVE-2023-39325") [GHSA-m425-mq94-257g](https://github.com/advisories/GHSA-m425-mq94-257g "GHSA-m425-mq94-257g")
