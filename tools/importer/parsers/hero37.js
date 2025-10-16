/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero37) block: 1 column, 3 rows
  // Row 1: Block name
  // Row 2: Background image (none in this case)
  // Row 3: Headline, subheading, CTA

  // Helper: get immediate children
  const children = Array.from(element.querySelectorAll(':scope > div, :scope > section'));

  // Find headline, subheading, CTA
  let headline = null;
  let subheading = null;
  let cta = null;

  // Defensive: find grid container
  let grid = null;
  for (const child of children) {
    if (child.classList.contains('container')) {
      grid = child.querySelector('.grid-layout');
      break;
    }
    if (child.classList.contains('grid-layout')) {
      grid = child;
      break;
    }
  }
  if (!grid) grid = element;

  // Find grid children
  const gridChildren = Array.from(grid.querySelectorAll(':scope > div, :scope > a'));
  for (const gc of gridChildren) {
    // Headline/subheading container
    if (gc.querySelector('h1, h2, h3, h4, h5, h6')) {
      headline = gc.querySelector('h1, h2, h3, h4, h5, h6');
      subheading = gc.querySelector('p, .subheading');
    }
    // CTA button (anchor)
    if (gc.tagName === 'A' || gc.querySelector('a')) {
      cta = gc.tagName === 'A' ? gc : gc.querySelector('a');
    }
  }

  // Row 1: Block name
  const headerRow = ['Hero (hero37)'];

  // Row 2: Background image (none in this block)
  const imageRow = [''];

  // Row 3: Headline, subheading, CTA
  // Compose content
  const content = [];
  if (headline) content.push(headline);
  if (subheading) content.push(subheading);
  if (cta) content.push(cta);

  const contentRow = [content];

  // Build table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
