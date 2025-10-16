/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row - must be exactly one string cell
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Find all accordion items (each w-dropdown)
  const accordionItems = element.querySelectorAll('.accordion.w-dropdown');

  accordionItems.forEach((item) => {
    // Title: clickable element with role="button"
    const toggle = item.querySelector('[role="button"]');
    let titleCell;
    if (toggle) {
      // Find the title text inside the toggle
      const titleDiv = toggle.querySelector('.paragraph-lg');
      if (titleDiv) {
        titleCell = titleDiv;
      } else {
        // Fallback: use the toggle itself
        titleCell = toggle;
      }
    } else {
      // Fallback: use first child text node
      titleCell = document.createTextNode('');
    }

    // Content: the accordion panel
    const contentNav = item.querySelector('.accordion-content');
    let contentCell;
    if (contentNav) {
      // Usually a div with rich-text inside
      const rich = contentNav.querySelector('.rich-text');
      if (rich) {
        contentCell = rich;
      } else {
        contentCell = contentNav;
      }
    } else {
      // Fallback: empty cell
      contentCell = document.createTextNode('');
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}
