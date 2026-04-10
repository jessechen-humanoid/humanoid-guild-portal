## MODIFIED Requirements

### Requirement: Tab navigation bar

The page SHALL display a horizontal tab navigation bar below the site header with exactly three tabs: "道具裝備", "冒險日誌", and "懸賞任務". The first tab was previously named "冒險者公會" and is now renamed to "道具裝備" for a more game-like feel. The tab renamed from "公會日誌" to "冒險日誌" remains unchanged in this change.

#### Scenario: Page loads with renamed tab

- **WHEN** a user navigates to the portal page
- **THEN** the first tab SHALL display the text "道具裝備" instead of the previous "公會工具"

## ADDED Requirements

### Requirement: Tab bar full-width layout

The tab navigation bar SHALL span the full width of the content area, with each tab button taking equal width (one-third). The left and right edges of the tab bar SHALL align with the left and right edges of the content sections below (the `.guilds` container).

#### Scenario: Tab buttons fill content width

- **WHEN** the page is rendered
- **THEN** the three tab buttons SHALL each occupy one-third of the available content width, and the tab bar's outer edges SHALL align with the card/section content boundaries below

#### Scenario: Tab buttons remain equal-width on narrow viewports

- **WHEN** the page is viewed on a viewport narrower than 768px
- **THEN** the three tab buttons SHALL still each occupy one-third of the available width and remain horizontally aligned
