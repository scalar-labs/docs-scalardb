# Getting Started with Scalar DB JDBC

This document briefly explains how you can get started with Scalar DB JDBC with a simple electronic money application.
Here we assume Oracle JDK 8 and the underlying storage/database such as Cassandra are properly configured.
Please see [Getting Started with Scalar DB](https://github.com/scalar-labs/scalardb/blob/master/docs/getting-started.md) for the details of how to configure the underlying storage/database.

From this point forward, we will assume that **scalardb.properties** that holds the configuration for Scalar DB exists.

First, open a terminal, go to your work directory, and clone the [docs-scalardb](https://github.com/scalar-labs/docs-scalardb) repository.

```shell
$ git clone https://github.com/scalar-labs/docs-scalardb
```

Then, let's move to the `getting-started-with-jdbc` directory in the cloned repository so that we can avoid too much copy-and-paste.

```shell
$ cd docs-scalardb/3.6/scalardb-sql/getting-started-with-jdbc
```

## Set up database schema

First, you need to define how the data will be organized (a.k.a database schema) in the application with Scalar DB database schema.
You can do that with the command line tool for Scalar DB SQL.
Download the command line tool that matches with the version you use from [Scalar DB SQL releases](https://github.com/scalar-labs/scalardb-sql/releases), and run the following command to start it:

```shell
$ java -jar scalardb-sql-cli-<version>-all.jar --config scalardb.properties
```

And then, you need to create the namespace `emoney` and the table `account` in the namespace as follows:

```shell
0: scalardb> CREATE NAMESPACE emoney;
0: scalardb> CREATE TABLE emoney.account (id TEXT PRIMARY KEY, balance INT);
```

Also, you need to create coordinator tables that are used in transactions as follows:

```shell
0: scalardb> CREATE COORDINATOR TABLES;
```

## Store & retrieve data

[`ElectronicMoney.java`](./getting-started-with-jdbc/src/main/java/sample/ElectronicMoney.java) is a simple electronic money application.
(Be careful: it is simplified for ease of reading and far from practical and is certainly not production-ready.)

```java
public class ElectronicMoney {

  private static final String SCALARDB_PROPERTIES =
      System.getProperty("user.dir") + File.separator + "scalardb.properties";
  private static final String JDBC_CONNECTION_URL = "jdbc:scalardb:" + SCALARDB_PROPERTIES;

  private static final String FULL_TABLENAME = "emoney.account";
  private static final String ID = "id";
  private static final String BALANCE = "balance";

  public void charge(String id, int amount) throws SQLException {
    try (Connection connection = DriverManager.getConnection(JDBC_CONNECTION_URL)) {
      // Turn off autocommit
      connection.setAutoCommit(false);

      try {
        // Retrieve the current balance for id
        Optional<Integer> currentBalance;
        try (PreparedStatement preparedStatement = connection.prepareStatement(
            "SELECT " + BALANCE + " FROM " + FULL_TABLENAME + " WHERE " + ID + "=?")) {
          preparedStatement.setString(1, id);
          try (ResultSet resultSet = preparedStatement.executeQuery()) {
            if (resultSet.next()) {
              currentBalance = Optional.of(resultSet.getInt(BALANCE));
            } else {
              currentBalance = Optional.empty();
            }
          }
        }

        // Calculate the balance
        int balance = amount;
        if (currentBalance.isPresent()) {
          int current = currentBalance.get();
          balance += current;
        }

        // Update the balance
        try (PreparedStatement preparedStatement = connection.prepareStatement(
            "UPDATE " + FULL_TABLENAME + " SET " + BALANCE + "=?" + " WHERE " + ID + "=?")) {
          preparedStatement.setInt(1, balance);
          preparedStatement.setString(2, id);
          preparedStatement.executeUpdate();
        }

        // Commit the transaction (records are automatically recovered in case of failure)
        connection.commit();
      } catch (Exception e) {
        connection.rollback();
        throw e;
      }
    }
  }

  public void pay(String fromId, String toId, int amount) throws SQLException {
    try (Connection connection = DriverManager.getConnection(JDBC_CONNECTION_URL)) {
      // Turn off autocommit
      connection.setAutoCommit(false);

      try {
        // Retrieve the current balances for ids (it assumes that both accounts exist)
        int fromBalance;
        int toBalance;
        try (PreparedStatement preparedStatement = connection.prepareStatement(
            "SELECT " + BALANCE + " FROM " + FULL_TABLENAME + " WHERE " + ID + "=?")) {
          preparedStatement.setString(1, fromId);
          try (ResultSet resultSet = preparedStatement.executeQuery()) {
            resultSet.next();
            fromBalance = resultSet.getInt(BALANCE);
          }

          preparedStatement.clearParameters();

          preparedStatement.setString(1, toId);
          try (ResultSet resultSet = preparedStatement.executeQuery()) {
            resultSet.next();
            toBalance = resultSet.getInt(BALANCE);
          }
        }

        // Calculate the balances
        int newFromBalance = fromBalance - amount;
        int newToBalance = toBalance + amount;
        if (newFromBalance < 0) {
          throw new RuntimeException(fromId + " doesn't have enough balance.");
        }

        // Update the balances
        try (PreparedStatement preparedStatement = connection.prepareStatement(
            "UPDATE " + FULL_TABLENAME + " SET " + BALANCE + "=?" + " WHERE " + ID + "=?")) {
          preparedStatement.setInt(1, newFromBalance);
          preparedStatement.setString(2, fromId);
          preparedStatement.executeUpdate();

          preparedStatement.clearParameters();

          preparedStatement.setInt(1, newToBalance);
          preparedStatement.setString(2, toId);
          preparedStatement.executeUpdate();
        }

        // Commit the transaction (records are automatically recovered in case of failure)
        connection.commit();
      } catch (Exception e) {
        connection.rollback();
        throw e;
      }
    }
  }

  public int getBalance(String id) throws SQLException {
    try (Connection connection = DriverManager.getConnection(JDBC_CONNECTION_URL)) {
      // Turn off autocommit
      connection.setAutoCommit(false);

      try {
        // Retrieve the current balance for id
        Optional<Integer> currentBalance;
        try (PreparedStatement preparedStatement = connection.prepareStatement(
            "SELECT " + BALANCE + " FROM " + FULL_TABLENAME + " WHERE " + ID + "=?")) {
          preparedStatement.setString(1, id);
          try (ResultSet resultSet = preparedStatement.executeQuery()) {
            if (resultSet.next()) {
              currentBalance = Optional.of(resultSet.getInt(BALANCE));
            } else {
              currentBalance = Optional.empty();
            }
          }
        }

        // Commit the transaction
        connection.commit();

        return currentBalance.orElse(-1);
      } catch (Exception e) {
        connection.rollback();
        throw e;
      }
    }
  }
}
```

Before you run the application, you need to specify your GitHub username and your personal access token to access our private Maven repository.
One of the ways to specify them is using environment variables as follows (See [build.gradle](./getting-started-with-jdbc/build.gradle)):

```shell
$ export GPR_USERNAME=<your GitHub username>
$ export GPR_PASSWORD=<your personal access token>
```

Now we can run the application.

- Charge `1000` to `user1`:
```shell
$ ./gradlew run --args="-action charge -amount 1000 -to user1"
```

- Charge `0` to `merchant1` (Just create an account for `merchant1`):
```shell
$ ./gradlew run --args="-action charge -amount 0 -to merchant1"
```

- Pay `100` from `user1` to `merchant1`:
```shell
$ ./gradlew run --args="-action pay -amount 100 -from user1 -to merchant1"
```

- Get the balance of `user1`:
```shell
$ ./gradlew run --args="-action getBalance -id user1"
```

- Get the balance of `merchant1`:
```shell
$ ./gradlew run --args="-action getBalance -id merchant1"
```

## Further reading

These are just simple examples of how Scalar DB JDBC is used. For more information, please take a look at the following documents.

* [Getting Started with Scalar DB](https://github.com/scalar-labs/scalardb/blob/master/docs/getting-started.md)
* [Scalar DB JDBC Guide](jdbc-guide.md)
* [Scalar DB SQL Grammar](grammar.md)
* [Scalar DB SQL Command Line interface](command-line-interface.md)
* [Scalar DB SQL Server](sql-server.md)
* [Scalar DB SQL Configurations](configurations.md)
