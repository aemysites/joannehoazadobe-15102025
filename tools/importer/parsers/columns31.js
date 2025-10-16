/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // Defensive: Expecting at least 3 columns (author, tags, heading/richtext)
  // Column 1: Author name
  const authorCol = columns[0];
  // Column 2: Tags (vertical stack)
  const tagsCol = columns[1];
  // Column 3: Heading and rich text
  const headingCol = columns[2];

  // --- LEFT COLUMN (author + tags) ---
  const leftColContent = document.createElement('div');
  // Author name
  if (authorCol && authorCol.textContent.trim()) {
    const authorDiv = document.createElement('div');
    authorDiv.textContent = authorCol.textContent.trim();
    leftColContent.appendChild(authorDiv);
  }
  // Tags
  if (tagsCol && tagsCol.classList.contains('flex-vertical')) {
    const tagDivs = tagsCol.querySelectorAll('.tag');
    if (tagDivs.length) {
      const tagsList = document.createElement('ul');
      tagDivs.forEach(tag => {
        const li = document.createElement('li');
        li.textContent = tag.textContent.trim();
        tagsList.appendChild(li);
      });
      leftColContent.appendChild(tagsList);
    }
  }

  // --- MIDDLE COLUMN (heading + rich text) ---
  const middleColContent = document.createElement('div');
  // Heading
  if (headingCol && headingCol.querySelector('h2')) {
    const h2 = headingCol.querySelector('h2');
    middleColContent.appendChild(h2);
  } else {
    // In some structures, heading may be a direct child of grid
    const h2 = element.querySelector('h2');
    if (h2) middleColContent.appendChild(h2);
  }
  // Rich text paragraphs
  let richTextDiv = headingCol && headingCol.querySelector('.rich-text');
  if (!richTextDiv) {
    richTextDiv = element.querySelector('.rich-text');
  }
  if (richTextDiv) {
    Array.from(richTextDiv.children).forEach(child => {
      middleColContent.appendChild(child.cloneNode(true));
    });
  }

  // --- RIGHT COLUMN (empty for layout fidelity) ---
  const rightColContent = document.createElement('div'); // Intentionally empty

  // Table header row
  const headerRow = ['Columns block (columns31)'];
  // Table content row: left, middle, right columns
  const contentRow = [leftColContent, middleColContent, rightColContent];

  // Create block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
