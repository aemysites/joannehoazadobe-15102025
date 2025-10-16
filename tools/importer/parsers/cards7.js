/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block: each card is image only, no text
  // 1. Header row: single column
  const headerRow = ['Cards (cards7)'];

  // 2. Get card elements (each immediate child of grid is a card)
  const cardDivs = Array.from(element.children);

  // 3. For each card, extract the image (first child of card div)
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // Only one cell per row: the image
    return [img];
  }).filter(Boolean);

  // 4. Build table data
  const tableData = [headerRow, ...rows];

  // 5. Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // 6. Replace original element
  element.replaceWith(block);
}
