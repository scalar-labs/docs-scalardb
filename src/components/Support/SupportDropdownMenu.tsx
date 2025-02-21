import React, { useState, useEffect, useRef } from 'react';
import styles from '@site/src/css/SupportDropdownMenu.module.css';
import AssistantModal from './AssistantModal'; // Import the AssistantModal component for the chatbot.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the FontAwesomeIcon component.
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'; // Import the icon.
import ContactSupportLink from "./ContactSupportLink"; // Import the Enterprise support link.

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // For dropdown visibility
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown if clicking outside
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
    <div className={styles.supportDropdown} ref={dropdownRef}>
      <button className={styles.supportDropBtn} onClick={toggleDropdown}>
        Support <FontAwesomeIcon icon={faChevronDown} fontSize={12} />
      </button>

      {isOpen && (
        <div className={styles.supportDropdownContent}>
          <ContactSupportLink />
          <a href="https://stackoverflow.com/questions/tagged/scalardb" target="_blank">
            <b>Stack Overflow</b><br />For Community users
          </a>
          <a href="#" onClick={openModal}>
            <b>AI assistant (experimental)</b><br />For Scalar Membership Program members
          </a>
        </div>
      )}

      {/* Pass isModalOpen to AssistantModal to control visibility. */}
      {isModalOpen && <AssistantModal isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  );
};

export default DropdownMenu;
