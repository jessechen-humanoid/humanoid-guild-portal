## MODIFIED Requirements

### Requirement: Tool card display

Each tool card SHALL display the tool name, description, and associated pixel character. Buttons on tool cards SHALL use pixel-style borders with square corners (`border-radius: 0`), no shadow, no gradient, and MUJI color palette only. Pixel characters on tool cards (priest, mage, warrior) SHALL be redrawn in cute big-head style matching "8bit reference/Snipaste_2026-04-10_07-26-40.png".

#### Scenario: Tool card with pixel character

- **WHEN** a tool card is rendered with an associated character
- **THEN** the character SVG SHALL use the cute big-head pixel art style with 16x16 viewBox and single-color `#1a1a1a` fill
