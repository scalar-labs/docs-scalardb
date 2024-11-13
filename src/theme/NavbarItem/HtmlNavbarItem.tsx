/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useLocation } from '@docusaurus/router';
import type { Props } from '@theme/NavbarItem/HtmlNavbarItem';

function loadGoogleTranslateScript() {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    // Check if the script is already added.
    const existingScript = document.getElementById('google-translate-script');
    if (!existingScript) {
      const addScript = document.createElement('script');
      addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      addScript.async = true;
      addScript.id = 'google-translate-script'; // Assign unique id.
      document.body.appendChild(addScript);
    }
  }
}

function initializeGoogleTranslate() {
  // Check if window.google is available.
  if (typeof window !== 'undefined' && window.google) {
    const targetElement = document.getElementById('google_translate_element');
    if (targetElement && !window.googleTranslateElement) {
      window.googleTranslateElement = new window.google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'ja' },
        'google_translate_element'
      );
    }
  }
}

export default function HtmlNavbarItem({
  value,
  className,
  mobile = false,
  isDropdownItem = false,
}: Props): JSX.Element {
  const Comp = isDropdownItem ? 'li' : 'div';
  const { pathname } = useLocation();

  // List of specific versions to show Google Translate.
  const allowedVersions = ['3.4', '3.5', '3.6', '3.7', '3.8', '3.9', '3.10', '3.11', '3.12'];

  // Extract the version from the pathname, ignoring "latest" and "current".
  const versionMatch = pathname.match(/\/docs\/(\d+\.\d+)\//);
  const currentVersion = versionMatch ? versionMatch[1] : null;

  useEffect(() => {
    // Only load and initialize Google Translate if the version is in allowedVersions.
    if (currentVersion && allowedVersions.includes(currentVersion)) {
      loadGoogleTranslateScript();
      window.googleTranslateElementInit = initializeGoogleTranslate;
    } else {
      // Clear the element content if it's not an allowed version.
      const existingElement = document.getElementById('google_translate_element');
      if (existingElement) {
        existingElement.innerHTML = ''; // Clear the element content.
      }

      // Reset Google Translate instance.
      if (window.googleTranslateElement) {
        window.googleTranslateElement = null;
      }
    }
  }, [currentVersion, allowedVersions]);

  // If the version is not in allowedVersions, return an empty div.
  if (currentVersion && !allowedVersions.includes(currentVersion)) {
    return null;
  }

  return (
    <Comp
      className={clsx(
        {
          navbar__item: !mobile && !isDropdownItem,
          'menu__list-item': mobile,
        },
        className,
      )}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}
