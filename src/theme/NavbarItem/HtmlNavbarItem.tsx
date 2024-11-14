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

function loadGoogleTranslateScript(callback: () => void) {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const existingScript = document.getElementById('google-translate-script');
    if (!existingScript) {
      const addScript = document.createElement('script');
      addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      addScript.async = true;
      addScript.id = 'google-translate-script';
      addScript.onload = callback; // Trigger callback once loaded.
      document.body.appendChild(addScript);
    } else {
      callback(); // Script already exists, proceed to callback directly.
    }
  }
}

function initializeGoogleTranslate() {
  if (typeof window !== 'undefined' && window.google && window.google.translate) {
    const targetElement = document.getElementById('google_translate_element');
    if (targetElement && !window.googleTranslateElement) {
      try {
        window.googleTranslateElement = new window.google.translate.TranslateElement(
          { pageLanguage: 'en', includedLanguages: 'ja' },
          'google_translate_element'
        );
      } catch (error) {
        console.error('Error initializing Google Translate:', error);
      }
    }
  }
}

function removeGoogleTranslateWidget() {
  const existingElement = document.getElementById('google_translate_element');
  if (existingElement) existingElement.innerHTML = ''; // Clear content.
  const script = document.getElementById('google-translate-script');
  if (script) script.remove(); // Remove the Google Translate script.
  window.googleTranslateElement = null;
}

export default function HtmlNavbarItem({
  value,
  className,
  mobile = false,
  isDropdownItem = false,
}: Props): JSX.Element {
  const Comp = isDropdownItem ? 'li' : 'div';
  const { pathname } = useLocation();

  const allowedVersions = ['3.4', '3.5', '3.6', '3.7', '3.8', '3.9', '3.10', '3.11', '3.12'];
  const versionMatch = pathname.match(/\/docs\/(\d+\.\d+)\//);
  const currentVersion = versionMatch ? versionMatch[1] : null;

  useEffect(() => {
    if (currentVersion && allowedVersions.includes(currentVersion)) {
      // Ensure Google Translate script is loaded.
      loadGoogleTranslateScript(() => {
        if (!sessionStorage.getItem('googleTranslateInitialized')) {
          window.googleTranslateElementInit = () => {
            initializeGoogleTranslate();
            sessionStorage.setItem('googleTranslateInitialized', 'true');
          };
        } else {
          initializeGoogleTranslate(); // Re-initialize if already loaded.
        }
      });
    } else {
      // Clear widget if on an unallowed version.
      removeGoogleTranslateWidget();
      sessionStorage.removeItem('googleTranslateInitialized');
    }
  }, [currentVersion]);

  // Hide component if version is not in allowed versions.
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
