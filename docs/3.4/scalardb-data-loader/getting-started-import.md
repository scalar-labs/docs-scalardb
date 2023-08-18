{% include end-of-support.html %}

# Getting started with Import

This document explains how you can get started with the Scalar DB Data Loader Import function.

## Features

- Import data from JSON or JSONLines files
- Automatic data mapping based on source field name mapping
- Custom Data mapping via a JSON control file
- Import data from one record or line into multiple tables
- Support for INSERT, UPDATE and UPSERT

## Usage

The data loader import function can be started with the following minimal configuration:

```
./scalardb-data-loader import --config scalardb.properties --namespace namespace --table tableName
```

The above configuration starts an import process where no control file is used and the data mapping is applied automatically.



Execute the following steps to successfully import new or existing data

- Prepare a source file containing data that needs to be imported.

- Choose the right import mode. By default, the import is done in `upsert` mode which means that data
  will be inserted if new or updated if the partition key and/or clustering key is found. Other
  options are `insert` mode or `update` mode.

- Find the correct `namespace` and `table` name to import data to.

- Determine if you want to run an `all required columns` check for each data row. If enabled data
  rows with missing columns will be treated as failed and not imported.

- Specify the pathnames for the `success` and `failed` output files. By default the data loader
  creates the files in the working directory.

- When dealing with JSON data, determine if you want the JSON output for the success or failed log files to
  be in `pretty print` or not. By default, this option is disabled for performance

- Optionally specify the `threads` argument to tweak performance

- Run the import from the command line to start importing your data. Make sure to run the Scalar DB Data
  Loader in the correct `storage` or `transaction` mode depending on your running Scalar DB instance.

### Command-line flags

Here is a list of flags (options) that can be used with the data loader:

| Flag                            | Description                                                  | Usage                                                       |
| ------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------- |
| --mode                          | The mode in which Scalar DB is running. If omitted, the default value is `storage` | `scalardb-data-loader --mode transaction`                   |
| --config                        | the path to the scalardb.properties file. If omitted the tool looks for a file named `scalardb.properties` in the current folder | `scalardb-data-loader --config scalardb.properties`         |
| --namespace                     | Namespace to export table data from. Required when no control file is provided. | `scalardb-data-loader --namespace namespace`                |
| --table                         | name of the table to export data from. Required when no control file is provided. | `scalardb-data-loader --table tableName`                    |
| --import-mode                   | Mode to import the data into the Scalar DB table. Supported modes are `insert`, `update` and `upsert`. Optional. Default the value is set to `upsert` | `scalardb-data-loader --import-mode=upsert`                 |
| --all-columns-required          | If set, data rows cannot be imported if they are missing columns. Optional. By default, the check is not executed. | `scalardb-data-loader --all-columns-required`               |
| --file                          | Specify the path to the file that will be imported. Required | `scalardb-data-loader --file <pathToFile>`                  |
| --success                       | The path to the file that is created to write the succeed import results to. Both succeed and failed import results will be written to a different file. <br />Optional. By default, the a new file will be created in the current working directory.<br /><br />Note: if the file already exists, it will be overriden. | `scalardb-data-loader --success <path to file>`             |
| --failed                        | The path to the file that will be created to write the failed import results to. <br />Optional. By default, the a new file will be created in the current working directory.<br /><br />Note: if the file already exists, it will be overridden. | `scalardb-data-loader --failed <path to file>`              |
| --threads                       | Thread count for concurrent processing                       | `scalardb-data-loader --threads 500`                        |
| --format                        | The format of the import file. `json` and `jsonl` files are supported. Optional, default the value `json` is selected. | `scalardb-data-loader --format json`                        |
| --pretty                        | When set, the output to the success and failed files is done in `pretty print` mode. By default the option is not enabled. | `scalardb-data-loader --pretty`                             |
| --control-file                  | The path to the JSON control file specifying the rules for the custom data mapping and/or multi-table import. | `scalardb-data-loader --control-file control.json`          |
| --control-file-validation-level | The validation level for the control file.  `MAPPED`, `KEYS` or` FULL`.    <br /><br />Optional and by default the level is set to `MAPPED` | `scalardb-data-loader --control-file-validation-level FULL` |
| --log-put-value                 | Wether the value that was used in the Scalar DB `PUT` operation is included in the log files or not.<br />Optional and disabled by default. | `scalardb-data-loader --log-put-value`                      |

## Import mode

The data loader supports the following import modes:

| Mode   | Description                                                  |
| ------ | ------------------------------------------------------------ |
| INSERT | Each source record is treated as new data. If the data already exists in the Scalar DB table, based on the partition and clustering key, the import for this source data will fail. |
| UPDATE | Each source record is treated as an update for existing data in the Scalar DB table.  If the data does not exist in the table, based on the partition key and clustering key, the import for this source data will fail. |
| UPSERT | If the target Scalar DB table already contains the data, the import will be done via an UPDATE. If the target data is missing, it will be treated as an INSERT. |

*Note*:

 In the case of `INSERT`, it is required to have matching fields in the source files for each target column via automatic or custom mapping via the control file.  This also applies to an `UPSERT` that turns into an `INSERT`.

## Data mapping

### Automatic mapping

When no control file is provided, the data loader will automatically map the fields in the source JSON data to the available columns in the Scalar DB table. If the name does not match, and if all columns are required, it will be treated as a validation error. In this case, the import for this record will fail and the result will be added to the failed output log.

### Custom mapping

When the source fields do not match the target column name, it is necessary to use a control file. In this control, file you can specify the custom mapping rules for the field names.

e.g. the following control file to map the field `custom_id` in the source file to `id` in the target table.

```json
{
	"tables": [{
			"namespace": "sample",
			"table_name": "table1",
			"mappings": [{
				"source_field": "custom_id",
				"target_column": "id"
			}]
		}
	]
}
```

## Control file

To allow for custom data mapping or multi-table importing, the data loader supports configuration via a JSON control file. This file needs to be passed in via the `--control-file` argument when starting the data loader.

### Control file validation levels

To enforce validation on the control file, the data loader allows you to specify the validation level. Based on the set level, the data loader will run a pre-check and validate the control file based on the level rules.

The following levels are supported:

| Level  | Description                                                  |
| ------ | ------------------------------------------------------------ |
| FULL   | This validation makes sure that the control file has mappings for each column in the target Scalar DB table. |
| KEYS   | This validation makes sure that mappings are available for each Scalar DB table partition and, if available, clustering keys columns in the control file mappings. |
| MAPPED | The validation makes sure that the provided source fields and target columns exist for only the mappings that are provided in the control file. <br />No other fields are checked. |

The validation level is optional and can be set via the `--control-file-validation-level` argument when starting the data loader.

*Note*:

This validation is run as a pre-check and does not mean the import process will automatically succeed.  

e.g. If the level is set to mapped and the control file does not contain mappings for each column for an INSERT, the import process will still fail as all columns are required to be mapped for an INSERT.

## Multi-table import

The data loader supports multi-table target importing.  

One single row in a JSON or JSONLine file can be imported into multiple tables by specifying table mapping rules in the control file.   Currently, multi-table import is not supported without a control file.

When using multi-table import in Scalar DB transaction mode, a transaction is created for each table import.  e.g. If the source record is mapped to 3 tables in the control file, 3 separate transactions are created.

e.g. The import the following source record into `table1` and `table2` we execute the following steps:

| Table1 | Table2 |
| ------ | ------ |
| Id     | Id     |
| price  | amount |

**Source record**

```json
[{
	"custom_id": 1,
	"custom_price": 1000,
	"custom_amount": 100
	
}]
```

**Control file**

```json
{
	"tables": [{
			"namespace": "sample",
			"table_name": "table1",
			"mappings": [{
				"source_field": "custom_id",
				"target_column": "id"
			}, {
				"source_field": "custom_price",
				"target_column": "price"
			}]
		},
		{
			"namespace": "sample",
			"table_name": "table2",
			"mappings": [{
				"source_field": "custom_id",
				"target_column": "id"
			}, {
				"source_field": "custom_amount",
				"target_column": "amount"
			}]
		}
	]
}
```



## Output logs

When starting an import task, the data loader logs the import results in two files. One file contains the import data that is successfully imported and one file contains the data that cannot be imported. The failed data will contain an added field that explains why the data could not be imported. This field is called `data_loader_import_status`.

The file containing the failed imports can be edited to correct the problems and used as the source file for a new import task as is. It is not required to first remove the `data_loader_import_status` field containing the error. This field will be ignored during the import process and the original value will not be included in the new version of the success or failed output file.

The file with the successfully imported data also contains the `data_loader_import_status` field. In this file, each imported data row has a status message for the data. Whether a new row was created or existing data was updated.

### Log format

| Field          | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| action         | The result of the import process for the data record. UPDATE, INSERT or FAILED_DURING_VALIDATION |
| namespace      | The name of the namespace of the table that the data is imported in |
| tablename      | The name of the table that the data is imported in           |
| is_data_mapped | Whether custom data mapping was applied or not based on an available control file. |
| tx_id          | The id of the transaction. Only available if the data loader is run in `transaction` mode. |
| value          | The final value, after optional data mapping, that the data loader uses in the `PUT` operation. |
| row_number     | The line number or record number of the source data.         |
| Errors         | A list of validation or other errors for things that went wrong during the import process. |

Example of a JSON formatted success log file:

```json
[{
	"column_1": 1,
	"column_2": 2,
	"column_n": 3,
	"data_loader_import_status": {
		"results": [{
		  "action": "UPDATE",
			"namespace": "namespace1",
			"tableName": "table1",
			"is_data_mapped": true,
			"tx_id": "value",
			"value": "value",
			"row_number": "value"
		}]
	}
}]
```



Example of a JSON formatted failed log file:

```json
[{
	"column_1": 1,
	"column_2": 2,
	"column_n": 3,
	"data_loader_import_status": {
		"results": [{
		  "action": "FAILED_DURING_VALIDATION",
			"namespace": "namespace1",
			"tableName": "table1",
			"is_data_mapped": false,
			"value": "value",
			"row_number": "value",
			"errors": [
			   "missing columns found during validation"
			]
		}]
	}
}]
```

## Data duplicates

The data loader does not handle duplicates by itself. In Scalar DB transaction mode, trying to
update the same target data in fast succession will cause `No Mutation` errors and these are not
handled by the data loader. These failed data rows will be added to the failed import result output
file and can be re-tried for import later.

However, it is recommended to make sure the import file does not contain updates or inserts on the
same partition keys and/or clustering keys as the correct state cannot be guaranteed by the data
loader.



## Storage vs transaction mode

Scalar DB supports both storage and transaction mode and this support is included in the data loader import process.

When the loader is started in storage mode, each import is executed in a non-transactional way.   

Starting the loader in transaction mode will use transactions to import the data.  Currently, each row is imported via a separate transaction.  When importing a single record into multiple tables, a separate transaction is created for each table import.

