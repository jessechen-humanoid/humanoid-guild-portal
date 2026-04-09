## MODIFIED Requirements

### Requirement: Bounty card display

Each bounty card SHALL display: the task description, the commissioner's name, how many days ago it was commissioned (relative to today), the +1 count, and the challenger name (if any). All text content SHALL NOT contain emoji characters; labels SHALL use plain Chinese text only.

#### Scenario: Card shows all required information

- **WHEN** a bounty exists with commissioner "jesse chen", created 3 days ago, with +1 count of 5, and challenger "alice wang"
- **THEN** the card SHALL display the task description, "jesse chen", "3 天前", "+5", and "挑戰勇者：alice wang" without any emoji characters

#### Scenario: Card with no challenger

- **WHEN** a bounty has no challenger assigned
- **THEN** the card SHALL NOT display any challenger information and SHALL show the "我想挑戰" button as available

#### Scenario: Card layout — buttons right-aligned

- **WHEN** a bounty card is rendered
- **THEN** the action buttons (+1, challenge, complete) SHALL be right-aligned within the card
- **AND** the task description font size SHALL be 16px, meta information font size SHALL be 13px, and button font size SHALL be 13px

---

### Requirement: Plus-one voting

Each logged-in user SHALL be able to toggle their +1 vote on any bounty card. Upon clicking the +1 button on a bounty the user has not voted on, the +1 count SHALL increment immediately and the button SHALL change to voted state. Upon clicking the +1 button on a bounty the user has already voted on, the +1 count SHALL decrement immediately and the button SHALL revert to unvoted state. Both operations SHALL POST to the API in the background using optimistic UI. If the POST fails, the system SHALL revert to the pre-click state.

#### Scenario: User votes +1 on a bounty (optimistic)

- **WHEN** a logged-in user clicks the +1 button on a bounty they have not voted on
- **THEN** the +1 count SHALL increment by 1 immediately and the button SHALL show the voted state
- **AND** the system SHALL POST to the API in the background
- **AND** on success, the system SHALL update the localStorage cache
- **AND** on failure, the system SHALL revert the +1 count and button state to pre-click values

#### Scenario: User removes +1 vote (optimistic)

- **WHEN** a logged-in user clicks the +1 button on a bounty they have already voted on
- **THEN** the +1 count SHALL decrement by 1 immediately and the button SHALL revert to the unvoted state
- **AND** the system SHALL POST action "plusOne" to the API in the background
- **AND** on success, the system SHALL update the localStorage cache
- **AND** on failure, the system SHALL revert the +1 count and button state to pre-click values

#### Scenario: +1 count does not go below zero

- **WHEN** a user removes their +1 vote and the resulting count would be 0
- **THEN** the card SHALL display "+0" and the button SHALL be in the unvoted state

---

### Requirement: Commission input

Logged-in users SHALL be able to type a work problem description and submit it by clicking the "勇者大人幫幫我" button. The button text SHALL NOT contain emoji characters. The system SHALL record the current date, the user's display name (extracted from email, e.g., `jesse.chen@humanoid.com.tw` becomes `jesse chen`), and the task description. Upon submission, the new bounty card SHALL appear in the card list immediately without waiting for the API response. The system SHALL POST to the API in the background and update the localStorage cache on success. If the POST fails, the system SHALL remove the optimistically added card and display a brief error indication.

#### Scenario: User submits a new bounty (optimistic)

- **WHEN** a logged-in user enters a task description and clicks "勇者大人幫幫我"
- **THEN** the new bounty card SHALL appear in the card list immediately with +1 count of 0 and no challenger
- **AND** the system SHALL POST to the API in the background
- **AND** on success, the system SHALL update the localStorage cache with the server-confirmed data
- **AND** on failure, the system SHALL remove the optimistically added card and show a brief error message

#### Scenario: Empty submission prevented

- **WHEN** a user clicks "勇者大人幫幫我" without entering any text
- **THEN** the system SHALL NOT submit and SHALL indicate that input is required

---

### Requirement: Card sorting and layout

Bounty cards SHALL be divided into two sections: active bounties at the top and completed bounties at the bottom in a "完成任務" area with a distinct background color. Section titles SHALL NOT contain emoji characters.

#### Scenario: Active bounty sorting

- **WHEN** multiple active bounties exist
- **THEN** they SHALL be sorted by +1 count descending first, then by commission date ascending (earlier commissions first) for ties

#### Scenario: Completed bounty sorting

- **WHEN** multiple completed bounties exist
- **THEN** they SHALL be sorted by completion date descending (most recently completed first)

#### Scenario: Completed card appearance

- **WHEN** a bounty is marked as complete
- **THEN** the card SHALL move to the "完成任務" section at the bottom, display a different background color, show "任務完成" label (no emoji), the completion date, and the number of days it took to complete
