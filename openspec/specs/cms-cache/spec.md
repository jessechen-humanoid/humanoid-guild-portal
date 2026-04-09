# cms-cache Specification

## Purpose

TBD - created by archiving change 'cms-localstorage-cache'. Update Purpose after archive.

## Requirements

### Requirement: CMS data localStorage caching

The system SHALL cache CMS API response data (tools and journal arrays) in localStorage with a timestamp. When cached data exists and is not expired, the system SHALL render from cache immediately without waiting for the API.

#### Scenario: First visit with no cache

- **WHEN** a user opens the portal and no CMS cache exists in localStorage
- **THEN** the system SHALL fetch from the CMS Apps Script API and render the data
- **THEN** the system SHALL store the response data and current timestamp in localStorage under the key `cms_cache`

#### Scenario: Return visit with valid cache (under 1 hour)

- **WHEN** a user opens the portal and CMS cache exists with a timestamp less than 1 hour old
- **THEN** the system SHALL immediately render tools and journal from the cached data without making an API request

#### Scenario: Return visit with expired cache (over 1 hour)

- **WHEN** a user opens the portal and CMS cache exists with a timestamp more than 1 hour old
- **THEN** the system SHALL immediately render tools and journal from the cached data
- **THEN** the system SHALL fetch fresh data from the CMS API in the background
- **THEN** upon successful background fetch, the system SHALL update localStorage with the new data and timestamp

#### Scenario: Background fetch fails

- **WHEN** a background cache refresh API call fails
- **THEN** the system SHALL keep the existing cached data and rendered content unchanged
- **THEN** the system SHALL NOT show any error to the user

#### Scenario: localStorage unavailable or corrupted

- **WHEN** localStorage is unavailable or cached data cannot be parsed
- **THEN** the system SHALL fall back to fetching from the CMS API directly (original behavior)

<!-- @trace
source: cms-localstorage-cache
updated: 2026-04-09
code:
  - Journal/.DS_Store
  - Journal/guild-intro-presentation.html
  - google-auth-setup.skill
  - Journal/case-closure-guide.html
  - .DS_Store
  - index.html
  - CLAUDE.md
  - script.js
  - 8bit-pixel-art.skill.md
-->