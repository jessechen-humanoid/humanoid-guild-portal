## ADDED Requirements

### Requirement: Delete bounty card

Each bounty card SHALL display a trash icon button on the right side. When clicked, the system SHALL display a custom confirmation modal asking "確定要刪除這個懸賞任務嗎？". The modal SHALL have two buttons: "確定刪除" and "取消". If confirmed, the system SHALL optimistically remove the card from the UI, POST `action: "deleteBounty"` with the row number to the API, clear the CMS cache, and re-fetch all bounty data. If the POST fails, the system SHALL restore the card and show an error message.

#### Scenario: User deletes a bounty

- **WHEN** a logged-in user clicks the trash icon on a bounty card and confirms deletion in the modal
- **THEN** the card SHALL be immediately removed from the UI
- **AND** the system SHALL POST `action: "deleteBounty"` with `row` to the API
- **AND** on success, the system SHALL clear the CMS cache and re-fetch all data
- **AND** on failure, the system SHALL restore the card and display an error

#### Scenario: User cancels deletion

- **WHEN** a logged-in user clicks the trash icon and then clicks "取消" in the modal
- **THEN** the modal SHALL close and no deletion SHALL occur

#### Scenario: Apps Script deletes the row

- **WHEN** the API receives `action: "deleteBounty"` with a valid row number
- **THEN** the Apps Script SHALL delete the entire row from the "懸賞" worksheet
- **AND** return `{success: true}`
