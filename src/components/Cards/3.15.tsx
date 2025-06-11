/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const new_docs = [
  {
    name: 'New docs',
    links: ['features', 'scalardb-cluster/getting-started-with-vector-search', 'scalardb-cluster/authorize-with-abac'],
    labels: ['ScalarDB Features', 'Getting Started with ScalarDB Cluster for Vector Search', 'Control User Access in a Fine-Grained Manner'],
  },
];

const categoryLinks = {
  'About ScalarDB': 'overview',
  'Quickstart': 'quickstart-overview',
  'Develop': 'develop-overview',
  'Deploy': 'deploy-overview',
  'Migrate': 'migrate-overview',
  'Manage': 'manage-overview',
};

const categories = [
  {
    name: 'About ScalarDB',
    links: ['overview', 'design', 'requirements'],
    labels: ['Overview', 'Design', 'Requirements'],
  },
  {
    name: 'Quickstart',
    links: ['getting-started-with-scalardb', 'scalardb-cluster/getting-started-with-scalardb-cluster', 'scalardb-samples/scalardb-analytics-spark-sample'],
    labels: ['Getting Started with ScalarDB', 'Getting Started with ScalarDB Cluster', 'Getting Started with ScalarDB Analytics'],
  },
  {
    name: 'Develop',
    links: ['data-modeling', 'configurations', 'scalardb-cluster/run-non-transactional-storage-operations-through-scalardb-cluster'],
    labels: ['Model Your Data', 'Run Transactions Through ScalarDB Cluster', 'Run Non-Transactional Storage Operations Through ScalarDB Cluster'],
  },
  {
    name: 'Deploy',
    links: ['scalardb-cluster/setup-scalardb-cluster-on-kubernetes-by-using-helm-chart', 'scalar-kubernetes/ManualDeploymentGuideScalarDBClusterOnEKS', 'scalardb-analytics/deployment'],
    labels: ['Deploy ScalarDB Cluster Locally', 'Deploy ScalarDB Cluster on Amazon Elastic Kubernetes Service (EKS)', 'Deploy ScalarDB Analytics in Public Cloud Environments'],
  },
  {
    name: 'Migrate',
    links: ['scalardb-sql/migration-guide', 'scalardb-sql/migration-guide', ''],
    labels: ['Importing Existing Tables to ScalarDB by Using ScalarDB Schema Loader', 'Migrate Your Applications and Databases into a ScalarDB-Based Environment', ''],
  },
  {
    name: 'Manage',
    links: ['scalar-kubernetes/HowToScaleScalarDB', 'scalar-kubernetes/HowToUpgradeScalarDB', 'backup-restore'],
    labels: ['Scale ScalarDB', 'Upgrade ScalarDB', 'Back Up and Restore Databases Used Through ScalarDB'],
  },
];

const CategoryGrid = () => {
  return (
    <div className="grid-container">
      {/* Hero section */}
      <div className="hero-section">
        <div className="hero-text">
          <p><span className="hero-text-first-sentence">ScalarDB is a universal hybrid transaction/analytical processing (HTAP) engine for diverse databases.</span> It runs as middleware on databases and virtually unifies diverse databases by achieving ACID transactions and real-time analytics across them to simplify the complexity of managing multiple databases or multiple instances of a single database.</p>

          <span className="hero-text-additional">
            <p>As a versatile solution, ScalarDB supports a range of databases, including:</p>

            <ul>
              <li>Relational databases that support JDBC, such as MariaDB, Microsoft SQL Server, MySQL, Oracle Database, PostgreSQL, SQLite, and their compatible databases, like Amazon Aurora and YugabyteDB.</li>
              <li>NoSQL databases like Amazon DynamoDB, Apache Cassandra, and Azure Cosmos DB.</li>
            </ul>
          </span>
        </div>
        <div className="youtube-embed">
          <LiteYouTubeEmbed id="-i1tqeI3FKs" title="ScalarDB Explainer" poster="maxresdefault" />
        </div>
      </div>

      {/* New docs table */}
      <div className="category-table">
        {new_docs.map((new_docs, i) => (
          <React.Fragment key={i}>
            <div className="category-label">
              <FontAwesomeIcon
                icon="fas fa-book fa-1x"
                className="new-docs-icon"
                style={{ visibility: 'hidden' }}
                onLoad={() => {
                  const iconElement = document.querySelector('.new-docs-icon');
                  if (iconElement) {
                    iconElement.style.visibility = 'visible';
                  }
                }}
              />
              {new_docs.name}
            </div>
            {new_docs.links.map((link, j) => (
              <Link key={j} className="new-docs-cell" to={link}>
                {new_docs.labels[j]}
              </Link>
            ))}
          </React.Fragment>
        ))}

      {/* Category table */}
        {categories.map((cat, i) => (
          <React.Fragment key={i}>
            <div className="category-label">
              <Link to={categoryLinks[cat.name]} className="category-label-link">
                {cat.name}
              </Link>
            </div>
            {cat.links.map((link, j) => (
              <Link key={j} className="category-cell" to={link}>
                {cat.labels[j]}
              </Link>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;