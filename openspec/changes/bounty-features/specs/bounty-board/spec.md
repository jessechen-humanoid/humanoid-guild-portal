## MODIFIED Requirements

### Requirement: Commission input

Logged-in users SHALL be able to type a work problem description and submit it by clicking the "勇者大人幫幫我" button. The button text SHALL NOT contain emoji characters. The system SHALL record the current date, the user's display name (extracted from email, e.g., `jesse.chen@humanoid.com.tw` becomes `jesse chen`), and the task description. Upon submission, the new bounty card SHALL appear in the card list immediately with a +1 count of 1 and the submitter's email pre-filled in the plusOneList. The system SHALL POST to the API in the background, sending `plusOneCount: 1` and the submitter's email in the plusOneList. If the POST fails, the system SHALL remove the optimistically added card and display a brief error indication.

#### Scenario: User submits a new bounty with default +1

- **WHEN** a logged-in user enters a task description and clicks "勇者大人幫幫我"
- **THEN** the new bounty card SHALL appear with +1 count of 1 and the submitter shown as having voted
- **AND** the system SHALL POST to the API with plusOneCount=1 and the submitter's email in plusOneList
- **AND** on success, the system SHALL update the localStorage cache
- **AND** on failure, the system SHALL remove the card and show an error

#### Scenario: Empty submission prevented

- **WHEN** a user clicks "勇者大人幫幫我" without entering any text
- **THEN** the system SHALL NOT submit and SHALL indicate that input is required

---

### Requirement: Card sorting and layout

Bounty cards SHALL be divided into two sections: active bounties at the top and completed bounties at the bottom in a "完成任務" area with a distinct background color. Section titles SHALL NOT contain emoji characters. When the card order changes (due to +1 voting or new submissions), the cards SHALL animate smoothly to their new positions using a FLIP (First-Last-Invert-Play) animation technique with a 300ms CSS transition, rather than snapping instantly.

#### Scenario: Active bounty sorting

- **WHEN** multiple active bounties exist
- **THEN** they SHALL be sorted by +1 count descending first, then by commission date ascending (earlier commissions first) for ties

#### Scenario: Completed bounty sorting

- **WHEN** multiple completed bounties exist
- **THEN** they SHALL be sorted by completion date descending (most recently completed first)

#### Scenario: Smooth reorder animation

- **WHEN** a user votes +1 causing the card order to change
- **THEN** the affected cards SHALL slide smoothly to their new positions over 300ms
- **AND** the transition SHALL use CSS transform with ease timing

#### Scenario: Completed card appearance

- **WHEN** a bounty is marked as complete
- **THEN** the card SHALL move to the "完成任務" section at the bottom, display a different background color, show "任務完成" label (no emoji), the completion date, and the number of days it took to complete

---

### Requirement: Refresh button

The bounty tab SHALL display a refresh button near the top of the page. When clicked, the button SHALL clear the CMS cache from localStorage and trigger a full data re-fetch from the API. During the fetch, the button SHALL show a brief loading animation.

#### Scenario: User clicks refresh

- **WHEN** a logged-in user clicks the refresh button
- **THEN** the system SHALL clear the CMS cache key from localStorage
- **AND** call fetchCMSData() to reload all data from the API
- **AND** the button SHALL show a loading animation until the fetch completes
