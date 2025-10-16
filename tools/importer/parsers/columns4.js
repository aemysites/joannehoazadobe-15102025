/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns4)'];

  // Find the grid layout container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct child divs of the grid (these are the columns)
  const columns = Array.from(grid.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // Left column: heading and subheading
  const leftCol = columns[0];
  // Right column: button group
  const rightCol = columns[1];

  // Compose left column cell: include all children (h2, p)
  const leftCell = document.createElement('div');
  Array.from(leftCol.children).forEach((child) => {
    leftCell.appendChild(child);
  });

  // Compose right column cell: include all children (anchors/buttons)
  const rightCell = document.createElement('div');
  Array.from(rightCol.children).forEach((child) => {
    rightCell.appendChild(child);
  });

  // Compose the row for columns
  const columnsRow = [leftCell, rightCell];

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
