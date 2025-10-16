/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing headline/text/author/button
  const grids = element.querySelectorAll('.w-layout-grid');
  let mainGrid = null, imagesGrid = null;
  for (const grid of grids) {
    if (grid.querySelector('h1, .eyebrow')) mainGrid = grid;
    else if (grid.querySelector('img')) imagesGrid = grid;
  }

  // Defensive: extract left and right columns from mainGrid
  let leftCol = '', rightCol = '';
  if (mainGrid) {
    const cols = mainGrid.querySelectorAll(':scope > div');
    if (cols[0]) leftCol = cols[0];
    if (cols[1]) rightCol = cols[1];
  }

  // Defensive: extract images from imagesGrid
  let img1 = '', img2 = '';
  if (imagesGrid) {
    const imgDivs = imagesGrid.querySelectorAll(':scope > div');
    if (imgDivs[0]) img1 = imgDivs[0].querySelector('img');
    if (imgDivs[1]) img2 = imgDivs[1].querySelector('img');
  }

  // Compose table rows
  const headerRow = ['Columns block (columns11)'];
  const secondRow = [leftCol, rightCol];
  const thirdRow = [img1, img2];

  // Create table using referenced elements (not clones)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
    thirdRow
  ], document);

  element.replaceWith(table);
}
