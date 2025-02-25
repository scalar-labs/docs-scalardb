import React, { useEffect, useState } from "react";
import { useLocation } from "@docusaurus/router";

const ContactSupportLink: React.FC = () => {
  const location = useLocation();
  const [storedUrl, setStoredUrl] = useState<string | null>(null);

  // Detect the language based on the URL path
  const isJapanese = location.pathname.startsWith("/ja-jp");

  useEffect(() => {
    // Store the current URL in localStorage when the component first mounts.
    const currentUrl = `https://scalardb.scalar-labs.com${location.pathname}`;
    localStorage.setItem("currentUrl", currentUrl);

    // Check if there's a stored URL (in case the user logs in later).
    const savedUrl = localStorage.getItem("currentUrl");
    if (savedUrl) {
      setStoredUrl(savedUrl);
    }
  }, [location]);

  const handleSupportClick = () => {
    // Retrieve the stored URL (if it exists) or fall back to the current URL.
    const finalUrl = storedUrl || `https://scalardb.scalar-labs.com${location.pathname}`;
    const reportUrl = `https://support.scalar-labs.com/hc/ja/requests/new?ticket_form_id=8641483507983&tf_11847415366927=${encodeURIComponent(finalUrl)}`;

    // Open the support link in a new tab.
    window.open(reportUrl, "_blank");
  };

  return (
    <div>
      <a href="#" onClick={handleSupportClick} rel="noopener noreferrer">
        <b>{isJapanese ? "テクニカルサポートに問い合わせる" : "Contact technical support"}</b><br />
        {isJapanese ? "エンタープライズのお客様向け" : "For Enterprise customers"}
      </a>
    </div>
  );
};

export default ContactSupportLink;
