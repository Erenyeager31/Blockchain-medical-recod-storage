let web3;
let contract;
const contractAddress = '0x5d73962cE12bcB70e07F7e013a61E61f71bF7800';
const abi =  [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "patients",
    "outputs": [
      {
        "internalType": "string",
        "name": "patientName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "doctorName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "bloodType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "phoneNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "dateOfAdmission",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_patientName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_doctorName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_bloodType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phoneNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_dateOfAdmission",
        "type": "string"
      }
    ],
    "name": "addPatient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getPatient",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getPatientCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_patientName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_doctorName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_bloodType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phoneNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_dateOfAdmission",
        "type": "string"
      }
    ],
    "name": "updatePatient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "deletePatient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

// Load Web3 and check if MetaMask is connected
window.addEventListener('load', async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable(); // Request account access
      initContract();
    } catch (error) {
      console.error("User denied account access");
    }
  } else {
    console.log('Non-Ethereum browser detected. Install MetaMask.');
  }
});

// Initialize the contract instance
function initContract() {
  contract = new web3.eth.Contract(abi, contractAddress);
  fetchPatients(); // Fetch and display the current patient records
}

// Add a new patient record
function addPatient() {
  const patientName = document.getElementById('patientName').value;
  const doctorName = document.getElementById('doctorName').value;
  const bloodType = document.getElementById('bloodType').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const email = document.getElementById('email').value;
  const dateOfAdmission = document.getElementById('dateOfAdmission').value;

  web3.eth.getAccounts().then((accounts) => {
    return contract.methods
      .addPatient(patientName, doctorName, bloodType, phoneNumber, email, dateOfAdmission)
      .send({ from: accounts[0] });
  }).then(() => {
    alert('Patient record added!');
    fetchPatients(); // Update the displayed patient records
  }).catch((error) => {
    console.error("Error in adding patient: ", error);
  });
}

// Fetch and display all patients
function fetchPatients() {
  contract.methods.getPatientCount().call().then((count) => {
    const patientsList = document.getElementById('patientsList');
    patientsList.innerHTML = ""; // Clear previous records

    const patientPromises = []; // Store promises for each patient

    for (let i = 0; i < count; i++) {
      patientPromises.push(
        contract.methods.getPatient(i).call().then((patientData) => {
          const patientName = patientData[0];
          const doctorName = patientData[1];
          const bloodType = patientData[2];
          const phoneNumber = patientData[3];
          const email = patientData[4];
          const dateOfAdmission = patientData[5];

          // Create a new row for the patient
          const patientRow = document.createElement('tr');
          patientRow.innerHTML = `
            <td>${patientName}</td>
            <td>${doctorName}</td>
            <td>${bloodType}</td>
            <td>${phoneNumber}</td>
            <td>${email}</td>
            <td>${dateOfAdmission}</td>
            <td><button class="delete-btn" onclick="deletePatient(${i})">Delete</button></td>
          `;
          patientsList.appendChild(patientRow); // Append the row to the table body
        })
      );
    }

    // Ensure all promises resolve before concluding the fetch
    return Promise.all(patientPromises);
  }).catch((error) => {
    console.error("Error fetching patients: ", error);
  });
}

// Delete a patient record by index
function deletePatient(index) {
  web3.eth.getAccounts().then((accounts) => {
    return contract.methods.deletePatient(index).send({ from: accounts[0] });
  }).then(() => {
    alert('Patient record deleted!');
    fetchPatients(); // Update the displayed patient records
  }).catch((error) => {
    console.error("Error in deleting patient: ", error);
  });
}

// Search patients based on the input
function searchPatients() {
  const searchTerm = document.getElementById('searchTerm').value.toLowerCase();
  fetchPatients().then(() => {
    const rows = document.querySelectorAll("#patientsTable tbody tr");
    rows.forEach(row => {
      const patientName = row.cells[0].innerText.toLowerCase();
      const doctorName = row.cells[1].innerText.toLowerCase();
      if (patientName.includes(searchTerm) || doctorName.includes(searchTerm)) {
        row.style.display = ""; // Show matching rows
      } else {
        row.style.display = "none"; // Hide non-matching rows
      }
    });
  });
}

// Call the fetchPatients function to display records on load
window.addEventListener('load', async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // Request account access
    initContract();
  } else {
    console.log('Non-Ethereum browser detected. Install MetaMask.');
  }
  fetchPatients(); // Initially fetch all patients
});
