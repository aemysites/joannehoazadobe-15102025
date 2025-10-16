/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns28)'];

  // Defensive: Find the grid layout which contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (should be two: left content, right image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: rich content block
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // For left column, gather all its children as a single cell
  // This will preserve structure and resilience to minor markup changes
  const leftCellContent = Array.from(leftCol.children);

  // For right column, use the image element directly
  const rightImage = rightCol.tagName === 'IMG' ? rightCol : rightCol.querySelector('img');
  const rightCellContent = rightImage ? [rightImage] : [];

  // Build the table rows
  const rows = [
    headerRow,
    [leftCellContent, rightCellContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
