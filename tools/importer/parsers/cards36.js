/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from an anchor card
  function extractCardContent(cardEl) {
    const cells = [];
    // Find image (mandatory for this block)
    let img = cardEl.querySelector('img');
    // Find tag (optional)
    let tag = cardEl.querySelector('.tag');
    // Find heading (h2 or h3 or h4)
    let heading = cardEl.querySelector('h2, h3, h4');
    // Find description (paragraph)
    let desc = cardEl.querySelector('p');

    // First cell: image (if present)
    let firstCell = img ? img : '';
    // Second cell: text content (tag, heading, desc)
    const textContent = [];
    if (tag) textContent.push(tag);
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    let secondCell = textContent.length ? textContent : '';
    return [firstCell, secondCell];
  }

  // Find the grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Cards array
  const rows = [];

  // Header row
  rows.push(['Cards (cards36)']);

  // --- First card: Large left card ---
  // It's the first child anchor in grid
  const mainCard = grid.querySelector('a.utility-link-content-block');
  if (mainCard) {
    rows.push(extractCardContent(mainCard));
  }

  // --- Next two cards: two small cards with images on right ---
  // These are inside the first .flex-horizontal.flex-vertical.flex-gap-sm in grid
  const rightCardsRow = grid.querySelector('.flex-horizontal.flex-vertical.flex-gap-sm');
  if (rightCardsRow) {
    const rightCards = rightCardsRow.querySelectorAll('a.utility-link-content-block');
    rightCards.forEach(card => {
      rows.push(extractCardContent(card));
    });
  }

  // --- Remaining cards: text-only cards stacked vertically ---
  // These are inside the second .flex-horizontal.flex-vertical.flex-gap-sm in grid
  // Each card is an anchor, separated by dividers
  const stackedCardsRow = grid.querySelectorAll('.flex-horizontal.flex-vertical.flex-gap-sm')[1];
  if (stackedCardsRow) {
    const stackedCards = stackedCardsRow.querySelectorAll('a.utility-link-content-block');
    stackedCards.forEach(card => {
      // These cards have no image, so first cell is empty
      let heading = card.querySelector('h2, h3, h4');
      let desc = card.querySelector('p');
      const textContent = [];
      if (heading) textContent.push(heading);
      if (desc) textContent.push(desc);
      rows.push(['', textContent.length ? textContent : '']);
    });
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
