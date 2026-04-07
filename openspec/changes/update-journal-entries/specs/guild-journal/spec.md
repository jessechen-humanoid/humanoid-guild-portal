## ADDED Requirements

### Requirement: McD Handbook guide journal card

The 公會日誌 tab SHALL display a journal card for the McD Handbook guide with the following attributes:
- Badge text: "指南"
- Title: "McD Handbook 使用指南"
- Description: "麥當勞客戶工作助手，涵蓋查資料、操作任務、創意產出"
- Date: "2026-04-07"
- Link target: `公會日誌/mcd-handbook-guide.html`

#### Scenario: McD Handbook card is displayed

- **WHEN** the user views the 公會日誌 tab
- **THEN** a journal card with title "McD Handbook 使用指南" and badge "指南" SHALL be visible in the journal grid

#### Scenario: User clicks McD Handbook card

- **WHEN** the user clicks the "McD Handbook 使用指南" journal card
- **THEN** the file `公會日誌/mcd-handbook-guide.html` SHALL open in a new browser tab

## MODIFIED Requirements

### Requirement: Journal card click behavior

Clicking a journal card SHALL open the corresponding HTML file in a new browser tab.

#### Scenario: User clicks 顧問報告分析流程 card

- **WHEN** the user clicks the "顧問報告分析流程" journal card
- **THEN** the file `公會日誌/顧問報告溝通流程簡報.html` SHALL open in a new browser tab

### Requirement: Journal card visual style

Journal cards SHALL reuse the existing `.tool-card` design (white background, border, hover animation) with a badge indicating content type (e.g., "指南") and a date display.

#### Scenario: Journal card hover effect

- **WHEN** the user hovers over a journal card
- **THEN** the card SHALL display the same hover animation as existing tool cards (translateY and border color change)

## MODIFIED Requirements

### Requirement: Guild journal card list

The 公會日誌 tab content SHALL display a grid of journal cards. Each card SHALL contain a title, a brief description, a badge, and a date. The existing "顧問報告溝通流程" card SHALL be renamed to "顧問報告分析流程" and its badge SHALL be changed from "簡報" to "指南".

#### Scenario: Journal tab displays cards

- **WHEN** the user views the 公會日誌 tab
- **THEN** the page SHALL display journal cards in a grid layout consistent with the existing tool-grid styling
- **AND** the card formerly titled "顧問報告溝通流程" SHALL now display "顧問報告分析流程" with badge "指南"
