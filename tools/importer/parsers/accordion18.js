/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion Block: 2 columns, multiple rows, each row = [title, content]
  const headerRow = ['Accordion (accordion18)'];
  const rows = [headerRow];

  // Defensive: Get all direct children with class 'divider' (each is an accordion item)
  const dividers = element.querySelectorAll(':scope > .divider');

  dividers.forEach((divider) => {
    // Each divider contains a grid-layout with two children: title and content
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return;
    const children = grid.children;
    if (children.length < 2) return;

    // Title: usually the first child, with class 'h4-heading'
    const titleEl = children[0];
    // Content: usually the second child, with class 'rich-text' or similar
    const contentEl = children[1];

    // Place the actual elements in the row
    rows.push([titleEl, contentEl]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}
