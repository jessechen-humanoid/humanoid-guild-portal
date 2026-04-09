## ADDED Requirements

### Requirement: Read bounty data via doGet

The CMS Apps Script `doGet()` SHALL read the "懸賞" worksheet and return bounty data as part of the JSON response, alongside existing tools and journal data. Each bounty object SHALL include: date, commissioner, task description, plus-one count, plus-one email list, challenger email, status, completion date, and days spent.

#### Scenario: Fetch all bounties

- **WHEN** the frontend calls the CMS Apps Script URL via GET
- **THEN** the response JSON SHALL include a `bounties` array containing all non-empty rows from the "懸賞" worksheet with fields: `date`, `commissioner`, `task`, `plusOneCount`, `plusOneList`, `challenger`, `status`, `completionDate`, `daysSpent`

#### Scenario: Empty bounty worksheet

- **WHEN** the "懸賞" worksheet has no data rows
- **THEN** the response SHALL include an empty `bounties` array

---

### Requirement: Write bounty data via doPost

The CMS Apps Script SHALL expose a `doPost()` endpoint that handles three action types: `newBounty`, `plusOne`, `challenge`, and `complete`. The action type SHALL be specified in the POST body as the `action` field.

#### Scenario: Create a new bounty

- **WHEN** a POST request with `action: "newBounty"` is received, containing `commissioner` (email) and `task` (description)
- **THEN** the system SHALL append a new row to the "懸賞" worksheet with: current date in A, display name (derived from email) in B, task in C, 0 in D, empty in E, empty in F, empty in G, empty in H, 0 in I
- **AND** the response SHALL return `{success: true, row: <row number>}`

#### Scenario: Vote plus one

- **WHEN** a POST request with `action: "plusOne"` is received, containing `row` (row number) and `email` (voter's email)
- **THEN** the system SHALL check if the email already exists in column E of that row
- **AND** if not present, SHALL append the email to column E (comma-separated), increment column D by 1, and return `{success: true, newCount: <count>}`
- **AND** if already present, SHALL return `{success: false, reason: "already_voted"}`

#### Scenario: Claim or unclaim a challenge

- **WHEN** a POST request with `action: "challenge"` is received, containing `row` (row number) and `email` (challenger's email)
- **THEN** if column F is empty, the system SHALL write the email to column F and return `{success: true, action: "claimed"}`
- **AND** if column F equals the requesting email, the system SHALL clear column F and return `{success: true, action: "unclaimed"}`
- **AND** if column F contains a different email, the system SHALL return `{success: false, reason: "already_claimed"}`

#### Scenario: Complete a bounty

- **WHEN** a POST request with `action: "complete"` is received, containing `row` (row number) and `email` (challenger's email)
- **THEN** the system SHALL verify column F matches the requesting email
- **AND** if matched, SHALL set column G to "done", column H to the current date, column I to the number of days between column A and column H, and return `{success: true}`
- **AND** if not matched, SHALL return `{success: false, reason: "not_challenger"}`

---

### Requirement: Row identification

Each bounty SHALL be identified by its row number in the Google Sheet. The `doGet()` response SHALL include the row number for each bounty to enable targeted `doPost()` updates.

#### Scenario: Row number included in GET response

- **WHEN** bounties are fetched via doGet
- **THEN** each bounty object SHALL include a `row` field containing its 1-based row number in the worksheet
