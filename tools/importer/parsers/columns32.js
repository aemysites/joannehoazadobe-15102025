/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children of the main grid
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Defensive: Expecting two columns (left: text, right: image)
  let leftCol = null;
  let rightCol = null;

  // Find which child is text, which is image
  for (const child of gridChildren) {
    if (child.querySelector('img.image')) {
      rightCol = child;
    } else {
      leftCol = child;
    }
  }

  // Defensive fallback: If not found, bail
  if (!leftCol || !rightCol) return;

  // --- LEFT COLUMN ---
  // Breadcrumbs: horizontal flex with links and chevron icon
  const breadcrumbs = leftCol.querySelector('.flex-horizontal');
  // Heading
  const heading = leftCol.querySelector('h2');
  // Author/date/meta block
  const metaBlock = leftCol.querySelector('.utility-margin-bottom-1rem');
  // Social icons list
  const socialList = leftCol.querySelector('ul[aria-label="Social media links"]');

  // Compose left column content
  const leftContent = [];
  if (breadcrumbs) leftContent.push(breadcrumbs);
  if (heading) leftContent.push(heading);
  if (metaBlock) leftContent.push(metaBlock);
  if (socialList) leftContent.push(socialList);

  // --- RIGHT COLUMN ---
  // The image is the only child of rightCol
  const image = rightCol.querySelector('img');
  const rightContent = image ? [image] : [];

  // --- TABLE STRUCTURE ---
  const headerRow = ['Columns block (columns32)'];
  const columnsRow = [leftContent, rightContent];

  // Build block table
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
