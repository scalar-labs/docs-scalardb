package sample;

import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

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
        try (PreparedStatement preparedStatement =
            connection.prepareStatement(
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
        try (PreparedStatement preparedStatement =
            connection.prepareStatement(
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
        try (PreparedStatement preparedStatement =
            connection.prepareStatement(
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
        try (PreparedStatement preparedStatement =
            connection.prepareStatement(
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
        try (PreparedStatement preparedStatement =
            connection.prepareStatement(
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
