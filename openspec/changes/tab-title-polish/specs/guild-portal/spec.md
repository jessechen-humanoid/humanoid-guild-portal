## MODIFIED Requirements

### Requirement: Guild portal page structure

The portal page header SHALL display the pixel art title image (`Title.png`) at a maximum width of 420px on desktop viewports. On viewports narrower than 768px, the title image SHALL scale to a maximum width of 300px. The image SHALL remain centered horizontally.

#### Scenario: Title image displays at larger size

- **WHEN** a user navigates to the portal page on a desktop viewport
- **THEN** the title image SHALL render with a maximum width of 420px (previously 320px), centered within the header

#### Scenario: Title image scales on mobile

- **WHEN** the page is viewed on a viewport narrower than 768px
- **THEN** the title image SHALL render with a maximum width of 300px (previously 240px), centered within the header
