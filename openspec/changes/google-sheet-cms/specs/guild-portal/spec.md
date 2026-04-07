# guild-portal Specification Changes

## Modified Requirements

### Requirement: Dynamic tool card rendering from Google Sheet

Tool cards SHALL be dynamically rendered from data fetched via a Google Apps Script API at page load time, instead of being hardcoded in HTML. The API SHALL return tool data grouped by guild name. Each tool card SHALL display the tool name, a short description, a type badge (Web or Skill), and the adventurer name in small text at the bottom-left corner formatted as "by {name}".

#### Scenario: Page loads and fetches tool data from Google Sheet

- **WHEN** the portal page loads after successful authentication
- **THEN** the page SHALL call the Google Apps Script API to fetch tool data, and dynamically render tool cards into the appropriate guild sections based on the guild field in the data

#### Scenario: Tool card displays adventurer name

- **WHEN** a tool card is rendered
- **THEN** the card SHALL display "by {冒險者}" in small, secondary-color text at the bottom-left corner of the card

#### Scenario: Skill card matches HTML overlay by ID

- **WHEN** a Skill-type tool card is rendered with a Skill ID (e.g., "ai-ops")
- **THEN** clicking the card SHALL open the overlay element matching `#overlay-{skill-id}` if it exists in the HTML

#### Scenario: Skill card with no matching overlay

- **WHEN** a Skill-type tool card is clicked but no matching `#overlay-{skill-id}` element exists
- **THEN** nothing SHALL happen (no error, no navigation)

#### Scenario: Loading state while fetching data

- **WHEN** tool data is being fetched from the API
- **THEN** the tool grid areas SHALL display a loading indicator until data arrives

#### Scenario: API fetch fails

- **WHEN** the API call fails (network error, timeout, etc.)
- **THEN** the page SHALL display a user-friendly error message in the tool grid area indicating data could not be loaded
