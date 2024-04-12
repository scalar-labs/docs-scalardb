# Getting Started with Helm Charts (ScalarDL Ledger and Auditor with TLS / Auditor Mode)

This tutorial explains how to get started with ScalarDL Ledger and ScalarDL Auditor with TLS configurations by using Helm Charts on a Kubernetes cluster as a test environment. Before starting, you should already have a Mac or Linux environment for testing. In addition, although this tutorial mentions using **minikube**, the steps described should work in any Kubernetes cluster.

## Requirements

* You need to have a license key (trial license or commercial license) for ScalarDL. If you don't have a license key, please [contact us](https://www.scalar-labs.com/contact).
* You need to use ScalarDL 3.9 or later, which supports TLS.

{% capture notice--info %}
**Note**

To make Byzantine fault detection with auditing work properly, ScalarDL Ledger and ScalarDL Auditor should be deployed and managed in different administrative domains. However, in this tutorial, we will deploy ScalarDL Ledger and ScalarDL Auditor in the same Kubernetes cluster to make the test easier.
{% endcapture %}

<div class="notice--info">{{ notice--info | markdownify }}</div>

## What you'll create

In this tutorial, you'll deploy the following components on a Kubernetes cluster in the following way:

```
+-----------------------------------------------------------------------------------------------------------------------------+
| [Kubernetes Cluster]                                                                                                        |
|                                             [Pod]                                      [Pod]                   [Pod]        |
|                                                                                                                             |
|                                           +-------+                                 +---------+                             |
|                                     +---> | Envoy | ---+                      +---> | Ledger  | ---+                        |
|                                     |     +-------+    |                      |     +---------+    |                        |
|                                     |                  |                      |                    |                        |
|                      +---------+    |     +-------+    |     +-----------+    |     +---------+    |     +---------------+  |
|                +---> | Service | ---+---> | Envoy | ---+---> |  Service  | ---+---> | Ledger  | ---+---> |  PostgreSQL   |  |
|                |     | (Envoy) |    |     +-------+    |     | (Ledger)  |    |     +---------+    |     | (For Ledger)  |  |
|                |     +---------+    |                  |     +-----------+    |                    |     +---------------+  |
|    [Pod]       |                    |     +-------+    |                      |     +---------+    |                        |
|                |                    +---> | Envoy | ---+                      +---> | Ledger  | ---+                        |
|  +--------+    |                          +-------+                                 +---------+                             |
|  | Client | ---+                                                                                                            |
|  +--------+    |                          +-------+                                 +---------+                             |
|                |                    +---> | Envoy | ---+                      +---> | Auditor | ---+                        |
|                |                    |     +-------+    |                      |     +---------+    |                        |
|                |                    |                  |                      |                    |                        |
|                |     +---------+    |     +-------+    |     +-----------+    |     +---------+    |     +---------------+  |
|                +---> | Service | ---+---> | Envoy | ---+---> |  Service  | ---+---> | Auditor | ---+---> |  PostgreSQL   |  |
|                      | (Envoy) |    |     +-------+    |     | (Auditor) |    |     +---------+    |     | (For Auditor) |  |
|                      +---------+    |                  |     +-----------+    |                    |     +---------------+  |
|                                     |     +-------+    |                      |     +---------+    |                        |
|                                     +---> | Envoy | ---+                      +---> | Auditor | ---+                        |
|                                           +-------+                                 +---------+                             |
|                                                                                                                             |
+-----------------------------------------------------------------------------------------------------------------------------+
```

You'll also create the following private key and certificate files for TLS connections.

```
                                                        +----------------------+
                                                  +---> | For Scalar Envoy     |
                                                  |     +----------------------+
                                                  |     | envoy-key.pem        |
                                                  |     | envoy.pem            |
                                                  |     +----------------------+
                                                  |     
+----------------------+                          |     +----------------------+
| Self-managed CA      | ---(Sign certificates)---+---> | For ScalarDL Ledger  |
+----------------------+                          |     +----------------------+
| ca-key.pem           |                          |     | ledger-key.pem       |
| ca.pem               |                          |     | ledger.pem           |
+----------------------+                          |     +----------------------+
                                                  |     
                                                  |     +----------------------+
                                                  +---> | For ScalarDL Auditor |
                                                        +----------------------+
                                                        | auditor-key.pem      |
                                                        | auditor.pem          |
                                                        +----------------------+
```

You'll set each private key and certificate file as follows to enable TLS in each connection.

```
                                                                     +--------------------------------+      +--------------------------------+
                                      +-------(Normal request)-----> | Envoy for ScalarDL Ledger      | ---> | ScalarDL Ledger                |
                                      |                              +--------------------------------+      +--------------------------------+
                                      |   +---(Recovery request)---> | envoy-key.pem                  | ---> | ledger-key.pem                 |
                                      |   |                          | envoy.pem                      |      | ledger.pem                     |
                                      |   |                          | ca.pem (to verify ledger.pem)  |      | ca.pem (used for health check) |
                                      |   |                          +--------------------------------+      +--------------------------------+
+--------------------------------+    |   |
| Client                         | ---+   |
+--------------------------------+    |   +--------------------------------------------------------------------------------------------------------+
| ca.pem (to verify envoy.pem)   |    |                                                                                                            |
+--------------------------------+    |                                                                                                            |
                                      |                              +--------------------------------+      +--------------------------------+    |
                                      +-------(Normal request)-----> | Envoy for ScalarDL Auditor     | ---> | ScalarDL Auditor               | ---+
                                                                     +--------------------------------+      +--------------------------------+
                                                                     | envoy-key.pem                  |      | auditor-key.pem                |
                                                                     | envoy.pem                      |      | auditor.pem                    |
                                                                     | ca.pem (to verify auditor.pem) |      | ca.pem (used for health check) |
                                                                     +--------------------------------+      | ca.pem (to verify ledger.pem)  |
                                                                                                             +--------------------------------+
```

The following connections exist amongst the ScalarDL-related components:

* **`Client - Envoy for ScalarDL Ledger`:** When you execute a ScalarDL API function, the client accesses Envoy for ScalarDL Ledger.
* **`Client - Envoy for ScalarDL Auditor`:** When you execute a ScalarDL API function, the client accesses Envoy for ScalarDL Auditor.
* **`Envoy for ScalarDL Ledger - ScalarDL Ledger`:** Envoy works as an L7 (gRPC) load balancer in front of ScalarDL Ledger.
* **`Envoy for ScalarDL Auditor - ScalarDL Auditor`:** Envoy works as an L7 (gRPC) load balancer in front of ScalarDL Auditor.
* **`ScalarDL Auditor - Envoy for ScalarDL Ledger (ScalarDL Ledger)`:** When ScalarDL needs to run the recovery process to keep data consistent, ScalarDL Auditor runs the request against ScalarDL Ledger via Envoy.

## Step 1. Start a Kubernetes cluster and install tools

You need to prepare a Kubernetes cluster and install some tools (`kubectl`, `helm`, `cfssl`, and `cfssljson`). For more details on how to install them, see [Getting Started with Scalar Helm Charts](getting-started-scalar-helm-charts.md).

## Step 2. Start the PostgreSQL containers

ScalarDL Ledger and ScalarDL Auditor must use some type of database system as a backend database. In this tutorial, you'll use PostgreSQL.

You can deploy PostgreSQL on the Kubernetes cluster as follows:

1. Add the Bitnami helm repository.

   ```console
   helm repo add bitnami https://charts.bitnami.com/bitnami
   ```

1. Deploy PostgreSQL for Ledger.

   ```console
   helm install postgresql-ledger bitnami/postgresql \
     --set auth.postgresPassword=postgres \
     --set primary.persistence.enabled=false \
     -n default
   ```

1. Deploy PostgreSQL for Auditor.

   ```console
   helm install postgresql-auditor bitnami/postgresql \
     --set auth.postgresPassword=postgres \
     --set primary.persistence.enabled=false \
     -n default
   ```

1. Check if the PostgreSQL containers are running.

   ```console
   kubectl get pod -n default
   ```

   [Command execution result]

   ```console
   NAME                   READY   STATUS    RESTARTS   AGE
   postgresql-auditor-0   1/1     Running   0          11s
   postgresql-ledger-0    1/1     Running   0          16s
   ```

## Step 3. Create a working directory

You'll create some configuration files and private key and certificate files locally. Be sure to create a working directory for those files.

1. Create a working directory.

   ```console
   mkdir -p ${HOME}/scalardl-test/certs/
   ```

## Step 4. Create private key and certificate files

{% capture notice--warning %}  
**Attention**  

In this tutorial, a self-managed CA is used for testing. However, it is strongly recommended that these certificates **not** be used in production. Please prepare your certificate files based on the security requirements of your system.
{% endcapture %}  

<div class="notice--warning">{{ notice--warning | markdownify }}</div>

1. Change the working directory to `${HOME}/scalardl-test/certs/`.

   ```console
   cd ${HOME}/scalardl-test/certs/
   ```

1. Create a JSON file that includes CA information.

   ```console
   cat << 'EOF' > ${HOME}/scalardl-test/certs/ca.json
   {
       "CN": "scalar-test-ca",
       "key": {
           "algo": "ecdsa",
           "size": 256
       },
       "names": [
           {
               "C": "JP",
               "ST": "Tokyo",
               "L": "Shinjuku",
               "O": "Scalar Test CA"
           }
       ]
   }
   EOF
   ```

1. Create the CA private key and certificate files.

   ```console
   cfssl gencert -initca ca.json | cfssljson -bare ca
   ```

1. Create a JSON file that includes CA configurations.

   ```console
   cat << 'EOF' > ${HOME}/scalardl-test/certs/ca-config.json
   {
       "signing": {
           "default": {
               "expiry": "87600h"
           },
           "profiles": {
               "scalar-test-ca": {
                   "expiry": "87600h",
                   "usages": [
                       "signing",
                       "key encipherment",
                       "server auth"
                   ]
               }
           }
       }
   }
   EOF
   ```

1. Create a JSON file that includes Envoy information.

   ```console
   cat << 'EOF' > ${HOME}/scalardl-test/certs/envoy.json
   {
       "CN": "scalar-envoy",
       "hosts": [
           "envoy.scalar.example.com",
           "localhost"
       ],
       "key": {
           "algo": "ecdsa",
           "size": 256
       },
       "names": [
           {
               "C": "JP",
               "ST": "Tokyo",
               "L": "Shinjuku",
               "O": "Scalar Envoy Test"
           }
       ]
   }
   EOF
   ```

1. Create a JSON file that includes ScalarDL Ledger information.

   ```console
   cat << 'EOF' > ${HOME}/scalardl-test/certs/ledger.json
   {
       "CN": "scalardl-ledger",
       "hosts": [
           "ledger.scalardl.example.com",
           "localhost"
       ],
       "key": {
           "algo": "ecdsa",
           "size": 256
       },
       "names": [
           {
               "C": "JP",
               "ST": "Tokyo",
               "L": "Shinjuku",
               "O": "ScalarDL Ledger Test"
           }
       ]
   }
   EOF
   ```

1. Create a JSON file that includes ScalarDL Auditor information.

   ```console
   cat << 'EOF' > ${HOME}/scalardl-test/certs/auditor.json
   {
       "CN": "scalardl-auditor",
       "hosts": [
           "auditor.scalardl.example.com",
           "localhost"
       ],
       "key": {
           "algo": "ecdsa",
           "size": 256
       },
       "names": [
           {
               "C": "JP",
               "ST": "Tokyo",
               "L": "Shinjuku",
               "O": "ScalarDL Auditor Test"
           }
       ]
   }
   EOF
   ```

1. Create private key and certificate files for Envoy.

   ```console
   cfssl gencert -ca ca.pem -ca-key ca-key.pem -config ca-config.json -profile scalar-test-ca envoy.json | cfssljson -bare envoy
   ```

1. Create private key and certificate files for ScalarDL Ledger.  

   ```console
   cfssl gencert -ca ca.pem -ca-key ca-key.pem -config ca-config.json -profile scalar-test-ca ledger.json | cfssljson -bare ledger
   ```

1. Create private key and certificate files for ScalarDL Auditor.

   ```console
   cfssl gencert -ca ca.pem -ca-key ca-key.pem -config ca-config.json -profile scalar-test-ca auditor.json | cfssljson -bare auditor
   ```

1. Confirm that the private key and certificate files were created.

   ```console
   ls -1
   ```

   [Command execution result]

   ```console
   auditor-key.pem
   auditor.csr
   auditor.json
   auditor.pem
   ca-config.json
   ca-key.pem
   ca.csr
   ca.json
   ca.pem
   envoy-key.pem
   envoy.csr
   envoy.json
   envoy.pem
   ledger-key.pem
   ledger.csr
   ledger.json
   ledger.pem
   ```

## Step 5. Create database schemas for ScalarDL Ledger and ScalarDL Auditor by using Helm Charts

You'll deploy two ScalarDL Schema Loader pods on the Kubernetes cluster by using Helm Charts. The ScalarDL Schema Loader will create the database schemas for ScalarDL Ledger and Auditor in PostgreSQL.

1. Change the working directory to `${HOME}/scalardl-test/`.

   ```console
   cd ${HOME}/scalardl-test/
   ```

1. Add the Scalar Helm Charts repository.

   ```console
   helm repo add scalar-labs https://scalar-labs.github.io/helm-charts
   ```

1. Create a custom values file for ScalarDL Schema Loader for Ledger (`schema-loader-ledger-custom-values.yaml`).

   {% raw %}
   ```console
   cat << 'EOF' > ${HOME}/scalardl-test/schema-loader-ledger-custom-values.yaml
   schemaLoading:
     schemaType: "ledger"
     databaseProperties: |
       scalar.db.contact_points=jdbc:postgresql://postgresql-ledger.default.svc.cluster.local:5432/postgres
       scalar.db.username=${env:SCALAR_DL_LEDGER_POSTGRES_USERNAME}
       scalar.db.password=${env:SCALAR_DL_LEDGER_POSTGRES_PASSWORD}
       scalar.db.storage=jdbc
     secretName: "schema-ledger-credentials-secret"
   EOF
   ```
   {% endraw %}

1. Create a custom values file for ScalarDL Schema Loader for Auditor (`schema-loader-auditor-custom-values.yaml`).

   {% raw %}
   ```console
   cat << 'EOF' > ${HOME}/scalardl-test/schema-loader-auditor-custom-values.yaml
   schemaLoading:
     schemaType: "auditor"
     databaseProperties: |
       scalar.db.contact_points=jdbc:postgresql://postgresql-auditor.default.svc.cluster.local:5432/postgres
       scalar.db.username=${env:SCALAR_DL_AUDITOR_POSTGRES_USERNAME}
       scalar.db.password=${env:SCALAR_DL_AUDITOR_POSTGRES_PASSWORD}
       scalar.db.storage=jdbc
     secretName: "schema-auditor-credentials-secret"
   EOF
   ```
   {% endraw %}

1. Create a secret resource named `schema-ledger-credentials-secret` that includes a username and password for PostgreSQL for ScalarDL Ledger.

   ```console
   kubectl create secret generic schema-ledger-credentials-secret \
     --from-literal=SCALAR_DL_LEDGER_POSTGRES_USERNAME=postgres \
     --from-literal=SCALAR_DL_LEDGER_POSTGRES_PASSWORD=postgres \
     -n default
   ```

1. Create a secret resource named `schema-auditor-credentials-secret` that includes a username and password for PostgreSQL for ScalarDL Auditor.

   ```console
   kubectl create secret generic schema-auditor-credentials-secret \
     --from-literal=SCALAR_DL_AUDITOR_POSTGRES_USERNAME=postgres \
     --from-literal=SCALAR_DL_AUDITOR_POSTGRES_PASSWORD=postgres \
     -n default
   ```

1. Set the chart version of ScalarDL Schema Loader.

   ```console
   SCALAR_DL_VERSION=3.9.0
   SCALAR_DL_SCHEMA_LOADER_CHART_VERSION=$(helm search repo scalar-labs/schema-loading -l | grep -F "${SCALAR_DL_VERSION}" | awk '{print $2}' | sort --version-sort -r | head -n 1)
   ```

1. Deploy ScalarDL Schema Loader for ScalarDL Ledger.

   ```console
   helm install schema-loader-ledger scalar-labs/schema-loading -f ${HOME}/scalardl-test/schema-loader-ledger-custom-values.yaml --version ${SCALAR_DL_SCHEMA_LOADER_CHART_VERSION} -n default
   ```

1. Deploy ScalarDL Schema Loader for ScalarDL Auditor.

   ```console
   helm install schema-loader-auditor scalar-labs/schema-loading -f ${HOME}/scalardl-test/schema-loader-auditor-custom-values.yaml --version ${SCALAR_DL_SCHEMA_LOADER_CHART_VERSION} -n default
   ```

1. Check if the ScalarDL Schema Loader pods are deployed with the status `Completed`.

   ```console
   kubectl get pod -n default
   ```

   [Command execution result]

   ```console
   NAME                                         READY   STATUS      RESTARTS   AGE
   postgresql-auditor-0                         1/1     Running     0          2m56s
   postgresql-ledger-0                          1/1     Running     0          3m1s
   schema-loader-auditor-schema-loading-dvc5r   0/1     Completed   0          6s
   schema-loader-ledger-schema-loading-mtllb    0/1     Completed   0          10s
   ```
   
   If the status of the ScalarDL Schema Loader pods are **ContainerCreating** or **Running**, wait for the `STATUS` column for those pods to show as `Completed`.

## Step 6. Deploy ScalarDL Ledger and ScalarDL Auditor on the Kubernetes cluster by using Helm Charts

1. Create a custom values file for ScalarDL Ledger (`scalardl-ledger-custom-values.yaml`).

     {% raw %}
     ```console
     cat << 'EOF' > ${HOME}/scalardl-test/scalardl-ledger-custom-values.yaml
     envoy:

       tls:
         downstream:
           enabled: true
           certChainSecret: "envoy-tls-cert"
           privateKeySecret: "envoy-tls-key"
         upstream:
           enabled: true
           overrideAuthority: "ledger.scalardl.example.com"
           caRootCertSecret: "scalardl-ledger-tls-ca"

     ledger:

       image:
         repository: "ghcr.io/scalar-labs/scalardl-ledger-byol"

       ledgerProperties: |
         ### Storage configurations
         scalar.db.storage=jdbc
         scalar.db.contact_points=jdbc:postgresql://postgresql-ledger.default.svc.cluster.local:5432/postgres
         scalar.db.username=${env:SCALAR_DL_LEDGER_POSTGRES_USERNAME}
         scalar.db.password=${env:SCALAR_DL_LEDGER_POSTGRES_PASSWORD}

         ### Ledger configurations
         scalar.dl.ledger.proof.enabled=true
         scalar.dl.ledger.auditor.enabled=true
         scalar.dl.ledger.authentication.method=hmac
         scalar.dl.ledger.authentication.hmac.cipher_key=${env:SCALAR_DL_LEDGER_HMAC_CIPHER_KEY}
         scalar.dl.ledger.servers.authentication.hmac.secret_key=${env:SCALAR_DL_LEDGER_HMAC_SECRET_KEY}

         ### TLS configurations
         scalar.dl.ledger.server.tls.enabled=true
         scalar.dl.ledger.server.tls.cert_chain_path=/tls/certs/cert-chain.pem
         scalar.dl.ledger.server.tls.private_key_path=/tls/certs/private-key.pem

         ### License key configurations
         scalar.dl.licensing.license_key=${env:SCALAR_DL_LICENSE_KEY}
         scalar.dl.licensing.license_check_cert_pem=${env:SCALAR_DL_LICENSE_CHECK_CERT_PEM}

       tls:
         enabled: true
         overrideAuthority: "ledger.scalardl.example.com"
         caRootCertSecret: "scalardl-ledger-tls-ca"
         certChainSecret: "scalardl-ledger-tls-cert"
         privateKeySecret: "scalardl-ledger-tls-key"

       secretName: "ledger-credentials-secret"
     EOF
     ```
     {% endraw %}

1. Create a custom values file for ScalarDL Auditor (`scalardl-auditor-custom-values.yaml`).

     {% raw %}
     ```console
     cat << 'EOF' > ${HOME}/scalardl-test/scalardl-auditor-custom-values.yaml
     envoy:

       tls:
         downstream:
           enabled: true
           certChainSecret: "envoy-tls-cert"
           privateKeySecret: "envoy-tls-key"
         upstream:
           enabled: true
           overrideAuthority: "auditor.scalardl.example.com"
           caRootCertSecret: "scalardl-auditor-tls-ca"

     auditor:
       image:
         repository: "ghcr.io/scalar-labs/scalardl-auditor-byol"

       auditorProperties: |
         ### Storage configurations
         scalar.db.storage=jdbc
         scalar.db.contact_points=jdbc:postgresql://postgresql-auditor.default.svc.cluster.local:5432/postgres
         scalar.db.username=${env:SCALAR_DL_AUDITOR_POSTGRES_USERNAME}
         scalar.db.password=${env:SCALAR_DL_AUDITOR_POSTGRES_PASSWORD}

         ### Auditor configurations
         scalar.dl.auditor.ledger.host=scalardl-ledger-envoy.default.svc.cluster.local
         scalar.dl.auditor.authentication.method=hmac
         scalar.dl.auditor.authentication.hmac.cipher_key=${env:SCALAR_DL_AUDITOR_HMAC_CIPHER_KEY}
         scalar.dl.auditor.servers.authentication.hmac.secret_key=${env:SCALAR_DL_AUDITOR_HMAC_SECRET_KEY}

         ### TLS configurations
         scalar.dl.auditor.server.tls.enabled=true
         scalar.dl.auditor.server.tls.cert_chain_path=/tls/certs/cert-chain.pem
         scalar.dl.auditor.server.tls.private_key_path=/tls/certs/private-key.pem
         scalar.dl.auditor.tls.enabled=true
         scalar.dl.auditor.tls.ca_root_cert_path=/tls/certs/ca-root-cert-for-ledger.pem
         scalar.dl.auditor.tls.override_authority=envoy.scalar.example.com

         ### License key configurations
         scalar.dl.licensing.license_key=${env:SCALAR_DL_LICENSE_KEY}
         scalar.dl.licensing.license_check_cert_pem=${env:SCALAR_DL_LICENSE_CHECK_CERT_PEM}

       tls:
         enabled: true
         overrideAuthority: "auditor.scalardl.example.com"
         caRootCertSecret: "scalardl-auditor-tls-ca"
         certChainSecret: "scalardl-auditor-tls-cert"
         privateKeySecret: "scalardl-auditor-tls-key"
         caRootCertForLedgerSecret: "scalardl-auditor-tls-ca-for-ledger"

       secretName: "auditor-credentials-secret"
     EOF
     ```
     {% endraw %}

1. Set your license key and certificate as environment variables. If you don't have a license key, please [contact us](https://www.scalar-labs.com/contact).

   ```console
   SCALAR_DL_LICENSE_KEY=<YOUR_LICENSE_KEY>
   SCALAR_DL_LICENSE_CHECK_CERT_PEM=<CERT_PEM_FOR_YOUR_LICENSE_KEY>
   ```

1. Create a secret resource named `ledger-credentials-secret` that includes credentials and a license key.

   ```console
   kubectl create secret generic ledger-credentials-secret \
     --from-literal=SCALAR_DL_LEDGER_POSTGRES_USERNAME=postgres \
     --from-literal=SCALAR_DL_LEDGER_POSTGRES_PASSWORD=postgres \
     --from-literal=SCALAR_DL_LEDGER_HMAC_CIPHER_KEY=ledger-hmac-cipher-key \
     --from-literal=SCALAR_DL_LEDGER_HMAC_SECRET_KEY=scalardl-hmac-secret-key \
     --from-literal=SCALAR_DL_LICENSE_KEY=${SCALAR_DL_LICENSE_KEY} \
     --from-literal=SCALAR_DL_LICENSE_CHECK_CERT_PEM=${SCALAR_DL_LICENSE_CHECK_CERT_PEM} \
     -n default
   ```

1. Create a secret resource named `auditor-credentials-secret` that includes credentials and a license key.

   ```console
   kubectl create secret generic auditor-credentials-secret \
     --from-literal=SCALAR_DL_AUDITOR_POSTGRES_USERNAME=postgres \
     --from-literal=SCALAR_DL_AUDITOR_POSTGRES_PASSWORD=postgres \
     --from-literal=SCALAR_DL_AUDITOR_HMAC_CIPHER_KEY=auditor-hmac-cipher-key \
     --from-literal=SCALAR_DL_AUDITOR_HMAC_SECRET_KEY=scalardl-hmac-secret-key \
     --from-literal=SCALAR_DL_LICENSE_KEY=${SCALAR_DL_LICENSE_KEY} \
     --from-literal=SCALAR_DL_LICENSE_CHECK_CERT_PEM=${SCALAR_DL_LICENSE_CHECK_CERT_PEM} \
     -n default
   ```

1. Create secret resources that include the private key and certificate files for Envoy.

   ```console
   kubectl create secret generic envoy-tls-cert --from-file=cert-chain=${HOME}/scalardl-test/certs/envoy.pem -n default
   kubectl create secret generic envoy-tls-key --from-file=private-key=${HOME}/scalardl-test/certs/envoy-key.pem -n default
   ```

1. Create secret resources that include the private key, certificate, and CA certificate files for ScalarDL Ledger.

   ```console
   kubectl create secret generic scalardl-ledger-tls-ca --from-file=ca-root-cert=${HOME}/scalardl-test/certs/ca.pem -n default
   kubectl create secret generic scalardl-ledger-tls-cert --from-file=cert-chain=${HOME}/scalardl-test/certs/ledger.pem -n default
   kubectl create secret generic scalardl-ledger-tls-key --from-file=private-key=${HOME}/scalardl-test/certs/ledger-key.pem -n default
   ```

1. Create secret resources that include the private key, certificate, and CA certificate files for ScalarDL Auditor.

   ```console
   kubectl create secret generic scalardl-auditor-tls-ca --from-file=ca-root-cert=${HOME}/scalardl-test/certs/ca.pem -n default
   kubectl create secret generic scalardl-auditor-tls-cert --from-file=cert-chain=${HOME}/scalardl-test/certs/auditor.pem -n default
   kubectl create secret generic scalardl-auditor-tls-key --from-file=private-key=${HOME}/scalardl-test/certs/auditor-key.pem -n default
   kubectl create secret generic scalardl-auditor-tls-ca-for-ledger --from-file=ca-root-cert-for-ledger=${HOME}/scalardl-test/certs/ca.pem -n default
   ```

1. Create a secret resource named `auditor-keys` to disable the `digital-signature` authentication method. In this tutorial, you'll use the `hmac` authentication method instead of `digital-signature`.

   ```console
   kubectl create secret generic auditor-keys \
     --from-literal=private-key=dummy-data-to-disable-digital-signature-method \
     --from-literal=certificate=dummy-data-to-disable-digital-signature-method \
     -n default
   ```
   Note: If you use `hmac` as an authentication method, you have to create a dummy secret `auditor-key` to disable `digital-signature` on the helm chart side.

1. Set the chart version of ScalarDL Ledger and ScalarDL Auditor.

   ```console
   SCALAR_DL_LEDGER_CHART_VERSION=$(helm search repo scalar-labs/scalardl -l | grep -v -e "scalar-labs/scalardl-audit" | grep -F "${SCALAR_DL_VERSION}" | awk '{print $2}' | sort --version-sort -r | head -n 1)
   SCALAR_DL_AUDITOR_CHART_VERSION=$(helm search repo scalar-labs/scalardl-audit -l | grep -F "${SCALAR_DL_VERSION}" | awk '{print $2}' | sort --version-sort -r | head -n 1)
   ```

1. Deploy ScalarDL Ledger.

   ```console
   helm install scalardl-ledger scalar-labs/scalardl -f ${HOME}/scalardl-test/scalardl-ledger-custom-values.yaml --version ${SCALAR_DL_LEDGER_CHART_VERSION} -n default
   ```

1. Deploy ScalarDL Auditor.

   ```console
   helm install scalardl-auditor scalar-labs/scalardl-audit -f ${HOME}/scalardl-test/scalardl-auditor-custom-values.yaml --version ${SCALAR_DL_AUDITOR_CHART_VERSION} -n default
   ```

1. Check if the ScalarDL Ledger and ScalarDL Auditor pods are deployed.

   ```console
   kubectl get pod -n default
   ```

   [Command execution result]

   ```console
   NAME                                         READY   STATUS      RESTARTS   AGE
   postgresql-auditor-0                         1/1     Running     0          14m
   postgresql-ledger-0                          1/1     Running     0          14m
   scalardl-auditor-auditor-5b885ff4c8-fwkpf    1/1     Running     0          18s
   scalardl-auditor-auditor-5b885ff4c8-g69cb    1/1     Running     0          18s
   scalardl-auditor-auditor-5b885ff4c8-nsmnq    1/1     Running     0          18s
   scalardl-auditor-envoy-689bcbdf65-5mn6v      1/1     Running     0          18s
   scalardl-auditor-envoy-689bcbdf65-fpq8j      1/1     Running     0          18s
   scalardl-auditor-envoy-689bcbdf65-lsz2t      1/1     Running     0          18s
   scalardl-ledger-envoy-547bbf7546-n7p5x       1/1     Running     0          26s
   scalardl-ledger-envoy-547bbf7546-p8nwp       1/1     Running     0          26s
   scalardl-ledger-envoy-547bbf7546-pskpb       1/1     Running     0          26s
   scalardl-ledger-ledger-6db5dc8774-5zsbj      1/1     Running     0          26s
   scalardl-ledger-ledger-6db5dc8774-vnmrw      1/1     Running     0          26s
   scalardl-ledger-ledger-6db5dc8774-wpjvs      1/1     Running     0          26s
   schema-loader-auditor-schema-loading-dvc5r   0/1     Completed   0          11m
   schema-loader-ledger-schema-loading-mtllb    0/1     Completed   0          11m
   ```

   If the ScalarDL Ledger and ScalarDL Auditor pods are deployed properly, the `STATUS` column for those pods will be displayed as `Running`.

1. Check if the ScalarDL Ledger and ScalarDL Auditor services are deployed.

   ```console
   kubectl get svc -n default
   ```

   [Command execution result]

   ```console
   NAME                             TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                         AGE
   kubernetes                       ClusterIP   10.96.0.1        <none>        443/TCP                         47d
   postgresql-auditor               ClusterIP   10.107.9.78      <none>        5432/TCP                        15m
   postgresql-auditor-hl            ClusterIP   None             <none>        5432/TCP                        15m
   postgresql-ledger                ClusterIP   10.108.241.181   <none>        5432/TCP                        15m
   postgresql-ledger-hl             ClusterIP   None             <none>        5432/TCP                        15m
   scalardl-auditor-envoy           ClusterIP   10.100.61.202    <none>        40051/TCP,40052/TCP             55s
   scalardl-auditor-envoy-metrics   ClusterIP   10.99.6.227      <none>        9001/TCP                        55s
   scalardl-auditor-headless        ClusterIP   None             <none>        40051/TCP,40053/TCP,40052/TCP   55s
   scalardl-auditor-metrics         ClusterIP   10.108.1.147     <none>        8080/TCP                        55s
   scalardl-ledger-envoy            ClusterIP   10.101.191.116   <none>        50051/TCP,50052/TCP             61s
   scalardl-ledger-envoy-metrics    ClusterIP   10.106.52.103    <none>        9001/TCP                        61s
   scalardl-ledger-headless         ClusterIP   None             <none>        50051/TCP,50053/TCP,50052/TCP   61s
   scalardl-ledger-metrics          ClusterIP   10.99.122.106    <none>        8080/TCP                        61s
   ```

   If the ScalarDL Ledger and ScalarDL Auditor services are deployed properly, you can see private IP addresses in the `CLUSTER-IP` column.
   
{% capture notice--info %}
**Note**

The `CLUSTER-IP` values for `scalardl-ledger-headless`, `scalardl-auditor-headless`, `postgresql-ledger-hl`, and `postgresql-auditor-hl` are `None` since they have no IP addresses.
{% endcapture %}

<div class="notice--info">{{ notice--info | markdownify }}</div>

## Step 7. Start a client container

You'll use the CA certificate file in a client container. Therefore, you'll need to create a secret resource and mount it to the client container.  


1. Create a secret resource named `client-ca-cert`.

   ```console
   kubectl create secret generic client-ca-cert --from-file=certificate=${HOME}/scalardl-test/certs/ca.pem -n default
   ```

1. Create a manifest file for a client pod (`scalardl-client-pod.yaml`).

   ```console
   cat << 'EOF' > ${HOME}/scalardl-test/scalardl-client-pod.yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: "scalardl-client"
   spec:
     containers:
       - name: scalardl-client
         image: eclipse-temurin:8
         command: ['sleep']
         args: ['inf']
         env:
           - name: SCALAR_DL_VERSION
             value: SCALAR_DL_CLIENT_POD_SCALAR_DL_VERSION
         volumeMounts:
           - name: "client-ca-cert"
             mountPath: "/certs/ca/ca.pem"
             subPath: certificate
             readOnly: true
     volumes:
       - name: "client-ca-cert"
         secret:
           secretName: "client-ca-cert"
     restartPolicy: Never
   EOF
   ```

1. Set the ScalarDL version in the manifest file.

   ```console
   sed -i s/SCALAR_DL_CLIENT_POD_SCALAR_DL_VERSION/${SCALAR_DL_VERSION}/ ${HOME}/scalardl-test/scalardl-client-pod.yaml
   ```

1. Deploy the client pod.

   ```console
   kubectl apply -f ${HOME}/scalardl-test/scalardl-client-pod.yaml -n default
   ```

1. Check if the client container is running.

   ```console
   kubectl get pod scalardl-client -n default
   ```

   [Command execution result]

   ```console
   NAME              READY   STATUS    RESTARTS   AGE
   scalardl-client   1/1     Running   0          4s
   ```

## Step 8. Run ScalarDL sample contracts in the client container

The following explains the minimum steps needed to run sample contracts. For more details about ScalarDL Ledger and ScalarDL Auditor, see the following:

* [Getting Started with ScalarDL](https://github.com/scalar-labs/scalardl/blob/master/docs/getting-started.md)
* [Getting Started with ScalarDL Auditor](https://github.com/scalar-labs/scalardl/blob/master/docs/getting-started-auditor.md)

1. Run bash in the client container.

   ```console
   kubectl exec -it scalardl-client -n default -- bash
   ```
   The commands in the following steps must be run in the client container.

1. Install the git, curl, and unzip commands in the client container.

   ```console
   apt update && apt install -y git curl unzip
   ```

1. Clone the ScalarDL Java Client SDK git repository.

   ```console
   git clone https://github.com/scalar-labs/scalardl-java-client-sdk.git
   ```

1. Change the working directory to `scalardl-java-client-sdk/`.

   ```console
   cd scalardl-java-client-sdk/
   ```

   ```console
   pwd
   ```

   [Command execution result]

   ```console
   /scalardl-java-client-sdk
   ```

1. Change the branch to the version you're using.

   ```console
   git checkout -b v${SCALAR_DL_VERSION} refs/tags/v${SCALAR_DL_VERSION}
   ```

1. Build the sample contracts.

   ```console
   ./gradlew assemble
   ```

1. Download the CLI tools for ScalarDL from [ScalarDL Java Client SDK Releases](https://github.com/scalar-labs/scalardl-java-client-sdk/releases).

   ```console
   curl -OL https://github.com/scalar-labs/scalardl-java-client-sdk/releases/download/v${SCALAR_DL_VERSION}/scalardl-java-client-sdk-${SCALAR_DL_VERSION}.zip
   ```
   You need to use the same version of CLI tools and ScalarDL Ledger.

1. Unzip the `scalardl-java-client-sdk-${SCALAR_DL_VERSION}.zip` file.

   ```console
   unzip ./scalardl-java-client-sdk-${SCALAR_DL_VERSION}.zip
   ```

1. Create a configuration file named `client.properties` to access ScalarDL Ledger and ScalarDL Auditor on the Kubernetes cluster.

   ```console
   cat << 'EOF' > client.properties
   # Ledger configuration
   scalar.dl.client.server.host=scalardl-ledger-envoy.default.svc.cluster.local
   scalar.dl.client.tls.enabled=true
   scalar.dl.client.tls.ca_root_cert_path=/certs/ca/ca.pem
   scalar.dl.client.tls.override_authority=envoy.scalar.example.com

   # Auditor configuration
   scalar.dl.client.auditor.enabled=true
   scalar.dl.client.auditor.host=scalardl-auditor-envoy.default.svc.cluster.local
   scalar.dl.client.auditor.tls.enabled=true
   scalar.dl.client.auditor.tls.ca_root_cert_path=/certs/ca/ca.pem
   scalar.dl.client.auditor.tls.override_authority=envoy.scalar.example.com

   # Client configuration
   scalar.dl.client.authentication_method=hmac
   scalar.dl.client.entity.id=client
   scalar.dl.client.entity.identity.hmac.secret_key=scalardl-hmac-client-secert-key
   EOF
   ```

1. Register the client secret.

   ```console
   ./scalardl-java-client-sdk-${SCALAR_DL_VERSION}/bin/scalardl register-secret --config ./client.properties
   ```

1. Register the sample contract `StateUpdater`.

   ```console
   ./scalardl-java-client-sdk-${SCALAR_DL_VERSION}/bin/scalardl register-contract --config ./client.properties --contract-id StateUpdater --contract-binary-name com.org1.contract.StateUpdater --contract-class-file ./build/classes/java/main/com/org1/contract/StateUpdater.class
   ```

1. Register the sample contract `StateReader`.

   ```console
   ./scalardl-java-client-sdk-${SCALAR_DL_VERSION}/bin/scalardl register-contract --config ./client.properties --contract-id StateReader --contract-binary-name com.org1.contract.StateReader --contract-class-file ./build/classes/java/main/com/org1/contract/StateReader.class
   ```

1. Register the contract `ValidateLedger` to execute a validate request.

   ```console
   ./scalardl-java-client-sdk-${SCALAR_DL_VERSION}/bin/scalardl register-contract --config ./client.properties --contract-id validate-ledger --contract-binary-name com.scalar.dl.client.contract.ValidateLedger --contract-class-file ./build/classes/java/main/com/scalar/dl/client/contract/ValidateLedger.class
   ```

1. Execute the contract `StateUpdater`.

   ```console
   ./scalardl-java-client-sdk-${SCALAR_DL_VERSION}/bin/scalardl execute-contract --config ./client.properties --contract-id StateUpdater --contract-argument '{"asset_id": "test_asset", "state": 3}'
   ```
   This sample contract updates the `state` (value) of the asset named `test_asset` to `3`.  

1. Execute the contract `StateReader`.

   ```console
   ./scalardl-java-client-sdk-${SCALAR_DL_VERSION}/bin/scalardl execute-contract --config ./client.properties --contract-id StateReader --contract-argument '{"asset_id": "test_asset"}'
   ```

   [Command execution result]

   ```console
   Contract result:
   {
     "id" : "test_asset",
     "age" : 0,
     "output" : {
       "state" : 3
     }
   }
   ```

   ### Reference

   * If the asset data is not tampered with, running the `execute-contract` command to request contract execution will return `OK` as a result.
   * If the asset data is tampered with (for example, if the `state` value in the database is tampered with), running the `execute-contract` command to request contract execution will return a value other than `OK` (for example, `INCONSISTENT_STATES`) as a result. See the following as an example for how ScalarDL detects data tampering.

     [Command execution result (if the asset data is tampered with)]

     ```console
     {
       "status_code" : "INCONSISTENT_STATES",
       "error_message" : "The results from Ledger and Auditor don't match"
     }
     ```

1. Execute a validation request for the asset.

   ```console
   ./scalardl-java-client-sdk-${SCALAR_DL_VERSION}/bin/scalardl validate-ledger --config ./client.properties --asset-id "test_asset"
   ```

   [Command execution result]

   ```console
   {
     "status_code" : "OK",
     "Ledger" : {
       "id" : "test_asset",
       "age" : 0,
       "nonce" : "3533427d-03cf-41d1-bf95-4d31eb0cb24d",
       "hash" : "FiquvtPMKLlxKf4VGoccSAGsi9ptn4ozYVVTwdSzEQ0=",
       "signature" : "MEYCIQDiiXqzw6K+Ml4uvn8rK43o5wHWESU3hoXnZPi6/OeKVwIhAM+tFBcapl6zg47Uq0Uc8nVNGWNHZLBDBGve3F0xkzTR"
     },
     "Auditor" : {
       "id" : "test_asset",
       "age" : 0,
       "nonce" : "3533427d-03cf-41d1-bf95-4d31eb0cb24d",
       "hash" : "FiquvtPMKLlxKf4VGoccSAGsi9ptn4ozYVVTwdSzEQ0=",
       "signature" : "MEUCIQDLsfUR2PmxSvfpL3YvHJUkz00RDpjCdctkroZKXE8d5QIgH73FQH2e11jfnynD00Pp9DrIG1vYizxDsvxUsMPo9IU="
     }
   }
   ```

   ### Reference

   * If the asset data is not tampered with, running the `validate-ledger` command to request validation will return `OK` as the result.
   * If the asset data is tampered with (for example, if the `state` value in the database is tampered with), running the `validate-ledger` command to request validation will return a value other than `OK` (for example, `INVALID_OUTPUT`) as a result. See the following as an example for how ScalarDL detects data tampering.

     [Command execution result (if the asset data is tampered with)]

     ```console
     {
       "status_code" : "INCONSISTENT_STATES",
       "error_message" : "The results from Ledger and Auditor don't match"
     }
     ```

## Step 9. Delete all resources

After completing the ScalarDL Ledger and ScalarDL Auditor tests on the Kubernetes cluster, remove all resources.

1. Uninstall ScalarDL Ledger, ScalarDL Auditor, ScalarDL Schema Loader, and PostgreSQL.

   ```console
   helm uninstall -n default scalardl-ledger schema-loader-ledger postgresql-ledger scalardl-auditor schema-loader-auditor postgresql-auditor
   ```

1. Remove the client container.

   ```
   kubectl delete pod scalardl-client --grace-period 0 -n default
   ```

1. Remove the working directory and sample files (configuration file, private key, and certificate).

   ```console
   cd ${HOME}
   ```

   ```console
   rm -rf ${HOME}/scalardl-test/
   ```

## Further reading

You can see how to get started with monitoring or logging for Scalar products in the following tutorials:  

* [Getting Started with Helm Charts (Monitoring using Prometheus Operator)](getting-started-monitoring.md)
* [Getting Started with Helm Charts (Logging using Loki Stack)](getting-started-logging.md)
* [Getting Started with Helm Charts (Scalar Manager)](getting-started-scalar-manager.md)