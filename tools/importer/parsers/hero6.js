/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the target block name as the header row
  const headerRow = ['Hero (hero6)'];

  // Find the main grid columns (direct children)
  const gridDivs = element.querySelectorAll(':scope > div');

  // 1. Background image (first grid column)
  let bgImg = '';
  if (gridDivs.length > 0) {
    const img = gridDivs[0].querySelector('img');
    if (img) {
      bgImg = img.cloneNode(true);
    }
  }

  // 2. Content (second grid column)
  let contentCell = '';
  if (gridDivs.length > 1) {
    const card = gridDivs[1].querySelector('.card');
    if (card) {
      // Compose a single wrapper div for all content
      const wrapper = document.createElement('div');
      // Copy ALL text content from the card, including text nodes and elements
      Array.from(card.childNodes).forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          wrapper.appendChild(node.cloneNode(true));
        } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          const span = document.createElement('span');
          span.textContent = node.textContent;
          wrapper.appendChild(span);
        }
      });
      // If wrapper has content, use it
      if (wrapper.childNodes.length) {
        contentCell = wrapper;
      }
    }
  }

  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell ? contentCell : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
