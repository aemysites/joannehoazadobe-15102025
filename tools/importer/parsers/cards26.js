/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards26) block: 2 columns, multiple rows
  const headerRow = ['Cards (cards26)'];
  const rows = [headerRow];

  // Helper to extract card content
  function extractCardContent(cardDiv) {
    // Find the image (mandatory)
    const img = cardDiv.querySelector('img');
    // Find the card text content (if present)
    let title = null;
    let desc = null;
    // Look for a heading and paragraph inside the card
    const textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    if (textContainer) {
      title = textContainer.querySelector('h3');
      desc = textContainer.querySelector('p');
    }
    // Compose the text cell
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);
    // Always return [image, textCell]
    // If no text, use an empty string for the cell
    return [img, textCell.length ? textCell : ''];
  }

  // Select all direct children that have an <img> (card containers)
  const cardDivs = Array.from(element.children).filter(div => div.querySelector('img'));

  // Ensure all images from the HTML are included, even if no text
  cardDivs.forEach(cardDiv => {
    rows.push(extractCardContent(cardDiv));
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
