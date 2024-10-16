import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import GlossaryTooltip from './GlossaryTooltip';

interface GlossaryInjectorProps {
  children: React.ReactNode;
}

const GlossaryInjector: React.FC<GlossaryInjectorProps> = ({ children }) => {
  const [glossary, setGlossary] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Fetch glossary.json on component mount.
    fetch('/glossary.json')
      .then((res) => res.json())
      .then(setGlossary)
      .catch((err) => console.error('Failed to load glossary:', err));
  }, []);

  useEffect(() => {
    if (Object.keys(glossary).length === 0) return;

    const terms = Object.keys(glossary);

    const wrapTermsInTooltips = (node: HTMLElement) => {
      const textNodes = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
      let currentNode: Node | null;

      // Store modifications for later processing.
      const modifications: { originalNode: Node; newNodes: Node[] }[] = [];

      while ((currentNode = textNodes.nextNode())) {
        const parentElement = currentNode.parentElement;

        // Only wrap terms if the parent is a <p> or <li> element.
        if (parentElement && (parentElement.tagName.toLowerCase() === 'p' || parentElement.tagName.toLowerCase() === 'li')) {
          const newNodes: Node[] = []; // Array to hold the new nodes.
          let lastIndex = 0; // Track the last index for proper splitting.

          terms.forEach((term) => {
            const regex = new RegExp(`\\b(${term})\\b`, 'gi'); // Case-insensitive match
            let match: RegExpExecArray | null;

            // If a match is found
            while ((match = regex.exec(currentNode.textContent || ''))) {
              // Add text before the match.
              if (lastIndex < match.index) {
                newNodes.push(document.createTextNode(currentNode.textContent!.slice(lastIndex, match.index)));
              }

              // Create and push the GlossaryTooltip for the matched term.
              const tooltipWrapper = document.createElement('span');
              tooltipWrapper.setAttribute('data-term', term);
              tooltipWrapper.className = 'glossary-term'; // Add a class for styling.

              // Get the definition for the matched term.
              const definition = glossary[term]; // Access the definition from the glossary.

              // Render the Tooltip with the definition text.
              ReactDOM.render(<GlossaryTooltip term={term} definition={definition}>{match[0]}</GlossaryTooltip>, tooltipWrapper);

              newNodes.push(tooltipWrapper); // Push tooltip wrapper.

              // Update lastIndex to the end of the match.
              lastIndex = match.index + match[0].length;
            }
          });

          // Add any remaining text after the last match.
          if (lastIndex < currentNode.textContent!.length) {
            newNodes.push(document.createTextNode(currentNode.textContent!.slice(lastIndex)));
          }

          // If new nodes are created, we need to store the modification.
          if (newNodes.length > 0) {
            modifications.push({ originalNode: currentNode, newNodes });
          }
        }
      }

      // Apply the modifications outside of the tree walker iteration.
      modifications.forEach(({ originalNode, newNodes }) => {
        const parentElement = originalNode.parentElement;
        if (parentElement) {
          newNodes.forEach((newNode) => {
            parentElement.insertBefore(newNode, originalNode);
          });
          parentElement.removeChild(originalNode); // Remove the original text node.
        }
      });
    };

    // Process <p> and <li> elements in the document body.
    const paragraphsAndLists = document.querySelectorAll('p, li');
    paragraphsAndLists.forEach((node) => wrapTermsInTooltips(node));
  }, [glossary]);

  return <>{children}</>;
};

export default GlossaryInjector;
