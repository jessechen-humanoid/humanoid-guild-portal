## MODIFIED Requirements

### Requirement: Guild portal page structure

The portal page SHALL display a header with a pixel art title image (`Title.png`) centered horizontally, a tab navigation bar, and organize all tools into three guild sections: Operations Guild (營運公會), Creative Guild (創意公會), and Business Guild (業務公會) within the "冒險者公會" tab content area. The title image SHALL replace the previous text-based `<h1>` element and MUST maintain appropriate sizing and visual balance with surrounding elements.

#### Scenario: Page loads with pixel art title image

- **WHEN** a user navigates to the portal page
- **THEN** the header SHALL display `Title.png` as a centered `<img>` element instead of text, the tab navigation bar SHALL appear below the title, and three guild sections SHALL be visible in order: Operations Guild, Creative Guild, Business Guild

#### Scenario: Title image maintains responsive sizing

- **WHEN** the page is viewed on a viewport narrower than 768px
- **THEN** the title image SHALL scale proportionally and remain centered without overflowing the viewport

---

### Requirement: Guild visual identity with 8-bit pixel art

Each guild section SHALL display a pixel art character from the designer-provided SVG assets: `char4-priest.svg` for Operations Guild (營運公會), `char1-mage.svg` for Creative Guild (創意公會), and `char3-warrior.svg` for Business Guild (業務公會). The bounty board section SHALL use `char2-villager.svg`. All characters SHALL use `shape-rendering="crispEdges"` and `image-rendering: pixelated` for crisp pixel rendering.

#### Scenario: Guild sections display correct designer-provided characters

- **WHEN** the page is rendered
- **THEN** Operations Guild SHALL show `char4-priest.svg`, Creative Guild SHALL show `char1-mage.svg`, Business Guild SHALL show `char3-warrior.svg`, and the bounty board header SHALL show `char2-villager.svg`

#### Scenario: Characters render at appropriate display size

- **WHEN** characters are displayed on the page
- **THEN** each character SHALL render at a size visually consistent with the guild header layout (approximately 48-64px) with `image-rendering: pixelated` and `image-rendering: crisp-edges` CSS properties
