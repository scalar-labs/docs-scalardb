import React from 'react';
import clsx from 'clsx';
import {useWindowSize} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import ContentVisibility from '@theme/ContentVisibility';
import type {Props} from '@theme/DocItem/Layout';
import SupportDropdownMenu from '@site/src/components/Support/SupportDropdownMenu'; // Import the support dropdown component.

import styles from './styles.module.css';

/**
 * Decide if the ToC should be rendered, on mobile or desktop viewports.
 */
function useDocTOC() {
  const {frontMatter, toc} = useDoc();
  const windowSize = useWindowSize();

  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;

  const mobile = canRender ? <DocItemTOCMobile /> : undefined;

  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;

  return {
    hidden,
    mobile,
    desktop,
  };
}

export default function DocItemLayout({children}: Props): JSX.Element {
  const docTOC = useDocTOC();
  const {metadata, frontMatter} = useDoc(); // Get the front-matter metadata to check for the `hide_table_of_contents` configuration.
  const hideTOC = frontMatter.hide_table_of_contents; // Check if the ToC is hidden.
  const windowSize = useWindowSize(); // Get the current window size.

  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {/* Show the Support button on mobile. */}
            {windowSize === 'mobile' && (
              <div style={{ display: 'flex', justifyContent: 'left', marginBottom: '1rem' }}>
                <SupportDropdownMenu />
              </div>
            )}
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>

      {/* Ensure the right column always exists, even if there is no ToC. */}
      {!hideTOC && windowSize !== 'mobile' && (
        <div className="col col--3" style={{ position: "relative" }}>
          {/* Add a wrapper div to make the support dropdown and ToC sticky. */}
          <div style={{ position: "sticky", top: "80px", zIndex: 1 }}>
            {/* Add the support dropdown above the ToC on desktop. */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '0px 17px', right: '0' }}>
              <SupportDropdownMenu />
            </div>
            {/* Render the ToC if one is available. */}
            {docTOC.desktop}
          </div>
        </div>
      )}
    </div>
  );
}
