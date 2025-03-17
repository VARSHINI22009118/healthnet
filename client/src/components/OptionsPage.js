import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import optionsVideo from "../assets/options.mp4"; // Import video from assets

// Breathing (Pulse) Animation
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

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

const OptionButton = styled(Link)`
  margin: 20px;
  padding: 30px 80px; /* Bigger button size */
  background: transparent; /* Matches the background */
  color: white; /* White text color */
  font-family: 'Bebas Neue', sans-serif; /* Stylish font */
  font-size: 2.5rem; /* Bigger font size for emphasis */
  font-weight: bold; /* Thicker text */
  text-align: center;
  border-radius: 20px;
  text-decoration: none;
  display: inline-block;
  animation: ${pulse} 2s ease-in-out infinite; /* Breathing pulse animation */
  border: 8px solid transparent; /* Thick border */

  /* Glowing border effect */
  box-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff;

  /* Neon glow wrapping around text */
  text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;

  /* Adjust neon glow for each button */
  &:nth-child(1) { 
    box-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff;
    border-color: #00ffff;
  }

  &:nth-child(2) { 
    box-shadow: 0 0 20px #ff00ff, 0 0 40px #ff00ff, 0 0 60px #ff00ff;
    border-color: #ff00ff;
    text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff;
  }

  &:hover {
    box-shadow: 0 0 30px #00ffff, 0 0 50px #00ffff;
    transform: scale(1.1); /* Slightly increase size on hover */
  }

  &:active {
    transform: scale(1.05);
  }
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: space-evenly; /* Brings buttons closer to center */
  align-items: center;
  height: 100vh;
  flex-direction: row;
  padding: 0 15%; /* Adjust spacing */
`;

const OptionsPage = () => {
  return (
    <>
      <VideoBackground>
        <video autoPlay loop muted>
          <source src={optionsVideo} type="video/mp4" />
        </video>
      </VideoBackground>
      <CenterContainer>
        <OptionButton to="/upload-records">Upload Records</OptionButton>
        <OptionButton to="/view-records">View Records</OptionButton>
      </CenterContainer>
    </>
  );
};

export default OptionsPage;
