// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Upload {

    // Mapping from record owner address to an array of record strings
    mapping(address => string[]) public records;

    // Event for record addition
    event RecordAdded(address indexed owner, string recordUrl);

    // Function to add a record for the caller
    function addRecord(string memory newRecord) public {
        records[msg.sender].push(newRecord); // Adds the new record to the user's array of records
        emit RecordAdded(msg.sender, newRecord); // Emit the event for record addition
    }

    // Function to get all records for a specific user
    function getRecords(address recordOwner) public view returns (string[] memory) {
        return records[recordOwner]; // Returns the array of records for the given owner
    }
}
