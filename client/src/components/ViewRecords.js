import React, { useState } from "react";
import styled, { keyframes } from "styled-components"; // Added keyframes import
import Web3 from "web3";
import MedicalRecordsABI from "../artifacts/contracts/Upload.sol/Upload.json";
import downloadVideo from "../assets/download.mp4"; // Background video file

// Animations
const pulseSlow = keyframes`
  0%, 100% {
    text-shadow: 0 0 10px #00ffff, 0 0 20px #ff00ff, 0 0 30px #00ffff;
  }
  50% {
    text-shadow: 0 0 20px #ff00ff, 0 0 40px #00ffff, 0 0 60px #ff00ff;
  }
`;

const borderGlow = keyframes`
  0%, 100% {
    border-color: #00ffff;
    box-shadow: 0 0 15px #00ffff, 0 0 30px #ff00ff;
  }
  50% {
    border-color: #ff00ff;
    box-shadow: 0 0 20px #ff00ff, 0 0 40px #00ffff;
  }
`;

const glowText = keyframes`
  0%, 100% {
    text-shadow: 0 0 10px #00ffff, 0 0 20px #ff00ff;
  }
  50% {
    text-shadow: 0 0 20px #ff00ff, 0 0 40px #00ffff;
  }
`;

// Styled Components
const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ViewContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #00ffff;
  font-family: "Bebas Neue", sans-serif;
`;

const Heading = styled.h1`
  font-size: 4rem;
  margin-bottom: 50px;
  text-align: center;
  padding: 10px;
  border: 2px solid black; /* Thin black border around the text */
  animation: ${pulseSlow} 3s infinite;
  color: white;
  background-color: rgba(0, 0, 0, 0.5); /* Dark background for contrast */
  box-shadow: 0 0 10px #ff00ff, 0 0 20px #00ffff;
`;

const ViewForm = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px #ff00ff, 0 0 20px #00ffff;
  text-align: center;
  width: 400px;
`;

const InputField = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  background: #13161d;
  border: 2px solid #00ffff;
  color: #00ffff;
  border-radius: 5px;
  outline: none;
  font-size: 1.2rem;
  animation: ${borderGlow} 2s infinite;
  box-shadow: 0 0 10px #00ffff;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  background: linear-gradient(90deg, #00ffff, #ff00ff);
  border: 2px solid #00ffff;
  color: black;
  cursor: pointer;
  border-radius: 5px;
  animation: ${borderGlow} 2s infinite;
  box-shadow: 0 0 10px #ff00ff, 0 0 20px #00ffff;
  
  &:hover {
    box-shadow: 0 0 15px #00ffff, 0 0 30px #ff00ff;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ViewRecords = () => {
  const [ipfsHash, setIpfsHash] = useState("");
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);

  const CONTRACT_ADDRESS = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const contractInstance = new web3.eth.Contract(MedicalRecordsABI.abi, CONTRACT_ADDRESS);
        setContract(contractInstance);
      } catch (err) {
        console.error("Error connecting wallet:", err);
      }
    } else {
      alert("MetaMask not installed!");
    }
  };

  const fetchByHash = async () => {
    if (!ipfsHash) {
      alert("Please enter an IPFS hash.");
      return;
    }

    window.open(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`, "_blank");
  };

  return (
    <>
      <VideoBackground>
        <video autoPlay loop muted>
          <source src={downloadVideo} type="video/mp4" />
        </video>
      </VideoBackground>
      <ViewContainer>
        <Heading>View Medical Records</Heading>
        {!account && <Button onClick={connectWallet}>Start</Button>}
        {account && (
          <ViewForm>
            <InputField
              type="text"
              placeholder="Enter IPFS hash"
              value={ipfsHash}
              onChange={(e) => setIpfsHash(e.target.value)}
            />
            <Button onClick={fetchByHash}>Fetch by IPFS Hash</Button>
          </ViewForm>
        )}
      </ViewContainer>
    </>
  );
};

export default ViewRecords;
