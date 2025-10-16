/* global WebImporter */
export default function parse(element, { document }) {
  // --- HEADER ROW ---
  const headerRow = ['Hero (hero25)'];

  // --- ROW 2: Background Image or Video Embed ---
  let mediaCell = '';
  // Find the video embed container
  const embedDiv = element.querySelector('.w-embed-youtubevideo');
  if (embedDiv) {
    const cellContent = [];
    // Use the actual <img> element if present (for placeholder)
    const img = embedDiv.querySelector('img');
    if (img) cellContent.push(img);
    // If there's an iframe, convert it to a link
    const iframe = embedDiv.querySelector('iframe');
    if (iframe && iframe.src) {
      const a = document.createElement('a');
      a.href = iframe.src;
      a.textContent = 'Watch video';
      cellContent.push(a);
    }
    mediaCell = cellContent;
  }

  // --- ROW 3: Headline, Subheading, CTA ---
  let headline = '';
  let subheading = '';
  let ctas = [];

  // Headline: Use the visually prominent headline, not the screen-reader-only one
  // Find the div with class 'h1-heading' (main visible headline)
  const headingDiv = element.querySelector('.h1-heading');
  if (headingDiv) {
    headline = headingDiv;
  }

  // Subheading: look for <p> with class 'subheading' or first <p>
  const subheadingP = element.querySelector('p.subheading') || element.querySelector('p');
  if (subheadingP) subheading = subheadingP;

  // CTA: anchor tags inside button group
  const buttonGroup = element.querySelector('.button-group');
  if (buttonGroup) {
    ctas = Array.from(buttonGroup.querySelectorAll('a'));
  }

  // Compose the third row cell
  const row3Cell = [];
  if (headline) row3Cell.push(headline);
  if (subheading) row3Cell.push(subheading);
  if (ctas.length) row3Cell.push(...ctas);

  // --- TABLE ASSEMBLY ---
  const cells = [
    headerRow,
    [mediaCell],
    [row3Cell]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
