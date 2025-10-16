/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Headline and testimonial
  const headline = mainGrid.querySelector('p.h2-heading');
  const testimonial = mainGrid.querySelector('p.paragraph-lg');

  // Find the nested grid for avatar, name/title, logo
  let bottomGrid = null;
  const subGrids = mainGrid.querySelectorAll('.w-layout-grid');
  for (const grid of subGrids) {
    if (grid !== mainGrid) {
      bottomGrid = grid;
      break;
    }
  }
  if (!bottomGrid) return;

  // Divider (should be visually between rows, not a single cell row)
  let divider = bottomGrid.querySelector('.divider');
  let hr = null;
  if (divider) {
    hr = document.createElement('hr');
  }

  // Avatar, name, title
  let avatarImg = null;
  let nameDiv = null;
  let titleDiv = null;
  const flexHor = bottomGrid.querySelector('.flex-horizontal');
  if (flexHor) {
    const avatarBlock = flexHor.querySelector('.avatar');
    if (avatarBlock) {
      avatarImg = avatarBlock.querySelector('img');
    }
    const nameTitleDivs = flexHor.querySelectorAll(':scope > div:not(.avatar) > div');
    if (nameTitleDivs.length === 2) {
      nameDiv = nameTitleDivs[0];
      titleDiv = nameTitleDivs[1];
    }
  }

  // Logo (right side)
  let logoImg = null;
  let logoText = null;
  const logoWrap = bottomGrid.querySelector('.utility-display-inline-block');
  if (logoWrap) {
    logoImg = logoWrap.querySelector('img');
    // If the logo has an alt, use it as text (fallback to '360LAB')
    if (logoImg && logoImg.alt && logoImg.alt.trim()) {
      logoText = document.createTextNode(logoImg.alt.trim());
    } else {
      logoText = document.createTextNode('360LAB');
    }
  }

  // Table header
  const headerRow = ['Columns block (columns27)'];

  // First content row: headline (left), testimonial (right)
  const row1 = [headline, testimonial];

  // Second content row: avatar+name/title (left), empty (middle), logo+text (right)
  const avatarCell = [];
  if (avatarImg) avatarCell.push(avatarImg);
  if (nameDiv) avatarCell.push(document.createElement('br'), nameDiv);
  if (titleDiv) avatarCell.push(document.createElement('br'), titleDiv);

  const emptyCell = [];

  const logoCell = [];
  if (logoImg) logoCell.push(logoImg);
  if (logoText) logoCell.push(document.createElement('br'), logoText);

  // Compose table: header, content, bottom row
  const cells = [headerRow, row1];
  if (hr) {
    // Insert a divider row with three columns, hr in the middle
    cells.push([[], [hr], []]);
  }
  cells.push([avatarCell, emptyCell, logoCell]);
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
