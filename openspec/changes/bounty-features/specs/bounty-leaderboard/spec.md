## ADDED Requirements

### Requirement: Hero leaderboard

The bounty tab SHALL display a "勇者排行榜" section showing the top 3 users who have completed the most bounty challenges. Each entry SHALL display the user's display name and the number of completed tasks. The leaderboard SHALL be calculated from the bounties array by counting occurrences of each `challenger` email where `status` is "done". The leaderboard SHALL be positioned at the top of the bounty tab content area, on the left side, side by side with the village chief leaderboard.

#### Scenario: Hero leaderboard with data

- **WHEN** there are completed bounties with different challengers
- **THEN** the hero leaderboard SHALL show up to 3 users sorted by completed task count descending
- **AND** each entry SHALL display the display name and task count

#### Scenario: Hero leaderboard with no data

- **WHEN** there are no completed bounties
- **THEN** the hero leaderboard SHALL display an empty state message

### Requirement: Village chief leaderboard

The bounty tab SHALL display a "村長排行榜" section showing the top 3 users who have submitted the most bounty commissions. Each entry SHALL display the user's display name and the number of submitted bounties. The leaderboard SHALL be calculated from the bounties array by counting occurrences of each `commissioner` value. The leaderboard SHALL be positioned at the top of the bounty tab content area, on the right side, side by side with the hero leaderboard.

#### Scenario: Village chief leaderboard with data

- **WHEN** there are bounties with different commissioners
- **THEN** the village chief leaderboard SHALL show up to 3 users sorted by commission count descending
- **AND** each entry SHALL display the display name and bounty count

#### Scenario: Village chief leaderboard with no data

- **WHEN** there are no bounties
- **THEN** the village chief leaderboard SHALL display an empty state message

### Requirement: Leaderboard layout

The hero leaderboard and village chief leaderboard SHALL be displayed side by side in a two-column layout. The hero leaderboard SHALL be on the left and the village chief leaderboard SHALL be on the right. On mobile (viewport width 768px or less), they SHALL stack vertically.

#### Scenario: Desktop layout

- **WHEN** the viewport width is greater than 768px
- **THEN** the two leaderboards SHALL be displayed side by side

#### Scenario: Mobile layout

- **WHEN** the viewport width is 768px or less
- **THEN** the two leaderboards SHALL stack vertically
