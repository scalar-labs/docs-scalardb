# Scalar DB SQL Grammar

- DDL
  - [CREATE NAMESPACE](#create-namespace)
  - [CREATE TABLE](#create-table)
  - [CREATE INDEX](#create-index)
  - [TRUNCATE TABLE](#truncate-table)
  - [DROP INDEX](#drop-index)
  - [DROP TABLE](#drop-table)
  - [DROP NAMESPACE](#drop-namespace)
  - [CREATE COORDINATOR TABLES](#create-coordinator-tables)
  - [TRUNCATE COORDINATOR TABLES](#truncate-coordinator-tables)
  - [DROP COORDINATOR TABLES](#truncate-coordinator-tables)
- DML
  - [SELECT](#select)
  - [INSERT](#insert)
  - [UPDATE](#update)
  - [DELETE](#delete)
- Others
  - [USE](#use)
  - [BEGIN](#begin)
  - [JOIN](#join)
  - [PREPARE](#prepare)
  - [VALIDATE](#validate)
  - [COMMIT](#commit)
  - [ROLLBACK](#rollback)
  - [SET MODE](#set-mode)
  - [SHOW TABLES](#show-tables)
  - [DESCRIBE](#describe)

## DDL

### CREATE NAMESPACE

Before creating tables, namespaces must be created since a table belongs to one namespace.
`CREATE NAMESPACE` command creates a namespace.

#### Grammar

```sql
CREATE NAMESPACE [IF NOT EXISTS] <namespace name> [WITH creation_options]

creation_options: <option name>=<option value> [AND <option name>=<option value>] ...
```

Please see [Scalar DB Java API Guide - Creation Options](https://github.com/scalar-labs/scalardb/blob/master/docs/api-guide.md#creation-options) for the details of Creation Options.

#### Examples

Examples of `CREATE NAMESPACE` are as follows:

```sql
# Create a namespace "ns"
CREATE NAMESPACE ns;

# Create a namespace only if it does not already exist
CREATE NAMESPACE IF NOT EXISTS ns;

# Create a namespace with options
CREATE NAMESPACE ns WITH 'option1' = 'value1' AND 'option2' = 'value2' AND 'option3' = 'value3';
```

Examples of building statement objects for `CREATE NAMESPACE` are as follows:

```java
// Create a namespace "ns"
CreateNamespaceStatement statement1 = StatementBuilder.createNamespace("ns").build();

// Create a namespace only if it does not already exist
CreateNamespaceStatement statement2 =
    StatementBuilder.createNamespace("ns").ifNotExists().build();

// Create a namespace with options
CreateNamespaceStatement statement3 =
    StatementBuilder.createNamespace("ns")
        .withOption("option1", "value1")
        .withOption("option2", "value2")
        .withOption("option3", "value3")
        .build();
```

### CREATE TABLE

`CREATE TABLE` command creates a table.

Please see [Scalar DB design document - Data Model](https://github.com/scalar-labs/scalardb/blob/master/docs/design.md#data-model) for the details of the Scalar DB Data Model.

#### Grammar

Create a table with a primary key that is composed of a single column:
```sql
CREATE TABLE [IF NOT EXISTS] [<namespace name>.]<table name> (
  <primary key column name> data_type PRIMARY KEY,
  <column name> data_type,
  ...
) [WITH creation_options]

data_type: BOOLEAN | INT | BIGINT | FLOAT | DOUBLE | TEXT | BLOB
creation_options: <option name>=<option value> [AND <option name>=<option value>] ...
```

Create a table with a primary key that is composed of one partition key column and multiple clustering key columns:
```sql
CREATE TABLE [IF NOT EXISTS] [<namespace name>.]<table name> (
  <partition key column name> data_type,
  <clustering key column name> data_type,
  ...,
  <column name> data_type,
  ...,
  PRIMARY KEY (<partition key column name>, <clustering key column name> [, <clustering key column name>] ...)
) [WITH [clustering_order_definition [AND creation_options]] | creation_options]

clustering_order_definition: CLUSTERING ORDER BY (<clustering key column name> [clustering_order] [, <clustering key column name> [clustering_order]] ...)
clustering_order: ASC | DESC
```

If you omit `clustering_order`, the default clustering order `ASC` is used.

Create a table with a primary key that is composed of multiple partition key columns and multiple clustering key columns:
```sql
CREATE TABLE [IF NOT EXISTS] [<namespace name>.]<table name> (
  <partition key column name> data_type,
  ...,
  <clustering key column name> data_type,
  ...,
  <column name1> data_type,
  <column name2> data_type,
  ...,
  PRIMARY KEY ((<partition key column name> [, <partition key column name>] ...), <clustering key column name> [, <clustering key column name>] ...)
) [WITH [clustering_order_definition [AND creation_options]] | creation_options]
```

#### Examples

Examples of `CREATE TABLE` are as follows:

```sql
# Create a table with a primary key ("c1") and creation options
CREATE TABLE ns.tbl (
  c1 INT PRIMARY KEY,
  c2 TEXT,
  c3 FLOAT,
  c4 BIGINT,
  c5 BOOLEAN
) WITH 'option1' = 'value1' AND 'option2' = 'value2' AND 'option3' = 'value3';

# Create a table with a partition key ("c1") and a clustering key ("c2" and "c3") with clustering order definition only if it does not already exist
CREATE TABLE IF NOT EXISTS tbl (
  c1 INT,
  c2 TEXT,
  c3 FLOAT,
  c4 BIGINT,
  c5 BOOLEAN,
  PRIMARY KEY (c1, c2, c3)
) WITH CLUSTERING ORDER BY (c2 DESC, c3 ASC);

# Create a table with a partition key ("c1", "c2") and a clustering key ("c3" and "c4") with clustering order definition and creation options
CREATE TABLE ns.tbl (
  c1 INT,
  c2 TEXT,
  c3 FLOAT,
  c4 BIGINT,
  c5 BOOLEAN,
  PRIMARY KEY ((c1, c2), c3, c4)
) WITH CLUSTERING ORDER BY (c3 DESC, c4 ASC) AND 'option1' = 'value1' AND 'option2' = 'value2' AND 'option3' = 'value3';
```

Examples of building statement objects for `CREATE TABLE` are as follows:

```java
// Create a table with a primary key ("c1") and creation options
CreateTableStatement statement1 =
    StatementBuilder.createTable("ns", "tbl")
        .withPartitionKey("c1", DataType.INT)
        .withColumn("c2", DataType.TEXT)
        .withColumn("c3", DataType.FLOAT)
        .withColumn("c4", DataType.BIGINT)
        .withColumn("c5", DataType.BOOLEAN)
        .withOption("option1", "value1")
        .withOption("option2", "value2")
        .withOption("option3", "value3")
        .build();

// Create a table with a partition key ("c1") and a clustering key ("c2" and "c3") with clustering order definition
CreateTableStatement statement2 =
    StatementBuilder.createTable("tbl")
        .ifNotExists()
        .withPartitionKey("c1", DataType.INT)
        .withClusteringKey("c2", DataType.TEXT)
        .withClusteringKey("c3", DataType.FLOAT)
        .withColumn("c4", DataType.BIGINT)
        .withColumn("c5", DataType.BOOLEAN)
        .withClusteringOrder("c2", ClusteringOrder.DESC)
        .withClusteringOrder("c3", ClusteringOrder.ASC)
        .build();

// Create a table with a partition key ("c1", "c2") and a clustering key ("c3" and "c4") with clustering order definition and creation options
CreateTableStatement statement3 =
    StatementBuilder.createTable("ns", "tbl")
        .withPartitionKey("c1", DataType.INT)
        .withPartitionKey("c2", DataType.TEXT)
        .withClusteringKey("c3", DataType.FLOAT)
        .withClusteringKey("c4", DataType.BIGINT)
        .withColumn("c5", DataType.BOOLEAN)
        .withClusteringOrder("c3", ClusteringOrder.DESC)
        .withClusteringOrder("c4", ClusteringOrder.ASC)
        .withOption("option1", "value1")
        .withOption("option2", "value2")
        .withOption("option3", "value3")
        .build();
```

### CREATE INDEX

`CREATE INDEX` command creates a secondary index on a table.

#### Grammar

```sql
CREATE INDEX [IF NOT EXISTS] ON [<namespace name>.]<table name> (<column name>)
```

#### Examples

Examples of `CREATE INDEX` are as follows:

```sql
# Create a secondary index on a column "c4" of a table "ns.tbl"
CREATE INDEX ON ns.tbl (c4);

# Create a secondary index only if it does not already exist
CREATE INDEX IF NOT EXISTS ON tbl (c4);

# Create a secondary index with options
CREATE INDEX ON ns.tbl (c4) WITH 'option1' = 'value1' AND 'option2' = 'value2' AND 'option3' = 'value3';
```

Examples of building statement objects for `CREATE INDEX` are as follows:

```java
// Create a secondary index on a column "c4" of a table "ns.tbl"
CreateIndexStatement statement1 =
    StatementBuilder.createIndex().onTable("ns", "tbl").column("c4").build();

// Create a secondary index only if it does not already exist
CreateIndexStatement statement2 =
    StatementBuilder.createIndex().ifNotExists().onTable("tbl").column("c4").build();

// Create a secondary index with options
CreateIndexStatement statement3 =
    StatementBuilder.createIndex()
        .onTable("ns", "tbl")
        .column("c4")
        .withOption("option1", "value1")
        .withOption("option2", "value2")
        .withOption("option3", "value3")
        .build();
```

### TRUNCATE TABLE

`TRUNCATE TABLE` command truncates a table.

#### Grammar

```sql
TRUNCATE TABLE [<namespace name>.]<table name>
```

#### Examples

Examples of `TRUNCATE TABLE` are as follows:

```sql
# Truncate a table "ns.tbl"
TRUNCATE TABLE ns.tbl;
```

Examples of building statement objects for `TRUNCATE TABLE` are as follows:

```java
// Truncate a table "ns.tbl"
TruncateTableStatement statement = StatementBuilder.truncateTable("ns", "tbl").build();
```

### DROP INDEX

`DROP INDEX` command drops a secondary index.

#### Grammar

```sql
DROP INDEX [IF EXISTS] ON [<namespace name>.]<table name> (<column name>)
```

#### Examples

Examples of `DROP INDEX` are as follows:

```sql
# Drop a secondary index on a column "c4" of a table "ns.tbl"
DROP INDEX ON ns.tbl (c4);

# Drop a secondary index only if it exists
DROP INDEX IF EXISTS ON tbl (c4);
```

Examples of building statement objects for `DROP INDEX` are as follows:

```java
// Drop a secondary index on a column "c4" of a table "ns.tbl"
DropIndexStatement statement1 =
    StatementBuilder.dropIndex().onTable("ns", "tbl").column("c4").build();

// Drop a secondary index only if it exists
DropIndexStatement statement2 =
    StatementBuilder.dropIndex().ifExists().onTable("ns", "tbl").column("c4").build();
```

### DROP TABLE

`DROP TABLE` command drops a table.

#### Grammar

```sql
DROP TABLE [IF EXISTS] [<namespace name>.]<table name>
```

#### Examples

Examples of `DROP TABLE` are as follows:

```sql
# Drop a table "ns.tbl"
DROP TABLE ns.tbl;

# Drop a table only if it exists
DROP TABLE IF EXISTS tbl;
```

Examples of building statement objects for `DROP TABLE` are as follows:

```java
// Drop a table "ns.tbl"
DropTableStatement statement1 = StatementBuilder.dropTable("ns", "tbl").build();

// Drop a table only if it exists
DropTableStatement statement2 = StatementBuilder.dropTable("ns", "tbl").ifExists().build();
```

### DROP NAMESPACE

`DROP NAMESPACE` command drops a namespace.

#### Grammar

```sql
DROP NAMESPACE [IF EXISTS] <namespace name> [CASCADE]
```

#### Examples

Examples of `DROP NAMESPACE` are as follows:

```sql
# Drop a namespace "ns"
DROP NAMESPACE ns;

# Drop a namespace only if it exists
DROP NAMESPACE IF EXISTS ns;

# Drop a namespace with cascade
DROP NAMESPACE ns CASCADE;
```

Examples of building statement objects for `DROP NAMESPACE` are as follows:

```java
// Drop a namespace "ns"
DropNamespaceStatement statement1 = StatementBuilder.dropNamespace("ns").build();

// Drop a namespace only if it exists
DropNamespaceStatement statement2 = StatementBuilder.dropNamespace("ns").ifExists().build();

// Drop a namespace with cascade
DropNamespaceStatement statement3 = StatementBuilder.dropNamespace("ns").cascade().build();
```

### CREATE COORDINATOR TABLES

`CREATE COORDINATOR TABLES` command creates coordinator tables.

#### Grammar

```sql
CREATE COORDINATOR TABLES [IF NOT EXISTS] [WITH creation_options]

creation_options: <option name>=<option value> [AND <option name>=<option value>] ...
```

#### Examples

Examples of `CREATE COORDINATOR TABLES` are as follows:

```sql
# Create coordinator tables
CREATE COORDINATOR TABLES;

# Create coordinator tables only if they do not already exist
CREATE COORDINATOR TABLES IF NOT EXIST;

# Create coordinator tables with options
CREATE COORDINATOR TABLES WITH 'option1' = 'value1' AND 'option2' = 'value2' AND 'option3' = 'value3';
```

Examples of building statement objects for `CREATE COORDINATOR TABLES` are as follows:

```java
// Create coordinator tables
CreateCoordinatorTablesStatement statement1 =
    StatementBuilder.createCoordinatorTables().build();

// Create coordinator tables only if they do not already exist
CreateCoordinatorTablesStatement statement2 =
    StatementBuilder.createCoordinatorTables().ifNotExist().build();

// Create coordinator tables with options
CreateCoordinatorTablesStatement statement3 =
    StatementBuilder.createCoordinatorTables()
        .withOption("option1", "value1")
        .withOption("option2", "value2")
        .withOption("option3", "value3")
        .build();
```

### TRUNCATE COORDINATOR TABLES

`TRUNCATE COORDINATOR TABLES` command truncates coordinator tables.

#### Grammar

```sql
TRUNCATE COORDINATOR TABLES
```

#### Examples

An example of building statement objects for `TRUNCATE COORDINATOR TABLES` is as follows:

```java
// Truncate coordinator tables
TruncateCoordinatorTablesStatement statement =
    StatementBuilder.truncateCoordinatorTables().build();
```

### DROP COORDINATOR TABLES

`DROP COORDINATOR TABLES` command drops coordinator tables.

#### Grammar

```sql
DROP COORDINATOR TABLES [IF EXISTS]
```

#### Examples

Examples of `DROP COORDINATOR TABLES` are as follows:

```sql
# Drop coordinator tables
DROP COORDINATOR TABLES;

# Drop coordinator tables if they exist
DROP COORDINATOR TABLES IF EXISTS;
```

Examples of building statement objects for `DROP COORDINATOR TABLES` are as follows:

```java
// Drop coordinator tables
DropCoordinatorTablesStatement statement1 = StatementBuilder.dropCoordinatorTables().build();

// Drop coordinator tables if they exist
DropCoordinatorTablesStatement statement2 =
    StatementBuilder.dropCoordinatorTables().ifExist().build();
```

## DML

### SELECT

`SELECT` command retrieves records of the database.

#### Grammar

```sql
SELECT projection [, projection] ...
  FROM [<namespace name>.]<table name>
  [WHERE <column name> operator <column value> [AND <column name> operator <column value>] ...]
  [ORDER BY <clustering key column name> [clustering_order] [, <clustering key column name> [clustering_order]] ...]
  [LIMIT <limit>]

projection: * | <column name> [AS <alias>]
operator: = | > | >= | < | <=
clustering_order: ASC | DESC
```

##### Note

- You can specify `WHERE` clause to primary key columns
- In `WHERE` clause, you can use only the `equal to`(`=`) operator for partition key columns, and you can use all the operators for clustering key columns
- You can also omit `WHERE` clause to retrieve all the records of a table
- If you omit `WHERE` clause, you cannot specify `ORDER BY`
- You can also specify `WHERE` clause to an indexed column
- If you specify `WHERE` clause to an indexed column, you can use only the `equal to`(`=`) operator for the index column
- If you specify `WHERE` clause to an indexed column, you cannot specify `ORDER BY`
- You can specify `<column value>` and `<limit>` to a bind marker (positional `?` and named `:<name>`)
- If you omit `clustering_order`, the default clustering order `ASC` is used

Please see also [Java API Guide - Get operation](https://github.com/scalar-labs/scalardb/blob/master/docs/api-guide.md#get-operation) and [Scan operation](https://github.com/scalar-labs/scalardb/blob/master/docs/api-guide.md#scan-operation) for more details of retrieving data from the database in Scalar DB

#### Examples

Let's say you have the following table and index:
```sql
CREATE TABLE ns.tbl (
  c1 INT,
  c2 TEXT,
  c3 FLOAT,
  c4 BIGINT,
  c5 BOOLEAN,
  PRIMARY KEY (c1, c2, c3)
) WITH CLUSTERING ORDER BY (c2 DESC, c3 ASC);

CREATE INDEX ON ns.tbl (c4);
```

Examples of `SELECT` are as follows:

```sql
# With a full primary key
SELECT * FROM ns.tbl WHERE c1 = 10 AND c2 = 'aaa' AND c3 = 1.23;

# With a partial primary key
SELECT * FROM ns.tbl WHERE c1 = 10 AND c2 = 'aaa';

# With projections and a partition key and clustering key boundaries
SELECT c1, c2, c3, c5 FROM ns.tbl WHERE c1 = 10 AND c2 = 'aaa' AND c3 >= 1.23 AND c3 < 4.56;

# With projections and a partition key and clustering key boundaries and clustering orders and limit
SELECT c1 AS a, c2 AS b, c3 AS c, c5 FROM ns.tbl WHERE c1 = 10 AND c2 > 'aaa' AND c2 <= 'ddd' ORDER BY c2 ASC, c3 DESC LIMIT 10;

# Without WHERE clause to retrieve all the records of a table
SELECT * FROM ns.tbl;

# Without WHERE clause and with projections and limit
SELECT c1, c2, c3, c5 FROM ns.tbl LIMIT 10;

# With an indexed column
SELECT * FROM ns.tbl WHERE c4 = 100;

# With projections and an indexed column and limit
SELECT c1, c2, c3, c4 FROM ns.tbl WHERE c4 = 100 LIMIT 10;

# With positional bind markers
SELECT * FROM ns.tbl WHERE c1 = ? AND c2 > ? AND c2 <= ? ORDER BY c2 ASC, c3 DESC LIMIT ?;
```

Examples of building statement objects for `SELECT` are as follows:

```java
// With a full primary key
SelectStatement statement1 =
    StatementBuilder.select()
        .from("ns", "tbl")
        .where(Predicate.column("c1").isEqualTo(Value.of(10)))
        .and(Predicate.column("c2").isEqualTo(Value.of("aaa")))
        .and(Predicate.column("c3").isEqualTo(Value.of(1.23F)))
        .build();

// With a partial primary key
SelectStatement statement2 =
    StatementBuilder.select()
        .from("ns", "tbl")
        .where(Predicate.column("c1").isEqualTo(Value.of(10)))
        .and(Predicate.column("c2").isEqualTo(Value.of("aaa")))
        .build();

// With projections and a partition key and clustering key boundaries
SelectStatement statement3 =
    StatementBuilder.select("c1", "c2", "c3", "c5")
        .from("ns", "tbl")
        .where(Predicate.column("c1").isEqualTo(Value.of(10)))
        .and(Predicate.column("c2").isEqualTo(Value.of("aaa")))
        .and(Predicate.column("c3").isGreaterThanOrEqualTo(Value.of(1.23F)))
        .and(Predicate.column("c3").isLessThan(Value.of(4.56F)))
        .build();

// With projections and a partition key and clustering key boundaries and clustering orders and limit
SelectStatement statement4 =
   StatementBuilder.select(
             Projection.column("c1").as("a"),
             Projection.column("c2").as("b"),
             Projection.column("c3").as("c"),
             Projection.column("c5").as("d"))
        .from("ns", "tbl")
        .where(Predicate.column("c1").isEqualTo(Value.of(10)))
        .and(Predicate.column("c2").isGreaterThan(Value.of("aaa")))
        .and(Predicate.column("c2").isLessThanOrEqualTo(Value.of("ddd")))
        .orderBy(ClusteringOrdering.column("c2").asc(), ClusteringOrdering.column("c3").desc())
        .limit(10)
        .build();

// Without WHERE clause to retrieve all the records of a table
SelectStatement statement5 = StatementBuilder.select().from("ns", "tbl").build();

// Without WHERE clause and with projections and limit
SelectStatement statement6 =
    StatementBuilder.select("c1", "c2", "c3", "c5").from("ns", "tbl").limit(10).build();

// With an indexed column
SelectStatement statement7 =
    StatementBuilder.select()
        .from("ns", "tbl")
        .where(Predicate.column("c4").isEqualTo(Value.of(100)))
        .build();

// With projections and an indexed column and limit
SelectStatement statement8 =
    StatementBuilder.select("c1", "c2", "c3", "c4")
        .from("ns", "tbl")
        .where(Predicate.column("c4").isEqualTo(Value.of(100)))
        .limit(10)
        .build();

// With positional bind markers
SelectStatement statement9 =
    StatementBuilder.select()
        .from("ns", "tbl")
        .where(Predicate.column("c1").isEqualTo(BindMarker.positional()))
        .and(Predicate.column("c2").isGreaterThan(BindMarker.positional()))
        .and(Predicate.column("c2").isLessThanOrEqualTo(BindMarker.positional()))
        .orderBy(ClusteringOrdering.column("c2").asc(), ClusteringOrdering.column("c3").desc())
        .limit(BindMarker.positional())
        .build();
```

### INSERT

`INSERT` command inserts a record into the database.

Note that unlike the standard SQL, this command doesn't check duplication of the record.
So if the record already exists, it doesn't show any error and overwrites the record.

#### Grammar

```sql
INSERT INTO [<namespace name>.]<table name> [(<column name> [, <column name>] ...)] VALUES (<column value> [, <column value>] ...)]
```

Note that you must specify a full primary key in `INSERT`.
And you can specify `<column value>` to a bind marker (positional `?` and named `:<name>`).

#### Examples

Examples of `INSERT` are as follows:

```sql
# Insert a record without specifying column names
INSERT INTO ns.tbl VALUES (10, 'aaa', 1.23, 100, true);

# Insert a record with column names
INSERT INTO ns.tbl (c1, c2, c3, c4) VALUES (10, 'aaa', 1.23, 100);

# With positional bind markers
INSERT INTO tbl VALUES (?, ?, ?, ?, ?);
```

Examples of building statement objects for `INSERT` are as follows:

```java
// Insert a record
InsertStatement statement1 = StatementBuilder.insertInto("ns", "tbl")
    .values(
        Assignment.column("c1").value(Value.of(10)),
        Assignment.column("c2").value(Value.of("aaa")),
        Assignment.column("c3").value(Value.of(1.23F)),
        Assignment.column("c4").value(Value.of(100L)),
        Assignment.column("c5").value(Value.of(true))
    ).build();


// With positional bind markers
InsertStatement statement2 = StatementBuilder.insertInto("tbl")
    .values(
        Assignment.column("c1").value(BindMarker.positional()),
        Assignment.column("c2").value(BindMarker.positional()),
        Assignment.column("c3").value(BindMarker.positional()),
        Assignment.column("c4").value(BindMarker.positional()),
        Assignment.column("c5").value(BindMarker.positional())
    ).build();
```

### UPDATE

`UPDATE` command update a record in the database.

Note that unlike the standard SQL, this command create a record even if the record doesn't exist.

#### Grammar

```sql
UPDATE [<namespace name>.]<table name>
  SET <column name> = <column value> [, <column name> = <column value>] ...
  WHERE <primary key column name> = <column value> [AND <primary key column name> = <column value>] ...]
```

Note that you must specify a full primary key in `UPDATE`.
And you can specify `<column value>` to a bind marker (positional `?` and named `:<name>`).

#### Examples

Examples of `UPDATE` are as follows:

```sql
# Update a record
UPDATE ns.tbl SET c4 = 200, c5 = false WHERE c1 = 10 AND c2 = 'aaa' AND c3 = 1.23;

# With positional bind markers
UPDATE ns.tbl SET c4 = ?, c5 = ? WHERE c1 = ? AND c2 = ? AND c3 = ?;
```

Examples of building statement objects for `UPDATE` are as follows:

```java
// Update a record
UpdateStatement statement1 =
    StatementBuilder.update("ns", "tbl")
        .set(
            Assignment.column("c4").value(Value.of(200L)),
            Assignment.column("c5").value(Value.of(false)))
        .where(Predicate.column("c1").isEqualTo(Value.of(10)))
        .and(Predicate.column("c2").isEqualTo(Value.of("aaa")))
        .and(Predicate.column("c3").isEqualTo(Value.of(1.23F)))
        .build();

// With positional bind markers
UpdateStatement statement2 =
    StatementBuilder.update("tbl")
        .set(
            Assignment.column("c4").value(BindMarker.positional()),
            Assignment.column("c5").value(BindMarker.positional()))
        .where(Predicate.column("c1").isEqualTo(BindMarker.positional()))
        .and(Predicate.column("c2").isEqualTo(BindMarker.positional()))
        .and(Predicate.column("c3").isEqualTo(BindMarker.positional()))
        .build();
```

### DELETE

`DELETE` command deletes a record in the database.

#### Grammar

```sql
DELETE FROM [<namespace name>.]<table name> WHERE <primary key column name> = <column value> [AND <primary key column name> = <column value>] ...]
```

Note that you must specify a full primary key in `DELETE`.
And you can specify `<column value>` to a bind marker (positional `?` and named `:<name>`).

#### Examples

Examples of `DELETE` are as follows:

```sql
# Update a record
DELETE FROM ns.tbl WHERE c1 = 10 AND c2 = 'aaa' AND c3 = 1.23;

# With positional bind markers
DELETE FROM tbl WHERE c1 = ? AND c2 = ? AND c3 = ?;
```

Examples of building statement objects for `DELETE` are as follows:

```java
// Delete a record
DeleteStatement statement1 =
    StatementBuilder.deleteFrom("ns", "tbl")
        .where(Predicate.column("c1").isEqualTo(Value.of(10)))
        .and(Predicate.column("c2").isEqualTo(Value.of("aaa")))
        .and(Predicate.column("c3").isEqualTo(Value.of(1.23F)))
        .build();

// With positional bind markers
DeleteStatement statement2 =
    StatementBuilder.deleteFrom("tbl")
        .where(Predicate.column("c1").isEqualTo(BindMarker.positional()))
        .and(Predicate.column("c2").isEqualTo(BindMarker.positional()))
        .and(Predicate.column("c3").isEqualTo(BindMarker.positional()))
        .build();
```

## Others

### USE

`USE` command specifies a default namespace.
If a namespace name is omitted in a SQL, the default namespace is used.

#### Grammar

```sql
USE <namespace name>
```

#### Examples

An example of `USE` is as follows:

```sql
# Specify a default namespace name "ns"
USE ns;
```

An example of building statement objects for `USE` is as follows:

```java
// Specify a default namespace name "ns"
UseStatement statement = StatementBuilder.use("ns").build();
```

### BEGIN

`BEGIN` command begins a transaction.

This command returns the following column:

- `transactionId`: `TEXT` - a transaction ID associated with the transaction you have begun

#### Grammar

```sql
BEGIN
```

#### Examples

An example of building statement objects for `BEGIN` is as follows:

```java
// Begin a transaction
BeginStatement statement = StatementBuilder.begin().build();
```

### JOIN

`JOIN` command joins a transaction associated with the specified transaction ID.

#### Grammar

```sql
JOIN <transaction ID>
```

#### Examples

An example of `JOIN` is as follows:

```sql
# Join a transaction
JOIN 'id';
```

An example of building statement objects for `JOIN` is as follows:

```java
// Join a transaction
JoinStatement statement = StatementBuilder.join("id").build();
```

### PREPARE

`PREPARE` command prepares the current transaction.

#### Grammar

```sql
PREPARE
```

#### Examples

An example of building statement objects for `PREPARE` is as follows:

```java
// Prepare the current transaction
PrepareStatement statement = StatementBuilder.prepare().build();
```

### VALIDATE

`VALIDATE` command validates the current transaction.

#### Grammar

```sql
VALIDATE
```

#### Examples

An example of building statement objects for `VALIDATE` is as follows:

```java
// Validate the current transaction
ValidateStatement statement = StatementBuilder.validate().build();
```

### COMMIT

`COMMIT` command commits the current transaction.

#### Grammar

```sql
COMMIT
```

#### Examples

An example of building statement objects for `COMMIT` is as follows:

```java
// Commit the current transaction
CommitStatement statement = StatementBuilder.commit().build();
```

### ROLLBACK

`ROLLBACK` command rolls back the current transaction.

#### Grammar

```sql
ROLLBACK
```

#### Examples

An example of building statement objects for `ROLLBACK` is as follows:

```java
// Rollback the current transaction
RollbackStatement statement = StatementBuilder.rollback().build();
```

### SET MODE

`SET MODE` command switches the current transaction mode.

#### Grammar

```sql
SET MODE transaction_mode

transaction_mode: TRANSACTION | TWO_PHASE_COMMIT_TRANSACTION
```

#### Examples

An example of `SET MODE` is as follows:

```sql
# Switch the current transaction mode to Two-phase Commit Transaction
SET MODE TWO_PHASE_COMMIT_TRANSACTION;
```

An example of building statement objects for `SET MODE` is as follows:

```java
// Switch the current transaction mode to Two-phase Commit Transaction
SetModeStatement statement =
    StatementBuilder.setMode(TransactionMode.TWO_PHASE_COMMIT_TRANSACTION).build();
```

### SHOW TABLES

`SHOW TABLES` command shows table names in a namespace.
If a namespace name is omitted, the default namespace is used.

This command returns the following column:

- `tableName`: `TEXT` - a table name

#### Grammar

```sql
SHOW TABLES [FROM <namespace name>]
```

#### Examples

Examples of `SHOW TABLES` is as follows:

```sql
# Show table names in the default namespace
SHOW TABLES;

# Show table names in a namespace "ns"
SHOW TABLES FROM ns;
```

Examples of building statement objects for `SET MODE` is as follows:

```java
// Show table names in the default namespace
ShowTablesStatement statement1 = StatementBuilder.showTables().build();

// Show table names in a namespace "ns"
ShowTablesStatement statement2 = StatementBuilder.showTables().from("ns").build();
```

### DESCRIBE

`DESCRIBE` command returns column metadata for the specified table.

This command returns the following columns:

- `columnName`: `TEXT` - a table name
- `type`: `TEXT` - a type name
- `isPrimaryKey`: `BOOLEAN` - whether it's a column part of primary key
- `isPartitionKey`: `BOOLEAN` - whether it's a column part of partition key
- `isClusteringKey`: `BOOLEAN` - whether it's a column part of clustering key
- `clusteringOrder`: `TEXT` - a clustering order
- `isIndexed`: `BOOLEAN` - whether it's a indexed column

#### Grammar

```sql
DESCRIBE [<namespace name>.]<table name>

DESC [<namespace name>.]<table name>
```

#### Examples

Examples of `DESCRIBE` is as follows:

```sql
# Returns column metadata for "ns.tbl"
DESCRIBE ns.tbl;

# Returns column metadata for "tbl"
DESC tbl;
```

Examples of building statement objects for `DESCRIBE` is as follows:

```java
// Returns column metadata for "ns.tbl"
DescribeStatement statement1 = StatementBuilder.describe("ns", "tbl").build();

// Returns column metadata for "tbl"
DescribeStatement statement2 = StatementBuilder.describe("tbl").build();
```
