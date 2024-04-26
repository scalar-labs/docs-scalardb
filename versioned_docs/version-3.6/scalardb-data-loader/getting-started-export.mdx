# Getting started with Export

This document explains how you can get started with the Scalar DB Data Loader Export function.

## Features

The Scalar DB Data Loader allows you to export data in the following formats:

- JSON
- JSONLines
- CSV

Each export will run a Scalar DB scan operation based on the provided CLI arguments when running data loader.

## Usage

The data loader export function can be started with the following minimal configuration:

```
./scalardb-data-loader export --config scalardb.properties --namespace namespace --table tableName
```



- --config:   the path to the scalardb connection properties file
- --namespace:  the namespace of the table that contains the data
- --table: name of the table that contains the data

By default, the data loader will create the output file in the working directory if the `--output-file` argument is omitted as well.

### Command-line flags

Here is a list of flags (options) that can be used with the scalardb data loader.

| Flag              | Description                                                  | Usage                                                  |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| --config          | The path to the scalardb.properties file. If omitted the tool looks for a file named `scalardb.properties` in the current folder | `scalardb-data-loader --config scalardb.properties`    |
| --namespace       | Namespace to export table data from. Required.               | `scalardb-data-loader --namespace namespace`           |
| --table           | Name of table to export data from. Required.                 | `scalardb-data-loader --table tableName`               |
| --key             | Export data of specific Partition key. By default, it exports all data from the specified table. | `scalardb-data-loader --key columnName=value`          |
| --sort            | Specify a column to sort on. The column needs to be a clustering key. The argument can be repeated to provide multiple sortings. This flag is only applicable to `--key`. | `scalardb-data-loader --sort columnName=desc`          |
| --projection      | Limit the columns that are exported by providing a projection. The argument can be repeated to provide multiple projections. | `scalardb-data-loader --projection columnName`         |
| --start           | Clustering key to mark scan start. This flag is only applicable to `--key`.   | `scalardb-data-loader --start columnName=value`        |
| --start-exclusive | Is the scan start exclusive or not. If omitted, the default value is `false`. This flag is only applicable to `--key` | `scalardb-data-loader --start-exclusive`               |
| --end             | Clustering key to mark scan end. This flag is only applicable to `--key`. | `scalardb-data-loader --end columnName=value`          |
| --end-exclusive   | Is the scan start exclusive or not. If omitted, the default value is `false`. This flag is only applicable to `--key`    | `scalardb-data-loader --end-exclusive`                 |
| --limit           | Limit the results of the scan. If omitted, the default value is `0` which means their is no limit. | `scalardb-data-loader --limit 1000`                    |
| --output-file     | The name and path of the output file. If omitted, the tool will save the file in the current folder with the following name format:<br />`export_namespace.tableName_timestamp.json` or `export_namespace.tableName_timestamp.csv`<br /><br />The ouput folder needs to exists. The dataloader does not create the output folder for you. | `scalardb-data-loader --output-file ./out/output.json` |
| --format          | The output format. By default `json` is selected.           | `scalardb-data-loader --format json`                   |
| --metadata        | When set to true the transaction metadata is included in the export. By default this is set to `false` | `scalardb-data-loader --metadata`                      |
| --delimiter       | The delimiter used in CSV files. Default value is `;`        | `scalardb-data-loader --delimiter ;`                   |
| --no-headers      | Exclude header row in CSV file. Default is `false`           | `scalardb-data-loader --no-headers`                    |
| --threads         | Thread count for concurrent processing                       | `scalardb-data-loader --threads 500`                   |

