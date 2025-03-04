import React, { useState, useEffect, useRef } from 'react';
import AssistantModal from './AssistantModal'; // Import the AssistantModal component for the chatbot.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the FontAwesomeIcon component.
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'; // Import the icon.
import ContactSupportLink from "./ContactSupportLink"; // Import the Enterprise support link.
import { useDoc } from '@docusaurus/plugin-content-docs/client';

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // For dropdown visibility
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get document metadata from Docusaurus.
  const { metadata } = useDoc();
  const docTitle = metadata?.title || "Issue with documentation page"; // Use document title or fallback.

  // Detect the language based on the URL path.
  const isJapanese = typeof window !== "undefined" && window.location.pathname.startsWith("/ja-jp");

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const openModal = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the default anchor behavior (page navigation).
    setIsModalOpen(true); // Open the modal when the link is clicked.
    setIsOpen(false); // Optionally close the dropdown when modal opens.
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Generate GitHub issue URL dynamically.
  const repoUrl = "https://github.com/scalar-labs/docs-scalardb/issues/new";

  // Define issue title dynamically based on language.
  const issueTitle = encodeURIComponent(
    isJapanese ? `フィードバック: \`${docTitle}\` ページ` : `Feedback: \`${docTitle}\` page`
  );

  // Define issue body dynamically based on language.
  const issueBody = encodeURIComponent(
    isJapanese
      ? `**ドキュメントページの URL:** ${window.location.href.replace(/#.*$/, '')}

## 期待される動作

どのような動作を期待しましたか？

## 問題の説明

問題の内容をわかりやすく説明してください。

### 再現手順 (該当する場合)

問題を再現できる場合、手順を記載してください。

### スクリーンショット (該当する場合)

該当する場合は、スクリーンショットを添付してください。
`
    : `**Documentation page URL:** ${window.location.href.replace(/#.*$/, '')}

## Expected behavior

What did you expect to happen?

## Describe the problem

Please provide a clear and concise description of what the issue is.

### Steps to reproduce (if applicable)

If the issue is reproducible, please list the steps to reproduce it.

### Screenshots (if applicable)

If applicable, add screenshots to help explain your problem.
`
);

  // Construct the GitHub issue URL.
  const githubIssueUrl = `${repoUrl}?title=${issueTitle}&body=${issueBody}&labels=documentation`;

  // Close the dropdown when clicking outside of the content container.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
      <button className={styles.supportDropBtn} onClick={toggleDropdown}>
        {isJapanese ? "サポート" : "Support"} <FontAwesomeIcon icon={faChevronDown} fontSize={12} />
      </button>

      {isOpen && (
          <ContactSupportLink />
          <hr />
          <a href="https://stackoverflow.com/questions/tagged/scalardb" target="_blank">
          </a>
          <hr />
          <a href="#" onClick={openModal}>
            {isJapanese ? "Scalar メンバーシッププログラム向け" : "For Scalar Membership Program members"}
          </a>
          <hr />
          <a href={githubIssueUrl} target="_blank" rel="noopener noreferrer">
            <b>{isJapanese ? "ドキュメントの問題を報告" : "Report doc issue"}</b><br />
            {isJapanese ? "このページに関する問題を報告" : "For reporting an issue on this page"}
          </a>
        </div>
      )}

      {/* Pass isModalOpen to AssistantModal to control visibility. */}
      {isModalOpen && <AssistantModal isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  );
};

export default DropdownMenu;
