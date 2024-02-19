# ScalarDB 3.12 Release Notes

This page includes a list of release notes for ScalarDB 3.12.

## v3.12.0

**Release date:** February 17, 2024

## Summary

This release has several enhancements, improvements, and bug fixes.

## Community edition

### Enhancements

- Made Cosmos DB consistency level configurable in the Cosmos DB adapter. Users can change the consistency level used for Cosmos DB operations by specifying the property `scalar.db.cosmos.consistency_level`. `STRONG` or `BOUNDED_STALENESS` can be specified. (#1470)

### Improvements

- Added error codes to the error messages. (#1493)

### Bug fixes

- Improved some error handling to avoid potential NPE in JDBC storages. (#1442)
- Fixed a bug where lazy recovery is not performed when uncommitted records are read while executing implicit pre-read. (#1476)

## Enterprise edition

### Enhancements

#### ScalarDB Cluster

- Added support for wire encryption using TLS. When you enable ScalarDB Auth, you should enable wire encryption in production environments to protect the user credentials.
- Added an expiration time for the auth token to the response of the `AuthLogin.Login` endpoint.

### Improvements

#### ScalarDB GraphQL

- Updated several libraries.

#### ScalarDB SQL

- Updated several libraries.

### Bug fixes

#### ScalarDB Cluster

- Fixed a bug where the table or namespace privilege is not handled correctly.
