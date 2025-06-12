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
import { faBook } from '@fortawesome/free-solid-svg-icons';

const new_docs = [
  {
    name: 'New docs',
    categoryLinks: [
      {
        cell: 0, // First cell
        links: ['features', ''],
        labels: ['ScalarDB Features', '']
      },
      {
        cell: 1, // Second cell
        links: ['scalardb-cluster/getting-started-with-vector-search', ''],
        labels: ['Getting Started with ScalarDB Cluster for Vector Search', '']
      },
      {
        cell: 2, // Third cell
        links: ['scalardb-cluster/authorize-with-abac', ''],
        labels: ['Control User Access in a Fine-Grained Manner', '']
      }
    ]
  }
];

const categories = [
  {
    name: 'About ScalarDB',
    categoryLinks: [
      {
        cell: 0, // First cell
        links: ['overview', ''],
        labels: ['Overview', '']
      },
      {
        cell: 1, // Second cell
        links: ['design', ''],
        labels: ['Design', '']
      },
      {
        cell: 2, // Third cell
        links: ['requirements', ''],
        labels: ['Requirements', '']
      }
    ]
  },
  {
    name: 'Quickstart',
    categoryLinks: [
      {
        cell: 0, // First cell
        links: ['quickstart-overview', 'getting-started-with-scalardb'],
        labels: ['Overview', 'Getting Started with ScalarDB']
      },
      {
        cell: 1, // Second cell
        links: ['scalardb-cluster/getting-started-with-scalardb-cluster', ''],
        labels: ['Getting Started with ScalarDB Cluster', '']
      },
      {
        cell: 2, // Third cell
        links: ['scalardb-samples/scalardb-analytics-spark-sample', ''],
        labels: ['Getting Started with ScalarDB Analytics', '']
      }
    ]
  },
  {
    name: 'Develop',
    categoryLinks: [
      {
        cell: 0, // First cell
        links: ['develop-overview', 'data-modeling'],
        labels: ['Overview', 'Model Your Data']
      },
      {
        cell: 1, // Second cell
        links: ['configurations', 'scalardb-cluster/configurations'],
        labels: ['ScalarDB Core Configurations', 'ScalarDB Cluster Configurations']
      },
      {
        cell: 2, // Third cell
        links: ['scalardb-cluster/run-non-transactional-storage-operations-through-scalardb-cluster', ''],
        labels: ['Run Non-Transactional Storage Operations Through ScalarDB Cluster', '']
      }
    ]
  },
  {
    name: 'Deploy',
    categoryLinks: [
      {
        cell: 0, // First cell
        links: ['deploy-overview', 'scalardb-cluster/setup-scalardb-cluster-on-kubernetes-by-using-helm-chart'],
        labels: ['Overview', 'Deploy ScalarDB Cluster Locally']
      },
      {
        cell: 1, // Second cell
        links: ['scalar-kubernetes/ManualDeploymentGuideScalarDBClusterOnEKS', ''],
        labels: ['Deploy ScalarDB Cluster on Amazon EKS', '']
      },
      {
        cell: 2, // Third cell
        links: ['scalardb-analytics/deployment', ''],
        labels: ['Deploy ScalarDB Analytics in Public Cloud Environments', '']
      }
    ]
  },
  {
    name: 'Migrate',
    categoryLinks: [
      {
        cell: 0, // First cell
        links: ['migrate-overview', ''],
        labels: ['Overview', '']
      },
      {
        cell: 1, // Second cell
        links: ['scalardb-sql/migration-guide', ''],
        labels: ['Importing Tables by Using ScalarDB Schema Loader', '']
      },
      {
        cell: 2, // Third cell
        links: ['scalardb-sql/migration-guide', ''],
        labels: ['Migrate Applications and Databases', '']
      }
    ]
  },
  {
    name: 'Manage',
    categoryLinks: [
      {
        cell: 0, // First cell
        links: ['manage-overview', 'backup-restore'],
        labels: ['Overview', 'Back Up and Restore Databases Used Through ScalarDB']
      },
      {
        cell: 1, // Second cell
        links: ['scalar-kubernetes/HowToScaleScalarDB', ''],
        labels: ['Scale ScalarDB', '']
      },
      {
        cell: 2, // Third cell
        links: ['scalar-kubernetes/HowToUpgradeScalarDB', ''],
        labels: ['Upgrade ScalarDB', '']
      }
    ]
  }
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
        {new_docs.map((doc, i) => (
          <React.Fragment key={i}>
            <div className="category-label">
              <FontAwesomeIcon icon={faBook} className="new-docs-icon" />
              &nbsp;{doc.name}
            </div>
            {doc.categoryLinks.map((categoryLinkCell, j) => (
              <div key={j} className="category-cell-multiple-links">
                {categoryLinkCell.links.map((cellLink, k) => (
                  cellLink ? (
                    <Link key={`${j}-${k}`} className="category-cell-link" to={cellLink}>
                      {categoryLinkCell.labels[k]}
                    </Link>
                  ) : (
                    <span key={`${j}-${k}`} className="new-docs-cell">
                      {categoryLinkCell.labels[k]}
                    </span>
                  )
                ))}
              </div>
            ))}
          </React.Fragment>
        ))}

      {/* Category table */}
        {categories.map((cat, i) => (
          <React.Fragment key={i}>
            <div className="category-label">{cat.name}</div>
            {cat.categoryLinks.map((categoryLinkCell, j) => (
              <div key={j} className="category-cell-multiple-links">
                {categoryLinkCell.links.map((cellLink, k) => (
                  cellLink ? (
                    <Link key={`${j}-${k}`} className="category-cell-link" to={cellLink}>
                      {categoryLinkCell.labels[k]}
                    </Link>
                  ) : (
                    <span key={`${j}-${k}`} className="category-cell">
                      {categoryLinkCell.labels[k]}
                    </span>
                  )
                ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;