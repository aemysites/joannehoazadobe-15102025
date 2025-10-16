/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns16)'];

  // Defensive: Find the grid container with the images
  // The grid is likely the first .grid-layout inside the block
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct child divs of the grid (each is a column)
  const columnDivs = Array.from(grid.children);

  // For each column, extract the image element (if present)
  const columns = columnDivs.map(col => {
    // Defensive: Find the first image inside the column
    const img = col.querySelector('img');
    // Reference the existing image element, not clone or create new
    return img ? img : '';
  });

  // Build the table rows
  const rows = [headerRow, columns];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original block element with the new table
  element.replaceWith(table);
}
