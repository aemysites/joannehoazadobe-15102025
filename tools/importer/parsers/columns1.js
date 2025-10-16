/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block (columns1) parser
  // 1. Use the block name as the header row exactly
  const headerRow = ['Columns block (columns1)'];

  // 2. Extract all direct child divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // 3. For each column, reference the column div itself (not clone, not just img)
  //    This preserves all child content and semantic meaning
  const contentRow = columns.map(col => col);

  // 4. Build the table: header row, then one row with all columns
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace the original element with the table
  element.replaceWith(table);
}
