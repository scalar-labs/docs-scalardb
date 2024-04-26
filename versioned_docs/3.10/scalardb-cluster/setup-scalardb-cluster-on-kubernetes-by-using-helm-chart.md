# Set Up ScalarDB Cluster on Kubernetes by Using a Helm Chart

This document provides instructions on how to set up a ScalarDB Cluster by using a Helm Chart on a Kubernetes cluster, specifically designed for a test environment.

## Prerequisites

* Kubernetes cluster (such as MiniKube or Kind)
* kubectl
* Helm

In addition, you need access to the [ScalarDB Cluster Node docker image](https://github.com/orgs/scalar-labs/packages/container/package/scalardb-cluster-node).
This repository is available only to users with a commercial license and permission.
To get a license and permission, please [contact us](https://scalar-labs.com/contact_us/).

## What you will create

You will be deploying the following components on a Kubernetes cluster as depicted below:

```
+---------------------------------------------------------------------------------------------------------------------------------------+
| [Kubernetes Cluster]                                                                                                                  |
|                                                                                                                                       |
|                         [Pod]                                                                [Pod]                         [Pod]      |
|                                                                                                                                       |
|                       +-------+                                                                                                       |
|                 +---> | Envoy | ---+                                                                                                  |
|                 |     +-------+    |                                                                                                  |
|                 |                  |                                                                                                  |
|  +---------+    |     +-------+    |           +--------------------+                                                                 |
|  | Service | ---+---> | Envoy | ---+---------> |      Service       | ---+                                                            |
|  | (Envoy) |    |     +-------+    |           | (ScalarDB Cluster) |    |                                                            |
|  +---------+    |                  |           +--------------------+    |         +-----------------------+                          |
|                 |     +-------+    |                                     |   +---> | ScalarDB Cluster Node | ---+                     |
|                 +---> | Envoy | ---+                                     |   |     +-----------------------+    |                     |
|                       +-------+                                          |   |                                  |                     |
|                                                                          |   |     +-----------------------+    |     +------------+  |
|                                                                          +---+---> | ScalarDB Cluster Node | ---+---> | PostgreSQL |  |
|                                                                          |   |     +-----------------------+    |     +------------+  |
|                                                                          |   |                                  |                     |
|                                                                          |   |     +-----------------------+    |                     |
|                                                                          |   +---> | ScalarDB Cluster Node | ---+                     |
|                                                                          |         +-----------------------+                          |
|                                        +----------------------------+    |                                                            |
|                                        |          Service           | ---+                                                            |
|                                        | (ScalarDB Cluster GraphQL) |                                                                 |
|                                        +----------------------------+                                                                 |
|                                                                                                                                       |
+---------------------------------------------------------------------------------------------------------------------------------------+
```

## Step 1. Start a PostgreSQL container

ScalarDB Cluster must use some kind of database system as its backend database.
The database that is used in this document is PostgreSQL.

You can deploy PostgreSQL on the Kubernetes cluster as follows:

1. Add the Bitnami helm repository:

   ```console
   helm repo add bitnami https://charts.bitnami.com/bitnami
   ```

2. Deploy PostgreSQL:

   ```console
   helm install postgresql-scalardb-cluster bitnami/postgresql \
     --set auth.postgresPassword=postgres \
     --set primary.persistence.enabled=false
   ```

3. Check if the PostgreSQL container is running:

   ```console
   kubectl get pod
   ```
   
   Command execution result:
   
   ```console
   NAME                            READY   STATUS    RESTARTS   AGE
   postgresql-scalardb-cluster-0   1/1     Running   0          17s
   ```

## Step 2. Deploy ScalarDB Cluster on the Kubernetes cluster by using a Helm Chart

1. Add the Scalar helm repository:

   ```console
   helm repo add scalar-labs https://scalar-labs.github.io/helm-charts
   ```

2. Create a secret resource to pull the ScalarDB Cluster container images from GitHub packages:

   ```console
   kubectl create secret docker-registry reg-docker-secrets \
     --docker-server=ghcr.io \
     --docker-username=<YOUR_GITHUB_USERNAME> \
     --docker-password=<YOUR_PERSONAL_ACCESS_TOKEN>
   ```

3. Create a custom values file for ScalarDB Cluster (`scalardb-cluster-custom-values.yaml`):

   ```console
   cat << 'EOF' > scalardb-cluster-custom-values.yaml
   envoy:
     enabled: true
     service:
       type: "LoadBalancer"

   scalardbCluster:
     scalardbClusterNodeProperties: |
       # ScalarDB Cluster configurations
       scalar.db.cluster.membership.type=KUBERNETES
       scalar.db.cluster.membership.kubernetes.endpoint.namespace_name=${env:SCALAR_DB_CLUSTER_MEMBERSHIP_KUBERNETES_ENDPOINT_NAMESPACE_NAME}
       scalar.db.cluster.membership.kubernetes.endpoint.name=${env:SCALAR_DB_CLUSTER_MEMBERSHIP_KUBERNETES_ENDPOINT_NAME}

       # Storage configurations
       scalar.db.storage=jdbc
       scalar.db.contact_points=jdbc:postgresql://postgresql-scalardb-cluster.default.svc.cluster.local:5432/postgres
       scalar.db.username=postgres
       scalar.db.password=postgres

       # For ScalarDB Cluster GraphQL tutorial.
       scalar.db.graphql.enabled=true
       scalar.db.graphql.namespaces=emoney

       # For ScalarDB Cluster SQL tutorial.
       scalar.db.sql.enabled=true
     graphql:
       enabled: true
       service:
         type: "LoadBalancer"
   EOF
   ```
   
   For the tutorials, the service type for ScalarDB Cluster GraphQL and Envoy is set to `LoadBalancer`.

4. Deploy ScalarDB Cluster:

   ```console
   helm install scalardb-cluster scalar-labs/scalardb-cluster -f ./scalardb-cluster-custom-values.yaml
   ```

5. Check if the ScalarDB Cluster pods are deployed:

   ```console
   kubectl get pod
   ```
   
   Command execution result:
   
   ```console
   NAME                                      READY   STATUS    RESTARTS   AGE
   postgresql-scalardb-cluster-0             1/1     Running   0          84s
   scalardb-cluster-envoy-59899dc588-477tg   1/1     Running   0          35s
   scalardb-cluster-envoy-59899dc588-dpvhx   1/1     Running   0          35s
   scalardb-cluster-envoy-59899dc588-lv9hx   1/1     Running   0          35s
   scalardb-cluster-node-866c756c79-5v2tk    1/1     Running   0          35s
   scalardb-cluster-node-866c756c79-9zhq5    1/1     Running   0          35s
   scalardb-cluster-node-866c756c79-t6v86    1/1     Running   0          35s
   ```
   
   If the ScalarDB Cluster Node Pods and the Envoy Pods are deployed properly, the `STATUS` for each pod will be `Running`.

6. Check if the service resources of the ScalarDB Cluster are deployed:

   ```console
   kubectl get svc
   ```
   
   Command execution result:
   
   ```console
   NAME                             TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)           AGE
   kubernetes                       ClusterIP      10.96.0.1        <none>        443/TCP           260d
   postgresql-scalardb-cluster      ClusterIP      10.110.97.40     <none>        5432/TCP          86s
   postgresql-scalardb-cluster-hl   ClusterIP      None             <none>        5432/TCP          86s
   scalardb-cluster-envoy           LoadBalancer   10.105.121.51    localhost     60053:30641/TCP   49s
   scalardb-cluster-envoy-metrics   ClusterIP      10.111.131.189   <none>        9001/TCP          49s
   scalardb-cluster-graphql         LoadBalancer   10.105.74.214    localhost     8080:30514/TCP    49s
   scalardb-cluster-headless        ClusterIP      None             <none>        60053/TCP         49s
   scalardb-cluster-metrics         ClusterIP      10.110.132.22    <none>        9080/TCP          49s
   ```

   If the service resources of ScalarDB Cluster and Envoy are deployed properly, the private IP addresses in the `CLUSTER-IP` column will be displayed. (**Note:** `scalardb-cluster-headless` has no `CLUSTER-IP` address.)
   You can also see `EXTERNAL-IP` addresses assigned to the service resource of ScalarDB Cluster GraphQL (`scalardb-cluster-graphql`) and the service resource of Envoy (`scalardb-cluster-envoy`) as `TYPE` is set to `LoadBalancer`.

   In addition, the access method to the `LoadBalancer` service from your environment depends on each Kubernetes distribution. For example:

   * If you use Minikube, you can use the [`minikube tunnel` command](https://minikube.sigs.k8s.io/docs/commands/tunnel/).
   * If you use Kind, you can use [MetalLB](https://kind.sigs.k8s.io/docs/user/loadbalancer/).

   For details on how to access the `LoadBalancer` service, see the official documents of the Kubernetes distribution that you use.

## Delete all resources

You can delete all resources created in this document by running the following command:

```console
helm uninstall scalardb-cluster postgresql-scalardb-cluster
```

## Next steps

To get familiar with other use cases for ScalarDB Cluster, try the following tutorials:

* [Getting Started with ScalarDB Cluster](getting-started-with-scalardb-cluster.mdx)
* [Getting Started with ScalarDB Cluster GraphQL](getting-started-with-scalardb-cluster-graphql.mdx)
* [Getting Started with ScalarDB Cluster SQL via JDBC](getting-started-with-scalardb-cluster-sql-jdbc.mdx)
* [Getting Started with ScalarDB Cluster SQL via Spring Data JDBC for ScalarDB](getting-started-with-scalardb-cluster-sql-spring-data-jdbc.mdx)
