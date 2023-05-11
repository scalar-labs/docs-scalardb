---
layout: parent-product-home
permalink: /docs
hidden: true
toc: false
product_row:
  - image_path: 
    alt: ""
    title: "ScalarDB" # This title will appear in the header for the feature item on the home page; space is limited, so keep it short but descriptive; try to keep all feature item titles around the same length
    excerpt: "Cloud-native universal transaction manager" # Add a brief product description (approximately 8 words)
    url: "docs/3.9" # Add a relative URL to the product home page doc that is within this parent product docs site
    btn_class: "btn--primary"
    btn_label: "Get started" # This can be any other type of call to action
  - image_path: 
    alt: ""
    title: "ScalarDB Server" # This title will appear in the header for the feature item on the home page; space is limited, so keep it short but descriptive; try to keep all feature item titles around the same length
    excerpt: "gRPC server that implements ScalarDB interface" # Add a brief product description (approximately 8 words)
    url: "docs/3.9/scalardb-server" # Add a relative URL to the product home page doc that is within this parent product docs site
    btn_class: "btn--primary"
    btn_label: "Get started" # This can be any other type of call to action
  - image_path: 
    alt: ""
    title: "ScalarDB Schema Loader" # This title will appear in the header for the feature item on the home page; space is limited, so keep it short but descriptive; try to keep all feature item titles around the same length
    excerpt: "Tool for creating schema" # Add a brief product description (approximately 8 words)
    url: "docs/3.9/schema-loader" # Add a relative URL to the product home page doc that is within this parent product docs site
    btn_class: "btn--primary"
    btn_label: "Get started" # This can be any other type of call to action
recommended_row:
  - image_path: assets/images/book-green.svg # Choose the appropriate icon for the doc recommended here: (`book-green.svg`, `cloud-purple.svg`, `page-blue.svg`)
    alt: ""
    title: "Getting Started with ScalarDB" # The title for a recommended doc will appear in the header for the feature item on the home page; space is limited, so keep it short but descriptive; try to keep all feature item titles around the same length
    excerpt: "Set up a simple electronic money application" # Add a brief description about the doc (approximately 8 words)
    url: "docs/3.9/getting-started" # Add a relative URL to the product home page doc that is within this parent product docs site
    btn_class: "btn--primary"
    btn_label: "Learn more" # This can be any other type of call to action
  - image_path: assets/images/book-green.svg # Choose the appropriate icon for the doc recommended here: (`book-green.svg`, `cloud-purple.svg`, `page-blue.svg`)
    alt: ""
    title: "ScalarDB Samples" # The title for a recommended doc will appear in the header for the feature item on the home page; space is limited, so keep it short but descriptive; try to keep all feature item titles around the same length
    excerpt: "Try running sample applications for ScalarDB" # Add a brief description about the doc (approximately 8 words)
    url: "docs/3.9/scalardb-samples" # Add a relative URL to the product home page doc that is within this parent product docs site
    btn_class: "btn--primary"
    btn_label: "Learn more" # This can be any other type of call to action
  - image_path: assets/images/page-blue.svg # Choose the appropriate icon for the doc recommended here: (`book-green.svg`, `cloud-purple.svg`, `page-blue.svg`)
    alt: ""
    title: "ScalarDB Benchmarks" # The title for a recommended doc will appear in the header for the feature item on the home page; space is limited, so keep it short but descriptive; try to keep all feature item titles around the same length
    excerpt: "Run benchmark programs for ScalarDB" # Add a brief description about the doc (approximately 8 words)
    url: "docs/3.9/scalardb-benchmarks" # Add a relative URL to the product home page doc that is within this parent product docs site
    btn_class: "btn--primary"
    btn_label: "Learn more" # This can be any other type of call to action
  
---

# ScalarDB documentation

ScalarDB is a universal transaction manager that achieves:

* database/storage-agnostic ACID transactions in a scalable manner even if an underlying database or storage is not ACID-compliant.
* multi-storage/database/service ACID transactions that can span multiple (possibly different) databases, storages, and services.

{% include product_row %}

## Recommended

{% include recommended_row %}
