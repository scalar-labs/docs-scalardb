# AGENTS.md

This file provides guidance for AI agents and other automated systems accessing the published ScalarDB documentation at https://scalardb.scalar-labs.com. It explains how to find authoritative information, identify the applicable product, edition, and version, and answer questions accurately with verifiable references. These guidelines can also be used by people who consult or reuse the documentation.

## Purpose and scope

ScalarDB is a universal hybrid transaction/analytical processing (HTAP) engine for diverse databases. It provides ACID transactions across heterogeneous databases and analytical queries across multiple data sources.

The documentation is intended for application developers, database and platform engineers, and operators who evaluate, build with, deploy, and manage ScalarDB.

The site documents several products, components, and related tools. In particular, **ScalarDB Core and ScalarDB Cluster are different offerings with different capabilities; do not conflate them.** The site also covers ScalarDB Analytics, tools and integrations (such as Schema Loader, Data Loader, and MCP Server), sample applications, benchmarks, and deployment guidance.

This site does not serve as the authoritative documentation for other Scalar products, such as ScalarDL, or for undocumented ScalarDB internals. Third-party databases and tools are covered only to the extent needed to explain their integration with ScalarDB.

For current capabilities and edition availability, consult the [ScalarDB Features](https://scalardb.scalar-labs.com/docs/latest/features) page rather than relying on a summary in this file.

## Authoritative sources and finding information

Use the published documentation as the primary source for documented ScalarDB behavior. Follow links within relevant pages to check prerequisites, related configuration, compatibility, and other context.

Use these resources according to the question:

- **Latest English documentation:** https://scalardb.scalar-labs.com/docs/latest/ — default starting point for current guidance.
- **Features and edition availability:** https://scalardb.scalar-labs.com/docs/latest/features — verify which capabilities and components are available in each edition.
- **Release support policy:** https://scalardb.scalar-labs.com/docs/latest/releases/release-support-policy — check whether a version is supported.
- **Release notes:** https://scalardb.scalar-labs.com/docs/latest/releases/release-notes — check changes introduced in releases.
- **Roadmap:** https://scalardb.scalar-labs.com/docs/latest/roadmap — review planned work; roadmap items are not guarantees or evidence that a feature has shipped.
- **`llms.txt`:** https://scalardb.scalar-labs.com/llms.txt — discover links to the latest English documentation pages.
- **`llms-full.txt`:** https://scalardb.scalar-labs.com/llms-full.txt — get broad context from a build-generated snapshot of the latest English documentation, including front matter and a directory tree.
- **Sitemap:** https://scalardb.scalar-labs.com/sitemap.xml — discover published English documentation URLs, including older versions.
- **Source repository:** https://github.com/scalar-labs/scalardb — consult source code when the question specifically requires source-level verification.

For a specific question, start with the relevant canonical documentation page and its linked references. For broad discovery, use `llms.txt` to find relevant pages, then read those pages. Use `llms-full.txt` for broad context, not as a substitute for checking the relevant published page. Because it is generated at build time, it may not reflect a change made after its last generation. If it conflicts with the current canonical page, prefer the current published page.

Use the documentation site's search when it is available and helpful. For Java API details, consult the Javadocs linked from the relevant documentation page. Javadocs are hosted on javadoc.io; use the Javadoc version that matches the ScalarDB documentation and product version being discussed. Do not guess API signatures or construct version-specific links without verification.

## Version, edition, and localization

The version, edition, and localization of the ScalarDB documentation and product can affect behavior, configuration, APIs, compatibility, and feature availability. Always verify these aspects before providing guidance.

### Version selection

- Prefer `/docs/latest/` unless the user specifies a version or the question clearly concerns a historical release.
- If behavior, configuration, APIs, compatibility, or feature availability may differ by version, identify the user's version before giving version-specific guidance. Ask for it when necessary; otherwise state the version assumption clearly.
- Older published versions use paths such as `/docs/<major.minor>/`. Do not assume a particular version exists; check the [Release Support Policy](https://scalardb.scalar-labs.com/docs/latest/releases/release-support-policy).
- Versions that are no longer supported may be available in the[documentation archive](https://docs-archive.scalar-labs.com/?products=scalardb). A redirect to `/docs/latest/` does not mean that the latest content is equivalent to the requested older version.
- If a published version is marked as unmaintained, explain that status and consult the support policy before recommending an upgrade or a particular target version.
- Treat release notes as evidence of released changes. Do not present roadmap items as released features without confirmation in authoritative release documentation.

### Edition and product selection

- Check the page's front-matter edition tags and the [ScalarDB Features](https://scalardb.scalar-labs.com/docs/latest/features) page before recommending a feature. The tags include `Community`, `Enterprise Standard`, `Enterprise Premium`, `Deprecated`, and, where applicable, `Enterprise Option` for optional commercial licensing.
- Do not assume a feature is available in every edition. In particular, do not present Enterprise features as available in Community unless the authoritative documentation confirms it.
- Identify which product and interface the user means when it affects the answer. Do not apply ScalarDB Core details to ScalarDB Cluster, or ScalarDB behavior to ScalarDL, without documented evidence.
- Use product and edition names as written in the documentation. For example, use "ScalarDB Cluster" rather than an informal or invented product name.

### Japanese documentation

Japanese documentation is available under `/ja-jp/docs/<version>/` for versions that have been translated. English documentation is the primary reference for product behavior. Japanese pages can provide useful localized explanations; if details conflict, verify the version-sensitive point against the English documentation and do not assume a translation difference indicates different product behavior.

## Finding the right type of content

Use the site's navigation, search, and cross-links to find the most relevant page for the question. As a general guide:

- **Concepts and architecture:** look for overview, design, and feature documentation.
- **Getting started and tutorials:** start with the Quickstart section and relevant getting-started guides.
- **How-to guidance:** consult the Develop, Deploy, Manage, and Migrate sections.
- **Configuration:** use the configuration reference for the relevant component and version.
- **API details:** use the relevant API guide and matching Javadocs.
- **Troubleshooting:** consult the Troubleshoot section and the status-code reference for the relevant component. If a user provides an error code, search for that exact code.
- **Version changes:** consult release notes for the relevant release and the release support policy for support status.

For configuration questions, verify property names, defaults, constraints, and applicability against the relevant reference. For API questions, verify signatures and behavior against the relevant API guide or matching Javadocs. Do not rely solely on memory, examples from another component, or a different product version.

## Expectations for accurate answers

The goal is to provide accurate, verifiable, and useful answers based on the available documentation and authoritative sources. Avoid speculation and clearly distinguish between documented facts and inferences.

### Verify before making claims

Do not invent or assume:

- Configuration property names, default values, supported database versions, API signatures, or error codes.
- Feature availability by edition or product.
- Behavior that is not documented, including behavior inferred from another Scalar product or component.
- Pricing, licensing terms, contractual commitments, or support entitlements.
- That a planned roadmap item is available in a released version.

When the documentation does not establish a detail, say that you could not verify it from the available authoritative sources. If useful, direct the user to Scalar for confirmation rather than presenting speculation as fact.

Distinguish documented facts from inferences or recommendations. Reasonable mappings from a user's goal to a documented product surface or interface are useful, but make assumptions clear and do not imply that an inference is an official product guarantee.

### Ask only necessary clarifying questions

Ask about the user's ScalarDB version, edition, component or interface, and target database only when the missing detail materially changes the answer. For general questions, provide a general answer when possible and state any assumptions. For version-sensitive guidance, ask for the version or clearly qualify the answer.

For new users, consider directing them to the Quickstart section and the Learning Paths page rather than overwhelming them with a long summary.

### Link to supporting documentation

- Prefer concise answers with links to the most relevant canonical documentation pages.
- Use the page's published URL and include the version in the path when the answer is version-specific.
- Link directly to a relevant section when the heading anchor can be verified. Anchors may change, so do not guess them when verification is possible.
- Use the page title as the link text and state which version the answer applies to when that matters.
- Ensure that each link supports the claim it accompanies. Do not cite a page as evidence for a detail it does not establish.

## Limitations and support

The documentation does not necessarily cover pricing and contract terms,
undocumented or internal behavior, customer-specific architectures, or
the full behavior of third-party databases and cloud services. Do not
fill these gaps with unsupported assumptions.

For further help:

- **Product bug reports and feature requests:** https://github.com/scalar-labs/scalardb/issues
- **Enterprise support:** https://www.scalar-labs.com/support
- **Licensing questions:** https://www.scalar-labs.com/contact
- **Documentation errors:** use the "Edit this page" link on the relevant page or open an issue at https://github.com/scalar-labs/docs-scalardb
