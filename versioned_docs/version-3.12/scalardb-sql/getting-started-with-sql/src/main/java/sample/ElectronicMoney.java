package sample;

import com.scalar.db.sql.PreparedStatement;
import com.scalar.db.sql.Record;
import com.scalar.db.sql.ResultSet;
import com.scalar.db.sql.SqlSession;
import com.scalar.db.sql.SqlSessionFactory;
import java.io.File;
import java.util.Optional;

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
        preparedStatement =
            sqlSession.prepareStatement(
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
        preparedStatement =
            sqlSession.prepareStatement(
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
        preparedStatement =
            sqlSession.prepareStatement(
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
        preparedStatement =
            sqlSession.prepareStatement(
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
        preparedStatement =
            sqlSession.prepareStatement(
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
