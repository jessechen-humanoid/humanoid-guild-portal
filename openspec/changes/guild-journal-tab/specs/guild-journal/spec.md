## ADDED Requirements

### Requirement: Guild journal card list

The 公會日誌 tab content SHALL display a grid of journal cards. Each card SHALL contain a title, a brief description, and a date.

#### Scenario: Journal tab displays cards

- **WHEN** the user views the 公會日誌 tab
- **THEN** the page SHALL display one or more journal cards in a grid layout consistent with the existing tool-grid styling

### Requirement: Journal card click behavior

Clicking a journal card SHALL open the corresponding HTML presentation file in a new browser tab.

#### Scenario: User clicks 顧問報告溝通流程 card

- **WHEN** the user clicks the "顧問報告溝通流程" journal card
- **THEN** the file `公會日誌/顧問報告溝通流程簡報.html` SHALL open in a new browser tab

### Requirement: Journal card visual style

Journal cards SHALL reuse the existing `.tool-card` design (white background, border, hover animation) with a badge indicating content type (e.g., "簡報") and a date display.

#### Scenario: Journal card hover effect

- **WHEN** the user hovers over a journal card
- **THEN** the card SHALL display the same hover animation as existing tool cards (translateY and border color change)
