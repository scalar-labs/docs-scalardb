# ScalarDB 3.7 Release Notes

This page includes a list of release notes for ScalarDB 3.7.

## v3.7.7

**Release date:** December 25, 2023

### Summary

This release has several bug fixes, vulnerability fixes, and document improvements.

### Change logs

#### Bug fixes

- Should drop namespace only when no tables are in the namespace in Schema Loader ([#740](https://github.com/scalar-labs/scalardb/pull/740))
- Upgraded the base image to fix security issues. [CVE-2023-4911](https://github.com/advisories/GHSA-m77w-6vjw-wh2f "CVE-2023-4911") [CVE-2023-29491](https://github.com/advisories/GHSA-vh2x-5rx6-qqhv "CVE-2023-29491") ([#1143](https://github.com/scalar-labs/scalardb/pull/1143) [#1144](https://github.com/scalar-labs/scalardb/pull/1144))
- Upgraded the jetty library to 9.4.53.v20231009 to fix security issue. [CVE-2023-36478](https://github.com/advisories/GHSA-wgh7-54f2-x98r "CVE-2023-36478") ([#1142](https://github.com/scalar-labs/scalardb/pull/1142))
- Upgraded grpc-health-probe to fix security issues. [CVE-2023-39325](https://github.com/advisories/GHSA-4374-p667-p6c8 "CVE-2023-39325") [GHSA-m425-mq94-257g](https://github.com/advisories/GHSA-m425-mq94-257g "GHSA-m425-mq94-257g") ([#1297](https://github.com/scalar-labs/scalardb/pull/1297))
- Upgraded the Cosmos DB client lib to fix security issues. [CVE-2023-34062](https://github.com/advisories/GHSA-xjhv-p3fv-x24r "CVE-2023-34062") ([#1348](https://github.com/scalar-labs/scalardb/pull/1348))

## v3.7.6

**Release date:** August 7, 2023

### Summary

This release has several bug fixes and vulnerability fixes.

### Change logs

#### Bug fixes

- Avoid decrementing outstanding requests counter duplicately ([#935](https://github.com/scalar-labs/scalardb/pull/935))
- Fix [CVE-2023-1428](https://github.com/advisories/GHSA-6628-q6j9-w8vg "CVE-2023-1428") and [CVE-2023-32731](https://github.com/advisories/GHSA-cfgp-2977-2fmm "CVE-2023-32731") ([#943](https://github.com/scalar-labs/scalardb/pull/943))
- Fix [CVE-2023-2976](https://github.com/advisories/GHSA-7g45-4rm6-3mm3 "CVE-2023-2976") ([#954](https://github.com/scalar-labs/scalardb/pull/954))

## v3.7.5

**Release date:** July 1, 2023

### Summary

This release has several small improvements and vulnerability fixes.

### Change logs

#### Improvements

- Improve some `toString` expressions of Selection Operators ([#920](https://github.com/scalar-labs/scalardb/pull/920))

#### Bug fixes

- Bump scalar-labs/jre8 from 1.1.12 to 1.1.13 in /server ([#881](https://github.com/scalar-labs/scalardb/pull/881))
- Bump scalar-labs/jre8 from 1.1.12 to 1.1.13 in /schema-loader ([#882](https://github.com/scalar-labs/scalardb/pull/882))
- Bump scalar-labs/jre8 from 1.1.13 to 1.1.14 in /schema-loader ([#903](https://github.com/scalar-labs/scalardb/pull/903))
- Bump scalar-labs/jre8 from 1.1.13 to 1.1.14 in /server ([#902](https://github.com/scalar-labs/scalardb/pull/902))
- Should call abort() when aborting transaction in transaction wrapper classes ([#919](https://github.com/scalar-labs/scalardb/pull/919))

#### Documentation

- Change HTML syntax to Markdown for images (3.7) ([#877](https://github.com/scalar-labs/scalardb/pull/877))

## v3.7.4

**Release date:** April 28, 2023

### Summary

This release has several bug fixes and vulnerability fixes.

### Change logs

#### Bug fixes

- fix: DynamoAdmin.namespaceExists to check full namespace (not prefix) ([#782](https://github.com/scalar-labs/scalardb/pull/782))
- Should care about ScanWithIndex in ScalarDbUtils.copyAndSetTargetToIfNot() ([#793](https://github.com/scalar-labs/scalardb/pull/793))
- Fix CVE-2022-42898 ([#794](https://github.com/scalar-labs/scalardb/pull/794))
- Fix [CVE-2023-0286](https://github.com/advisories/GHSA-x4qr-2fvf-3mr5 "CVE-2023-0286") ([#821](https://github.com/scalar-labs/scalardb/pull/821))
- Fix [CVE-2023-0361](https://github.com/advisories/GHSA-5547-g9w2-52xj "CVE-2023-0361") and [CVE-2022-41723](https://github.com/advisories/GHSA-vvpx-j8f3-3w6h "CVE-2022-41723") ([#834](https://github.com/scalar-labs/scalardb/pull/834))
- Fix [CVE-2022-41721](https://github.com/advisories/GHSA-fxg5-wq6x-vr4w "CVE-2022-41721") ([#808](https://github.com/scalar-labs/scalardb/pull/808))

## v3.7.3

**Release date:** December 27, 2022

### Summary

This release adds [several configurations for gRPC](https://github.com/scalar-labs/scalardb/pull/776) and has several bug fixes.

### Change logs

#### Enhancements

- Add configurations for gRPC ([#776](https://github.com/scalar-labs/scalardb/pull/776))

#### Bug fixes

- Upgrade docker image version to fix [CVE-2021-46848](https://github.com/advisories/GHSA-6468-68pw-9chw "CVE-2021-46848") ([#766](https://github.com/scalar-labs/scalardb/pull/766))
- Fix [CVE-2022-21363](https://github.com/advisories/GHSA-g76j-4cxx-23h9 "CVE-2022-21363") and [CVE-2021-2471](https://github.com/advisories/GHSA-w6f2-8wx4-47r5 "CVE-2021-2471") ([#773](https://github.com/scalar-labs/scalardb/pull/773))
- Fix [CVE-2022-41946](https://github.com/advisories/GHSA-562r-vg33-8x8h "CVE-2022-41946") ([#774](https://github.com/scalar-labs/scalardb/pull/774))

## v3.7.2

**Release date:** December 1, 2022

### Summary

This release has several bug fixes.

### Change logs

#### Bug fixes

- Update protobuf and grpc to fix [CVE-2022-3171](https://github.com/advisories/GHSA-h4h5-3hr4-j3g2 "CVE-2022-3171") ([#738](https://github.com/scalar-labs/scalardb/pull/738))
- Fix [CVE-2022-40151](https://github.com/advisories/GHSA-f8cc-g7j8-xxpm "CVE-2022-40151") and [CVE-2022-40152](https://github.com/advisories/GHSA-3f7h-mf4q-vrm4 "CVE-2022-40152") ([#743](https://github.com/scalar-labs/scalardb/pull/743))

## v3.7.1

**Release date:** November 16, 2022

### Summary

This release has several bug fixes.

### Change logs

#### Bug fixes

- Fix [CVE-2021-3999](https://github.com/advisories/GHSA-vfch-2fr8-r5c2 "CVE-2021-3999"), [CVE-2022-1586](https://github.com/advisories/GHSA-f3pv-9fwh-mp3x "CVE-2022-1586") and [CVE-2022-1587](https://github.com/advisories/GHSA-jmvm-hj36-w5hc "CVE-2022-1587") ([#700](https://github.com/scalar-labs/scalardb/pull/700))
- Commit/rollback records should always be done for all records even on error ([#680](https://github.com/scalar-labs/scalardb/pull/680))
- Should use partition key and clustering key from result in recovery ([#681](https://github.com/scalar-labs/scalardb/pull/681))
- Fix [CVE-2022-27664](https://github.com/advisories/GHSA-69cg-p879-7622 "CVE-2022-27664") ([#716](https://github.com/scalar-labs/scalardb/pull/716))
- Should check the value range of BigIntColumn ([#720](https://github.com/scalar-labs/scalardb/pull/720))
- Fix [CVE-2022-32149](https://github.com/advisories/GHSA-69ch-w2m2-3vjp "CVE-2022-32149") ([#727](https://github.com/scalar-labs/scalardb/pull/727))
- Fix [CVE-2022-42003](https://github.com/advisories/GHSA-jjjh-jjxp-wpff "CVE-2022-42003") and [CVE-2022-42004](https://github.com/advisories/GHSA-rgv9-q543-rqg4 "CVE-2022-42004") ([#726](https://github.com/scalar-labs/scalardb/pull/726))
- Fix dependency errors for Maven projects ([#735](https://github.com/scalar-labs/scalardb/pull/735))
- Fix typos in exception messages ([#714](https://github.com/scalar-labs/scalardb/pull/714))

## v3.7.0

**Release date:** September 3, 2022

### Summary

This release has several enhancements, improvements, bug fixes, vulnerability fixes, and document improvements.

Highlights of this release are as follows:

- Add namespace prefix support for Dynamo (The configuration name is `scalar.db.dynamo.namespace.prefix`. Please see [this document](https://github.com/scalar-labs/scalardb/blob/v3.7.0/docs/getting-started-with-scalardb-on-dynamodb.mdx) for the details
- Add alter table command to Schema Loader tool (Please see [this document](https://github.com/scalar-labs/scalardb/blob/v3.7.0/schema-loader/README.mdx#alter-tables) for the details)

### Change logs

#### Enhancements

- Add capability to add a new column to an existing table in the Administration interface ([#638](https://github.com/scalar-labs/scalardb/pull/638))
- Add alter table command to Schema Loader tool ([#648](https://github.com/scalar-labs/scalardb/pull/648))
- Add begin() and rollback() methods to Distributed Transaction API ([#656](https://github.com/scalar-labs/scalardb/pull/656))
- Add begin() and abort() to Two-phase Commit Transaction API ([#657](https://github.com/scalar-labs/scalardb/pull/657))
- Add new configuration to include transaction metadata on Get and Scan operations results when using Consensus Commit ([#649](https://github.com/scalar-labs/scalardb/pull/649))
- Add namespace prefix support for Dynamo ([#658](https://github.com/scalar-labs/scalardb/pull/658))

#### Improvements

- Modify descriptions in archive.gradle ([#637](https://github.com/scalar-labs/scalardb/pull/637))
- Update Scalar DB dependency in Getting Started ([#640](https://github.com/scalar-labs/scalardb/pull/640))
- Deprecate table mapping in Multi-storage ([#641](https://github.com/scalar-labs/scalardb/pull/641))
- Change default value of is-transaction-table in Schema Loader ([#642](https://github.com/scalar-labs/scalardb/pull/642))
- Admin "repairTable()" handle metadata corruption ([#652](https://github.com/scalar-labs/scalardb/pull/652))
- Refactor TableMetadataManager ([#651](https://github.com/scalar-labs/scalardb/pull/651))
- Refactor Scalar DB proto ([#655](https://github.com/scalar-labs/scalardb/pull/655))
- Add `@Nullable` to Admin.getTableMetadata() ([#659](https://github.com/scalar-labs/scalardb/pull/659))

#### Bug fixes

- In the Admin create and drop index methods, alter column type if necessary ([#645](https://github.com/scalar-labs/scalardb/pull/645))
- Fix [CVE-2022-31197](https://github.com/advisories/GHSA-r38f-c4h4-hqq2 "CVE-2022-31197") affecting PostgreSQL driver ([#650](https://github.com/scalar-labs/scalardb/pull/650))
- Fix [CVE-2021-46828](https://github.com/advisories/GHSA-x62c-6mxr-74fh "CVE-2021-46828") by bumping the jre8 dependency version ([#653](https://github.com/scalar-labs/scalardb/pull/653))
- Fix [CVE-2022-2509](https://github.com/advisories/GHSA-w33j-4mrg-pgc3 "CVE-2022-2509") ([#654](https://github.com/scalar-labs/scalardb/pull/654))
- Revert Proto package name ([#660](https://github.com/scalar-labs/scalardb/pull/660))
- Fix [CVE-2022-37434](https://github.com/advisories/GHSA-cfmr-vrgj-vqwv "CVE-2022-37434") ([#677](https://github.com/scalar-labs/scalardb/pull/677))

#### Documentation

- Several fixes for documents ([#639](https://github.com/scalar-labs/scalardb/pull/639))
- Add database compatibility of Scalar DB 3.6 ([#635](https://github.com/scalar-labs/scalardb/pull/635))
- Add documentation for admin.addNewColumnToTable() ([#643](https://github.com/scalar-labs/scalardb/pull/643))
- Refactor documents ([#646](https://github.com/scalar-labs/scalardb/pull/646))
- Update Two-phase Commit Transactions document ([#644](https://github.com/scalar-labs/scalardb/pull/644))
- Unify schema document and Schema Loader document ([#647](https://github.com/scalar-labs/scalardb/pull/647))
- Update API Guide ([#662](https://github.com/scalar-labs/scalardb/pull/662))
