{% include scalardb/end-of-support.html %}

# Scalar DB SQL Command Line Interface

Like other SQL databases, Scalar DB SQL also provides a command-line interface tool where you can issue SQLs interactively in a command-line shell.

This document explains how to install and use the Scalar DB SQL Command Line Interface.

## Install

We have Docker images in [our repository](https://github.com/orgs/scalar-labs/packages/container/package/scalardb-sql-cli) and executable jars available in [releases](https://github.com/scalar-labs/scalardb-sql/releases).

If you are interested in building from source, run the following command:

```shell
$ ./gradlew cli:shadowjar
```

The executable jar (`scalardb-sql-cli-<version>-all.jar`) is created in `cli/build/libs/`.

## Run

### From Docker

You can start the command line interface with docker as follows:
```shell
$ docker pull ghcr.io/scalar-labs/scalardb-sql-cli:<version>
$ docker run --rm -it -v <your local configuration file>:/database.properties ghcr.io/scalar-labs/scalardb-sql-cli:<version> --config /database.properties
```

You can use the same configuration of Scalar DB SQL.
Please refer to [Scalar DB SQL Configurations](configurations.mdx) for more details on the configurations of this tool.

### From executable jar

You can also start the command line interface with the following command:
```shell
$ java -jar scalardb-sql-cli-<version>-all.jar --config <your local configuration file>
```

## Usage

You can see the command line interface usage with the `-h` option as follows:

```shell
$ java -jar scalardb-sql-cli-<version>-all.jar -h
Usage: java -jar scalardb-sql-cli-<version>-all.jar [-hs] -c=PROPERTIES_FILE
       [-e=COMMAND] [-f=FILE] [-l=LOG_FILE] [-o=<outputFormat>]
Starts Scalar DB SQL CLI.
  -c, --config=PROPERTIES_FILE
                          A configuration file in properties format.
  -e, --execute=COMMAND   A command to execute.
  -f, --file=FILE         A script file to execute.
  -h, --help              Display this help message.
  -l, --log=LOG_FILE      A file to write output.
  -o, --output-format=<outputFormat>
                          Format mode for result display. You can specify
                            table/vertical/csv/tsv/xmlattrs/xmlelements/json/ans
                            iconsole.
  -s, --silent            Reduce the amount of informational messages displayed.
```
