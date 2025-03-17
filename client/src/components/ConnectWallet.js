import React, { useState } from "react";
import styled from "styled-components";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import walletVideo from "../assets/wallet.mp4"; // Import video from assets

// Styled component for video background
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

const GlowButton = styled.button`
  background-color: black; /* Fill color is now black */
  border: 2px solid transparent; /* Remove default border */
  border-radius: 50%; /* Fully round button */
  color: white; /* White text for contrast */
  font-family: 'Bebas Neue', sans-serif; /* Custom font */
  font-size: 3rem; /* Increased font size */
  padding: 40px; /* Increased padding for a larger button */
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  width: 200px; /* Larger width */
  height: 200px; /* Larger height */
  display: flex;
  justify-content: center;
  align-items: center;

  /* Neon glow effect on text */
  text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff;

  /* Neon glowing outline around button */
  box-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff;

  &:hover {
    box-shadow: 0 0 25px #00ffff, 0 0 50px #ff00ff;
    transform: scale(1.1); /* Slightly increase size on hover */
  }

  &:active {
    box-shadow: 0 0 10px #00ffff, 0 0 20px #ff00ff;
    transform: scale(1.05);
  }
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative; /* To ensure other content layers correctly */
  color: #fff;
`;

const ConnectWallet = () => {
  const [account, setAccount] = useState("");
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        navigate("/options"); // Redirect to options page
      } catch (error) {
        alert("Wallet connection failed. Try again.");
      }
    } else {
      alert("MetaMask not detected.");
    }
  };

  return (
    <>
      <VideoBackground>
        <video autoPlay loop muted>
          <source src={walletVideo} type="video/mp4" />
        </video>
      </VideoBackground>
      <CenterContainer>
        {!account ? (
          <GlowButton onClick={connectWallet}>Connect Wallet</GlowButton>
        ) : (
          <h2 style={{ color: 'white' }}>Connected: {account}</h2>
        )}
      </CenterContainer>
    </>
  );
};

export default ConnectWallet;
