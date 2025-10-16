/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero24) block parsing
  // 1. Header row
  const headerRow = ['Hero (hero24)'];

  // 2. Extract image (background visual)
  const img = element.querySelector('img');
  const imageRow = [img ? img : ''];

  // 3. Extract text content (heading, subheading, CTA)
  const cardBody = element.querySelector('.card-body');
  let textContent = [];
  if (cardBody) {
    const heading = cardBody.querySelector('.h4-heading');
    if (heading) textContent.push(heading);
    // No subheading or CTA present in this HTML
  }
  const contentRow = [textContent.length ? textContent : ''];

  // 4. Assemble table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace element
  element.replaceWith(table);
}
