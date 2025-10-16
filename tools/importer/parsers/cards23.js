/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards23) block parsing
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  const rows = [];
  rows.push(['Cards (cards23)']);

  function parseCard(cardEl) {
    const img = cardEl.querySelector('img');
    const title = cardEl.querySelector('h3, h4, .h4-heading');
    const desc = cardEl.querySelector('.paragraph-sm');
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);
    // Wrap textCell content with the anchor to preserve clickability
    const link = cardEl.cloneNode(false); // shallow clone <a>
    link.innerHTML = '';
    if (title) link.appendChild(title.cloneNode(true));
    if (desc) link.appendChild(desc.cloneNode(true));
    // Always return two columns: image (or empty), text (with anchor)
    return [img ? img.cloneNode(true) : '', link];
  }

  tabPanes.forEach(tabPane => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    const cardEls = grid.querySelectorAll('a');
    cardEls.forEach(cardEl => {
      rows.push(parseCard(cardEl));
    });
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
