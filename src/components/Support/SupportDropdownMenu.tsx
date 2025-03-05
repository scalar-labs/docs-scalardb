import React, { useState, useEffect, useRef } from 'react';
import AssistantModal from './AssistantModal'; // Import the AssistantModal component for the chatbot.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the FontAwesomeIcon component.
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'; // Import the icon.
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from "@docusaurus/router"; // Import for location detection.

const SupportDropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // For dropdown visibility
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility
  const [storedUrl, setStoredUrl] = useState<string | null>(null); // For storing the URL
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Get document metadata from Docusaurus.
  const { metadata } = useDoc();
  const docTitle = metadata?.title || "Issue with documentation page"; // Use document title or fallback.

  // Detect the language based on the URL path.
  const isJapanese = location.pathname.startsWith("/ja-jp");

  useEffect(() => {
    // Store the current URL in localStorage when the component first mounts.
    const currentUrl = `https://scalardb.scalar-labs.com${location.pathname}`;
    localStorage.setItem("currentUrl", currentUrl);

    // Retrieve stored URL (if available).
    const savedUrl = localStorage.getItem("currentUrl");
    if (savedUrl) {
      setStoredUrl(savedUrl);
    }
  }, [location]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const openModal = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default anchor behavior.
    setIsModalOpen(true);
    setIsOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSupportClick = () => {
    // Get the stored URL or fall back to the current URL.
    const finalUrl = storedUrl || `https://scalardb.scalar-labs.com${location.pathname}`;
    const reportUrl = `https://support.scalar-labs.com/hc/ja/requests/new?ticket_form_id=8641483507983&tf_11847415366927=${encodeURIComponent(finalUrl)}`;

    // Open the support link in a new tab.
    window.open(reportUrl, "_blank");
  };

  // Generate GitHub issue URL dynamically.
  const repoUrl = "https://github.com/scalar-labs/docs-scalardb/issues/new";
  const issueTitle = encodeURIComponent(
    isJapanese ? `フィードバック: \`${docTitle}\` ページ` : `Feedback: \`${docTitle}\` page`
  );

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

  const githubIssueUrl = `${repoUrl}?title=${issueTitle}&body=${issueBody}&labels=documentation`;

  // Close dropdown when clicking outside of it.
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
    <div className="supportDropdown" ref={dropdownRef}>
      <button className="supportDropBtn" onClick={toggleDropdown}>
        {isJapanese ? "何かお困りですか?" : "Need help?"} <FontAwesomeIcon icon={faChevronDown} fontSize={12} />
      </button>

      {isOpen && (
        <div className="supportDropdownContent">
          <div>
            <a href="#" onClick={handleSupportClick} rel="noopener noreferrer">
              <b>{isJapanese ? "テクニカルサポートに問い合わせ" : "Contact technical support"}</b><br />
              {isJapanese ? "商用ライセンスをご契約のお客様のみご利用いただけます。" : "Available only to customers with a commercial license."}
            </a>
          </div>
          <hr />
          <a href="https://stackoverflow.com/questions/tagged/scalardb" target="_blank">
            <b>{isJapanese ? "Stack Overflow をチェック" : "Check Stack Overflow"}</b><br />
            {isJapanese ? "すべてのユーザーがご利用いただけます。" : "Available to all users."}
          </a>
          <hr />
          <a href="#" onClick={openModal}>
            <b>{isJapanese ? "AI に聞く (試験運用中)" : "Ask AI (experimental)"}</b><br />
            {isJapanese ? "Scalar Membership Programにご参加の方のみご利用いただけます。" : "Available only to members of the Scalar Membership Program."}
          </a>
          <hr />
          <a href={githubIssueUrl} target="_blank" rel="noopener noreferrer">
            <b>{isJapanese ? "ドキュメントの問題を報告" : "Report doc issue"}</b><br />
            {isJapanese ? "このページについて何かお気づきの点がありましたら、こちらから報告いただけます。" : "If you have any feedback about this page, please submit an issue."}
          </a>
        </div>
      )}

      {isModalOpen && <AssistantModal isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  );
};

export default SupportDropdownMenu;
