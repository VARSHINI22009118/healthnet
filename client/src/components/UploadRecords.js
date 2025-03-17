import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Web3 from "web3";
import axios from "axios";
import MedicalRecordsABI from "../artifacts/contracts/Upload.sol/Upload.json";
import uploadVideo from "../assets/upload.mp4";

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

const loadAnimation = keyframes`
  0% {
    width: 0;
    box-shadow: 0 0 10px #00ffff, 0 0 20px #ff00ff;
  }
  50% {
    width: 100%;
    box-shadow: 0 0 20px #ff00ff, 0 0 40px #00ffff;
  }
  100% {
    width: 0;
    box-shadow: 0 0 10px #00ffff, 0 0 20px #ff00ff;
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

const UploadContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #ffffff;
  font-family: "Bebas Neue", sans-serif;
`;

const Heading = styled.h1`
  font-size: 4rem;
  color: white;
  margin-bottom: 50px;
  animation: ${pulseSlow} 3s infinite;
  text-align: center;
`;

const UploadForm = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 60px;
  border-radius: 15px;
  box-shadow: 0 0 15px #00ffff, 0 0 30px #ff00ff;
  text-align: center;
  width: 500px;
  position: relative;
`;

const FileInput = styled.input`
  width: 100%;
  margin-bottom: 30px;
  padding: 15px;
  background: #13161d;
  border: 3px solid #00ffff;
  color: #00ffff;
  border-radius: 10px;
  outline: none;
  font-size: 1.2rem;

  animation: ${borderGlow} 2s infinite;
`;

const Button = styled.button`
  padding: 15px 40px;
  font-size: 1.8rem;
  font-family: "Bebas Neue", sans-serif;
  font-weight: bold;
  color: white;
  background: black;
  border: 4px solid #00ffff;
  border-radius: 50px;
  cursor: pointer;

  animation: ${borderGlow} 2s infinite;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1.05);
  }
`;

const LoadingBar = styled.div`
  height: 12px; /* Thicker loading bar */
  margin-top: 20px;
  background: transparent;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #00ffff;

  div {
    height: 100%;
    background: linear-gradient(90deg, #00ffff, #ff00ff);
    width: ${(props) => props.progress}%;
    transition: width 0.2s ease-in-out;
  }
`;

const SuccessMessage = styled.div`
  margin-top: 20px;
  text-align: center;
  color: #00ff99;
  font-size: 1.5rem;
  animation: ${glowText} 3s infinite;

  p {
    margin: 10px 0;
  }

  strong {
    display: block;
    margin-top: 10px;
    font-size: 1.2rem;
    word-wrap: break-word;
  }
`;

const UploadRecords = () => {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // To track progress
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);

  const CONTRACT_ADDRESS = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";

  const handleFileChange = (e) => setFile(e.target.files[0]);

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

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);
    setUploadProgress(0); // Reset progress before upload

    try {
      const formData = new FormData();
      formData.append("file", file);

      const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
      const headers = {
        pinata_api_key: "80c4246189edb484a7cd",
        pinata_secret_api_key: "f10f984985b516768e7759bf87e3b515410b4fc4b64c410fc1dc5131574d0534",
      };

      // Axios request with progress callback
      const response = await axios.post(url, formData, {
        headers,
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = Math.floor((loaded * 100) / total);
          setUploadProgress(percent);
        },
      });

      const hash = response.data.IpfsHash;
      setIpfsHash(hash);

      await contract.methods.addRecord(hash).send({ from: account });
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <VideoBackground>
        <video autoPlay loop muted>
          <source src={uploadVideo} type="video/mp4" />
        </video>
      </VideoBackground>
      <UploadContainer>
        <Heading>Upload Medical Records</Heading>
        {!account && <Button onClick={connectWallet}>Start</Button>}
        {account && (
          <UploadForm>
            <FileInput type="file" onChange={handleFileChange} />
            <Button onClick={handleUpload} disabled={uploading}>
              Upload to IPFS
            </Button>
            {uploading && !ipfsHash && (
              <>
                <div>Uploading...</div>
                <LoadingBar progress={uploadProgress}>
                  <div></div>
                </LoadingBar>
              </>
            )}
            {ipfsHash && (
              <SuccessMessage>
                <p>File successfully uploaded!</p>
                <p>IPFS Hash:</p>
                <strong>{ipfsHash}</strong>
              </SuccessMessage>
            )}
          </UploadForm>
        )}
      </UploadContainer>
    </>
  );
};

export default UploadRecords;
