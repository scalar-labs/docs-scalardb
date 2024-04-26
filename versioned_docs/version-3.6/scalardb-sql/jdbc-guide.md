{% include scalardb/end-of-support.html %}

# Scalar DB JDBC Guide

The usage of Scalar DB JDBC basically follows [Java JDBC API](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/).
This guide describes several important topics that are specific to Scalar DB JDBC.

## JDBC connection URL

The JDBC connection URL format of Scalar DB JDBC is as follows:

```shell
jdbc:scalardb:<configuration file path>?<property name>=<property value>&<property name>=<property value>&...
```

For example:

Only specify configuration file path:

```shell
jdbc:scalardb:/path/to/database.properties
```

Only specify properties:

```shell
jdbc:scalardb:?scalar.db.contact_points=localhost&scalar.db.username=cassandra&scalar.db.password=cassandra&scalar.db.storage=cassandra
```

Specify configuration file path and properties:

```shell
jdbc:scalardb:/path/to/database.properties?scalar.db.metadata.cache_expiration_time_secs=0
```

## Data type mapping between Scalar DB and JDBC

Since Scalar DB doesn't support all the data types defined in JDBC, the following explains the data type mapping between Scalar DB and JDBC.

The data type mapping between Scalar DB and JDBC is as follows:

| Scalar DB Type | JDBC (Java) Type   |
| -------------- | ------------------ |
| Boolean        | boolean or Boolean |
| Int            | int or Integer     |
| BigInt         | long or Long       |
| Float          | float or Float     |
| Double         | double or Double   |
| Text           | String             |
| Blob           | byte[]             |

How to get the data from a `java.sql.ResultSet` object for each data type is as follows:

```java
try (ResultSet resultSet = ...) {
  resultSet.next();

  // Get a Boolean value of a column
  boolean booleanValue = resultSet.getBoolean("<column name>");

  // Get an Int value of a column
  int intValue = resultSet.getInt("<column name>");

  // Get a BigInt value of a column
  long bigIntValue = resultSet.getLong("<column name>");

  // Get a Float value of a column
  float floatValue = resultSet.getFloat("<column name>");

  // Get a Double value of a column
  double doubleValue = resultSet.getDouble("<column name>");

  // Get a Text value of a column
  String textValue = resultSet.getString("<column name>");

  // Get a Blob value of a column
  byte[] blobValue = resultSet.getBytes("<column name>");
}
```

How to set the data as a parameter for each data type for a `java.sql.PreparedStatement` object is as follows:

```java
try (PreparedStatement preparedStatement = ...) {
  // Set a Boolean value as parameter
  preparedStatement.setBoolean(1, <Boolean value>);

  // Set an Int value as parameter
  preparedStatement.setInt(2, <Int value>);

  // Set a BigInt value as parameter
  preparedStatement.setLong(3, <BigInt value>);

  // Set a Float value as parameter
  preparedStatement.setFloat(4, <Float value>);

  // Set a Double value as parameter
  preparedStatement.setDouble(5, <Double value>);

  // Set a Text value as parameter
  preparedStatement.setString(7, "<Text value>");

  // Set a Blob value as parameter
  preparedStatement.setBytes(8, <Blob value>);

  preparedStatement.execute();
}
```

## Handle SQLException

The exception handling is basically the same as Scalar DB SQL API as follows:

```java
// If you execute multiple statements in a transaction, you need to set auto-commit to false.
connection.setAutoCommit(false);

try {
  // Execute statements (SELECT/INSERT/UPDATE/DELETE) in the transaction
  ...

  // Commit the transaction
  connection.commit();
} catch (SQLException e) {
  if (e.getErrorCode() == 401) {
    // The error code 401 indicates that you catch TransactionConflictException.
    // If you catch TransactionConflictException, it indicates conflicts happen during a
    // transaction so that you can retry the transaction in your application

    // Rollback the transaction
    connection.rollback();
  } else if (e.getErrorCode() == 301) {
    // The error code 301 indicates that you catch UnknownTransactionStatusException.
    // If you catch UnknownTransactionStatusException when committing the transaction, you are
    // not sure if the transaction succeeds or not. In such a case, you need to check if the
    // transaction is committed successfully or not and retry it if it failed. How to identify a
    // transaction status is delegated to users

  } else {
    // If you face an error code other than the above, it indicates that an unexpected failure
    // happens, so you should cancel or retry the transaction after the failure/error is fixed

    // Rollback the transaction
    connection.rollback();
  }
}
```

Please see also [Scalar DB SQL API Guide](sql-api-guide.mdx) for more details on exception handling.

## References

- [Java JDBC API](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/)
- [Scalar DB SQL API Guide](sql-api-guide.mdx)
