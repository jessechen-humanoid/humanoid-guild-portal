## ADDED Requirements

### Requirement: Tab navigation bar

The page SHALL display a horizontal tab navigation bar below the site header with exactly two tabs: "冒險者公會" and "公會日誌".

#### Scenario: Page loads with default tab selected

- **WHEN** a user navigates to the portal page
- **THEN** the tab navigation bar SHALL be visible below the header, and the "冒險者公會" tab SHALL be selected by default

### Requirement: Tab switching behavior

Clicking a tab SHALL display the corresponding content section and hide all other tab content sections. The active tab SHALL have a distinct visual indicator.

#### Scenario: User switches to 公會日誌 tab

- **WHEN** the user clicks the "公會日誌" tab
- **THEN** the guild journal content SHALL be visible AND the guild tools content SHALL be hidden AND the "公會日誌" tab SHALL show as active

#### Scenario: User switches back to 冒險者公會 tab

- **WHEN** the user clicks the "冒險者公會" tab while viewing 公會日誌
- **THEN** the guild tools content SHALL be visible AND the guild journal content SHALL be hidden AND the "冒險者公會" tab SHALL show as active

### Requirement: Tab navigation styling

The tab navigation bar SHALL follow the existing MUJI-inspired design system: off-white background (`#fafaf8`), dark text (`#1a1a1a`), and Geist font family.

#### Scenario: Tab bar visual consistency

- **WHEN** the page is rendered
- **THEN** the tab bar SHALL use the same color palette and font as the rest of the site
