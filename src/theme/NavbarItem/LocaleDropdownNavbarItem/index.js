import React from 'react';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import LocaleDropdownNavbarItem from '@theme-original/NavbarItem/LocaleDropdownNavbarItem';

export default function CustomLocaleDropdownNavbarItem(props) {
  const {pathname} = useLocation();
  const {siteConfig} = useDocusaurusContext();
  const allowedVersions = siteConfig.customFields.allowedLanguageDropdownVersions;

  // Extract the version from the pathname, e.g., "/docs/latest/" or "/docs/3.13/".
  const versionMatch = pathname.match(/\/docs\/([^/]+)\//);
  const currentVersion = versionMatch ? versionMatch[1] : null;

  // Show the language dropdown only if the version is allowed.
  const shouldShowDropdown = currentVersion && allowedVersions.includes(currentVersion);

  return shouldShowDropdown ? <LocaleDropdownNavbarItem {...props} /> : null;
}
