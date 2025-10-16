/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block (columns33)
  const headerRow = ['Columns block (columns33)'];

  // Defensive: Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be image and text column)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imageEl = columns.find((el) => el.tagName === 'IMG');

  // Second column: text content
  const textCol = columns.find((el) => el !== imageEl);

  // Defensive: If either column missing, abort
  if (!imageEl || !textCol) return;

  // Compose the text column content
  // Get eyebrow/tag row
  const flexTop = textCol.querySelector('.flex-horizontal.x-left.y-center');
  // Get main heading
  const heading = textCol.querySelector('h2');
  // Get byline row
  const flexByline = textCol.querySelector('.flex-horizontal.flex-gap-xxs');

  // Compose text column cell
  const textCellContent = [];
  if (flexTop) textCellContent.push(flexTop);
  if (heading) textCellContent.push(heading);
  if (flexByline) textCellContent.push(flexByline);

  // Build the table rows
  const cells = [
    headerRow,
    [imageEl, textCellContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
