# Scalar DB Data Loader API

This document describes how to get started with the Scalar DB data loader API.

## Start Scalar DB Data Loader API

* Clone the `scalardb-data-loader` repository
```
git clone https://github.com/scalar-labs/scalardb-data-loader.git
```

* Navigate to the `scalardb-data-loader` directory

* Update the following properties in the `fixtures/test/conf/application.yml` file with appropriate cloud credentials
    * storage.jclouds.provider
    * storage.jclouds.identity
    * storage.jclouds.credential
    * storage.jclouds.container

* Build the `scalardb-data-loader-api` docker image
```
./gradlew :api:docker
```

* Start the `scalardb-data-loader-api`
```
cd fixtures/test
docker-compose up
```
