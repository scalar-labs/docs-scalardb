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

const CardsAbout = [
  {
    // name: '',
    // image: '<LINK_TO>.png',
    url: {
      page: 'overview',
    },
    description: (
      <Translate id="home.about.description">
        Overview
      </Translate>
    ),
  },
  {
    // name: '',
    // image: '<LINK_TO>.png',
    url: {
      page: 'requirements',
    },
    description: (
      <Translate id="home.about.description">
        Requirements
      </Translate>
    ),
  },
]

const CardsQuickstart = [
  {
    // name: '',
    // image: '<LINK_TO>.png',
    url: {
      page: 'getting-started-with-scalardb',
    },
    description: (
      <Translate id="home.quickstart.description">
        Getting started with ScalarDB
      </Translate>
    ),
  },
  {
    // name: '',
    // image: '<LINK_TO>.png',
    url: {
      page: 'scalardb-cluster/getting-started-with-scalardb-cluster',
    },
    description: (
      <Translate id="home.quickstart.description">
        Getting started with ScalarDB Cluster
      </Translate>
    ),
  },
]

const CardsDevelop = [
  {
    // name: '',
    // image: '<LINK_TO>.png',
    url: {
      page: 'add-scalardb-to-your-build',
    },
    description: (
      <Translate id="home.develop.description">
        Add ScalarDB to your build
      </Translate>
    ),
  },
  {
    // name: '',
    // image: '<LINK_TO>.png',
    url: {
      page: 'schema-loader',
    },
    description: (
      <Translate id="home.develop.description">
        ScalarDB Schema Loader
      </Translate>
    ),
  },
]

const CardsDeploy = [
  {
    // name: '',
    // image: '<LINK_TO>.png',
    url: {
      page: 'scalar-kubernetes/ProductionChecklistForScalarDBCluster',
    },
    description: (
      <Translate id="home.deploy.description">
        See the ScalarDB Cluster production checklist
      </Translate>
    ),
  },
  {
    // name: '',
    // image: '<LINK_TO>.png',
    url: {
      page: 'scalar-kubernetes/ManualDeploymentGuideScalarDBClusterOnEKS',
    },
    description: (
      <Translate id="home.deploy.description">
        Deploy ScalarDB Cluster on Amazon EKS
      </Translate>
    ),
  },
]

const CardsMigrate = [
  {
    // name: '',
    // image: '<LINK_TO>.png',
    url: {
      page: 'schema-loader-import',
    },
    description: (
      <Translate id="home.manage.description">
        Import Existing Tables by Using ScalarDB Schema Loader
      </Translate>
    ),
  },
  {
    // name: '',
    // image: '<LINK_TO>.png',
    url: {
      page: 'scalardb-sql/migration-guide',
    },
    description: (
      <Translate id="home.manage.description">
        Migrate Your Applications and Databases
      </Translate>
    ),
  },
]

const CardsManage = [
  {
    // name: '',
    // image: '<LINK_TO>.png',
    url: {
      page: 'scalar-kubernetes/K8sMonitorGuide',
    },
    description: (
      <Translate id="home.migrate.description">
        Monitor ScalarDB in a Kubernetes cluster
      </Translate>
    ),
  },
  {
    // name: '',
    // image: '<LINK_TO>.png',
    url: {
      page: 'scalar-kubernetes/BackupNoSQL',
    },
    description: (
      <Translate id="home.migrate.description">
        Back up a NoSQL database in a Kubernetes environment
      </Translate>
    ),
  },
]

const CardsReference = [
  {
    // name: '',
    // image: '<LINK_TO>.png',
    url: {
      page: 'scalardb-core-status-codes',
    },
    description: (
      <Translate id="home.reference.description">
        ScalarDB Core Error Codes
      </Translate>
    ),
  },
  {
    // name: '',
    // image: '<LINK_TO>.png',
    url: {
      page: 'scalar-licensing',
    },
    description: (
      <Translate id="home.reference.description">
        How to Configure a Product License Key
      </Translate>
    ),
  },
];

interface Props {
  // name: string;
  // image: string;
  url: {
    page?: string;
  };
  description: JSX.Element;
}

function Card({ /* name, image,*/ url, description }: Props) {
  return (
    <div className="col col--6 margin-bottom--lg">
      <div className={clsx('card')}>
        <div className={clsx('card__image')}>
          {/* <Link to={url.page}>
            <img src={image}></img>}
          </Link> */}
        </div>
        <Link to={url.page}>
          <div className="card__body">
            {/* <h3>{name}</h3> */}
            <p>{description}</p>
          </div>
        </Link>
        {/* <div className="card__footer">
          <div className="button-group button-group--block">
            <Link className="button button--secondary" to={url.page}>
              <Translate id="button.readMore">Read more</Translate>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export function CardRowAbout(): JSX.Element {
  return (
    <div className="row">
      {CardsAbout.map((special) => (
        <Card key={special.name} {...special} />
      ))}
    </div>
  );
}

export function CardRowQuickstart(): JSX.Element {
  return (
    <div className="row">
      {CardsQuickstart.map((special) => (
        <Card key={special.name} {...special} />
      ))}
    </div>
  );
}

export function CardRowDevelop(): JSX.Element {
  return (
    <div className="row">
      {CardsDevelop.map((special) => (
        <Card key={special.name} {...special} />
      ))}
    </div>
  );
}

export function CardRowDeploy(): JSX.Element {
  return (
    <div className="row">
      {CardsDeploy.map((special) => (
        <Card key={special.name} {...special} />
      ))}
    </div>
  );
}

export function CardRowMigrate(): JSX.Element {
  return (
    <div className="row">
      {CardsMigrate.map((special) => (
        <Card key={special.name} {...special} />
      ))}
    </div>
  );
}

export function CardRowManage(): JSX.Element {
  return (
    <div className="row">
      {CardsManage.map((special) => (
        <Card key={special.name} {...special} />
      ))}
    </div>
  );
}
export function CardRowReference(): JSX.Element {
  return (
    <div className="row">
      {CardsReference.map((special) => (
        <Card key={special.name} {...special} />
      ))}
    </div>
  );
}
