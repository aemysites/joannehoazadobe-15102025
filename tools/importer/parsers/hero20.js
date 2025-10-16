/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero20)'];

  // --- Extract image collage for background ---
  // The images are inside the first .grid-layout.desktop-3-column
  let backgroundImagesContainer = null;
  const gridLayouts = element.querySelectorAll('.grid-layout.desktop-3-column');
  if (gridLayouts.length) {
    backgroundImagesContainer = gridLayouts[0];
  }

  // Defensive: collect all image elements in the collage
  let collageImages = [];
  if (backgroundImagesContainer) {
    collageImages = Array.from(backgroundImagesContainer.querySelectorAll('img'));
  }

  // Place all collage images in a div for the background cell
  const collageDiv = document.createElement('div');
  collageImages.forEach(img => collageDiv.appendChild(img));

  // --- Extract hero content: heading, subheading, CTAs ---
  // The content is inside .ix-hero-scale-3x-to-1x-content
  const heroContent = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  let contentElements = [];
  if (heroContent) {
    // Heading
    const heading = heroContent.querySelector('h1');
    if (heading) contentElements.push(heading);
    // Subheading
    const subheading = heroContent.querySelector('p');
    if (subheading) contentElements.push(subheading);
    // CTA buttons (all anchors inside .button-group)
    const buttonGroup = heroContent.querySelector('.button-group');
    if (buttonGroup) {
      const ctas = Array.from(buttonGroup.querySelectorAll('a'));
      if (ctas.length) {
        // Wrap CTAs in a div to keep layout
        const ctaDiv = document.createElement('div');
        ctas.forEach(a => ctaDiv.appendChild(a));
        contentElements.push(ctaDiv);
      }
    }
  }

  // --- Compose table rows ---
  const tableRows = [
    headerRow,
    [collageDiv],
    [contentElements]
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
