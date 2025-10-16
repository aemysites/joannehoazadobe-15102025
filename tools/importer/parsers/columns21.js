/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each column)
  const columns = Array.from(grid.children);
  if (columns.length < 4) return;

  // --- COLUMN 1: LOGO, TITLE, SOCIAL ICONS ---
  // Extract logo/title
  const logoLink = columns[0].querySelector('a.logo');
  let logoContent = '';
  if (logoLink) {
    // Get logo image and title
    const logoImg = logoLink.querySelector('img');
    const logoTitle = logoLink.querySelector('.paragraph-xl');
    const logoDiv = document.createElement('div');
    if (logoImg) logoDiv.appendChild(logoImg.cloneNode(true));
    if (logoTitle) logoDiv.appendChild(logoTitle.cloneNode(true));
    logoContent = logoDiv;
  }
  // Extract social icons
  const socialList = columns[0].querySelector('.footer-icons-group');
  let socialContent = '';
  if (socialList) {
    socialContent = socialList.cloneNode(true);
  }
  // Compose column 1 cell
  const col1Cell = document.createElement('div');
  if (logoContent) col1Cell.appendChild(logoContent);
  if (socialContent) col1Cell.appendChild(socialContent);

  // --- COLUMN 2: Trends ---
  // Only the <ul> list
  const trendsList = columns[1].querySelector('ul, .w-list-unstyled') || columns[1];
  const col2Cell = trendsList.cloneNode(true);

  // --- COLUMN 3: Inspire ---
  const inspireList = columns[2].querySelector('ul, .w-list-unstyled') || columns[2];
  const col3Cell = inspireList.cloneNode(true);

  // --- COLUMN 4: Explore ---
  const exploreList = columns[3].querySelector('ul, .w-list-unstyled') || columns[3];
  const col4Cell = exploreList.cloneNode(true);

  // Build the table rows
  const headerRow = ['Columns (columns21)'];
  const secondRow = [col1Cell, col2Cell, col3Cell, col4Cell];
  const table = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);
  element.replaceWith(table);
}
