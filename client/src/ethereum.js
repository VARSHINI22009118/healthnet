import Web3 from 'web3';

// Initialize Web3 with MetaMask's provider
let web3;

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    // Request user accounts via MetaMask
    window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(() => {
            console.log('MetaMask connected successfully');
        })
        .catch((err) => {
            console.error('User denied account access:', err);
        });

    // Listen for account changes
    window.ethereum.on('accountsChanged', (accounts) => {
        console.log('Accounts changed:', accounts);
        if (accounts.length === 0) {
            console.warn('MetaMask is locked or no accounts are available.');
        } else {
            console.log('Connected account:', accounts[0]);
        }
    });

    // Listen for network changes
    window.ethereum.on('chainChanged', (chainId) => {
        console.log('Network changed to:', chainId);
        window.location.reload(); // Reload to apply network-specific updates
    });

} else {
    alert('MetaMask is required. Please install it to interact with the blockchain.');
    throw new Error('MetaMask not found');
}

// Contract ABI and Address (Updated to reflect the new contract)
const contractAddress = '0x610178dA211FEF7D417bC0e6FeD39F05609AD788'; // Replace with your actual deployed contract address
const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "recordUrl",
          "type": "string"
        }
      ],
      "name": "RecordAdded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "newRecord",
          "type": "string"
        }
      ],
      "name": "addRecord",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recordOwner",
          "type": "address"
        }
      ],
      "name": "getRecords",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "records",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

// Export Web3 instance and contract for use in other parts of the app
export const contract = new web3.eth.Contract(abi, contractAddress);
export { web3 };

// Function to fetch the records of the connected user
async function fetchRecords() {
    const accounts = await web3.eth.getAccounts(); // Get the user's account address
    try {
        // Call the getMyRecords function to fetch records for the connected account
        const records = await contract.methods.getMyRecords().call({ from: accounts[0] });
        console.log("Records for the user:", records);
        // Display the records on the webpage or handle them as required
        if (records.length > 0) {
            // Assuming you have a place in your UI to show the records
            const recordsContainer = document.getElementById('records-container');
            recordsContainer.innerHTML = ''; // Clear previous records
            records.forEach((record, index) => {
                const recordElement = document.createElement('div');
                recordElement.innerText = `Record ${index + 1}: ${record}`;
                recordsContainer.appendChild(recordElement);
            });
        } else {
            alert("No records found for this user.");
        }
    } catch (error) {
        console.error("Error fetching records:", error);
        alert("Error fetching records. Please check the console for details.");
    }
}

// Call fetchRecords when needed, e.g., on page load or button click
// Example: document.getElementById("fetch-records-btn").addEventListener('click', fetchRecords);
