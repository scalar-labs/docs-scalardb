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

const new_docs = [
{
    links: ['features'],
    labels: ['ScalarDB Features'],
  },
  {
    links: ['scalardb-cluster/authorize-with-abac'],
    labels: ['Control User Access in a Fine-Grained Manner'],
  },
  {
    links: ['scalardb-cluster/getting-started-with-vector-search'],
    labels: ['Getting Started with ScalarDB Cluster for Vector Search'],
  },
];

const CategoryGrid = () => {
  return (
    <div className="grid-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-text">
        ScalarDB is a universal HTAP engine. It achieves ACID transactions and real-time analytics across diverse databases to simplify the complexity of managing multiple databases.
          {/* New Docs */}
          <div className="new-docs-table"><FontAwesomeIcon icon="fas fa-book" /> New Docs</div>

          {new_docs.map((doc, i) => (
              <React.Fragment key={i}>
                <div className="new-docs-row"></div>
                <ul>
                  <li>
                    {doc.links.map((link, j) => (
                      <Link key={j} className="new-docs-cell" to={link}>
                        {doc.labels[j]}
                      </Link>
                    ))}
                  </li>
                </ul>
              </React.Fragment>
            ))}

        </div>
        <div className="youtube-embed">
          <LiteYouTubeEmbed id="-i1tqeI3FKs" title="ScalarDB Explainer" poster="maxresdefault" />
        </div>
      </div>

      {/* Category Table */}
      <div className="category-table">
        {categories.map((cat, i) => (
          <React.Fragment key={i}>
            <div className="category-label">{cat.name}</div>
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