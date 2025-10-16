/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Get all direct column divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Step 2: For each column, extract the main image (reference the existing <img> element)
  const columnCells = columns.map(col => {
    const img = col.querySelector('img');
    if (img) {
      // Reference the existing image element (do not clone or create new)
      return img;
    }
    // If no image, return empty string (no text content in this layout)
    return '';
  });

  // Step 3: Build the table rows according to block spec
  const headerRow = ['Columns (columns39)'];
  const contentRow = columnCells;

  // Step 4: Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Step 5: Replace the original element with the new table
  element.replaceWith(table);
}
