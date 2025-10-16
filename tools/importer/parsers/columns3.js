/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (holds columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Find image and content columns
  let imgCol = null;
  let contentCol = null;
  for (const node of Array.from(grid.children)) {
    if (node.tagName === 'IMG') {
      imgCol = node;
    } else {
      contentCol = node;
    }
  }
  if (!imgCol || !contentCol) return;

  // Compose right column cell
  const rightColContent = document.createElement('div');
  // Heading
  const heading = contentCol.querySelector('h1');
  if (heading) rightColContent.appendChild(heading);
  // Subheading
  const subheading = contentCol.querySelector('p');
  if (subheading) rightColContent.appendChild(subheading);
  // Button group
  const buttonGroup = contentCol.querySelector('.button-group');
  if (buttonGroup) rightColContent.appendChild(buttonGroup);

  // Table rows
  const headerRow = ['Columns block (columns3)'];
  const contentRow = [imgCol, rightColContent];

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
