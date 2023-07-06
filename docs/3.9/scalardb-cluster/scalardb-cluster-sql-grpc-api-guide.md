# ScalarDB Cluster SQL gRPC API Guide

This document describes the ScalarDB Cluster SQL gRPC API.

ScalarDB Cluster SQL provides a Java API that uses the gRPC API internally.
If you use Java or a JVM language, you can use the Java API instead of the ScalarDB Cluster SQL gRPC API directly.
For details about the Java API, see [Developer Guide for ScalarDB Cluster with the Java API](developer-guide-for-scalardb-cluster-with-java-api.md).

For details about the services and messages for the ScalarDB Cluster gRPC API, see the definitions in [scalardb-cluster.proto](../rpc/src/main/proto/scalardb-cluster.proto).

ScalarDB Cluster SQL gRPC API is composed of the following services:

- `scalardb.cluster.rpc.v1.sql.SqlTransaction`: Provides a transaction capability for ScalarDB Cluster SQL.
- `scalardb.cluster.rpc.v1.sql.SqlTwoPhaseCommitTransaction`: Provides a two-phase commit transaction capability for ScalarDB Cluster SQL.
- `scalardb.cluster.rpc.v1.sql.Metadata`: Provides a metadata view of ScalarDB Cluster SQL.

The following sections describe how to use each service.

## Overview of error handling in ScalarDB Cluster SQL gRPC API

Before describing how to use each service, this section explains how error handling works in ScalarDB Cluster SQL gRPC API.

ScalarDB Cluster SQL gRPC API employs [Richer error model](https://grpc.io/docs/guides/error/#richer-error-model) for error handling.
This model enables servers to return and enables clients to consume additional error details expressed as one or more protobuf messages.
ScalarDB Cluster SQL gRPC API uses `google.rpc.ErrorInfo`, which is one of the [standard set of error message types](https://github.com/googleapis/googleapis/blob/master/google/rpc/error_details.proto), and puts additional error details in `ErrorInfo` fields.

`ErrorInfo` has the following fields:

- `reason`: A string that provides a short description of the error. The following sections describe the possible values of `reason` in each service.
- `domain`: A string that indicates the error's origin. In ScalarDB Cluster SQL gRPC API, this string is always set to `com.scalar.db.cluster.sql`.
- `metadata`: A map of metadata for the specific error. In ScalarDB Cluster SQL gRPC API, a transaction ID with the `transactionId` key in the map is put if the error is related to a transaction.

If you encounter an error, you can retrieve `ErrorInfo` from `google.rpc.Status` in the gRPC response, but the method for doing so depends on the programming language.
Please refer to the appropriate documentation to understand how to get `ErrorInfo` in your specific programming language.

## How to use the `SqlTransaction` service

The `SqlTransaction` service provides the following RPCs:

- `Begin`: Begins a transaction.
- `Execute` Executes a SQL statement.
- `Commit`: Commits a transaction.
- `Rollback`: Rolls back a transaction.

First, you call `Begin` to initiate a transaction.
Following that, you can call `Execute` to read, write, and delete records.
To finalize the transaction, call `Commit`.
Alternatively, you can call `Rollback` at any time before the transaction is committed to cancel it.
By calling `Begin`, you receive a transaction ID in the response, which you can then use to call `Execute`, `Commit`,  and `Rollback`.

Also, you can call `Execute` without a transaction ID to execute a one-shot transaction.
In this case, the transaction is automatically committed after it is executed.
You can use this method to execute DDL statements as well.
For details on the supported SQL statements, refer to [ScalarDB SQL Grammar](https://github.com/scalar-labs/scalardb-sql/blob/main/docs/grammar.md).
Please note, however, that `Execute` supports only DML and DDL statements.

When you call `Begin`, you can optionally specify a transaction ID.
If you specify a transaction ID, the user is responsible for guaranteeing the uniqueness of the ID.
If you do not specify a transaction ID, ScalarDB Cluster will generate a transaction ID for the transaction.

You need to set `RequestHeader` for each RPC request.
`RequestHeader` contains a `hop_limit` field, which restricts the number of hops for a request.
The purpose of the `hop_limit` is to prevent infinite loops within the cluster.
Each time a request is forwarded to another cluster node, the `hop_limit` decreases by one.
If the `hop_limit` reaches zero, the request will be rejected.

### Error handling

The table below shows the status code and the possible values of `reason` in `ErrorInfo` in each RPC in the `SqlTransaction` service:

| RPC      | Status code         | `reason` in `ErrorInfo`    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|----------|---------------------|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Begin    | INVALID_ARGUMENT    | ILLEGAL_ARGUMENT           | The argument in the request message is invalid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Begin    | FAILED_PRECONDITION | ILLEGAL_STATE              | The RPC was called in an invalid state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Begin    | INTERNAL            | HOP_LIMIT_EXCEEDED         | The hop limit was exceeded. This occurs when the routing information between cluster nodes is inconsistent. The error is usually resolved in a short amount of time, so you can retry the transaction from the beginning after some time has passed since encountering this error.                                                                                                                                                                                                                                      |
| Begin    | INTERNAL            | INTERNAL_ERROR             | An unexpected internal error occurred on the server side.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Execute  | INVALID_ARGUMENT    | ILLEGAL_ARGUMENT           | The argument in the request message is invalid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Execute  | FAILED_PRECONDITION | ILLEGAL_STATE              | The RPC was called in an invalid state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Execute  | NOT_FOUND           | TRANSACTION_NOT_FOUND      | The transaction associated with the specified transaction ID was not found. This error indicates that the transaction has expired or the routing information has been updated due to cluster topology changes. In this case, please retry the transaction from the beginning.                                                                                                                                                                                                                                           |
| Execute  | INTERNAL            | HOP_LIMIT_EXCEEDED         | The hop limit was exceeded. This occurs when the routing information between cluster nodes is inconsistent. The error is usually resolved in a short amount of time, so you can retry the transaction from the beginning after some time has passed since encountering this error.                                                                                                                                                                                                                                      |
| Execute  | FAILED_PRECONDITION | TRANSACTION_CONFLICT       | A transaction conflict occurred. If you encounter this error, please retry the transaction from the beginning.                                                                                                                                                                                                                                                                                                                                                                                                          |
| Execute  | INTERNAL            | INTERNAL_ERROR             | An unexpected internal error occurred on the server side.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Commit   | INVALID_ARGUMENT    | ILLEGAL_ARGUMENT           | The argument in the request message is invalid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Commit   | FAILED_PRECONDITION | ILLEGAL_STATE              | The RPC was called in an invalid state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Commit   | NOT_FOUND           | TRANSACTION_NOT_FOUND      | The transaction associated with the specified transaction ID was not found. This error indicates that the transaction has expired or the routing information has been updated due to cluster topology changes. In this case, please retry the transaction from the beginning.                                                                                                                                                                                                                                           |
| Commit   | INTERNAL            | HOP_LIMIT_EXCEEDED         | The hop limit was exceeded. This occurs when the routing information between cluster nodes is inconsistent. The error is usually resolved in a short amount of time, so you can retry the transaction from the beginning after some time has passed since encountering this error.                                                                                                                                                                                                                                      |
| Commit   | FAILED_PRECONDITION | TRANSACTION_CONFLICT       | A transaction conflict occurred. If you encounter this error, please retry the transaction from the beginning.                                                                                                                                                                                                                                                                                                                                                                                                          |
| Commit   | INTERNAL            | UNKNOWN_TRANSACTION_STATUS | The status of the transaction is unknown (it is uncertain whether the transaction was successfully committed or not). In this situation, you need to check whether the transaction was successfully committed, and if not, to retry it. The responsibility for determining the transaction status rests with the users. It may be beneficial to create a transaction status table and update it in conjunction with other application data so that you can determine the status of a transaction from the table itself. |
| Commit   | INTERNAL            | INTERNAL_ERROR             | An unexpected internal error occurred on the server side.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Rollback | INVALID_ARGUMENT    | ILLEGAL_ARGUMENT           | The argument in the request message is invalid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Rollback | FAILED_PRECONDITION | ILLEGAL_STATE              | The RPC was called in an invalid state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Rollback | NOT_FOUND           | TRANSACTION_NOT_FOUND      | The transaction associated with the specified transaction ID was not found. In case of a rollback, you do not need to retry the transaction because the transaction will expire automatically.                                                                                                                                                                                                                                                                                                                          |
| Rollback | INTERNAL            | HOP_LIMIT_EXCEEDED         | The hop limit was exceeded. In case of a rollback, you do not need to retry the transaction because the transaction will expire automatically.                                                                                                                                                                                                                                                                                                                                                                          |
| Rollback | INTERNAL            | INTERNAL_ERROR             | An unexpected internal error occurred on the server side.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

If you encounter an error, you should roll back the transaction, except in the case of `Begin`.
Then, you can retry the transaction from the beginning for the errors that can be resolved by retrying.

Besides the errors listed above, you may encounter errors returned by the gRPC library.
In these cases, the response will not contain `ErrorInfo`.
For details, refer to the [gRPC documentation](https://grpc.io/docs/guides/error/#error-status-codes).

You can set a deadline for each RPC in gRPC.
If the deadline is exceeded, you will receive a `DEADLINE_EXCEEDED` error.
In general, you should roll back the transaction in this situation, unless the RPC is `Begin` or `Commit`.
In the case of `Commit`, the situation is equivalent to `UNKNOWN_TRANSACTION_STATUS` (it is uncertain whether the transaction was successfully committed or not), and you must handle the error in the same way.

## How to use the `SqlTwoPhaseCommitTransaction` service

The `SqlTwoPhaseCommitTransaction` service provides the following RPCs:

- `Begin`: Begins a transaction.
- `Join`: Joins a transaction.
- `Execute` Executes a SQL statement.
- `Prepare`: Prepares a transaction.
- `Validate`: Validates a transaction.
- `Commit`: Commits a transaction.
- `Rollback`: Rolls back a transaction.

First, you call `Begin` to initiate a transaction if you are the coordinator process.
Alternatively, if you are a participant process, you can call `Join` to take part in a transaction that the coordinator has already begun.
Following that, you can call `Execute` to read, write, and delete records.
To finalize the transaction, call `Prepare`, `Validate`, and then `Commit` in order.
Alternatively, you can call `Rollback` at any time before the transaction is committed to cancel it.
By calling `Begin` or `Join`, you receive a transaction ID in the response, which you can then use to call `Execute`, `Prepare`, `Validate`, `Commit`, and `Rollback`.

In addition, you can call `Execute` without a transaction ID to execute a one-shot transaction.
In this case, the transaction is automatically committed after it is executed.
You can use this method to execute DDL statements as well. For details on the supported SQL statements, refer to [ScalarDB SQL Grammar](https://github.com/scalar-labs/scalardb-sql/blob/main/docs/grammar.md).
Please note, however, that `Execute` supports only DML and DDL statements.

When you call `Begin`, you can optionally specify a transaction ID.
If you specify a transaction ID, the user is responsible for guaranteeing the uniqueness of the ID.
If you do not specify a transaction ID, ScalarDB Cluster will generate a transaction ID for the transaction.

You need to set `RequestHeader` for each RPC request.
`RequestHeader` contains a `hop_limit` field, which restricts the number of hops for a request.
The purpose of the `hop_limit` is to prevent infinite loops within the cluster.
Each time a request is forwarded to another cluster node, the `hop_limit` decreases by one.
If the `hop_limit` reaches zero, the request will be rejected.

### Error handling

The table below shows the status code and the possible values of `reason` in `ErrorInfo` in each RPC in the `SqlTwoPhaseCommitTransaction` service:

| RPC               | Status code         | `reason` in `ErrorInfo`    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|-------------------|---------------------|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Begin, Join       | INVALID_ARGUMENT    | ILLEGAL_ARGUMENT           | The argument in the request message is invalid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Begin, Join       | FAILED_PRECONDITION | ILLEGAL_STATE              | The RPC was called in an invalid state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Begin, Join       | INTERNAL            | HOP_LIMIT_EXCEEDED         | The hop limit was exceeded. This occurs when the routing information between cluster nodes is inconsistent. The error is usually resolved in a short amount of time, so you can retry the transaction from the beginning after some time has passed since encountering this error.                                                                                                                                                                                                                                      |
| Begin, Join       | INTERNAL            | INTERNAL_ERROR             | An unexpected internal error occurred on the server side.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Execute           | INVALID_ARGUMENT    | ILLEGAL_ARGUMENT           | The argument in the request message is invalid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Execute           | FAILED_PRECONDITION | ILLEGAL_STATE              | The RPC was called in an invalid state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Execute           | NOT_FOUND           | TRANSACTION_NOT_FOUND      | The transaction associated with the specified transaction ID was not found. This error indicates that the transaction has expired or the routing information has been updated due to cluster topology changes. In this case, please retry the transaction from the beginning.                                                                                                                                                                                                                                           |
| Execute           | INTERNAL            | HOP_LIMIT_EXCEEDED         | The hop limit was exceeded. This occurs when the routing information between cluster nodes is inconsistent. The error is usually resolved in a short amount of time, so you can retry the transaction from the beginning after some time has passed since encountering this error.                                                                                                                                                                                                                                      |
| Execute           | FAILED_PRECONDITION | TRANSACTION_CONFLICT       | A transaction conflict occurred. If you encounter this error, please retry the transaction from the beginning.                                                                                                                                                                                                                                                                                                                                                                                                          |
| Execute           | INTERNAL            | INTERNAL_ERROR             | An unexpected internal error occurred on the server side.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Prepare, Validate | INVALID_ARGUMENT    | ILLEGAL_ARGUMENT           | The argument in the request message is invalid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Prepare, Validate | FAILED_PRECONDITION | ILLEGAL_STATE              | The RPC was called in an invalid state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Prepare, Validate | NOT_FOUND           | TRANSACTION_NOT_FOUND      | The transaction associated with the specified transaction ID was not found. This error indicates that the transaction has expired or the routing information has been updated due to cluster topology changes. In this case, please retry the transaction from the beginning.                                                                                                                                                                                                                                           |
| Prepare, Validate | INTERNAL            | HOP_LIMIT_EXCEEDED         | The hop limit was exceeded. This occurs when the routing information between cluster nodes is inconsistent. The error is usually resolved in a short amount of time, so you can retry the transaction from the beginning after some time has passed since encountering this error.                                                                                                                                                                                                                                      |
| Prepare, Validate | FAILED_PRECONDITION | TRANSACTION_CONFLICT       | A transaction conflict occurred. If you encounter this error, please retry the transaction from the beginning.                                                                                                                                                                                                                                                                                                                                                                                                          |
| Prepare, Validate | INTERNAL            | INTERNAL_ERROR             | An unexpected internal error occurred on the server side.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Commit            | INVALID_ARGUMENT    | ILLEGAL_ARGUMENT           | The argument in the request message is invalid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Commit            | FAILED_PRECONDITION | ILLEGAL_STATE              | The RPC was called in an invalid state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Commit            | NOT_FOUND           | TRANSACTION_NOT_FOUND      | The transaction associated with the specified transaction ID was not found. This error indicates that the transaction has expired or the routing information has been updated due to cluster topology changes. In this case, please retry the transaction from the beginning.                                                                                                                                                                                                                                           |
| Commit            | INTERNAL            | HOP_LIMIT_EXCEEDED         | The hop limit was exceeded. This occurs when the routing information between cluster nodes is inconsistent. The error is usually resolved in a short amount of time, so you can retry the transaction from the beginning after some time has passed since encountering this error.                                                                                                                                                                                                                                      |
| Commit            | FAILED_PRECONDITION | TRANSACTION_CONFLICT       | A transaction conflict occurred. If you encounter this error, please retry the transaction from the beginning.                                                                                                                                                                                                                                                                                                                                                                                                          |
| Commit            | INTERNAL            | UNKNOWN_TRANSACTION_STATUS | The status of the transaction is unknown (it is uncertain whether the transaction was successfully committed or not). In this situation, you need to check whether the transaction was successfully committed, and if not, to retry it. The responsibility for determining the transaction status rests with the users. It may be beneficial to create a transaction status table and update it in conjunction with other application data so that you can determine the status of a transaction from the table itself. |
| Commit            | INTERNAL            | INTERNAL_ERROR             | An unexpected internal error occurred on the server side.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Rollback          | INVALID_ARGUMENT    | ILLEGAL_ARGUMENT           | The argument in the request message is invalid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Rollback          | FAILED_PRECONDITION | ILLEGAL_STATE              | The RPC was called in an invalid state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Rollback          | NOT_FOUND           | TRANSACTION_NOT_FOUND      | The transaction associated with the specified transaction ID was not found. In case of a rollback, you do not need to retry the transaction because the transaction will expire automatically.                                                                                                                                                                                                                                                                                                                          |
| Rollback          | INTERNAL            | HOP_LIMIT_EXCEEDED         | The hop limit was exceeded. In case of a rollback, you do not need to retry the transaction because the transaction will expire automatically.                                                                                                                                                                                                                                                                                                                                                                          |
| Rollback          | INTERNAL            | INTERNAL_ERROR             | An unexpected internal error occurred on the server side.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

If you encounter an error, you should roll back the transaction, except in the case of `Begin` or `Join`.
Then, you can retry the transaction from the beginning for the errors that can be resolved by retrying.

Besides the errors listed above, you may encounter errors returned by the gRPC library.
In these cases, the response will not contain `ErrorInfo`.
For details, refer to the [gRPC documentation](https://grpc.io/docs/guides/error/#error-status-codes).

You can set a deadline for each RPC in gRPC.
If the deadline is exceeded, you will receive a `DEADLINE_EXCEEDED` error.
In general, you should roll back the transaction in this situation, unless the RPC is `Begin`, `Join`, or `Commit`.
In the case of `Commit`, the situation is equivalent to `UNKNOWN_TRANSACTION_STATUS` (it is uncertain whether the transaction was successfully committed or not), and you must handle the error in the same way.

## How to use the `Metadata` service

The `Metadata` service provides the following RPCs:

- `GetNamespaceMetadata`: Retrieves namespace metadata of the specified namespace.
- `ListTableMetadataInNamespace`: Retrieves table metadata of tables in the specified namespace.
- `GetTableMetadata`: Retrieves table metadata of the specified table.

### Error handling

The table below shows the status code and the possible values of `reason` in `ErrorInfo` for all RPCs in the `Metadata` service:

| Status code         | `reason` in `ErrorInfo`    | Description                                               |
|---------------------|----------------------------|-----------------------------------------------------------|
| INVALID_ARGUMENT    | ILLEGAL_ARGUMENT           | The argument in the request message is invalid.           |
| FAILED_PRECONDITION | ILLEGAL_STATE              | The RPC was called in an invalid state.                   |
| INTERNAL            | INTERNAL_ERROR             | An unexpected internal error occurred on the server side. |

Besides the errors listed above, you may encounter errors returned by the gRPC library.
In these cases, the response will not contain `ErrorInfo`.
For details, refer to the [gRPC documentation](https://grpc.io/docs/guides/error/#error-status-codes).
