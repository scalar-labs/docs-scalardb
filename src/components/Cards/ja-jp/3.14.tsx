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

const new_content = [
  {
    name: '新着コンテンツ',
    categoryLinks: [
      // To add a link, use the format ['link1', 'link2']
      // To add a label, use the format ['label1', 'label2']
      {
        cell: 0, // First cell
        links: ['scalardb-cluster/encrypt-data-at-rest'],
        labels: ['保存データの暗号化']
      },
      {
        cell: 1, // Second cell
        links: ['scalardb-cluster/run-non-transactional-storage-operations-through-scalardb-cluster'],
        labels: ['ScalarDB Cluster を通じて非トランザクションストレージ操作を実行する']
      },
      {
        cell: 2, // Third cell
        links: ['scalardb-samples/scalardb-analytics-spark-sample'],
        labels: ['ScalarDB Analytics をはじめよう']
      }
    ]
  }
];

const categories = [
  {
    name: 'ScalarDB について',
    categoryLinks: [
      // To add a link, use the format ['link1', 'link2']
      // To add a label, use the format ['label1', 'label2']
      {
        cell: 0, // First cell
        links: ['overview'],
        labels: ['ScalarDB の概要']
      },
      {
        cell: 1, // Second cell
        links: ['design'],
        labels: ['デザイン']
      },
      {
        cell: 2, // Third cell
        links: ['requirements'],
        labels: ['要件']
      }
    ]
  },
  {
    name: 'クイックスタート',
    categoryLinks: [
      // To add a link, use the format ['link1', 'link2']
      // To add a label, use the format ['label1', 'label2']
      {
        cell: 0, // First cell
        links: ['quickstart-overview'],
        labels: ['クイックスタートの概要']
      },
      {
        cell: 1, // Second cell
        links: ['getting-started-with-scalardb'],
        labels: ['ScalarDB をはじめよう']
      },
      {
        cell: 2, // Third cell
        links: ['scalardb-cluster/getting-started-with-scalardb-cluster'],
        labels: ['ScalarDB Cluster をはじめよう']
      }
    ]
  },
  {
    name: '開発',
    categoryLinks: [
      // To add a link, use the format ['link1', 'link2']
      // To add a label, use the format ['label1', 'label2']
      {
        cell: 0, // First cell
        links: ['develop-overview'],
        labels: ['開発の概要']
      },
      {
        cell: 1, // Second cell
        links: ['develop-run-transactions-overview'],
        labels: ['トランザクションの実行の概要']
      },
      {
        cell: 2, // Third cell
        links: ['develop-run-non-transactional-operations-overview'],
        labels: ['非トランザクションストレージ操作を実行']
      }
    ]
  },
  {
    name: 'デプロイ',
    categoryLinks: [
      // To add a link, use the format ['link1', 'link2']
      // To add a label, use the format ['label1', 'label2']
      {
        cell: 0, // First cell
        links: ['deploy-overview'],
        labels: ['デプロイの概要']
      },
      {
        cell: 1, // Second cell
        links: ['scalardb-cluster/setup-scalardb-cluster-on-kubernetes-by-using-helm-chart'],
        labels: ['ScalarDB Cluster をローカルにデプロイする方法']
      },
      {
        cell: 2, // Third cell
        links: ['scalar-kubernetes/ManualDeploymentGuideScalarDBClusterOnEKS'],
        labels: ['Amazon Elastic Kubernetes Service (EKS) に ScalarDB Cluster をデプロイする']
      }
    ]
  },
  {
    name: '移行',
    categoryLinks: [
      // To add a link, use the format ['link1', 'link2']
      // To add a label, use the format ['label1', 'label2']
      {
        cell: 0, // First cell
        links: ['migrate-overview'],
        labels: ['移行の概要']
      },
      {
        cell: 1, // Second cell
        links: ['scalardb-sql/migration-guide'],
        labels: ['アプリケーションとデータベースを ScalarDB ベースの環境に移行する方法']
      },
      {
        cell: 2, // Third cell
        links: ['scalardb-sql/migration-guide'],
        labels: ['アプリケーションとデータベースを ScalarDB ベースの環境に移行する方法']
      }
    ]
  },
  {
    name: '管理',
    categoryLinks: [
      // To add a link, use the format ['link1', 'link2']
      // To add a label, use the format ['label1', 'label2']
      {
        cell: 0, // First cell
        links: ['manage-overview'],
        labels: ['管理の概要']
      },
      {
        cell: 1, // Second cell
        links: ['scalar-kubernetes/HowToScaleScalarDB'],
        labels: ['ScalarDB をスケーリングする方法']
      },
      {
        cell: 2, // Third cell
        links: ['scalar-kubernetes/HowToUpgradeScalarDB'],
        labels: ['ScalarDB のアップグレード方法']
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
          <h1>ScalarDB</h1>
          <p>ScalarDB は、さまざまなデータベースに対応したユニバーサルなハイブリッドトランザクション／分析処理 (HTAP) エンジンです。データベース上でミドルウェアとして動作し、ACID トランザクションとリアルタイム分析を実現することで、複数のデータベースや複数インスタンスの管理の複雑さを簡素化し、仮想的に統合します。</p>
          {/* <span className="hero-text-additional">
            <p>多用途なソリューションとして、ScalarDB は以下のような幅広いデータベースをサポートしています:</p>

            <ul>
              <li>MariaDB、Microsoft SQL Server、MySQL、Oracle Database、PostgreSQL、SQLite などの JDBC をサポートするリレーショナルデータベース、および Amazon Aurora や YugabyteDB のようなそれらに互換性のあるデータベース。</li>
              <li>Amazon DynamoDB、Apache Cassandra、Azure Cosmos DB などの NoSQL データベース。</li>
            </ul>
          </span> */}
        </div>
        <div className="youtube-embed">
          <LiteYouTubeEmbed id="-i1tqeI3FKs" title="ScalarDB Explainer" poster="maxresdefault" />
        </div>
      </div>

      {/* New content table */}
      <div className="category-table">
        {new_content.map((doc, i) => (
          <React.Fragment key={i}>
            <div className="category-label">
              {/* <FontAwesomeIcon icon={faBook} className="new-content-icon" />
              &nbsp;{doc.name}*/}
              {doc.name}
            </div>
            {doc.categoryLinks.map((categoryLinkCell, j) => (
              <div key={j} className="category-cell-multiple-links">
                {categoryLinkCell.links.map((cellLink, k) => (
                  cellLink ? (
                    <Link key={`${j}-${k}`} className="category-cell-link" to={cellLink}>
                      {categoryLinkCell.labels[k]}
                    </Link>
                  ) : (
                    <span key={`${j}-${k}`} className="new-content-cell">
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
