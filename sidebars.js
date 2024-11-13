/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  /* tutorialSidebar: [{type: 'autogenerated', dirName: '.'}], */

  // But you can create a sidebar manually

  docs: [
    {
      type: 'doc',
      label: 'ScalarDB Docs Home',
      id: 'index',
    },
    {
      type: 'category',
      label: 'About ScalarDB',
      collapsible: true,
      items: [
        {
          type: 'doc',
          id: 'overview',
          label: 'Overview',
        },
        {
          type: 'doc',
          id: 'design',
          label: 'Design',
        },
        {
          type: 'doc',
          id: 'requirements',
          label: 'Requirements',
        },
        {
          type: 'doc',
          id: 'database-configurations',
          label: 'Underlying Database Configurations',
        },
        {
          type: 'doc',
          id: 'releases/release-notes',
          label: 'Release Notes',
        },
        {
          type: 'doc',
          id: 'releases/release-support-policy',
          label: 'Release Support Policy',
        },
        {
          type: 'doc',
          id: 'roadmap',
          label: 'Roadmap',
        },
      ],
    },
    {
      type: 'category',
      label: 'Quickstart',
      collapsible: true,
      items: [
        {
          type: 'doc',
          id: 'quick-start-overview',
          label: 'Overview',
        },
        {
          type: 'category',
          label: 'Try Running Transactions Through the ScalarDB Core Library',
          collapsible: true,
          items: [
            {
              type: 'doc',
              id: 'getting-started-with-scalardb',
              label: 'Use ScalarDB Core',
            },
            {
              type: 'doc',
              id: 'getting-started-with-scalardb-by-using-kotlin',
              label: 'Use Kotlin',
            },
          ],
        },
        {
          type: 'category',
          label: 'Try Running Transactions Through ScalarDB Cluster',
          collapsible: true,
          items: [
            {
              type: 'doc',
              id: 'scalardb-cluster/getting-started-with-scalardb-cluster',
              label: 'Use ScalarDB Cluster',
            },
            {
              type: 'doc',
              id: 'scalardb-cluster/getting-started-with-scalardb-cluster-sql-jdbc',
              label: 'Use SQL via JDBC',
            },
            {
              type: 'doc',
              id: 'scalardb-cluster/getting-started-with-scalardb-cluster-sql-spring-data-jdbc',
              label: 'Use SQL via Spring Data JDBC',
            },
            {
              type: 'doc',
              id: 'scalardb-cluster/getting-started-with-scalardb-cluster-graphql',
              label: 'Use GraphQL',
            },
          ],
        },
        {
          type: 'category',
          label: 'Try Running Analytical Queries Through ScalarDB Analytics',
          collapsible: true,
          items: [
            {
              type: 'doc',
              id: 'scalardb-analytics-postgresql/getting-started',
              label: 'Use ScalarDB Analytics with PostgreSQL',
            },
            {
              type: 'doc',
              id: 'scalardb-samples/scalardb-analytics-spark-sample/README',
              label: 'Use ScalarDB Analytics with Spark',
            },
          ],
        },
        {
          type: 'category',
          label: 'Reference',
          collapsible: true,
          items: [
            {
              type: 'doc',
              id: 'scalardb-cluster/getting-started-with-using-go-for-scalardb-cluster',
              label: 'Use Go for ScalarDB Cluster',
            },
            {
              type: 'doc',
              id: 'scalardb-cluster/getting-started-with-using-python-for-scalardb-cluster',
              label: 'Use Python for ScalarDB Cluster',
            },
            {
              type: 'doc',
              id: 'scalardb-analytics-postgresql/installation',
              label: 'Install ScalarDB Analytics with PostgreSQL Locally',
            }
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Develop',
      collapsible: true,
      items: [
        {
          type: 'doc',
          id: 'develop-overview',
          label: 'Overview',
        },
        {
          type: 'category',
          label: 'Run Transactions',
          collapsible: true,
          items: [
            {
              type: 'doc',
              id: 'data-modeling',
              label: 'Model Your Data',
            },
            {
              type: 'category',
              label: 'Run Through the CRUD Interface',
              collapsible: true,
              items: [
                { // To be created
                  type: 'doc',
                  id: 'run-transactions-through-scalardb-core-library',
                  label: 'Use the ScalarDB Core Library',
                },
                { // To be created
                  type: 'doc',
                  id: 'scalardb-cluster/run-transactions-through-scalardb-cluster',
                  label: 'Use ScalarDB Cluster',
                },
              ],
            },
            { // To be created
              type: 'doc',
              id: 'scalardb-cluster/run-transactions-through-scalardb-cluster-sql',
              label: 'Run Through the SQL Interface',
            },
            {
              type: 'category',
              label: 'Advanced Configurations and Operations',
              collapsible: true,
              items: [
                {
                  type: 'doc',
                  id: 'scalardb-cluster/scalardb-auth-with-sql',
                  label: 'Authenticate and Authorize Users by Using SQL',
                },
                {
                  type: 'doc',
                  id: 'scalardb-benchmarks/README',
                  label: 'Run Benchmarks',
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Run Analytical Queries',
          collapsible: true,
          items: [
            {
              type: 'doc',
              id: 'scalardb-samples/scalardb-analytics-postgresql-sample/README',
              label: 'Run ScalarDB Analytics with PostgreSQL',
            },
            {
              type: 'doc',
              id: 'scalardb-analytics-spark/getting-started',
              label: 'Run ScalarDB Analytics with Spark',
            },
          ],
        },
        {
          type: 'category',
          label: 'Run Non-Transactional Storage Operations',
          collapsible: true,
          items: [
            {
              type: 'category',
              label: 'Run Through the CRUD Interface',
              collapsible: true,
              items: [
                { // To be created
                  type: 'doc',
                  id: 'run-non-transactional-storage-operations-through-library',
                  label: 'Use the ScalarDB Core Library',
                },
                { // To be created
                  type: 'doc',
                  id: 'scalardb-cluster/run-non-transactional-storage-operations-through-scalardb-cluster',
                  label: 'Use ScalarDB Cluster',
                },
              ],
            },
            { // To be created
              type: 'doc',
              id: 'scalardb-cluster/run-non-transactional-storage-operations-through-sql-interface',
              label: 'Run Through the SQL Interface',
            },
            { // To be created
              type: 'doc',
              id: 'run-non-transactional-storage-operations-through-primitive-crud-interface',
              label: 'Run Through the Primitive CRUD Interface',
            },
          ],
        },
        {
          type: 'category',
          label: 'Create Sample Applications',
          collapsible: true,
          items: [
            {
              type: 'doc',
              id: 'scalardb-samples/multi-storage-transaction-sample/README',
              label: 'Multi-Storage Transactions',
            },
            {
              type: 'doc',
              id: 'scalardb-samples/microservice-transaction-sample/README',
              label: 'Microservice Transactions',
            },
            {
              type: 'doc',
              id: 'scalardb-samples/spring-data-multi-storage-transaction-sample/README',
              label: 'Multi-Storage Transactions Through Spring Data JDBC',
            },
            {
              type: 'doc',
              id: 'scalardb-samples/spring-data-microservice-transaction-sample/README',
              label: 'Microservice Transactions Through Spring Data JDBC',
            },
          ],
        },
        {
          type: 'category',
          label: 'Reference',
          collapsible: true,
          items: [
            {
              type: 'doc',
              id: 'add-scalardb-to-your-build',
              label: 'Add ScalarDB to Your Build',
            },
            {
              type: 'doc',
              id: 'configurations',
              label: 'ScalarDB Configurations',
            },
            {
              type: 'doc',
              id: 'api-guide',
              label: 'API Guide',
            },
            {
              type: 'doc',
              id: 'two-phase-commit-transactions',
              label: 'Two-Phase Commit Transactions',
            },
            {
              type: 'doc',
              id: 'multi-storage-transactions',
              label: 'Multi-Storage Transactions',
            },
            {
              type: 'doc',
              id: 'schema-loader',
              label: 'Schema Loader',
            },
            {
              type: 'doc',
              id: 'scalardb-cluster/compatibility',
              label: 'ScalarDB Cluster Compatibility Matrix',
            },
            {
              type: 'doc',
              id: 'scalardb-cluster/developer-guide-for-scalardb-cluster-with-java-api',
              label: 'ScalarDB Cluster Java API',
            },
            {
              type: 'doc',
              id: 'scalardb-cluster/scalardb-cluster-configurations',
              label: 'ScalarDB Cluster Configurations',
            },
            {
              type: 'doc',
              id: 'scalardb-cluster/scalardb-cluster-grpc-api-guide',
              label: 'ScalarDB Cluster gRPC API Guide',
            },
            {
              type: 'category',
              label: 'SQL Interface',
              collapsible: true,
              items: [
                {
                  type: 'doc',
                  id: 'scalardb-sql/jdbc-guide',
                  label: 'JDBC Guide',
                },
                {
                  type: 'doc',
                  id: 'scalardb-sql/sql-api-guide',
                  label: 'API Guide',
                },			
                {
                  type: 'doc',
                  id: 'scalardb-cluster/scalardb-cluster-sql-grpc-api-guide',
                  label: 'gRPC API Guide',
                },
                {
                  type: 'doc',
                  id: 'scalardb-sql/spring-data-guide',
                  label: 'Spring Data Guide',
                },
                {
                  type: 'doc',
                  id: 'scalardb-sql/grammar',
                  label: 'Grammar',
                },
              ],
            },
            {
              type: 'category',
              label: 'GraphQL Interface',
              collapsible: true,
              items: [
                {
                  type: 'doc',
                  id: 'scalardb-graphql/how-to-run-two-phase-commit-transaction',
                  label: 'Two-Phase Commit Transactions',
                },
              ],
            },
            {
              type: 'category',
              label: 'Analytics',
              collapsible: true,
              items: [
                {
                  type: 'doc',
                  id: 'scalardb-analytics-postgresql/scalardb-fdw',
                  label: 'ScalarDB FDW for PostgreSQL',
                },
                {
                  type: 'doc',
                  id: 'scalardb-analytics-postgresql/schema-importer',
                  label: 'PostgreSQL Schema Importer for PostgreSQL',
                },
                {
                  type: 'doc',
                  id: 'scalardb-analytics-spark/configuration',
                  label: 'Configurations for Spark',
                },
                {
                  type: 'doc',
                  id: 'scalardb-analytics-spark/version-compatibility',
                  label: 'Version Compatibility for Spark',
                },
              ],
            },
            {
              type: 'category',
              label: '.NET',
              collapsible: true,
              items: [
                {
                  type: 'doc',
                  id: 'scalardb-cluster-dotnet-client-sdk/index',
                  label: 'Overview',
                },
                {
                  type: 'doc',
                  id: 'scalardb-cluster-dotnet-client-sdk/getting-started-with-distributed-transactions',
                  label: 'Distributed Transactions',
                },
                {
                  type: 'doc',
                  id: 'scalardb-cluster-dotnet-client-sdk/getting-started-with-distributed-sql-transactions',
                  label: 'Distributed SQL Transactions',
                },
                {
                  type: 'doc',
                  id: 'scalardb-cluster-dotnet-client-sdk/getting-started-with-admin-api',
                  label: 'Administrative API',
                },
                {
                  type: 'doc',
                  id: 'scalardb-cluster-dotnet-client-sdk/getting-started-with-scalardb-tables-as-csharp-classes',
                  label: 'Tables as C# Classes',
                },
                {
                  type: 'doc',
                  id: 'scalardb-cluster-dotnet-client-sdk/getting-started-with-aspnet-and-di',
                  label: 'ASP.NET Core and Dependency Injection',
                },
                {
                  type: 'doc',
                  id: 'scalardb-cluster-dotnet-client-sdk/getting-started-with-linq',
                  label: 'LINQ',
                },
                {
                  type: 'doc',
                  id: 'scalardb-cluster-dotnet-client-sdk/getting-started-with-two-phase-commit-transactions',
                  label: 'Two-Phase Commit Transactions',
                },
                {
                  type: 'doc',
                  id: 'scalardb-cluster-dotnet-client-sdk/getting-started-with-auth',
                  label: 'Authenticate and Authorize Users',
                },
                {
                  type: 'doc',
                  id: 'scalardb-cluster-dotnet-client-sdk/exception-handling',
                  label: 'Handle Exceptions',
                },
                {
                  type: 'doc',
                  id: 'scalardb-cluster-dotnet-client-sdk/common-reference',
                  label: 'Common Reference',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Deploy',
      collapsible: true,
      items: [
        {
          type: 'doc',
          id: 'deploy-overview',
          label: 'Overview',
        },
        {
          type: 'doc',
          id: 'scalardb-cluster/setup-scalardb-cluster-on-kubernetes-by-using-helm-chart',
          label: 'Deploy ScalarDB Cluster Locally',
        },
        {
          type: 'doc',
          id: 'scalar-kubernetes/ManualDeploymentGuideScalarDBClusterOnEKS',
          label: 'Deploy ScalarDB Cluster on Amazon EKS',
        },
        {
          type: 'category',
          label: 'Reference',
          collapsible: true,
          items: [
            {
              type: 'doc',
              id: 'scalardb-cluster/standalone-mode',
              label: 'ScalarDB Cluster Standalone Mode',
            },
            {
              type: 'doc',
              id: 'scalar-kubernetes/ProductionChecklistForScalarDBCluster',
              label: 'Production Checklist for ScalarDB Cluster',
            },
            {
              type: 'category',
              label: 'Getting Started Guides',
              collapsible: true,
              items: [
                {
                  type: 'doc',
                  id: 'helm-charts/getting-started-scalar-helm-charts',
                  label: 'Scalar Helm Charts',
                },
                {
                  type: 'doc',
                  id: 'helm-charts/getting-started-scalardb-cluster-tls',
                  label: 'ScalarDB Cluster with TLS by Using a Helm Chart',
                },
                {
                  type: 'doc',
                  id: 'helm-charts/getting-started-scalardb-cluster-tls-cert-manager',
                  label: 'ScalarDB Cluster with TLS by Using cert-manager and a Helm Chart',
                },
                {
                  type: 'doc',
                  id: 'helm-charts/getting-started-scalardb-analytics-postgresql',
                  label: 'ScalarDB Analytics with PostgreSQL by Using a Helm Chart',
                },
                {
                  type: 'doc',
                  id: 'helm-charts/getting-started-monitoring',
                  label: 'Prometheus Operator for Monitoring by Using a Helm Chart',
                },
                {
                  type: 'doc',
                  id: 'helm-charts/getting-started-logging',
                  label: 'Loki Stack for Logging by Using a Helm Chart',
                },
                {
                  type: 'doc',
                  id: 'helm-charts/getting-started-scalar-manager',
                  label: 'Scalar Manager by Using a Helm Chart',
                },
              ],
            },
            {
              type: 'category',
              label: 'Database Setup Guides',
              collapsible: true,
              items: [
                {
                  type: 'doc',
                  id: 'scalar-kubernetes/SetupDatabaseForAWS',
                  label: 'AWS',
                },
                {
                  type: 'doc',
                  id: 'scalar-kubernetes/SetupDatabaseForAzure',
                  label: 'Azure',
                },
              ],
            },
            {
              type: 'category',
              label: 'Installation Guides',
              collapsible: true,
              items: [
                {
                  type: 'doc',
                  id: 'scalar-kubernetes/HowToGetContainerImages',
                  label: 'Get Container Images',
                },
                {
                  type: 'doc',
                  id: 'scalar-kubernetes/AwsMarketplaceGuide',
                  label: 'Install From AWS Marketplace',
                },
                {
                  type: 'doc',
                  id: 'scalar-kubernetes/HowToUseContainerImages',
                  label: 'Use Container Images',
                },
              ],
            },
            {
              type: 'category',
              label: 'Deployment Guides',
              collapsible: true,
              items: [
                {
                  type: 'doc',
                  id: 'scalar-kubernetes/CreateEKSClusterForScalarDBCluster',
                  label: 'Create an EKS Cluster for ScalarDB Cluster',
                },
                {
                  type: 'doc',
                  id: 'scalar-kubernetes/CreateBastionServer',
                  label: 'Create a Bastion Server',
                },
                {
                  type: 'doc',
                  id: 'helm-charts/how-to-deploy-scalardb-cluster',
                  label: 'Deploy ScalarDB Cluster by Using a Helm Chart',
                },
                {
                  type: 'doc',
                  id: 'helm-charts/how-to-deploy-scalardb-analytics-postgresql',
                  label: 'Deploy ScalarDB Analytics with PostgreSQL by Using a Helm Chart',
                },
              ],
            },
            {
              type: 'category',
              label: 'Configuration Guides',
              collapsible: true,
              items: [
                {
                  type: 'doc',
                  id: 'scalar-kubernetes/AccessScalarProducts',
                  label: 'Access Kubernetes environment from applications',
                },
                {
                  type: 'doc',
                  id: 'scalar-kubernetes/HowToCreateKeyAndCertificateFiles',
                  label: 'Create Private Key and Certificate Files',
                },
                {
                  type: 'doc',
                  id: 'helm-charts/configure-custom-values-scalardb-cluster',
                  label: 'Configure a custom values file for ScalarDB Cluster',
                },
                {
                  type: 'doc',
                  id: 'helm-charts/configure-custom-values-scalardb-analytics-postgresql',
                  label: 'Configure a Custom Values File for ScalarDB Analytics with PostgreSQL',
                },
                {
                  type: 'doc',
                  id: 'helm-charts/configure-custom-values-scalar-admin-for-kubernetes',
                  label: 'Configure a Custom Values File for Scalar Admin for Kubernetes',
                },
                {
                  type: 'doc',
                  id: 'helm-charts/configure-custom-values-scalar-manager',
                  label: 'Configure a Custom Values File for Scalar Manager',
                },
                {
                  type: 'doc',
                  id: 'helm-charts/configure-custom-values-envoy',
                  label: 'Configure a Custom Values File for Scalar Envoy',
                },
                {
                  type: 'doc',
                  id: 'helm-charts/mount-files-or-volumes-on-scalar-pods',
                  label: 'Mount Files or Volumes on ScalarDB Pods',
                },
                {
                  type: 'doc',
                  id: 'helm-charts/use-secret-for-credentials',
                  label: 'Use Secret Resources',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Migrate',
      collapsible: true,
      items: [
        {
          type: 'doc',
          id: 'schema-loader-import',
          label: 'Import Existing Tables',
        },
        {
          'type': 'doc',
          'id': 'scalardb-sql/migration-guide',
          'label': 'Migrate Applications and Databases',
        }
      ],
    },
    {
      type: 'category',
      label: 'Manage',
      collapsible: true,
      items: [
        {
          type: 'doc',
          id: 'scalar-kubernetes/HowToScaleScalarDB',
          label: 'Scale',
        },
        {
          type: 'doc',
          id: 'scalar-kubernetes/HowToUpgradeScalarDB',
          label: 'Upgrade',
        },
        {
          type: 'category',
          label: 'Monitor',
          collapsible: true,
          items: [
            {
              type: 'doc',
              id: 'monitor-by-using-scalar-manager',
              label: 'Use Scalar Manager',
            },
            {
              type: 'category',
              label: 'Reference',
              collapsible: true,
              items: [
                {
                  type: 'doc',
                  id: 'scalar-kubernetes/K8sMonitorGuide',
                  label: 'Kubernetes Monitoring Guide',
                },
                {
                  type: 'doc',
                  id: 'scalar-manager/overview',
                  label: 'Scalar Manager Overview',
                },
                {
                  type: 'doc',
                  id: 'helm-charts/how-to-deploy-scalar-admin-for-kubernetes',
                  label: 'Deploy Scalar Admin for Kubernetes',
                },
              ]
            },
          ],
        },
        {
          type: 'category',
          label: 'Back Up and Restore',
          collapsible: true,
          items: [
            {
              type: 'doc',
              id: 'manage-backup-and-restore',
              label: 'Back Up and Restore Databases',
            },
            {
              type: 'category',
              label: 'Reference',
              collapsible: true,
              items: [
                {
                  type: 'doc',
                  id: 'backup-restore',
                  label: 'Back Up and Restore Databases Used Through ScalarDB',
                },
                {
                  type: 'doc',
                  id: 'scalar-kubernetes/BackupNoSQL',
                  label: 'Back Up a NoSQL Database in Kubernetes',
                },
                {
                  type: 'doc',
                  id: 'scalar-kubernetes/RestoreDatabase',
                  label: 'Restore Databases in Kubernetes',
                },
              ]
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Troubleshoot',
      collapsible: true,
      items: [
        {
          type: 'category',
          label: 'Error Codes',
          collapsible: true,
          items: [
            {
              type: 'doc',
              id: 'scalardb-core-status-codes',
              label: 'ScalarDB Core',
            },
            {
              type: 'doc',
              id: 'scalardb-cluster/scalardb-cluster-status-codes',
              label: 'ScalarDB Cluster',
            },
            {
              type: 'doc',
              id: 'scalardb-graphql/scalardb-graphql-status-codes',
              label: 'ScalarDB GraphQL',
            },
            {
              type: 'doc',
              id: 'scalardb-sql/scalardb-sql-status-codes',
              label: 'ScalarDB SQL',
            },
            {
              type: 'doc',
              id: 'scalardb-cluster/scalardb-auth-status-codes',
              label: 'Authentication and Authorization',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsible: true,
      items: [
        {
          type: 'doc',
          id: 'scalar-licensing/README',
          label: 'Configure a Product License Key',
        },
      ],
    },
  ],
};

export default sidebars;
