/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate tab headers and content panels
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.querySelectorAll('a[role="tab"]')) : [];
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.querySelectorAll('.w-tab-pane')) : [];

  // Defensive: Only proceed if we have matching tabs and panes
  if (!tabLinks.length || !tabPanes.length || tabLinks.length !== tabPanes.length) {
    return;
  }

  // Build header row
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // For each tab, extract label and content
  tabLinks.forEach((tabLink, i) => {
    // Tab label: Use textContent of the inner div if present, else fallback to anchor text
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    label = labelDiv ? labelDiv.textContent.trim() : tabLink.textContent.trim();
    // Tab content: Use the entire tab pane's content (preserve structure)
    const pane = tabPanes[i];
    // Defensive: If pane has a grid, use the grid div, else use pane itself
    let contentElem = pane.querySelector('.w-layout-grid') || pane;
    rows.push([label, contentElem]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
