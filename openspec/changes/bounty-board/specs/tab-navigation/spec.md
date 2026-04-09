## MODIFIED Requirements

### Requirement: Tab navigation bar

The page SHALL display a horizontal tab navigation bar below the site header with exactly three tabs: "冒險者公會", "公會日誌", and "懸賞任務".

#### Scenario: Page loads with default tab selected

- **WHEN** a user navigates to the portal page
- **THEN** the tab navigation bar SHALL be visible below the header with three tabs, and the "冒險者公會" tab SHALL be selected by default

---

### Requirement: Tab switching behavior

Clicking a tab SHALL display the corresponding content section and hide all other tab content sections. The active tab SHALL have a distinct visual indicator.

#### Scenario: User switches to 公會日誌 tab

- **WHEN** the user clicks the "公會日誌" tab
- **THEN** the guild journal content SHALL be visible AND the guild tools content and bounty board content SHALL be hidden AND the "公會日誌" tab SHALL show as active

#### Scenario: User switches back to 冒險者公會 tab

- **WHEN** the user clicks the "冒險者公會" tab while viewing another tab
- **THEN** the guild tools content SHALL be visible AND the guild journal content and bounty board content SHALL be hidden AND the "冒險者公會" tab SHALL show as active

#### Scenario: User switches to 懸賞任務 tab

- **WHEN** the user clicks the "懸賞任務" tab
- **THEN** the bounty board content SHALL be visible AND the guild tools content and guild journal content SHALL be hidden AND the "懸賞任務" tab SHALL show as active
