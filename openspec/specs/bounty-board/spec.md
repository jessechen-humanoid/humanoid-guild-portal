# bounty-board Specification

## Purpose

TBD - created by archiving change 'bounty-board'. Update Purpose after archive.

## Requirements

### Requirement: Bounty board tab page

The system SHALL display a "懸賞任務" tab content section containing a commission input area at the top and a bounty card list below it. The section SHALL include an 8-bit pixel art cheering villager animation matching the style and size of existing pixel characters (priest, mage, warrior).

#### Scenario: User views the bounty board tab

- **WHEN** the user switches to the "懸賞任務" tab
- **THEN** the bounty board content SHALL be visible with the commission input area at the top and the bounty card list below


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
### Requirement: Commission input

Logged-in users SHALL be able to type a work problem description and submit it by clicking the "勇者大人幫幫我" button. The system SHALL record the current date, the user's display name (extracted from email, e.g., `jesse.chen@humanoid.com.tw` becomes `jesse chen`), and the task description.

#### Scenario: User submits a new bounty

- **WHEN** a logged-in user enters a task description and clicks "勇者大人幫幫我"
- **THEN** the system SHALL write a new row to the Google Sheet "懸賞" worksheet with the current date, the user's display name, the task description, +1 count of 0, empty +1 list, empty challenger, empty status, empty completion date, and 0 days spent
- **AND** the new bounty card SHALL appear in the card list immediately

#### Scenario: Empty submission prevented

- **WHEN** a user clicks "勇者大人幫幫我" without entering any text
- **THEN** the system SHALL NOT submit and SHALL indicate that input is required


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
### Requirement: Bounty card display

Each bounty card SHALL display: the task description, the commissioner's name, how many days ago it was commissioned (relative to today), the +1 count, and the challenger name (if any).

#### Scenario: Card shows all required information

- **WHEN** a bounty exists with commissioner "jesse chen", created 3 days ago, with +1 count of 5, and challenger "alice wang"
- **THEN** the card SHALL display the task description, "jesse chen", "3 天前", "+5", and "挑戰勇者：alice wang"

#### Scenario: Card with no challenger

- **WHEN** a bounty has no challenger assigned
- **THEN** the card SHALL NOT display any challenger information and SHALL show the "我想挑戰" button as available


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
### Requirement: Plus-one voting

Each logged-in user SHALL be able to vote +1 on any bounty card exactly once. The +1 button SHALL visually indicate whether the current user has already voted. The +1 count SHALL reflect the total number of unique voters.

#### Scenario: User votes +1 on a bounty

- **WHEN** a logged-in user clicks the +1 button on a bounty they have not voted on
- **THEN** the system SHALL append the user's email to the +1 list in Google Sheet, increment the +1 count by 1, and update the button to show the voted state with a distinct color

#### Scenario: User has already voted

- **WHEN** a logged-in user views a bounty they have already voted +1 on
- **THEN** the +1 button SHALL display in a distinct color indicating the vote is already cast and SHALL NOT be clickable again


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
### Requirement: Challenge claim

Each bounty card SHALL have a "我想挑戰" button. Only one user SHALL be able to claim a bounty at a time. The claimant SHALL be able to unclaim by clicking again.

#### Scenario: User claims a bounty

- **WHEN** a logged-in user clicks "我想挑戰" on an unclaimed bounty
- **THEN** the system SHALL write the user's email to the challenger field in Google Sheet, the card SHALL display "挑戰勇者：{display name}", and the "我想挑戰" button SHALL become unavailable to other users

#### Scenario: Claimant unclaims a bounty

- **WHEN** the current challenger clicks the challenge button again on their claimed bounty
- **THEN** the system SHALL clear the challenger field in Google Sheet and the bounty SHALL become available for others to claim

#### Scenario: Other users cannot claim an already-claimed bounty

- **WHEN** a logged-in user views a bounty that is already claimed by another user
- **THEN** the "我想挑戰" button SHALL be disabled or hidden for that user


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
### Requirement: Task completion

The challenger of a bounty SHALL be able to mark it as complete by clicking a "完成任務" button. Only the current challenger SHALL see this button.

#### Scenario: Challenger completes a bounty

- **WHEN** the current challenger clicks "完成任務" on their claimed bounty
- **THEN** the system SHALL set the status to "done", record the completion date, calculate the days spent (completion date minus commission date), and update all fields in Google Sheet

#### Scenario: Non-challengers cannot complete

- **WHEN** a user who is not the current challenger views a claimed bounty
- **THEN** the "完成任務" button SHALL NOT be visible to that user


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
### Requirement: Card sorting and layout

Bounty cards SHALL be divided into two sections: active bounties at the top and completed bounties at the bottom in a "完成任務" area with a distinct background color.

#### Scenario: Active bounty sorting

- **WHEN** multiple active bounties exist
- **THEN** they SHALL be sorted by +1 count descending first, then by commission date ascending (earlier commissions first) for ties

#### Scenario: Completed bounty sorting

- **WHEN** multiple completed bounties exist
- **THEN** they SHALL be sorted by completion date descending (most recently completed first)

#### Scenario: Completed card appearance

- **WHEN** a bounty is marked as complete
- **THEN** the card SHALL move to the "完成任務" section at the bottom, display a different background color, show "任務完成" label, the completion date, and the number of days it took to complete

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