# guild-auth Specification

## Purpose

Google account authentication and permission verification for the Adventurer's Guild portal, using a Google Sheets-backed allowlist managed via Google Apps Script.

## Requirements

### Requirement: Google Sign-In integration

The portal SHALL provide a Google Sign-In button using the Google Identity Services SDK. Users SHALL authenticate with their Google account to access the portal.

#### Scenario: User sees login screen on first visit

- **WHEN** a user navigates to the portal without an active session
- **THEN** the page SHALL display a login screen with a Google Sign-In button and the portal content SHALL be hidden

#### Scenario: User completes Google Sign-In

- **WHEN** a user clicks the Google Sign-In button and successfully authenticates
- **THEN** the system SHALL extract the user's email address from the Google ID token

---

### Requirement: Permission verification via Google Apps Script API

After authentication, the system SHALL call a Google Apps Script Web App endpoint to verify whether the user's email is in the allowed list. The Apps Script reads the Google Sheets "冒險者公會權限" spreadsheet: if column D is true for the row where column C matches the user's email, access is granted.

#### Scenario: Authorized user logs in

- **WHEN** an authenticated user's email exists in column C of the spreadsheet AND column D is true
- **THEN** the portal content SHALL be displayed and the login screen SHALL be hidden

#### Scenario: Unauthorized user logs in

- **WHEN** an authenticated user's email does not exist in the spreadsheet OR column D is false
- **THEN** the page SHALL display a "你沒有權限登入" message and the portal content SHALL remain hidden

#### Scenario: Permission check API is unreachable

- **WHEN** the Apps Script API call fails (network error or non-200 response)
- **THEN** the page SHALL display an error message indicating the permission check failed and suggest retrying

---

### Requirement: Session persistence

The system SHALL cache the authentication state in the browser's localStorage to avoid requiring re-authentication on every page visit. The cached session SHALL include the user's email and an expiration timestamp.

#### Scenario: User revisits with valid cached session

- **WHEN** a user navigates to the portal AND a valid (non-expired) cached session exists in localStorage
- **THEN** the system SHALL skip the login screen, re-verify permission via the API, and display the portal content if authorized

#### Scenario: Cached session has expired

- **WHEN** a user navigates to the portal AND the cached session in localStorage has expired
- **THEN** the system SHALL clear the cached session and display the login screen

---

### Requirement: Logout

The portal SHALL provide a logout mechanism that clears the cached session and returns the user to the login screen.

#### Scenario: User logs out

- **WHEN** a user clicks the logout button
- **THEN** the cached session SHALL be cleared from localStorage, the Google session SHALL be revoked, and the login screen SHALL be displayed
