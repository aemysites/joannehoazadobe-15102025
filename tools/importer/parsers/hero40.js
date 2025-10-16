/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children divs
  const topDivs = element.querySelectorAll(':scope > div');

  // Defensive: find image (background asset)
  let bgImg = null;
  for (const div of topDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }

  // Defensive: Find heading, paragraph, CTA
  let heading = null, paragraph = null, cta = null;
  for (const div of topDivs) {
    // Look for nested grid with heading, paragraph, button
    const grid = div.querySelector('.w-layout-grid');
    if (grid) {
      // Heading
      heading = grid.querySelector('h1, h2, h3, h4, h5, h6');
      // Paragraph
      paragraph = grid.querySelector('p');
      // CTA (anchor)
      cta = grid.querySelector('a');
      break;
    }
  }

  // Compose the content cell for row 3
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (paragraph) contentCell.push(paragraph);
  if (cta) contentCell.push(cta);

  // Table rows
  const headerRow = ['Hero (hero40)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell];

  const cells = [headerRow, imageRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
