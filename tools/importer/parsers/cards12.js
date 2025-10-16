/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block: 2 columns, multiple rows, first row is header
  const headerRow = ['Cards (cards12)'];

  // Find all card anchor elements (each card is an <a> with class 'utility-link-content-block')
  const cardLinks = Array.from(element.querySelectorAll('a.utility-link-content-block'));

  const rows = [headerRow];

  cardLinks.forEach(card => {
    // Image: first child div contains the image
    const imageContainer = card.querySelector('.utility-aspect-2x3');
    const img = imageContainer ? imageContainer.querySelector('img') : null;

    // Text content: tag, date, title
    const tagDateContainer = card.querySelector('.flex-horizontal');
    let textContentFrag = document.createDocumentFragment();
    if (tagDateContainer) {
      // Tag and date side by side
      const tag = tagDateContainer.querySelector('.tag');
      const date = tagDateContainer.querySelector('.paragraph-sm');
      if (tag) {
        // Keep tag styling if needed, else just append text
        textContentFrag.appendChild(tag.cloneNode(true));
        textContentFrag.appendChild(document.createTextNode(' '));
      }
      if (date) {
        textContentFrag.appendChild(date.cloneNode(true));
      }
    }
    // Title (h3)
    const title = card.querySelector('h3');
    if (title) {
      // Use heading element for semantic meaning
      textContentFrag.appendChild(document.createElement('br'));
      textContentFrag.appendChild(title.cloneNode(true));
    }

    // Compose the row: [image, text content]
    rows.push([
      img || '',
      textContentFrag
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
