/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) block: 2 columns, header row, each card is a row
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Select all card anchor elements (each card is an <a>)
  const cardSelector = 'a.card-link';
  const cards = element.querySelectorAll(cardSelector);

  cards.forEach(card => {
    // Image: first child div contains the image
    const imageDiv = card.querySelector('.utility-aspect-3x2');
    const img = imageDiv ? imageDiv.querySelector('img') : null;

    // Text content: second child div
    const textDiv = card.querySelector('.utility-padding-all-1rem');
    let textContent = [];

    if (textDiv) {
      // Tag (optional)
      const tagGroup = textDiv.querySelector('.tag-group');
      if (tagGroup) {
        const tag = tagGroup.querySelector('.tag');
        if (tag) {
          textContent.push(tag);
        }
      }
      // Heading (optional)
      const heading = textDiv.querySelector('h3, .h4-heading');
      if (heading) {
        textContent.push(heading);
      }
      // Description (optional)
      const desc = textDiv.querySelector('p');
      if (desc) {
        textContent.push(desc);
      }
    }

    // Build row: [image, textContent]
    rows.push([
      img ? img : '',
      textContent.length ? textContent : ''
    ]);
  });

  // Create table and replace element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}