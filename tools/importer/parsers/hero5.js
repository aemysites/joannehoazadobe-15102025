/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.w-layout-grid');
  let heroImg = null;
  let textSection = null;
  if (grid) {
    for (const child of grid.children) {
      if (child.tagName === 'IMG') heroImg = child;
      if (child.classList.contains('section')) textSection = child;
    }
  }
  if (!heroImg) heroImg = element.querySelector('img');

  // Compose the text cell: must include ALL text content as ELEMENTS in a flat array
  const textCellContent = [];
  if (textSection) {
    // Heading(s)
    const heading = textSection.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textCellContent.push(heading.cloneNode(true));
    // Paragraph(s)
    const richText = textSection.querySelector('.rich-text, .w-richtext');
    if (richText) {
      richText.querySelectorAll('p').forEach(p => textCellContent.push(p.cloneNode(true)));
    } else {
      textSection.querySelectorAll('p').forEach(p => textCellContent.push(p.cloneNode(true)));
    }
    // Button(s)
    const buttonGroup = textSection.querySelector('.button-group');
    if (buttonGroup) {
      buttonGroup.querySelectorAll('a').forEach(a => textCellContent.push(a.cloneNode(true)));
    }
  }

  // Table rows
  const headerRow = ['Hero (hero5)'];
  const imageRow = [heroImg ? heroImg.cloneNode(true) : ''];
  const contentRow = [textCellContent.length ? textCellContent : ''];

  // Create block table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
