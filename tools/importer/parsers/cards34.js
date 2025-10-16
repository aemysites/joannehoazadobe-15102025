/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards34) block: 2 columns, multiple rows, each card = [image, text content]
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Find all card anchor elements (each card is an <a> with nested grid)
  const cardLinks = Array.from(element.querySelectorAll('a.utility-link-content-block'));

  cardLinks.forEach(card => {
    // Image: first img inside the card
    const img = card.querySelector('img');
    if (!img) return;

    // Extract text content in correct format
    const tag = card.querySelector('.tag > div')?.textContent?.trim();
    const time = card.querySelector('.paragraph-sm')?.textContent?.trim();
    const heading = card.querySelector('h3, .h4-heading')?.textContent?.trim();
    const description = card.querySelector('p')?.textContent?.trim();
    const ctaDiv = Array.from(card.querySelectorAll('div')).find(div => div.textContent.trim() === 'Read');
    let cta;
    if (ctaDiv) {
      // Use the anchor's href for CTA link
      cta = document.createElement('a');
      cta.href = card.getAttribute('href') || '#';
      cta.textContent = 'Read';
    }

    // Compose text cell as a fragment
    const frag = document.createDocumentFragment();
    if (tag || time) {
      const meta = document.createElement('div');
      if (tag) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tag;
        tagSpan.style.fontWeight = 'bold';
        meta.appendChild(tagSpan);
      }
      if (time) {
        const timeSpan = document.createElement('span');
        timeSpan.textContent = ' ' + time;
        meta.appendChild(timeSpan);
      }
      frag.appendChild(meta);
    }
    if (heading) {
      const h = document.createElement('strong');
      h.textContent = heading;
      frag.appendChild(h);
      frag.appendChild(document.createElement('br'));
    }
    if (description) {
      const desc = document.createElement('span');
      desc.textContent = description;
      frag.appendChild(desc);
      frag.appendChild(document.createElement('br'));
    }
    if (cta) {
      frag.appendChild(cta);
    }

    rows.push([img, frag]);
  });

  // Create block table and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
