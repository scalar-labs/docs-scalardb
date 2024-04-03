# ScalarDB 3.8 Release Notes

This page includes a list of release notes for ScalarDB 3.8.

## v3.8.6

**Release date:** April 1, 2024

### Summary

This release includes several improvements.

## v3.8.5

**Release date:** February 26, 2024

### Summary

This release has several vulnerability fixes.

### Bug fixes

- Upgraded the base image to fix security issues. [CVE-2023-47038](https://github.com/advisories/GHSA-96fh-9q43-rmjh "CVE-2023-47038") ([#1522](https://github.com/scalar-labs/scalardb/pull/1522) [#1521](https://github.com/scalar-labs/scalardb/pull/1521))
- Upgraded the PostgresSQL lib to fix security issues. [CVE-2024-1597](https://github.com/advisories/GHSA-24rp-q3w6-vc56 "CVE-2024-1597") ([#1547](https://github.com/scalar-labs/scalardb/pull/1547))

## v3.8.4

**Release date:** December 25, 2023

### Summary

This release has several bug fixes, vulnerability fixes, and document improvements.

### Change logs

#### Bug fixes

- Upgraded the base image to fix security issues. [CVE-2023-4911](https://github.com/advisories/GHSA-m77w-6vjw-wh2f "CVE-2023-4911") [CVE-2023-29491](https://github.com/advisories/GHSA-vh2x-5rx6-qqhv "CVE-2023-29491") ([#1143](https://github.com/scalar-labs/scalardb/pull/1143) [#1144](https://github.com/scalar-labs/scalardb/pull/1144))
- Upgraded the jetty library to 9.4.53.v20231009 to fix security issue. [CVE-2023-36478](https://github.com/advisories/GHSA-wgh7-54f2-x98r "CVE-2023-36478") ([#1142](https://github.com/scalar-labs/scalardb/pull/1142))
- Upgraded grpc-health-probe to fix security issues. [CVE-2023-39325](https://github.com/advisories/GHSA-4374-p667-p6c8 "CVE-2023-39325") [GHSA-m425-mq94-257g](https://github.com/advisories/GHSA-m425-mq94-257g "GHSA-m425-mq94-257g") ([#1297](https://github.com/scalar-labs/scalardb/pull/1297))
- Upgraded the Cosmos DB client lib to fix security issues. [CVE-2023-34062](https://github.com/advisories/GHSA-xjhv-p3fv-x24r "CVE-2023-34062") ([#1348](https://github.com/scalar-labs/scalardb/pull/1348))

## v3.8.3

**Release date:** August 7, 2023

### Summary

This release has several bug fixes and vulnerability fixes.

### Change logs

#### Bug fixes

- Avoid decrementing outstanding requests counter duplicately ([#935](https://github.com/scalar-labs/scalardb/pull/935))
- Fix [CVE-2023-1428](https://github.com/advisories/GHSA-6628-q6j9-w8vg "CVE-2023-1428") and [CVE-2023-32731](https://github.com/advisories/GHSA-cfgp-2977-2fmm "CVE-2023-32731") ([#943](https://github.com/scalar-labs/scalardb/pull/943))
- Fix [CVE-2023-2976](https://github.com/advisories/GHSA-7g45-4rm6-3mm3 "CVE-2023-2976") ([#954](https://github.com/scalar-labs/scalardb/pull/954))

## v3.8.2

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
- Should call abort() when aborting transaction in transaction wrapper classes ([#919](https://github.com/scalar-labs/scalardb/pull/919))

#### Documentation

- Change HTML syntax to Markdown for images (3.8) ([#878](https://github.com/scalar-labs/scalardb/pull/878))

## v3.8.1

**Release date:** April 28, 2023

### Summary

This release has several vulnerability fixes.

### Change logs

#### Bug fixes

- Fix [CVE-2023-0361](https://github.com/advisories/GHSA-5547-g9w2-52xj "CVE-2023-0361") and [CVE-2022-41723](https://github.com/advisories/GHSA-vvpx-j8f3-3w6h "CVE-2022-41723") ([#834](https://github.com/scalar-labs/scalardb/pull/834))
- Fix [CVE-2022-41721](https://github.com/advisories/GHSA-fxg5-wq6x-vr4w "CVE-2022-41721") ([#808](https://github.com/scalar-labs/scalardb/pull/808))
- Fix [CVE-2023-0286](https://github.com/advisories/GHSA-x4qr-2fvf-3mr5 "CVE-2023-0286") ([#821](https://github.com/scalar-labs/scalardb/pull/821))

## v3.8.0

**Release date:** January 17, 2023 

### Summary

This release has a lot of enhancements, improvements, bug fixes, vulnerability fixes, and document improvements. Please see Change logs for the details.

### Change logs

#### Enhancements

- Remove suspend() from TwoPhaseCommitTransactionManager ([#715](https://github.com/scalar-labs/scalardb/pull/715))
- Update release workflow to push container to ECR of Marketplace ([#699](https://github.com/scalar-labs/scalardb/pull/699))
- Add resume() to DistributedTransactionManager ([#717](https://github.com/scalar-labs/scalardb/pull/717))
- Add several methods to ActiveExpiringMap ([#722](https://github.com/scalar-labs/scalardb/pull/722))
- Allow to use placeholders in configuration values ([#770](https://github.com/scalar-labs/scalardb/pull/770))
- Add configurations for gRPC ([#776](https://github.com/scalar-labs/scalardb/pull/776))

#### Improvements

- Refactor server integration tests ([#663](https://github.com/scalar-labs/scalardb/pull/663))
- Use toUpperCase() for valueOf() of enum type ([#666](https://github.com/scalar-labs/scalardb/pull/666))
- Use ServiceLoader to load storage and transaction modules ([#661](https://github.com/scalar-labs/scalardb/pull/661))
- Improve error messages in OperationChecker ([#667](https://github.com/scalar-labs/scalardb/pull/667))
- Add logging for UnknownTransactionStatusException in Scalar DB Server ([#669](https://github.com/scalar-labs/scalardb/pull/669))
- Refactor JdbcAdminTest ([#670](https://github.com/scalar-labs/scalardb/pull/670))
- Refactor CosmosAdminTest ([#671](https://github.com/scalar-labs/scalardb/pull/671))
- Rename endpoint override config in Dynamo ([#672](https://github.com/scalar-labs/scalardb/pull/672))
- Enable EI_EXPOSE_REP and EI_EXPOSE_REP2 in SpotBugs ([#668](https://github.com/scalar-labs/scalardb/pull/668))
- Enable parallel/async commit by default ([#676](https://github.com/scalar-labs/scalardb/pull/676))
- Add more checks for conditions for Dynamo and Cosmos ([#675](https://github.com/scalar-labs/scalardb/pull/675))
- Refactor schema loader integration tests ([#673](https://github.com/scalar-labs/scalardb/pull/673))
- Delete setDriver() for BasicDataSource in JDBC ([#682](https://github.com/scalar-labs/scalardb/pull/682))
- Use DistributedTransactionAdmin for transaction tables in SchemaOperator ([#684](https://github.com/scalar-labs/scalardb/pull/684))
- Delete licenses ([#686](https://github.com/scalar-labs/scalardb/pull/686))
- Suppress exception thrown when deleting scalable target and scaling policy when using DynamoDB local. ([#683](https://github.com/scalar-labs/scalardb/pull/683))
- Upgrade Spotless Gradle Plugin ([#694](https://github.com/scalar-labs/scalardb/pull/694))
- Fix typo in admin integration test classes ([#695](https://github.com/scalar-labs/scalardb/pull/695))
- Move integration test base code to subproject ([#697](https://github.com/scalar-labs/scalardb/pull/697))
- Refactor ServiceLoader related classes ([#698](https://github.com/scalar-labs/scalardb/pull/698))
- Make the ConsensusCommitAdmin only return transaction table ([#702](https://github.com/scalar-labs/scalardb/pull/702))
- Add external Scalar DB property file support to getting-started application ([#701](https://github.com/scalar-labs/scalardb/pull/701))
- Refactor ConsensusCommitAdmin unit test ([#704](https://github.com/scalar-labs/scalardb/pull/704))
- In the Cosmos DB job of the CI, add a step to clean up gradle daemon logs file ([#705](https://github.com/scalar-labs/scalardb/pull/705))
- Disable include metadata tests if external server used in server integration tests ([#711](https://github.com/scalar-labs/scalardb/pull/711))
- Refactor consensus commit specific integration tests ([#713](https://github.com/scalar-labs/scalardb/pull/713))
- Refactor two-phase commit transaction integration tests ([#712](https://github.com/scalar-labs/scalardb/pull/712))
- Small integration test modifications for the resume feature ([#724](https://github.com/scalar-labs/scalardb/pull/724))
- Should throw IllegalStateException when transaction is not found and already exists ([#718](https://github.com/scalar-labs/scalardb/pull/718))
- Add transaction state management ([#719](https://github.com/scalar-labs/scalardb/pull/719))
- Separate active transaction management from AbstractDistributedTransactionManager and AbstractTwoPhaseCommitTransactionManager ([#723](https://github.com/scalar-labs/scalardb/pull/723))
- Fix dependency and spotbugs issues for >JDK 8 ([#728](https://github.com/scalar-labs/scalardb/pull/728))
- Fix two unit tests of OperationChecker ([#731](https://github.com/scalar-labs/scalardb/pull/731))
- Throw an exception when putting an empty value to a secondary index column in Dynamo DB ([#729](https://github.com/scalar-labs/scalardb/pull/729))
- Make JDK11+ use the same google java format version as JDK8 uses ([#734](https://github.com/scalar-labs/scalardb/pull/734))
- Make ParallelExecutor workers daemon thread ([#733](https://github.com/scalar-labs/scalardb/pull/733))
- Move vuln check to a separate daily workflow ([#737](https://github.com/scalar-labs/scalardb/pull/737))
- Conduct daily vulnerability checks on releases not only on `main` branch ([#741](https://github.com/scalar-labs/scalardb/pull/741))
- Should drop namespace only when no tables are in the namespace in Schema Loader ([#740](https://github.com/scalar-labs/scalardb/pull/740))
- Move common classes ([#744](https://github.com/scalar-labs/scalardb/pull/744))
- Throw TransactionNotFoundException when resuming a transaction but it's not found ([#746](https://github.com/scalar-labs/scalardb/pull/746))
- Post the vulnerability check result to Slack channel ([#745](https://github.com/scalar-labs/scalardb/pull/745))
- Deprecate getPartitionKey() and getClusteringKey() of Result ([#750](https://github.com/scalar-labs/scalardb/pull/750))
- Remove usages of getPartitionKey() and getClusteringKey() of Result from integration tests ([#751](https://github.com/scalar-labs/scalardb/pull/751))
- Validate contact points size in XxxxConfig to avoid "java.lang.ArrayIndexOutOfBoundsException: 0" ([#752](https://github.com/scalar-labs/scalardb/pull/752))
- Make integration test bases for transaction extendable ([#754](https://github.com/scalar-labs/scalardb/pull/754))
- Refactor server integration tests ([#755](https://github.com/scalar-labs/scalardb/pull/755))
- Small modifications for Javadoc and comments ([#756](https://github.com/scalar-labs/scalardb/pull/756))
- Should close admin in afterEach() in the repair integration tests ([#767](https://github.com/scalar-labs/scalardb/pull/767))
- build(fix): bump-up protobufVersion to 3.21.12 (latest) ([#760](https://github.com/scalar-labs/scalardb/pull/760))
- Refactor prepare logic ([#771](https://github.com/scalar-labs/scalardb/pull/771))
- Update Scheduled Vulnerability Check workflow ([#749](https://github.com/scalar-labs/scalardb/pull/749))
- Refactor validation logic ([#775](https://github.com/scalar-labs/scalardb/pull/775))
- Add transaction decorator ([#781](https://github.com/scalar-labs/scalardb/pull/781))
- Revisit commit and abort state logic ([#783](https://github.com/scalar-labs/scalardb/pull/783))
- Should synchronize in active transaction management ([#785](https://github.com/scalar-labs/scalardb/pull/785))
- Allow commit() and rollback() to be called in parallel in all coordinator/participant processes in 2PC transactions ([#786](https://github.com/scalar-labs/scalardb/pull/786))
- Load admins lazily in Schema Loader ([#792](https://github.com/scalar-labs/scalardb/pull/792))
- Rename Scalar DB to ScalarDB ([#795](https://github.com/scalar-labs/scalardb/pull/795))
- DynamoDB supports up to 100 actions per transaction ([#796](https://github.com/scalar-labs/scalardb/pull/796))
- Revert async commit default value ([#797](https://github.com/scalar-labs/scalardb/pull/797))

#### Bug fixes

- Should support `--config=` and `-c=` styles for configuration file option in Schema Loader ([#690](https://github.com/scalar-labs/scalardb/pull/690))
- Fix [CVE-2021-3999](https://github.com/advisories/GHSA-vfch-2fr8-r5c2 "CVE-2021-3999"), [CVE-2022-1586](https://github.com/advisories/GHSA-f3pv-9fwh-mp3x "CVE-2022-1586") and [CVE-2022-1587](https://github.com/advisories/GHSA-jmvm-hj36-w5hc "CVE-2022-1587") ([#700](https://github.com/scalar-labs/scalardb/pull/700))
- Commit/rollback records should always be done for all records even on error ([#680](https://github.com/scalar-labs/scalardb/pull/680))
- Should use partition key and clustering key from result in recovery ([#681](https://github.com/scalar-labs/scalardb/pull/681))
- Fix typo in integration-test/archive.gradle ([#706](https://github.com/scalar-labs/scalardb/pull/706))
- Fix [CVE-2022-27664](https://github.com/advisories/GHSA-69cg-p879-7622 "CVE-2022-27664") ([#716](https://github.com/scalar-labs/scalardb/pull/716))
- Should check the value range of BigIntColumn ([#720](https://github.com/scalar-labs/scalardb/pull/720))
- Fix [CVE-2022-32149](https://github.com/advisories/GHSA-69ch-w2m2-3vjp "CVE-2022-32149") ([#727](https://github.com/scalar-labs/scalardb/pull/727))
- Fix [CVE-2022-42003](https://github.com/advisories/GHSA-jjjh-jjxp-wpff "CVE-2022-42003") and [CVE-2022-42004](https://github.com/advisories/GHSA-rgv9-q543-rqg4 "CVE-2022-42004") ([#726](https://github.com/scalar-labs/scalardb/pull/726))
- Fix dependency errors for Maven projects ([#735](https://github.com/scalar-labs/scalardb/pull/735))
- Fix typos in exception messages ([#714](https://github.com/scalar-labs/scalardb/pull/714))
- Update protobuf and grpc to fix [CVE-2022-3171](https://github.com/advisories/GHSA-h4h5-3hr4-j3g2 "CVE-2022-3171") ([#738](https://github.com/scalar-labs/scalardb/pull/738))
- Fix [CVE-2022-40151](https://github.com/advisories/GHSA-f8cc-g7j8-xxpm "CVE-2022-40151") and [CVE-2022-40152](https://github.com/advisories/GHSA-3f7h-mf4q-vrm4 "CVE-2022-40152") ([#743](https://github.com/scalar-labs/scalardb/pull/743))
- Upgrade docker image version to fix [CVE-2021-46848](https://github.com/advisories/GHSA-6468-68pw-9chw "CVE-2021-46848") ([#766](https://github.com/scalar-labs/scalardb/pull/766))
- Fix [CVE-2022-21363](https://github.com/advisories/GHSA-g76j-4cxx-23h9 "CVE-2022-21363") and [CVE-2021-2471](https://github.com/advisories/GHSA-w6f2-8wx4-47r5 "CVE-2021-2471") ([#773](https://github.com/scalar-labs/scalardb/pull/773))
- Fix [CVE-2022-41946](https://github.com/advisories/GHSA-562r-vg33-8x8h "CVE-2022-41946") ([#774](https://github.com/scalar-labs/scalardb/pull/774))
- fix: DynamoAdmin.namespaceExists to check full namespace (not prefix) ([#782](https://github.com/scalar-labs/scalardb/pull/782))
- Should care about ScanWithIndex in ScalarDbUtils.copyAndSetTargetToIfNot() ([#793](https://github.com/scalar-labs/scalardb/pull/793))
- Fix CVE-2022-42898 ([#794](https://github.com/scalar-labs/scalardb/pull/794))

#### Documentation

- Remove readthedocs ([#664](https://github.com/scalar-labs/scalardb/pull/664))
- Move Schema Loader document to docs directory ([#665](https://github.com/scalar-labs/scalardb/pull/665))
- Fix Javadoc warnings ([#685](https://github.com/scalar-labs/scalardb/pull/685))
- Update the Scalar DB supported database matrix with Scalar DB 3.7 ([#703](https://github.com/scalar-labs/scalardb/pull/703))
- Add description of limitations of data types ([#721](https://github.com/scalar-labs/scalardb/pull/721))
- Fix the broken link in the backup document ([#725](https://github.com/scalar-labs/scalardb/pull/725))
- Remove unnecessary key definition from API guide ([#742](https://github.com/scalar-labs/scalardb/pull/742))
- Add note for Put/Delete operation in the API guide ([#747](https://github.com/scalar-labs/scalardb/pull/747))
- Add ScalarDB Server's license description in the README ([#753](https://github.com/scalar-labs/scalardb/pull/753))
- docs: Clearer description on when to use online backups ([#761](https://github.com/scalar-labs/scalardb/pull/761))
- Add description how to build docker image of ScalarDB Server ([#779](https://github.com/scalar-labs/scalardb/pull/779))
- Update slides links ([#789](https://github.com/scalar-labs/scalardb/pull/789))
