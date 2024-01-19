# Getting Started with Distributed Transactions in the ScalarDB Cluster .NET Client SDK

The ScalarDB Cluster .NET Client SDK supports the distributed transaction functionality of ScalarDB Cluster. The SDK includes transaction and manager abstractions for easier communication within a cluster.

{% capture notice--info %}
**Note**

Although we recommend using asynchronous methods as in the following examples, you can use synchronous versions instead.
{% endcapture %}

<div class="notice--info">{{ notice--info | markdownify }}</div>

For details about distributed SQL transactions, see [Getting Started with Distributed SQL Transactions in the ScalarDB Cluster .NET Client SDK](getting-started-with-distributed-sql-transactions.md).

## Get a transaction manager

First, you need to get a transaction manager for distributed transactions. To get the transaction manager, you can use `TransactionFactory` as follows, replacing `<CLUSTER_URL>` with the URL of your cluster:

```c#
var scalarDbOptions = new ScalarDbOptions
                      {
                         Address = "http://<CLUSTER_URL>:60053"
                         HopLimit = 10
                      };
var factory = TransactionFactory.Create(scalarDbOptions);

using var manager = factory.GetTransactionManager();
```

## Manage transactions

To execute CRUD operations, a transaction is needed. You can begin a transaction by using the transaction manager as follows:

```c#
var transaction = await manager.BeginAsync();
```

You can also resume a transaction that is already being executed as follows:

```c#
var transaction = manager.Resume(transactionIdString);
```

{% capture notice--info %}
**Note**

The `Resume` method doesn't have an asynchronous version because it only creates a transaction object. Because of this, resuming a transaction by using the wrong ID is possible.
{% endcapture %}

<div class="notice--info">{{ notice--info | markdownify }}</div>

When a transaction is ready to be committed, you can call the `CommitAsync` method of the transaction as follows:

```c#
await transaction.CommitAsync();
```

To roll back the transaction, you can use the `RollbackAsync` method:

```c#
await transaction.RollbackAsync();
```

## Execute CRUD operations

A transaction has `GetAsync`, `ScanAsync`, `PutAsync`, `DeleteAsync`, and `MutateAsync` methods to execute CRUD commands against the cluster. As a parameter, these methods have a command object. A command object can be created by using the builders listed in this section.

To use these builders add the following namespace to the `using` section:

```c#
using ScalarDB.Net.Client.Builders;
```

{% capture notice--info %}
**Note**

The cluster does not support parallel execution of commands inside one transaction, so make sure to use `await` for asynchronous methods.
{% endcapture %}

<div class="notice--info">{{ notice--info | markdownify }}</div>

### `GetAsync` method example

```c#
using GetTypeEnum = Scalar.Db.Cluster.Rpc.V1.Get.Types.GetType;

// ...

var get =
    new GetBuilder()
        .SetNamespaceName("ns")
        .SetTableName("statements")
        .SetGetType(GetTypeEnum.Get)
        .AddPartitionKey("order_id", "1")
        .AddClusteringKey("item_id", 2)
        .SetProjections("item_id", "count")
        .Build();

var getResult = await transaction.GetAsync(get);
```

### `ScanAsync` method example

```c#
using static Scalar.Db.Cluster.Rpc.V1.Scan.Types;

// ..

var scan =
    new ScanBuilder()
        .SetNamespaceName("ns")
        .SetTableName("statements")
        .SetScanType(ScanType.Scan)
        .AddPartitionKey("order_id", "1")
        .AddStartClusteringKey("item_id", 2)
        .SetStartInclusive(true)
        .AddEndClusteringKey("item_id", 8)
        .SetEndInclusive(true)
        .SetProjections("item_id", "count")
        .Build();

var scanResult = await transaction.ScanAsync(get);
```

### `PutAsync` method example

```c#
var put =
    new PutBuilder()
        .SetNamespaceName("ns")
        .SetTableName("statements")
        .AddPartitionKey("order_id", "1")
        .AddClusteringKey("item_id", 2)
        .AddColumn("count", 11)
        .Build();

await client.PutAsync(put);
```

### `DeleteAsync` method example

```c#
var delete =
    new DeleteBuilder()
        .SetNamespaceName("ns")
        .SetTableName("statements")
        .AddPartitionKey("order_id", "1")
        .AddClusteringKey("item_id", 2)
        .Build();

await client.DeleteAsync(delete);
```

### `MutateAsync` method example:

```c#
using Scalar.Db.Cluster.Rpc.V1;

// ...

var put =
    new PutBuilder()
        .SetNamespaceName("ns")
        .SetTableName("statements")
        .AddPartitionKey("order_id", "1")
        .AddClusteringKey("item_id", 2)
        .AddColumn("count", 11)
        .Build();

var mutate = new Mutation { Put = put };

await client.MutateAsync(new[] { mutate });
```

{% capture notice--info %}
**Note**

To modify data by using the `PutAsync`, `DeleteAsync`, or `MutateAsync` method, the data must be retrieved first by using the `GetAsync` or `ScanAsync` method.
{% endcapture %}

<div class="notice--info">{{ notice--info | markdownify }}</div>
