/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row (must match block name exactly)
  const headerRow = ['Hero (hero29)'];

  // Find the grid layout containing image and content
  const grid = element.querySelector('.w-layout-grid');
  let imageCell = '';
  let contentCell = '';

  if (grid) {
    // --- IMAGE CELL ---
    // The first child of grid contains the image
    const imageWrapper = grid.children[0];
    if (imageWrapper) {
      // Only reference the actual <img> element
      const img = imageWrapper.querySelector('img');
      if (img) {
        imageCell = img; // Reference the element, do not clone
      }
    }

    // --- CONTENT CELL ---
    // The second child of grid contains the text content
    const contentWrapper = grid.children[1];
    if (contentWrapper) {
      // The heading is inside .utility-margin-bottom-6rem
      const contentInner = contentWrapper.querySelector('.utility-margin-bottom-6rem');
      if (contentInner) {
        // Only include non-empty elements, preserve semantic structure
        // Get all direct children (h1, button group, etc)
        const contentEls = Array.from(contentInner.childNodes).filter((el) => {
          if (el.nodeType === 1) {
            // Element node: only include if not empty
            return el.textContent.trim() || el.querySelector('*');
          } else if (el.nodeType === 3) {
            // Text node: only include if not whitespace
            return el.textContent.trim();
          }
          return false;
        });
        // If only one element (the h1), just use it. Otherwise, use all.
        if (contentEls.length === 1) {
          contentCell = contentEls[0];
        } else if (contentEls.length > 1) {
          // Wrap multiple elements in a <div> to preserve structure
          const wrapper = document.createElement('div');
          contentEls.forEach(el => wrapper.appendChild(el));
          contentCell = wrapper;
        }
      }
    }
  }

  // Build the table rows
  const rows = [
    headerRow,
    [imageCell || ''],
    [contentCell || ''],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
