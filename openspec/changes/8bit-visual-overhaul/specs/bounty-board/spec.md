## MODIFIED Requirements

### Requirement: Bounty card display

Each bounty card SHALL display: the task description, the commissioner's name, how many days ago it was commissioned (relative to today), the +1 count, and the challenger name (if any). All text content SHALL NOT contain emoji characters; labels SHALL use plain Chinese text only. All buttons within the card (including +1, challenge, complete) SHALL have identical height and font size, using the "完成勇者" button dimensions as the standard. Buttons SHALL use pixel-style borders with square corners (`border-radius: 0`) and no shadow or gradient effects.

#### Scenario: Card shows all required information

- **WHEN** a bounty exists with commissioner "jesse chen", created 3 days ago, with +1 count of 5, and challenger "alice wang"
- **THEN** the card SHALL display the task description, "jesse chen", "3 天前", "+5", and "挑戰勇者：alice wang" without any emoji characters

#### Scenario: Card with no challenger

- **WHEN** a bounty has no challenger assigned
- **THEN** the card SHALL NOT display any challenger information and SHALL show the "我想挑戰" button as available

#### Scenario: All buttons uniform size

- **WHEN** a bounty card is rendered with multiple buttons
- **THEN** all buttons SHALL have identical height and font size matching the "完成勇者" button standard

---

### Requirement: Bounty board tab page

The system SHALL display a "懸賞任務" tab content section containing a commission input area at the top and a bounty card list below it. The section SHALL include an 8-bit pixel art cheering villager character drawn in cute big-head style matching the reference images in "8bit reference/Snipaste_2026-04-10_07-26-40.png". The submit button "勇者大人幫幫我" SHALL use pixel-style borders and have the same height and font size as all other bounty buttons.

#### Scenario: User views the bounty board tab

- **WHEN** the user switches to the "懸賞任務" tab
- **THEN** the bounty board content SHALL be visible with the commission input area at the top and the bounty card list below
