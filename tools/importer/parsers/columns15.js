/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns15)'];

  // Defensive: Find the grid layout container (columns)
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // Get all immediate children of the grid (each column)
    const colEls = Array.from(grid.children);
    // For each column, extract its content
    columns = colEls.map((col) => {
      // If the column only contains a single element, use it directly
      if (col.children.length === 1) {
        return col.firstElementChild;
      }
      // Otherwise, collect all children as an array
      return Array.from(col.childNodes).filter(node => {
        // Only include elements and non-empty text nodes
        return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
      });
    });
  } else {
    // Fallback: treat all direct children of element as columns
    const colEls = Array.from(element.children);
    columns = colEls.map((col) => col);
  }

  // The table: header row, then one row with each column's content
  const rows = [headerRow, columns];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
