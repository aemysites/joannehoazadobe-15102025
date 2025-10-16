/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const children = Array.from(grid.children);
  // The expected layout is: [heading, right column]
  const heading = children.find((el) => el.tagName === 'H2');
  const rightCol = children.find((el) => el !== heading);

  // Defensive: If missing, exit
  if (!heading || !rightCol) return;

  // In the right column, extract paragraph(s) and button(s)
  const rightColContent = [];
  // Get all paragraphs
  rightCol.querySelectorAll('p').forEach((p) => rightColContent.push(p));
  // Get all buttons/links
  rightCol.querySelectorAll('a, button').forEach((btn) => rightColContent.push(btn));

  // Compose table rows
  const headerRow = ['Columns block (columns8)'];
  const columnsRow = [heading, rightColContent];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
