/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel (carousel13) block parser
  const headerRow = ['Carousel (carousel13)'];

  // Find the main grid containing the carousel content
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  if (!grid) return;

  // Find the bakery tarts image (background, prominent visual)
  const bakeryImg = element.querySelector('.grid-layout.desktop-1-column img.cover-image');

  // Find the concert crowd image (the prominent image in the overlay card)
  const concertImg = grid.querySelector('img.image.cover-image');

  // Gather all text content from the overlay card (heading, bullets, button)
  let textCellContent = [];
  const textCol = grid.querySelector('h2')?.closest('div');
  if (textCol) {
    // Heading
    const heading = textCol.querySelector('h2');
    if (heading) textCellContent.push(heading.cloneNode(true));

    // Bullets as <ul>
    const bullets = Array.from(textCol.querySelectorAll('.flex-horizontal'));
    if (bullets.length > 0) {
      const ul = document.createElement('ul');
      bullets.forEach((bullet) => {
        const icon = bullet.querySelector('.icon-small img');
        const text = bullet.querySelector('p');
        if (icon && text) {
          const li = document.createElement('li');
          li.appendChild(icon.cloneNode(true));
          li.appendChild(text.cloneNode(true));
          ul.appendChild(li);
        }
      });
      if (ul.children.length > 0) textCellContent.push(ul);
    }

    // CTA button (if present)
    const cta = textCol.querySelector('.button-group a');
    if (cta) textCellContent.push(cta.cloneNode(true));
  }

  // Build two slides: one for bakery image (no text), one for concert image + text
  const rows = [
    headerRow,
    bakeryImg ? [bakeryImg.cloneNode(true), ''] : null,
    concertImg ? [concertImg.cloneNode(true), textCellContent.length > 0 ? textCellContent : ''] : null
  ].filter(Boolean);

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
