## ADDED Requirements

### Requirement: Skill overlay panel

When a user clicks a Skill card, the page SHALL display a full-screen overlay panel containing the skill's description content. The overlay SHALL include a close button and SHALL be dismissible by clicking outside the content area or pressing the Escape key.

#### Scenario: User opens a skill overlay

- **WHEN** a user clicks on any Skill card (e.g., "營運小幫手")
- **THEN** a full-screen overlay SHALL appear displaying the skill's name, description, usage instructions, and a notice stating the skill is available for immediate use within the organization

#### Scenario: User closes the overlay via close button

- **WHEN** the overlay is open AND the user clicks the close button
- **THEN** the overlay SHALL be hidden and the user SHALL see the guild portal page

#### Scenario: User closes the overlay by clicking outside

- **WHEN** the overlay is open AND the user clicks outside the content area (on the backdrop)
- **THEN** the overlay SHALL be hidden

#### Scenario: User closes the overlay with Escape key

- **WHEN** the overlay is open AND the user presses the Escape key
- **THEN** the overlay SHALL be hidden

### Requirement: Skill overlay content structure

Each skill overlay SHALL display the following content in order: skill name as heading, a summary of what the skill does, key usage scenarios or trigger conditions, and a prominent notice that reads "此 Skill 已在組織內啟用，你可以直接在 Claude 中使用".

#### Scenario: Overlay displays complete content

- **WHEN** the overlay is open for any skill
- **THEN** the overlay SHALL contain the skill name, a description section, usage information, and the organization availability notice

### Requirement: Skill overlay styling

The overlay SHALL follow the existing MUJI-inspired design system: white content panel with border-radius, semi-transparent dark backdrop, and typography consistent with the site (Geist font, `#1a1a1a` text, `#6b6b6b` secondary text).

#### Scenario: Overlay visual consistency

- **WHEN** the overlay is displayed
- **THEN** the overlay content panel SHALL use white background, rounded corners, and the site's standard typography
