# tab-navigation Specification

## Purpose

TBD - created by archiving change 'guild-journal-tab'. Update Purpose after archive.

## Requirements

### Requirement: Tab navigation bar

The page SHALL display a horizontal tab navigation bar below the site header with exactly three tabs: "冒險者公會", "公會日誌", and "懸賞任務".

#### Scenario: Page loads with default tab selected

- **WHEN** a user navigates to the portal page
- **THEN** the tab navigation bar SHALL be visible below the header with three tabs, and the "冒險者公會" tab SHALL be selected by default


<!-- @trace
source: bounty-board
updated: 2026-04-09
code:
  - .DS_Store
  - assets/villager.svg
  - google-auth-setup.skill
  - 8bit-pixel-art.skill.md
  - script.js
  - apps-script-cms.js
  - index.html
  - Journal/.DS_Store
  - CLAUDE.md
  - style.css
-->

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


<!-- @trace
source: bounty-board
updated: 2026-04-09
code:
  - .DS_Store
  - assets/villager.svg
  - google-auth-setup.skill
  - 8bit-pixel-art.skill.md
  - script.js
  - apps-script-cms.js
  - index.html
  - Journal/.DS_Store
  - CLAUDE.md
  - style.css
-->

---
### Requirement: Tab navigation styling

The tab navigation bar SHALL follow the existing MUJI-inspired design system: off-white background (`#fafaf8`), dark text (`#1a1a1a`), and Geist font family.

#### Scenario: Tab bar visual consistency

- **WHEN** the page is rendered
- **THEN** the tab bar SHALL use the same color palette and font as the rest of the site

<!-- @trace
source: guild-journal-tab
updated: 2026-04-02
code:
  - Skills MD/mcd-handbook.md
  - Skills MD/contract-builder.md
  - Skills MD/kol-check.md
  - Skills MD/skill-creator.md
  - Skills MD/ai-ops.md
  - script.js
  - 公會日誌/.DS_Store
  - Skills MD/zyyr-design-system.md
  - 公會日誌/顧問報告溝通流程簡報.html
  - index.html
  - Skills MD/pptx.md
  - Skills MD/company-elder.md
  - Skills MD/xlsx.md
  - Skills MD/consulting-report-flow.md
  - Skills MD/pdf.md
  - Skills MD/.DS_Store
  - Skills MD/schedule.md
  - .DS_Store
  - Skills MD/transcript-proofreader.md
  - Skills MD/skill-builder.md
  - style.css
  - Skills MD/docx.md
-->