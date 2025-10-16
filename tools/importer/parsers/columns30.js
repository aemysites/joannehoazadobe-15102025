/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name in the header row
  const headerRow = ['Columns block (columns30)'];

  // Get all immediate child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its image (if present)
  const columnCells = columns.map((col) => {
    // Try to find an image inside this column
    const img = col.querySelector('img');
    if (img) return img;
    // If no image, return the column itself (fallback)
    return col;
  });

  // Build the table rows
  const rows = [
    headerRow,
    columnCells
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
