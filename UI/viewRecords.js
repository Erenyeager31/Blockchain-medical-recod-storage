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

          const patientRow = document.createElement('tr');
          patientRow.innerHTML = `
            <td>${patientName}</td>
            <td>${doctorName}</td>
            <td>${bloodType}</td>
            <td>${phoneNumber}</td>
            <td>${email}</td>
            <td>${dateOfAdmission}</td>
          `;
          patientsList.appendChild(patientRow);
        })
      );
    }

    return Promise.all(patientPromises);
  }).catch((error) => {
    console.error("Error fetching patients: ", error);
  });
}
