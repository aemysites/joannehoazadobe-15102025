/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card anchor or card div
  function extractCard(cardEl) {
    // Find image (mandatory)
    const img = cardEl.querySelector('img');
    // Find heading (h2, h3, h4)
    const heading = cardEl.querySelector('h2, h3, h4');
    // Find description (first p after heading)
    const desc = cardEl.querySelector('p');
    // Find CTA (button or .button div)
    let cta = cardEl.querySelector('.button, button, a.button');
    // Compose text cell
    const textCell = document.createElement('div');
    if (heading) textCell.appendChild(heading);
    if (desc) textCell.appendChild(desc);
    if (cta) textCell.appendChild(cta);
    return [img, textCell];
  }

  // Find the main grid containing cards
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  const cards = [];
  // First card (feature card)
  const firstCard = mainGrid.querySelector('a.utility-link-content-block');
  if (firstCard) {
    cards.push(extractCard(firstCard));
  }
  // Nested grid contains the rest of the cards
  const nestedGrid = mainGrid.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (nestedGrid) {
    // All card anchors in nested grid
    const cardEls = nestedGrid.querySelectorAll('a.utility-link-content-block');
    cardEls.forEach(cardEl => {
      cards.push(extractCard(cardEl));
    });
  }

  // Table header
  const headerRow = ['Cards (cards2)'];
  // Build table rows
  const tableRows = [headerRow, ...cards];
  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace original element
  element.replaceWith(block);
}
