# ScalarDB 3.10 Release Notes

This page includes a list of release notes for ScalarDB 3.10.

## v3.10.0

**Release date:** July 20, 2023 

### Summary

ScalarDB 3.10 includes many new features, improvements, bug fixes, vulnerability fixes, and documentation updates. Please see the following for a list of detailed changes.

### Change logs

#### Enhancements

- Make transaction metadata nullable to support existing databases ([#841](https://github.com/scalar-labs/scalardb/pull/841))
- Add validation for consensus commit mutation operation ([#873](https://github.com/scalar-labs/scalardb/pull/873))
- Add an interface to add conditions in ScanAll ([#889](https://github.com/scalar-labs/scalardb/pull/889))
- Add relational scan for JDBC storage and consensus commit transaction ([#900](https://github.com/scalar-labs/scalardb/pull/900))
- Support condition for transactional operations ([#899](https://github.com/scalar-labs/scalardb/pull/899))
- Add relational scan for JDBC transactions ([#925](https://github.com/scalar-labs/scalardb/pull/925))
- Add integration tests for MariaDB to CI ([#916](https://github.com/scalar-labs/scalardb/pull/916))
- Add join() to DistributedTransactionManager ([#944](https://github.com/scalar-labs/scalardb/pull/944))
- Add table importing feature ([#931](https://github.com/scalar-labs/scalardb/pull/931))

#### Improvements

- Bump com.azure:azure-cosmos from 4.44.0 to 4.45.0 ([#883](https://github.com/scalar-labs/scalardb/pull/883))
- Add GHA workflow to automatically create pull requests to apply a merged PR changes ([#884](https://github.com/scalar-labs/scalardb/pull/884))
- Bump slackapi/slack-github-action from 1.23.0 to 1.24.0 ([#886](https://github.com/scalar-labs/scalardb/pull/886))
- Bump com.azure:azure-cosmos from 4.45.0 to 4.45.1 ([#887](https://github.com/scalar-labs/scalardb/pull/887))
- Remove untagged container images ([#890](https://github.com/scalar-labs/scalardb/pull/890))
- Bump com.oracle.database.jdbc:ojdbc8 from 21.9.0.0 to 21.10.0.0 ([#892](https://github.com/scalar-labs/scalardb/pull/892))
- Bump dropwizardMetricsVersion from 4.2.18 to 4.2.19 ([#895](https://github.com/scalar-labs/scalardb/pull/895))
- Bump info.picocli:picocli from 4.7.3 to 4.7.4 ([#896](https://github.com/scalar-labs/scalardb/pull/896))
- Handle PRs created by dependabot in auto-pr GHA workflow ([#898](https://github.com/scalar-labs/scalardb/pull/898))
- Bump com.azure:azure-cosmos from 4.45.1 to 4.46.0 ([#904](https://github.com/scalar-labs/scalardb/pull/904))
- Bump com.scalar-labs:scalar-admin from 2.1.0 to 2.1.1 ([#910](https://github.com/scalar-labs/scalardb/pull/910))
- Bump com.scalar-labs:scalar-admin from 2.1.1 to 2.1.2 ([#918](https://github.com/scalar-labs/scalardb/pull/918))
- Bump com.azure:azure-cosmos from 4.46.0 to 4.47.0 ([#929](https://github.com/scalar-labs/scalardb/pull/929))
- Revise Javadoc for exceptions ([#930](https://github.com/scalar-labs/scalardb/pull/930))
- Add integration tests for transaction with relational scan ([#913](https://github.com/scalar-labs/scalardb/pull/913))
- Add a constructor to UnsatisfiedConditionException ([#917](https://github.com/scalar-labs/scalardb/pull/917))
- Improve some `toString` expressions of Selection Operators ([#920](https://github.com/scalar-labs/scalardb/pull/920))

#### Bug fixes

- Bump scalar-labs/jre8 from 1.1.12 to 1.1.13 in /server ([#881](https://github.com/scalar-labs/scalardb/pull/881))
- Bump scalar-labs/jre8 from 1.1.12 to 1.1.13 in /schema-loader ([#882](https://github.com/scalar-labs/scalardb/pull/882))
- Use a proper PAT in the GHA workflow for automated PR creation ([#885](https://github.com/scalar-labs/scalardb/pull/885))
- Use the original Git commit author info not a response from GitHub API for the automated PR creation workflow ([#891](https://github.com/scalar-labs/scalardb/pull/891))
- Fix the wrong argument validations in Auto PR workflow ([#906](https://github.com/scalar-labs/scalardb/pull/906))
- Bump scalar-labs/jre8 from 1.1.13 to 1.1.14 in /schema-loader ([#903](https://github.com/scalar-labs/scalardb/pull/903))
- Bump scalar-labs/jre8 from 1.1.13 to 1.1.14 in /server ([#902](https://github.com/scalar-labs/scalardb/pull/902))
- Fix relational scan builder to keep ordering information and so on ([#908](https://github.com/scalar-labs/scalardb/pull/908))
- Bump org.xerial:sqlite-jdbc from 3.41.2.1 to 3.42.0.0 ([#888](https://github.com/scalar-labs/scalardb/pull/888))
- Run `git cherry-pick --abort` after it fails ([#924](https://github.com/scalar-labs/scalardb/pull/924))
- Records should not be rolled back in rollback() when the transaction state is marked as COMMITTED in 2PC ([#909](https://github.com/scalar-labs/scalardb/pull/909))
- Avoid decrementing outstanding requests counter duplicately ([#935](https://github.com/scalar-labs/scalardb/pull/935))
- Should call abort() when aborting transaction in transaction wrapper classes ([#919](https://github.com/scalar-labs/scalardb/pull/919))
- Fix [CVE-2023-1428](https://github.com/advisories/GHSA-6628-q6j9-w8vg "CVE-2023-1428") and [CVE-2023-32731](https://github.com/advisories/GHSA-cfgp-2977-2fmm "CVE-2023-32731") ([#943](https://github.com/scalar-labs/scalardb/pull/943))
- Fix [CVE-2023-2976](https://github.com/advisories/GHSA-7g45-4rm6-3mm3 "CVE-2023-2976") ([#954](https://github.com/scalar-labs/scalardb/pull/954))
- Fix utility method to check transactional table metadata ([#950](https://github.com/scalar-labs/scalardb/pull/950))

#### Documentation

- Change HTML syntax to Markdown for images (master) ([#880](https://github.com/scalar-labs/scalardb/pull/880))
- Improve documents for Handle Exceptions ([#897](https://github.com/scalar-labs/scalardb/pull/897))
- Move Jekyll files for redirecting from the docs site hosted in this repository to the new docs site ([#907](https://github.com/scalar-labs/scalardb/pull/907))
- Revise configuration related documents ([#905](https://github.com/scalar-labs/scalardb/pull/905))
- Update the ScalarDB dependency version to 3.9.1 ([#927](https://github.com/scalar-labs/scalardb/pull/927))
- Add a redirect from the docs site hosted in this repository to the new docs site ([#901](https://github.com/scalar-labs/scalardb/pull/901))
- Revise document for handling exceptions ([#932](https://github.com/scalar-labs/scalardb/pull/932))
