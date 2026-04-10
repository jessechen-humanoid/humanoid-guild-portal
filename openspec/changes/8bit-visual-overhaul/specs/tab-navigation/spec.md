## MODIFIED Requirements

### Requirement: Tab bar navigation

The tab bar SHALL display navigation buttons for switching between content sections. Tab buttons SHALL use pixel-style borders with square corners (`border-radius: 0`), no shadow, no gradient, and MUJI color palette. The active tab SHALL use `#1a1a1a` background with white text. Inactive tabs SHALL have `#e8e8e5` border with `#6b6b6b` text.

#### Scenario: Tab buttons pixel style

- **WHEN** the tab bar is rendered
- **THEN** all tab buttons SHALL have square corners and pixel-style flat borders matching the 8bit reference aesthetic
