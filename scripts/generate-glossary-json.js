const fs = require('fs');
const path = require('path');
const glossaryFilePath = path.join(__dirname, '../src/pages/glossary.mdx');
const outputJsonPath = path.join(__dirname, '../static/glossary.json');

const generateGlossaryJson = () => {
  const glossaryContent = fs.readFileSync(glossaryFilePath, 'utf-8');
  const glossaryLines = glossaryContent.split('\n');

  let glossary = {};
  let currentTerm = '';

  glossaryLines.forEach((line) => {
    if (line.startsWith('## ')) {
      // Extract the term (strip the '## ' prefix)
      currentTerm = line.replace('## ', '').trim();
    } else if (line.startsWith('# ')) {
      // Skip heading 1 (`# `) lines
      currentTerm = ''; // Reset the current term for heading 1 lines
    } else if (line.trim() !== '' && currentTerm !== '') {
      // Add the definition to the current term (only if a valid term is set)
      glossary[currentTerm] = line.trim();
    }
  });

  // Write glossary to glossary.json
  fs.writeFileSync(outputJsonPath, JSON.stringify(glossary, null, 2));
  console.log('glossary.json generated successfully.');
};

generateGlossaryJson();
