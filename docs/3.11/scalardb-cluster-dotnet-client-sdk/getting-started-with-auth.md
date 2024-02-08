# Getting Started with ScalarDB Auth by Using ScalarDB Cluster .NET Client SDK

The ScalarDB Cluster .NET Client SDK supports [ScalarDB Auth](https://github.com/scalar-labs/scalardb-cluster/blob/main/docs/scalardb-auth-with-sql.md), which allows you to authenticate and authorize your requests to ScalarDB Cluster.

## Set credentials in `ScalarDbOptions`

First, you need to get a transaction manager or transaction admin object with credentials by using `TransactionFactory` as follows, replacing the contents in the angle brackets as described. Also, be sure to replace `<GET_TRANSACTION_MANAGER>` with `GetTransactionManager()`, `GetTwoPhaseCommitTransactionManager()`, `GetSqlTransactionManager()`, or `GetSqlTwoPhaseCommitTransactionManager()`.  

```c#
var scalarDbOptions = new ScalarDbOptions
                      {
                         Address = "http://<HOSTNAME_OR_IP_ADDRESS>:<PORT>",
                         HopLimit = 10,
                         AuthEnabled = true,
                         Username = "<USERNAME>",
                         Password = "<PASSWORD>"
                      };
var factory = TransactionFactory.Create(scalarDbOptions);

// To get a transaction manager
using var manager = factory.<GET_TRANSACTION_MANAGER>();

// To get a transaction admin
using var admin = factory.GetTransactionAdmin();
```

A transaction manager or transaction admin object created from `TransactionFactory` with the provided credentials will automatically log in to ScalarDB Cluster and can communicate with it.
