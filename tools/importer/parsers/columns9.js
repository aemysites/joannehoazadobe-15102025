/* global WebImporter */
export default function parse(element, { document }) {
  // Get grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Find text column (first div)
  const textCol = children.find((el) => el.tagName === 'DIV');
  // Find contact list (ul)
  const contactList = children.find((el) => el.tagName === 'UL');
  // Find main image (img)
  const mainImg = children.find((el) => el.tagName === 'IMG');

  // --- Left Column: Text ---
  let leftColContent = [];
  if (textCol) {
    const eyebrow = textCol.querySelector('h2');
    const heading = textCol.querySelector('h3');
    const subheading = textCol.querySelector('p');
    if (eyebrow) leftColContent.push(eyebrow.cloneNode(true));
    if (heading) leftColContent.push(heading.cloneNode(true));
    if (subheading) leftColContent.push(subheading.cloneNode(true));
  }

  // --- Right Column: Contact Info ---
  let rightColContent = document.createElement('ul');
  rightColContent.style.listStyle = 'none';
  rightColContent.style.padding = '0';
  if (contactList) {
    const items = Array.from(contactList.children);
    items.forEach((li) => {
      const icon = li.querySelector('.icon-container');
      const heading = li.querySelector('h4');
      let detail = li.querySelector('a, div.utility-display-block, div:not(.icon-container):not([class*=heading])');
      if (detail === heading) detail = null;
      // Compose contact item as a <li>
      const contactLi = document.createElement('li');
      if (icon) contactLi.appendChild(icon.cloneNode(true));
      if (heading) contactLi.appendChild(heading.cloneNode(true));
      if (detail) contactLi.appendChild(detail.cloneNode(true));
      rightColContent.appendChild(contactLi);
    });
  }

  // --- Table Construction ---
  const headerRow = ['Columns block (columns9)'];
  const secondRow = [leftColContent, rightColContent];
  // Image row: two columns, image in first, second is empty
  const imageRow = [mainImg ? mainImg.cloneNode(true) : '', ''];

  const cells = [
    headerRow,
    secondRow,
    imageRow
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
