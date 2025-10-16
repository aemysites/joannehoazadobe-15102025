/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block: 2 columns, multiple rows, first row is header
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Find all direct children representing cards
  const cardDivs = Array.from(element.children);

  cardDivs.forEach((card) => {
    // Icon: look for .icon > img inside card
    let iconImg = null;
    const iconDiv = card.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }

    // Text: collect ALL text content inside card, not just first <p>
    // This will ensure all text is included, even if not in <p>
    let textContent = '';
    // Get all text nodes inside card except those inside .icon
    Array.from(card.childNodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && !node.classList.contains('icon')) {
        textContent += node.textContent.trim() + ' ';
      } else if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent.trim() + ' ';
      }
    });
    textContent = textContent.trim();
    // If no text found, fallback to first <p>
    if (!textContent) {
      const p = card.querySelector('p');
      if (p) textContent = p.textContent.trim();
    }
    // Defensive: if icon or text missing, skip this card
    if (!iconImg || !textContent) return;

    // Add row: [icon, text]
    rows.push([iconImg, textContent]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
