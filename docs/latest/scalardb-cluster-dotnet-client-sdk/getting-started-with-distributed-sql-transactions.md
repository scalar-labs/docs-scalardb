# Getting Started with Distributed SQL Transactions in the ScalarDB Cluster .NET Client SDK

The ScalarDB Cluster .NET Client SDK supports the distributed SQL transaction functionality of ScalarDB Cluster. The SDK includes transaction and manager abstractions for easier communication within a cluster.

{% capture notice--info %}
**Note**

Although we recommend using asynchronous methods, as in the following examples, you can use synchronous methods instead.
{% endcapture %}

<div class="notice--info">{{ notice--info | markdownify }}</div>

For details about distributed non-SQL transactions, see [Getting Started with Distributed Transactions in the ScalarDB Cluster .NET Client SDK](getting-started-with-distributed-transactions.md).

## Get a transaction manager

First, you need to get a transaction manager object for distributed SQL transactions. To get the transaction manager object, you can use `TransactionFactory` as follows, replacing `<CLUSTER_URL>` with the URL of your cluster:

```c#
var scalarDbOptions = new ScalarDbOptions
                      {
                         Address = "http://<CLUSTER_URL>:60053"
                         HopLimit = 10
                      };
var factory = TransactionFactory.Create(scalarDbOptions);

using var manager = factory.GetSqlTransactionManager();
```

## Execute SQL queries

To execute a SQL statement, you need a `SqlStatement` object, which can be created by using a builder as follows:

```c#
using ScalarDB.Net.Client.Builders;

// ...

var sqlStatement =
    new SqlStatementBuilder()
        .SetSql("SELECT * FROM order_service.statements WHERE item_id = :item_id")
        .AddParam("item_id", 2)
        .Build();
```

A single SQL statement can be executed directly by using the transaction manager as follows:

```c#
var resultSet = await manager.ExecuteAsync(sqlStatement);
```

The result from the `ExecuteAsync` method will contain records received from the cluster. The SDK has `GetValue`, `TryGetValue`, and `IsNull` extension methods to simplify using the records:

```c#
using ScalarDB.Net.Client.Extensions;

// ...

foreach (var record in resultSet.Records)
{
    // Getting an integer value from the "item_id" column.
    // If it fails, an exception will be thrown.
    var itemId = record.GetValue<int>("item_id");
            
    // Trying to get a string value from the "order_id" column.
    // If it fails, no exception will be thrown.
    if (record.TryGetValue<string>("order_id", out var orderId))
        Console.WriteLine($"order_id: {orderId}");
            
    // Checking if the "count" column is null.
    if (record.IsNull("count"))
        Console.WriteLine("'count' is null");
}
```

## Execute SQL queries in a transaction

To execute multiple SQL statements as part of a single transaction, you need a transaction object.

You can create a transaction object by using the transaction manager as follows:

```c#
var transaction = await manager.BeginAsync();
```

You can also resume a transaction that has already been started as follows:

```c#
var transaction = manager.Resume(transactionIdString);
```

{% capture notice--info %}
**Note**

The `Resume` method doesn't have an asynchronous version because it only creates a transaction object. Because of this, resuming a transaction by using the wrong ID is possible.
{% endcapture %}

<div class="notice--info">{{ notice--info | markdownify }}</div>

The transaction has the same `ExecuteAsync` method as the transaction manager. That method can be used to execute SQL statements.

When a transaction is ready to be committed, you can call the `CommitAsync` method of the transaction as follows:

```c#
await transaction.CommitAsync();
```

To roll back the transaction, you can use the `RollbackAsync` method:

```c#
await transaction.RollbackAsync();
```