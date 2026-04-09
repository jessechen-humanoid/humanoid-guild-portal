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

Logged-in users SHALL be able to type a work problem description and submit it by clicking the "勇者大人幫幫我" button. The system SHALL record the current date, the user's display name (extracted from email, e.g., `jesse.chen@humanoid.com.tw` becomes `jesse chen`), and the task description. Upon submission, the new bounty card SHALL appear in the card list immediately without waiting for the API response. The system SHALL POST to the API in the background and update the localStorage cache on success. If the POST fails, the system SHALL remove the optimistically added card and display a brief error indication.

#### Scenario: User submits a new bounty (optimistic)

- **WHEN** a logged-in user enters a task description and clicks "勇者大人幫幫我"
- **THEN** the new bounty card SHALL appear in the card list immediately with +1 count of 0 and no challenger
- **AND** the system SHALL POST to the API in the background
- **AND** on success, the system SHALL update the localStorage cache with the server-confirmed data
- **AND** on failure, the system SHALL remove the optimistically added card and show a brief error message

#### Scenario: Empty submission prevented

- **WHEN** a user clicks "勇者大人幫幫我" without entering any text
- **THEN** the system SHALL NOT submit and SHALL indicate that input is required


<!-- @trace
source: optimistic-ui
updated: 2026-04-09
code:
  - script.js
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

Each logged-in user SHALL be able to vote +1 on any bounty card exactly once. Upon clicking, the +1 count SHALL increment immediately and the button SHALL change to voted state without waiting for the API response. The system SHALL POST to the API in the background and update the localStorage cache on success. If the POST fails, the system SHALL revert the +1 count and button state.

#### Scenario: User votes +1 on a bounty (optimistic)

- **WHEN** a logged-in user clicks the +1 button on a bounty they have not voted on
- **THEN** the +1 count SHALL increment by 1 immediately and the button SHALL show the voted state
- **AND** the system SHALL POST to the API in the background
- **AND** on success, the system SHALL update the localStorage cache
- **AND** on failure, the system SHALL revert the +1 count and button state to pre-click values

#### Scenario: User has already voted

- **WHEN** a logged-in user views a bounty they have already voted +1 on
- **THEN** the +1 button SHALL display in a distinct color indicating the vote is already cast and SHALL NOT be clickable again


<!-- @trace
source: optimistic-ui
updated: 2026-04-09
code:
  - script.js
-->

---
### Requirement: Challenge claim

Each bounty card SHALL have a "我想挑戰" button. Only one user SHALL be able to claim a bounty at a time. Upon clicking, the challenger name SHALL appear immediately without waiting for the API response. The system SHALL POST to the API in the background. If the POST fails or returns already_claimed, the system SHALL revert the card to its previous state.

#### Scenario: User claims a bounty (optimistic)

- **WHEN** a logged-in user clicks "我想挑戰" on an unclaimed bounty
- **THEN** the card SHALL immediately display "挑戰勇者：{display name}" and disable the button for other users
- **AND** the system SHALL POST to the API in the background
- **AND** on failure, the system SHALL revert the card to unclaimed state

#### Scenario: Claimant unclaims a bounty (optimistic)

- **WHEN** the current challenger clicks the challenge button again on their claimed bounty
- **THEN** the card SHALL immediately revert to unclaimed state
- **AND** the system SHALL POST to the API in the background
- **AND** on failure, the system SHALL restore the challenger display

#### Scenario: Other users cannot claim an already-claimed bounty

- **WHEN** a logged-in user views a bounty that is already claimed by another user
- **THEN** the "我想挑戰" button SHALL be disabled or hidden for that user


<!-- @trace
source: optimistic-ui
updated: 2026-04-09
code:
  - script.js
-->

---
### Requirement: Task completion

The challenger of a bounty SHALL be able to mark it as complete by clicking a "完成任務" button. Upon clicking, the card SHALL immediately move to the completed section with the done appearance. The system SHALL POST to the API in the background. If the POST fails, the system SHALL move the card back to the active section.

#### Scenario: Challenger completes a bounty (optimistic)

- **WHEN** the current challenger clicks "完成任務" on their claimed bounty
- **THEN** the card SHALL immediately move to the "完成任務" section with a different background color, showing "任務完成", today's date, and calculated days spent
- **AND** the system SHALL POST to the API in the background
- **AND** on success, the system SHALL update the localStorage cache
- **AND** on failure, the system SHALL move the card back to the active section

#### Scenario: Non-challengers cannot complete

- **WHEN** a user who is not the current challenger views a claimed bounty
- **THEN** the "完成任務" button SHALL NOT be visible to that user


<!-- @trace
source: optimistic-ui
updated: 2026-04-09
code:
  - script.js
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