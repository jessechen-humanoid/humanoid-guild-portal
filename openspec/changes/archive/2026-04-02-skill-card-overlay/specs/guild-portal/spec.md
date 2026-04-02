## MODIFIED Requirements

### Requirement: Skill tool card behavior

Tool cards of type [Skill] SHALL open an overlay panel displaying the skill's description when clicked, instead of navigating to an external URL.

#### Scenario: User clicks a Skill tool card

- **WHEN** a user clicks on a [Skill] tool card (e.g., 營運小幫手)
- **THEN** an overlay panel SHALL appear displaying the skill's description content AND the page SHALL NOT navigate to an external URL

### Requirement: Creative Guild tools

The Creative Guild (創意公會) SHALL contain the following tools:
- [Web] 只要輿情 — links to https://humanoid-social-listening.zeabur.app/
- [Skill] KOL 小幫手 — opens skill overlay
- [Skill] 顧問報告溝通流程 — opens skill overlay

#### Scenario: Creative Guild displays all assigned tools

- **WHEN** the page is rendered
- **THEN** the Creative Guild section SHALL display exactly three tool cards: 只要輿情, KOL 小幫手, and 顧問報告溝通流程

### Requirement: Business Guild tools

The Business Guild (業務公會) SHALL contain the following tools:
- [Web] 只要截圖 — links to https://humanoid-post-screenshot.zeabur.app/
- [Skill] 麥當勞手冊 — opens skill overlay
- [Skill] 合約小幫手 — opens skill overlay
- [Skill] 逐字稿校正助手 — opens skill overlay

#### Scenario: Business Guild displays all assigned tools

- **WHEN** the page is rendered
- **THEN** the Business Guild section SHALL display exactly four tool cards: 只要截圖, 麥當勞手冊, 合約小幫手, and 逐字稿校正助手
