import React, { useEffect } from 'react';
import { useLocation, useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import LocaleDropdownNavbarItem from '@theme-original/NavbarItem/LocaleDropdownNavbarItem';

export default function CustomLocaleDropdownNavbarItem(props) {
  const { pathname } = useLocation();
  const history = useHistory();
  const { siteConfig } = useDocusaurusContext();

  const allowedVersions = siteConfig.customFields.allowedLanguageDropdownVersions;
  const redirectToEnglishVersions = ['3.4', '3.5', '3.6', '3.7', '3.8', '3.9', '3.10', '3.11', '3.12'];

  // Extract the language, version, and remaining path from the pathname.
  const versionMatch = pathname.match(/\/(ja-jp\/)?docs\/([^/]+)(\/.*)?/);
  const isJapanese = versionMatch && versionMatch[1] === 'ja-jp/';
  const currentVersion = versionMatch ? versionMatch[2] : null;
  const remainingPath = versionMatch && versionMatch[3] ? versionMatch[3] : '';

  useEffect(() => {
    const handleRedirect = () => {
      if (isJapanese && redirectToEnglishVersions.includes(currentVersion)) {
        // Full redirect to ensure page is correctly loaded
        window.location.replace(`/docs/${currentVersion}${remainingPath}`);
      }
    };

    handleRedirect();
  }, [pathname, isJapanese, currentVersion, remainingPath]);

  const shouldShowDropdown = currentVersion && allowedVersions.includes(currentVersion);

  return shouldShowDropdown ? <LocaleDropdownNavbarItem {...props} /> : null;
}
