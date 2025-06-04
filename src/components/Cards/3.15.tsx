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
    name: 'About',
    links: ['/about', '/about/team', '/about/contact'],
    labels: ['Doc 1', 'Doc 2', 'Doc 3'],
  },
  {
    name: 'Quickstart',
    links: ['/quickstart', '/quickstart/tutorials', '/quickstart/examples'],
    labels: ['Doc 1', 'Doc 2', 'Doc 3'],
  },
  {
    name: 'Develop',
    links: ['/develop', '/develop/example1', '/develop/example2'],
    labels: ['Doc 1', 'Doc 2', 'Doc 3'],
  },
  {
    name: 'Deploy',
    links: ['/deploy', '/deploy/tutorials', '/deploy/examples'],
    labels: ['Doc 1', 'Doc 2', 'Doc 3'],
  },
  {
    name: 'Migrate',
    links: ['/migrate', '/migrate/tutorials', '/migrate/examples'],
    labels: ['Doc 1', 'Doc 2', 'Doc 3'],
  },
  {
    name: 'Manage',
    links: ['/manage', '/manage/tutorials', '/manage/examples'],
    labels: ['Doc 1', 'Doc 2', 'Doc 3'],
  },
  {
    name: 'Integrate',
    links: ['/integrate', '/integrate/api', '/integrate/sdks'],
    labels: ['Doc 1', 'Doc 2', 'Doc 3'],
  },
];

const new_docs = [
  {
    links: ['/about'],
    labels: ['Doc 1'],
  },
  {
    links: ['/quickstart'],
    labels: ['Doc 1'],
  },
  {
    links: ['/develop'],
    labels: ['Doc 1'],
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
                {doc.links.map((link, j) => (
                  <Link key={j} className="new-docs-cell" to={link}>
                    {doc.labels[j]}
                  </Link>
                ))}
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