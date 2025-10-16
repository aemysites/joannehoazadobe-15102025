/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: 2 columns, multiple rows, first col image, second col text (alt text)
  const headerRow = ['Cards (cards35)'];
  const rows = [headerRow];

  // Select all card containers (utility-aspect-1x1)
  const cardDivs = element.querySelectorAll('.utility-aspect-1x1');

  cardDivs.forEach((cardDiv) => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    // Extract alt text from the image for the second cell
    let textContent = '';
    if (img && img.alt) {
      textContent = img.alt.trim();
    }
    // If the cardDiv contains more text nodes or elements, include their text as well
    // (for flexibility, in case future cards have more content)
    const extraText = Array.from(cardDiv.childNodes)
      .filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim())
      .map(n => n.textContent.trim())
      .join(' ');
    if (extraText) {
      textContent = textContent ? textContent + ' ' + extraText : extraText;
    }
    rows.push([img, textContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
