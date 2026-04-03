# guild-portal Specification (Modified)

## Changes

### Requirement: Authentication gate on page load

The portal page SHALL check the user's authentication and authorization status before displaying any content. If the user is not authenticated or not authorized, the guild sections, tab navigation, and all tool cards SHALL be hidden.

#### Scenario: Unauthenticated user visits the page

- **WHEN** a user navigates to the portal page without an active session
- **THEN** the page header SHALL be visible but all guild content, tab navigation, and tool cards SHALL be hidden, replaced by the login screen

#### Scenario: Authenticated and authorized user visits the page

- **WHEN** a user navigates to the portal page with a valid, authorized session
- **THEN** the page SHALL display the header, tab navigation, and all guild sections as normal, along with a logout button in the header area
