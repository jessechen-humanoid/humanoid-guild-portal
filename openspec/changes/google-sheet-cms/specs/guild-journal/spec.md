# guild-journal Specification Changes

## MODIFIED

### Requirement: Dynamic journal card rendering from Google Sheet

Journal cards SHALL be dynamically rendered from data fetched via the same Google Apps Script API used for tool cards. Each journal card SHALL display a title, description, badge, date, and adventurer name ("by {name}") in small text at the bottom-left corner.

#### Scenario: Journal tab displays dynamically loaded cards

- **WHEN** the user views the 公會日誌 tab
- **THEN** the page SHALL display journal cards rendered from Google Sheet data, sorted by date (newest first)

#### Scenario: Journal card displays adventurer name

- **WHEN** a journal card is rendered
- **THEN** the card SHALL display "by {冒險者}" in small, secondary-color text at the bottom-left corner

#### Scenario: Journal card links to HTML file

- **WHEN** a journal card is rendered with a file path (e.g., "公會日誌/mcd-handbook-guide.html")
- **THEN** clicking the card SHALL open that file path in a new browser tab
