/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per guidelines
  const headerRow = ['Columns block (columns38)'];

  // Defensive: Get all direct children of the main grid layout
  const grid = element.querySelector('.grid-layout.tablet-1-column');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // Left column: text content (heading, paragraph, buttons)
  const leftCol = columns[0];
  // Find heading, paragraph, and button group
  const heading = leftCol.querySelector('h1');
  const subheading = leftCol.querySelector('p');
  const buttonGroup = leftCol.querySelector('.button-group');
  // Compose left cell content
  const leftCellContent = [];
  if (heading) leftCellContent.push(heading);
  if (subheading) leftCellContent.push(subheading);
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // Right column: images (three images in a horizontal grid)
  const rightCol = columns[1];
  // Defensive: find all images in the nested grid
  const imagesGrid = rightCol.querySelector('.grid-layout');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  } else {
    images = Array.from(rightCol.querySelectorAll('img'));
  }
  // Compose right cell content
  // Place all images in a fragment for horizontal layout
  const rightCellContent = images;

  // Build the table rows
  const rows = [
    headerRow,
    [leftCellContent, rightCellContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
