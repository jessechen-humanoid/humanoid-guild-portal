# guild-portal Specification

## Purpose

TBD - created by archiving change 'adventurer-guild-portal'. Update Purpose after archive.

## Requirements

### Requirement: Guild portal page structure

The portal page SHALL display a header with the title "只要有人冒險者公會" and organize all tools into three guild sections: Operations Guild (營運公會), Creative Guild (創意公會), and Business Guild (業務公會).

#### Scenario: Page loads with all three guilds visible

- **WHEN** a user navigates to the portal page
- **THEN** the page SHALL display the header title "只要有人冒險者公會" and three guild sections in order: Operations Guild, Creative Guild, Business Guild

---
### Requirement: Guild visual identity with 8-bit pixel art

Each guild section SHALL display a single-color black (`#1a1a1a`) 8-bit pixel art animated character representing the guild's RPG class: Priest (牧師) for Operations, Mage (魔法使) for Creative, and Warrior (戰士) for Business.

#### Scenario: Guild sections display animated pixel art characters

- **WHEN** the page is rendered
- **THEN** each guild section SHALL show its corresponding 8-bit pixel art character with idle animation, rendered in single-color black (#1a1a1a)

---
### Requirement: Operations Guild tools

The Operations Guild (營運公會) SHALL contain the following tools:
- [Web] 只要工時 — links to https://working-hour.vercel.app/analytics
- [Skill] ai-ops — links to Google Drive download
- [Skill] company-elder — links to Google Drive download
- [Skill] skill-builder — links to Google Drive download

#### Scenario: Operations Guild displays all assigned tools

- **WHEN** the page is rendered
- **THEN** the Operations Guild section SHALL display exactly four tool cards: 只要工時, ai-ops, company-elder, and skill-builder

---
### Requirement: Creative Guild tools

The Creative Guild (創意公會) SHALL contain the following tools:
- [Web] 只要輿情 — links to https://humanoid-social-listening.zeabur.app/
- [Skill] mcd-publish — links to Google Drive download

#### Scenario: Creative Guild displays all assigned tools

- **WHEN** the page is rendered
- **THEN** the Creative Guild section SHALL display exactly two tool cards: 只要輿情 and mcd-publish

---
### Requirement: Business Guild tools

The Business Guild (業務公會) SHALL contain the following tools:
- [Web] 只要截圖 — links to https://humanoid-post-screenshot.zeabur.app/
- [Skill] mcd-handbook — links to Google Drive download
- [Skill] contract-builder — links to Google Drive download

#### Scenario: Business Guild displays all assigned tools

- **WHEN** the page is rendered
- **THEN** the Business Guild section SHALL display exactly three tool cards: 只要截圖, mcd-handbook, and contract-builder

---
### Requirement: Web tool card behavior

Tool cards of type [Web] SHALL open the corresponding URL in a new browser tab when clicked.

#### Scenario: User clicks a Web tool card

- **WHEN** a user clicks on a [Web] tool card (e.g., 只要工時)
- **THEN** the corresponding URL SHALL open in a new browser tab

---
### Requirement: Skill tool card behavior

Tool cards of type [Skill] SHALL navigate to the corresponding Google Drive download link when clicked.

#### Scenario: User clicks a Skill tool card

- **WHEN** a user clicks on a [Skill] tool card (e.g., ai-ops)
- **THEN** the browser SHALL navigate to the Google Drive download page for that skill's installation file

---
### Requirement: MUJI-inspired visual design

The page SHALL follow the MUJI-inspired design system: warm off-white background (`#fafaf8`), white card backgrounds with `#e8e8e5` borders, Geist Sans font family, no box shadows, and generous whitespace. All 8-bit pixel art elements SHALL be single-color black (`#1a1a1a`).

#### Scenario: Page renders with correct design tokens

- **WHEN** the page is rendered
- **THEN** the page background SHALL be `#fafaf8`, cards SHALL have white backgrounds with `#e8e8e5` borders and large border radius, and text SHALL use the Geist Sans font family

---
### Requirement: Responsive layout

The page SHALL be responsive and usable on both desktop and mobile devices. Tool cards SHALL reflow from multi-column grid on desktop to single-column on mobile.

#### Scenario: Page viewed on mobile viewport

- **WHEN** the page is viewed on a viewport narrower than 768px
- **THEN** tool cards SHALL stack in a single column and all content SHALL remain readable without horizontal scrolling
