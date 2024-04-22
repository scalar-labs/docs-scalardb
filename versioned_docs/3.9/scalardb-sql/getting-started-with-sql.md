# Getting Started with ScalarDB SQL

This document briefly explains how you can get started with ScalarDB SQL with a simple electronic money application.
Here we assume Oracle JDK 8 and the underlying storage/database such as Cassandra are properly configured.
Please see [Getting Started with ScalarDB](https://github.com/scalar-labs/scalardb/blob/master/docs/getting-started-with-scalardb.md) for the details of how to configure the underlying storage/database.

From this point forward, we will assume that **scalardb.properties** that holds the configuration for ScalarDB exists.

Let's move to the `getting-started-with-sql` directory so that we can avoid too much copy-and-paste.
```shell
$ cd docs/getting-started-with-sql
```

## Set up database schema

First, you need to define how the data will be organized (a.k.a database schema) in the application with ScalarDB database schema.
You can do that with the command line tool for ScalarDB SQL.
Download the command line tool that matches with the version you use from [ScalarDB SQL releases](https://github.com/scalar-labs/scalardb-sql/releases), and run the following command to start it:

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

[`ElectronicMoney.java`](./getting-started-with-sql/src/main/java/sample/ElectronicMoney.java) is a simple electronic money application.
(Be careful: it is simplified for ease of reading and far from practical and is certainly not production-ready.)

```java
public class ElectronicMoney {

  private static final String SCALARDB_PROPERTIES =
      System.getProperty("user.dir") + File.separator + "scalardb.properties";

  private static final String FULL_TABLENAME = "emoney.account";
  private static final String ID = "id";
  private static final String BALANCE = "balance";

  private final SqlSessionFactory sqlSessionFactory;

  public ElectronicMoney() {
    sqlSessionFactory = SqlSessionFactory.builder().withPropertiesFile(SCALARDB_PROPERTIES).build();
  }

  public void charge(String id, int amount) {
    try (SqlSession sqlSession = sqlSessionFactory.createSqlSession()) {
      // Start a transaction
      sqlSession.begin();

      try {
        PreparedStatement preparedStatement;

        // Retrieve the current balance for id
        preparedStatement = sqlSession.prepareStatement(
            "SELECT " + BALANCE + " FROM " + FULL_TABLENAME + " WHERE " + ID + "=?");
        ResultSet resultSet = preparedStatement.setText(0, id).execute();
        Optional<Record> record = resultSet.one();

        // Calculate the balance
        int balance = amount;
        if (record.isPresent()) {
          int current = record.get().getInt(BALANCE);
          balance += current;
        }

        // Update the balance
        preparedStatement = sqlSession.prepareStatement(
            "UPDATE " + FULL_TABLENAME + " SET " + BALANCE + "=?" + " WHERE " + ID + "=?");
        preparedStatement.setInt(0, balance).setText(1, id).execute();

        // Commit the transaction (records are automatically recovered in case of failure)
        sqlSession.commit();
      } catch (Exception e) {
        sqlSession.rollback();
        throw e;
      }
    }
  }

  public void pay(String fromId, String toId, int amount) {
    try (SqlSession sqlSession = sqlSessionFactory.createSqlSession()) {
      // Start a transaction
      sqlSession.begin();

      try {
        PreparedStatement preparedStatement;
        ResultSet resultSet;

        // Retrieve the current balances for ids
        preparedStatement = sqlSession.prepareStatement(
            "SELECT " + BALANCE + " FROM " + FULL_TABLENAME + " WHERE " + ID + "=?");

        resultSet = preparedStatement.setText(0, fromId).execute();
        Optional<Record> fromRecord = resultSet.one();

        preparedStatement.clearParameters();
        resultSet = preparedStatement.setText(0, toId).execute();
        Optional<Record> toRecord = resultSet.one();

        // Calculate the balances (it assumes that both accounts exist)
        int newFromBalance = fromRecord.get().getInt(BALANCE) - amount;
        int newToBalance = toRecord.get().getInt(BALANCE) + amount;
        if (newFromBalance < 0) {
          throw new RuntimeException(fromId + " doesn't have enough balance.");
        }

        // Update the balances
        preparedStatement = sqlSession.prepareStatement(
            "UPDATE " + FULL_TABLENAME + " SET " + BALANCE + "=?" + " WHERE " + ID + "=?");

        preparedStatement.setInt(0, newFromBalance).setText(1, fromId).execute();

        preparedStatement.clearParameters();
        preparedStatement.setInt(0, newToBalance).setText(1, toId).execute();

        // Commit the transaction (records are automatically recovered in case of failure)
        sqlSession.commit();
      } catch (Exception e) {
        sqlSession.rollback();
        throw e;
      }
    }
  }

  public int getBalance(String id) {
    try (SqlSession sqlSession = sqlSessionFactory.createSqlSession()) {
      // Start a transaction
      sqlSession.begin();

      try {
        PreparedStatement preparedStatement;

        // Retrieve the current balance for id
        preparedStatement = sqlSession.prepareStatement(
            "SELECT " + BALANCE + " FROM " + FULL_TABLENAME + " WHERE " + ID + "=?");
        ResultSet resultSet = preparedStatement.setText(0, id).execute();
        Optional<Record> record = resultSet.one();

        int balance = -1;
        if (record.isPresent()) {
          balance = record.get().getInt(BALANCE);
        }

        // Commit the transaction
        sqlSession.commit();

        return balance;
      } catch (Exception e) {
        sqlSession.rollback();
        throw e;
      }
    }
  }

  public void close() {
    sqlSessionFactory.close();
  }
}
```

Before you run the application, you need to specify your GitHub username and your personal access token to access our private Maven repository.
One of the ways to specify them is using environment variables as follows (See [build.gradle](./getting-started-with-sql/build.gradle)):

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

These are just simple examples of how ScalarDB SQL is used. For more information, please take a look at the following documents.

* [Getting Started with ScalarDB](https://github.com/scalar-labs/scalardb/blob/master/docs/getting-started-with-scalardb.md)
* [ScalarDB SQL API Guide](sql-api-guide.md)
* [ScalarDB SQL Grammar](grammar.md)
* [ScalarDB SQL Command Line interface](command-line-interface.md)
* [ScalarDB SQL Server](sql-server.md)
* [ScalarDB SQL Configurations](configurations.md)
