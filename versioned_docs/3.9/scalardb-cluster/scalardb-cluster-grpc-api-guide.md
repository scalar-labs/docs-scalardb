# ScalarDB Cluster gRPC API Guide

This document describes the ScalarDB Cluster gRPC API.

ScalarDB Cluster provides a Java API that uses the gRPC API internally.
If you use Java or a JVM language, you can use the Java API instead of the ScalarDB Cluster gRPC API directly.
For details about the Java API, see [Developer Guide for ScalarDB Cluster with the Java API](developer-guide-for-scalardb-cluster-with-java-api.mdx).

For details about the services and messages for the ScalarDB Cluster gRPC API, see the definitions in the `scalardb-cluster.proto` file. For ScalarDB Cluster users who have a commercial license, please [contact us](https://www.scalar-labs.com/contact) if you need the `scalardb-cluster.proto` file.

ScalarDB Cluster gRPC API is composed of the following services:

- `scalardb.cluster.rpc.v1.DistributedTransaction`: Provides a distributed transaction capability for ScalarDB Cluster.
- `scalardb.cluster.rpc.v1.TwoPhaseCommitTransaction`: Provides a two-phase commit transaction capability for ScalarDB Cluster.
- `scalardb.cluster.rpc.v1.DistributedTransactionAdmin`: Provides comprehensive administrative operations.

The following sections describe how to use each service.

## Overview of error handling in ScalarDB Cluster gRPC API

Before describing how to use each service, this section explains how error handling works in ScalarDB Cluster gRPC API.

ScalarDB Cluster gRPC API employs [Richer error model](https://grpc.io/docs/guides/error/#richer-error-model) for error handling.
This model enables servers to return and enables clients to consume additional error details expressed as one or more protobuf messages.
ScalarDB Cluster gRPC API uses `google.rpc.ErrorInfo`, which is one of the [standard set of error message types](https://github.com/googleapis/googleapis/blob/master/google/rpc/error_details.proto), and puts additional error details in `ErrorInfo` fields.

`ErrorInfo` has the following fields:

- `reason`: A string that provides a short description of the error. The following sections describe the possible values of `reason` in each service.
- `domain`: A string that indicates the error's origin. In ScalarDB Cluster gRPC API, this string is always set to `com.scalar.db.cluster`.
- `metadata`: A map of metadata for the specific error. In ScalarDB Cluster gRPC API, a transaction ID with the `transactionId` key in the map is put if the error is related to a transaction.

If you encounter an error, you can retrieve `ErrorInfo` from `google.rpc.Status` in the gRPC response, but the method for doing so depends on the programming language.
Please refer to the appropriate documentation to understand how to get `ErrorInfo` in your specific programming language.

## How to use the `DistributedTransaction` service

The `DistributedTransaction` service provides the following RPCs:

- `Begin`: Begins a transaction.
- `Get`: Retrieves a record.
- `Scan`: Scans records.
- `Put`: Puts a record.
- `Delete`: Deletes a record.
- `Mutate` Mutates records in a partition.
- `Commit`: Commits a transaction.
- `Rollback`: Rolls back a transaction.

First, you call `Begin` to initiate a transaction.
Then, you can call `Get` and `Scan` to read records, `Put` and `Mutate` to write records, and `Delete` and `Mutate` to delete records.
To finalize the transaction, call `Commit`.
Alternatively, you can call `Rollback` at any time before the transaction is committed to cancel it.
By calling `Begin`, you receive a transaction ID in the response, which you can then use to call `Get`, `Scan`, `Put`, `Delete`, `Mutate`, `Commit`, and `Rollback`.

When you call `Begin`, you can optionally specify a transaction ID.
If you specify a transaction ID, the user is responsible for guaranteeing the uniqueness of the ID.
If you do not specify a transaction ID, ScalarDB Cluster will generate a transaction ID for the transaction.

You need to set `RequestHeader` for each RPC request.
`RequestHeader` contains a `hop_limit` field, which restricts the number of hops for a request.
The purpose of the `hop_limit` is to prevent infinite loops within the cluster.
Each time a request is forwarded to another cluster node, the `hop_limit` decreases by one.
If the `hop_limit` reaches zero, the request will be rejected.

### Error handling

The table below shows the status code and the possible values of `reason` in `ErrorInfo` in each RPC in the `DistributedTransaction` service:

| RPC                            | Status code         | `reason` in `ErrorInfo`    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|--------------------------------|---------------------|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Begin                          | INVALID_ARGUMENT    | ILLEGAL_ARGUMENT           | The argument in the request message is invalid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Begin                          | FAILED_PRECONDITION | ILLEGAL_STATE              | The RPC was called in an invalid state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Begin                          | INTERNAL            | HOP_LIMIT_EXCEEDED         | The hop limit was exceeded. This occurs when the routing information between cluster nodes is inconsistent. The error is usually resolved in a short amount of time, so you can retry the transaction from the beginning after some time has passed since encountering this error.                                                                                                                                                                                                                                      |
| Begin                          | INTERNAL            | INTERNAL_ERROR             | The operation has failed due to transient or nontransient faults. You can try retrying the transaction from the beginning, but the transaction may still fail if the cause is nontransient.                                                                                                                                                                                                                                                                                                                             |
| Get, Scan, Put, Delete, Mutate | INVALID_ARGUMENT    | ILLEGAL_ARGUMENT           | The argument in the request message is invalid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Get, Scan, Put, Delete, Mutate | FAILED_PRECONDITION | ILLEGAL_STATE              | The RPC was called in an invalid state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Get, Scan, Put, Delete, Mutate | NOT_FOUND           | TRANSACTION_NOT_FOUND      | The transaction associated with the specified transaction ID was not found. This error indicates that the transaction has expired or the routing information has been updated due to cluster topology changes. In this case, please retry the transaction from the beginning.                                                                                                                                                                                                                                           |
| Get, Scan, Put, Delete, Mutate | INTERNAL            | HOP_LIMIT_EXCEEDED         | The hop limit was exceeded. This occurs when the routing information between cluster nodes is inconsistent. The error is usually resolved in a short amount of time, so you can retry the transaction from the beginning after some time has passed since encountering this error.                                                                                                                                                                                                                                      |
| Get, Scan, Put, Delete, Mutate | FAILED_PRECONDITION | TRANSACTION_CONFLICT       | A transaction conflict occurred. If you encounter this error, please retry the transaction from the beginning.                                                                                                                                                                                                                                                                                                                                                                                                          |
| Get, Scan, Put, Delete, Mutate | INTERNAL            | INTERNAL_ERROR             | The operation has failed due to transient or nontransient faults. You can try retrying the transaction from the beginning, but the transaction may still fail if the cause is nontransient.                                                                                                                                                                                                                                                                                                                             |
| Commit                         | INVALID_ARGUMENT    | ILLEGAL_ARGUMENT           | The argument in the request message is invalid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Commit                         | FAILED_PRECONDITION | ILLEGAL_STATE              | The RPC was called in an invalid state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Commit                         | NOT_FOUND           | TRANSACTION_NOT_FOUND      | The transaction associated with the specified transaction ID was not found. This error indicates that the transaction has expired or the routing information has been updated due to cluster topology changes. In this case, please retry the transaction from the beginning.                                                                                                                                                                                                                                           |
| Commit                         | INTERNAL            | HOP_LIMIT_EXCEEDED         | The hop limit was exceeded. This occurs when the routing information between cluster nodes is inconsistent. The error is usually resolved in a short amount of time, so you can retry the transaction from the beginning after some time has passed since encountering this error.                                                                                                                                                                                                                                      |
| Commit                         | FAILED_PRECONDITION | TRANSACTION_CONFLICT       | A transaction conflict occurred. If you encounter this error, please retry the transaction from the beginning.                                                                                                                                                                                                                                                                                                                                                                                                          |
| Commit                         | INTERNAL            | UNKNOWN_TRANSACTION_STATUS | The status of the transaction is unknown (it is uncertain whether the transaction was successfully committed or not). In this situation, you need to check whether the transaction was successfully committed, and if not, to retry it. The responsibility for determining the transaction status rests with the users. It may be beneficial to create a transaction status table and update it in conjunction with other application data so that you can determine the status of a transaction from the table itself. |
| Commit                         | INTERNAL            | INTERNAL_ERROR             | The operation has failed due to transient or nontransient faults. You can try retrying the transaction from the beginning, but the transaction may still fail if the cause is nontransient.                                                                                                                                                                                                                                                                                                                             |
| Rollback                       | INVALID_ARGUMENT    | ILLEGAL_ARGUMENT           | The argument in the request message is invalid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Rollback                       | FAILED_PRECONDITION | ILLEGAL_STATE              | The RPC was called in an invalid state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Rollback                       | NOT_FOUND           | TRANSACTION_NOT_FOUND      | The transaction associated with the specified transaction ID was not found. In case of a rollback, you do not need to retry the transaction because the transaction will expire automatically.                                                                                                                                                                                                                                                                                                                          |
| Rollback                       | INTERNAL            | HOP_LIMIT_EXCEEDED         | The hop limit was exceeded. In case of a rollback, you do not need to retry the transaction because the transaction will expire automatically.                                                                                                                                                                                                                                                                                                                                                                          |
| Rollback                       | INTERNAL            | INTERNAL_ERROR             | The operation has failed due to transient or nontransient faults. You can try retrying the transaction from the beginning, but the transaction may still fail if the cause is nontransient.                                                                                                                                                                                                                                                                                                                             |

If you encounter an error, you should roll back the transaction, except in the case of `Begin`.
Then, you can retry the transaction from the beginning for the errors that can be resolved by retrying.

Besides the errors listed above, you may encounter errors returned by the gRPC library.
In these cases, the response will not contain `ErrorInfo`.
For details, refer to the [gRPC documentation](https://grpc.io/docs/guides/error/#error-status-codes).

You can set a deadline for each RPC in gRPC.
If the deadline is exceeded, you will receive a `DEADLINE_EXCEEDED` error.
In general, you should roll back the transaction in this situation, unless the RPC is `Begin` or `Commit`.
In the case of `Commit`, the situation is equivalent to `UNKNOWN_TRANSACTION_STATUS` (it is uncertain whether the transaction was successfully committed or not), and you must handle the error in the same way.

## How to use the `TwoPhaseCommitTransaction` service

The `TwoPhaseCommitTransaction` service provides the following RPCs:

- `Begin`: Begins a transaction.
- `Join`: Joins a transaction.
- `Get`: Retrieves a record.
- `Scan`: Scans records.
- `Put`: Puts a record.
- `Delete`: Deletes a record.
- `Mutate`: Mutates records in a partition.
- `Prepare`: Prepares a transaction.
- `Validate`: Validates a transaction.
- `Commit`: Commits a transaction.
- `Rollback`: Rolls back a transaction.

First, you call `Begin` to initiate a transaction if you are the coordinator process.
Alternatively, if you are a participant process, you can call `Join` to take part in a transaction that the coordinator has already begun.
Then, you can call `Get` and `Scan` to read records, `Put` and `Mutate` to write records, and `Delete` and `Mutate` to delete records.
To finalize the transaction, call `Prepare`, `Validate`, and then `Commit` in order.
Alternatively, you can call `Rollback` at any time before the transaction is committed to cancel it.
By calling `Begin` or `Join`, you receive a transaction ID in the response, which you can then use to call `Get`, `Scan`, `Put`, `Delete`, `Mutate`, `Prepare`, `Validate`, `Commit`, and `Rollback`.

When you call `Begin`, you can optionally specify a transaction ID.
If you specify a transaction ID, the user is responsible for guaranteeing the uniqueness of the ID.
If you do not specify a transaction ID, ScalarDB Cluster will generate a transaction ID for the transaction.

You need to set `RequestHeader` for each RPC request.
`RequestHeader` contains a `hop_limit` field, which restricts the number of hops for a request.
The purpose of the `hop_limit` is to prevent infinite loops within the cluster.
Each time a request is forwarded to another cluster node, the `hop_limit` decreases by one.
If the `hop_limit` reaches zero, the request will be rejected.

### Error handling

The table below shows the status code and the possible values of `reason` in `ErrorInfo` in each RPC in the `TwoPhaseCommitTransaction` service:

| RPC                            | Status code         | `reason` in `ErrorInfo`    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|--------------------------------|---------------------|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Begin, Join                    | INVALID_ARGUMENT    | ILLEGAL_ARGUMENT           | The argument in the request message is invalid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Begin, Join                    | FAILED_PRECONDITION | ILLEGAL_STATE              | The RPC was called in an invalid state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Begin, Join                    | INTERNAL            | HOP_LIMIT_EXCEEDED         | The hop limit was exceeded. This occurs when the routing information between cluster nodes is inconsistent. The error is usually resolved in a short amount of time, so you can retry the transaction from the beginning after some time has passed since encountering this error.                                                                                                                                                                                                                                      |
| Begin, Join                    | INTERNAL            | INTERNAL_ERROR             | The operation has failed due to transient or nontransient faults. You can try retrying the transaction from the beginning, but the transaction may still fail if the cause is nontransient.                                                                                                                                                                                                                                                                                                                             |
| Get, Scan, Put, Delete, Mutate | INVALID_ARGUMENT    | ILLEGAL_ARGUMENT           | The argument in the request message is invalid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Get, Scan, Put, Delete, Mutate | FAILED_PRECONDITION | ILLEGAL_STATE              | The RPC was called in an invalid state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Get, Scan, Put, Delete, Mutate | NOT_FOUND           | TRANSACTION_NOT_FOUND      | The transaction associated with the specified transaction ID was not found. This indicates that the transaction has expired or the routing information has been updated due to cluster topology changes. In this case, please retry the transaction from the beginning.                                                                                                                                                                                                                                                 |
| Get, Scan, Put, Delete, Mutate | INTERNAL            | HOP_LIMIT_EXCEEDED         | The hop limit was exceeded. This occurs when the routing information between cluster nodes is inconsistent. The error is usually resolved in a short amount of time, so you can retry the transaction from the beginning after some time has passed since encountering this error.                                                                                                                                                                                                                                      |
| Get, Scan, Put, Delete, Mutate | FAILED_PRECONDITION | TRANSACTION_CONFLICT       | A transaction conflict occurred. If you encounter this error, please retry the transaction from the beginning.                                                                                                                                                                                                                                                                                                                                                                                                          |
| Get, Scan, Put, Delete, Mutate | INTERNAL            | INTERNAL_ERROR             | The operation has failed due to transient or nontransient faults. You can try retrying the transaction from the beginning, but the transaction may still fail if the cause is nontransient.                                                                                                                                                                                                                                                                                                                             |
| Prepare, Validate              | INVALID_ARGUMENT    | ILLEGAL_ARGUMENT           | The argument in the request message is invalid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Prepare, Validate              | FAILED_PRECONDITION | ILLEGAL_STATE              | The RPC was called in an invalid state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Prepare, Validate              | NOT_FOUND           | TRANSACTION_NOT_FOUND      | The transaction associated with the specified transaction ID was not found. This error indicates that the transaction has expired or the routing information has been updated due to cluster topology changes. In this case, please retry the transaction from the beginning.                                                                                                                                                                                                                                           |
| Prepare, Validate              | INTERNAL            | HOP_LIMIT_EXCEEDED         | The hop limit was exceeded. This occurs when the routing information between cluster nodes is inconsistent. The error is usually resolved in a short amount of time, so you can retry the transaction from the beginning after some time has passed since encountering this error.                                                                                                                                                                                                                                      |
| Prepare, Validate              | FAILED_PRECONDITION | TRANSACTION_CONFLICT       | A transaction conflict occurred. If you encounter this error, please retry the transaction from the beginning.                                                                                                                                                                                                                                                                                                                                                                                                          |
| Prepare, Validate              | INTERNAL            | INTERNAL_ERROR             | The operation has failed due to transient or nontransient faults. You can try retrying the transaction from the beginning, but the transaction may still fail if the cause is nontransient.                                                                                                                                                                                                                                                                                                                             |
| Commit                         | INVALID_ARGUMENT    | ILLEGAL_ARGUMENT           | The argument in the request message is invalid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Commit                         | FAILED_PRECONDITION | ILLEGAL_STATE              | The RPC was called in an invalid state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Commit                         | NOT_FOUND           | TRANSACTION_NOT_FOUND      | The transaction associated with the specified transaction ID was not found. This error indicates that the transaction has expired or the routing information has been updated due to cluster topology changes. In this case, please retry the transaction from the beginning.                                                                                                                                                                                                                                           |
| Commit                         | INTERNAL            | HOP_LIMIT_EXCEEDED         | The hop limit was exceeded. This occurs when the routing information between cluster nodes is inconsistent. The error is usually resolved in a short amount of time, so you can retry the transaction from the beginning after some time has passed since encountering this error.                                                                                                                                                                                                                                      |
| Commit                         | FAILED_PRECONDITION | TRANSACTION_CONFLICT       | A transaction conflict occurred. If you encounter this error, please retry the transaction from the beginning.                                                                                                                                                                                                                                                                                                                                                                                                          |
| Commit                         | INTERNAL            | UNKNOWN_TRANSACTION_STATUS | The status of the transaction is unknown (it is uncertain whether the transaction was successfully committed or not). In this situation, you need to check whether the transaction was successfully committed, and if not, to retry it. The responsibility for determining the transaction status rests with the users. It may be beneficial to create a transaction status table and update it in conjunction with other application data so that you can determine the status of a transaction from the table itself. |
| Commit                         | INTERNAL            | INTERNAL_ERROR             | The operation has failed due to transient or nontransient faults. You can try retrying the transaction from the beginning, but the transaction may still fail if the cause is nontransient.                                                                                                                                                                                                                                                                                                                             |
| Rollback                       | INVALID_ARGUMENT    | ILLEGAL_ARGUMENT           | The argument in the request message is invalid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Rollback                       | FAILED_PRECONDITION | ILLEGAL_STATE              | The RPC was called in an invalid state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Rollback                       | NOT_FOUND           | TRANSACTION_NOT_FOUND      | The transaction associated with the specified transaction ID was not found. In case of a rollback, you do not need to retry the transaction because the transaction will expire automatically.                                                                                                                                                                                                                                                                                                                          |
| Rollback                       | INTERNAL            | HOP_LIMIT_EXCEEDED         | The hop limit was exceeded. In case of a rollback, you do not need to retry the transaction because the transaction will expire automatically.                                                                                                                                                                                                                                                                                                                                                                          |
| Rollback                       | INTERNAL            | INTERNAL_ERROR             | The operation has failed due to transient or nontransient faults. You can try retrying the transaction from the beginning, but the transaction may still fail if the cause is nontransient.                                                                                                                                                                                                                                                                                                                             |

If you encounter an error, you should roll back the transaction, except in the case of `Begin` or `Join`.
Then, you can retry the transaction from the beginning for the errors that can be resolved by retrying.

Besides the errors listed above, you may encounter errors returned by the gRPC library.
In these cases, the response will not contain `ErrorInfo`.
For details, refer to the [gRPC documentation](https://grpc.io/docs/guides/error/#error-status-codes).

You can set a deadline for each RPC in gRPC.
If the deadline is exceeded, you will receive a `DEADLINE_EXCEEDED` error.
In general, you should roll back the transaction in this situation, unless the RPC is `Begin`, `Join`, or `Commit`.
In the case of `Commit`, the situation is equivalent to `UNKNOWN_TRANSACTION_STATUS` (it is uncertain whether the transaction was successfully committed or not), and you must handle the error in the same way.

## How to use the `DistributedTransactionAdmin` service

The `DistributedTransactionAdmin` service provides the following RPCs:

- `CreateNamespace`: Creates a namespace.
- `DropNamespace`: Drops a namespace.
- `NamespaceExists`: Returns whether the specified namespace exists or not.
- `CreateTable`: Creates a table.
- `DropTable`: Drops a table.
- `TruncateTable`: Truncates a table.
- `TableExists`: Returns whether the specified table exists or not.
- `CreateIndex`: Creates an index.
- `DropIndex`: Drops an index.
- `IndexExists`: Returns whether the specified index exists or not.
- `RepairTable`: Repairs a table.
- `AddNewColumnToTable`: Adds a new column to a table.
- `CreateCoordinatorTables`: Creates the coordinator tables.
- `DropCoordinatorTables`: Drops the coordinator tables.
- `TruncateCoordinatorTables`: Truncates the coordinator tables.
- `CoordinatorTablesExist`: Returns whether the coordinator tables exist or not.
- `RepairCoordinatorTables`: Repairs the coordinator tables.
- `GetTableMetadata`: Returns table metadata of the specified table.
- `GetNamespaceTableNames`: Returns tables in the specified namespace.

### Error handling

The table below shows the status code and the possible values of `reason` in `ErrorInfo` for all RPCs in the `DistributedTransactionAdmin` service:

| Status code         | `reason` in `ErrorInfo`    | Description                                     |
|---------------------|----------------------------|-------------------------------------------------|
| INVALID_ARGUMENT    | ILLEGAL_ARGUMENT           | The argument in the request message is invalid. |
| FAILED_PRECONDITION | ILLEGAL_STATE              | The RPC was called in an invalid state.         |
| INTERNAL            | INTERNAL_ERROR             | The operation has failed.                       |

Besides the errors listed above, you may encounter errors returned by the gRPC library.
In these cases, the response will not contain `ErrorInfo`.
For details, refer to the [gRPC documentation](https://grpc.io/docs/guides/error/#error-status-codes).
