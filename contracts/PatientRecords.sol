// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientRecords {
    struct Patient {
        string patientName;
        string doctorName;
        string bloodType;      // Added field for blood type
        string phoneNumber;    // Added field for phone number
        string email;          // Added field for email
        string dateOfAdmission;
    }

    Patient[] public patients;

    // Add a new patient
    function addPatient(
        string memory _patientName,
        string memory _doctorName,
        string memory _bloodType,      // Added blood type as parameter
        string memory _phoneNumber,    // Added phone number as parameter
        string memory _email,          // Added email as parameter
        string memory _dateOfAdmission
    ) public {
        patients.push(Patient(_patientName, _doctorName, _bloodType, _phoneNumber, _email, _dateOfAdmission));
    }

    // Get a patient's details by index
    function getPatient(uint256 _index) public view returns (
        string memory, 
        string memory, 
        string memory, 
        string memory, 
        string memory, 
        string memory
    ) {
        require(_index < patients.length, "Patient index out of bounds.");
        Patient memory patient = patients[_index];
        return (
            patient.patientName, 
            patient.doctorName, 
            patient.bloodType, 
            patient.phoneNumber, 
            patient.email, 
            patient.dateOfAdmission
        );
    }

    // Get the number of patients
    function getPatientCount() public view returns (uint256) {
        return patients.length;
    }

    // Update a patient's information by index
    function updatePatient(
        uint256 _index,
        string memory _patientName,
        string memory _doctorName,
        string memory _bloodType,      // Updated function to allow updating blood type
        string memory _phoneNumber,    // Updated function to allow updating phone number
        string memory _email,          // Updated function to allow updating email
        string memory _dateOfAdmission
    ) public {
        require(_index < patients.length, "Patient index out of bounds.");
        Patient storage patient = patients[_index]; // Using storage to directly update the patient record
        patient.patientName = _patientName;
        patient.doctorName = _doctorName;
        patient.bloodType = _bloodType;
        patient.phoneNumber = _phoneNumber;
        patient.email = _email;
        patient.dateOfAdmission = _dateOfAdmission;
    }

    // Delete a patient by index
    function deletePatient(uint256 _index) public {
        require(_index < patients.length, "Patient index out of bounds.");

        // Swap the patient at the given index with the last patient
        patients[_index] = patients[patients.length - 1];

        // Remove the last patient (which is now a duplicate)
        patients.pop();
    }
}
