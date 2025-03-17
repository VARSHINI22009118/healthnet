import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import helpImage from '../assets/help.jpg'; // Import help.jpg as the background image

// Keyframe animations
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Glowing animation
const glow = keyframes`
  0% {
    box-shadow: 0 0 5px #00ffff;
  }
  50% {
    box-shadow: 0 0 10px #ff00ff;
  }
  100% {
    box-shadow: 0 0 5px #00ffff;
  }
`;

// Styled components
const HelpContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  /* Background Image */
  background-image: url(${helpImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  color: #00ffff;
  overflow-y: auto;
  padding: 20px;
`;

const HelpTitle = styled(motion.h1)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 40px;
  color: #00ffff;
  text-shadow: 0 0 10px #00ffff, 0 0 20px #ff00ff;
  animation: ${pulse} 1.5s infinite;
`;

const HelpSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
`;

const HelpSection = styled(motion.div)`
  width: 100%;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 10px;

  /* Glowing border with transparency */
  background-color: rgba(0, 0, 0, 0.7);
  border: 2px solid #00ffff;
  box-shadow: 0 0 10px #00ffff, 0 0 20px #ff00ff;

  animation: scrollUp 1s ease-in-out forwards;

  @keyframes scrollUp {
    0% { transform: translateY(50px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
`;

const HelpText = styled.p`
  font-size: 1.1rem;
  color: #fff;
  line-height: 1.5;
  margin-bottom: 10px;
`;

const HelpHeading = styled.h3`
  color: #00ffff;
  margin-bottom: 10px;
  text-shadow: 0 0 5px #00ffff, 0 0 10px #ff00ff;
`;

const Help = () => {
  return (
    <HelpContainer>
      {/* Title */}
      <HelpTitle
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Help & Support
      </HelpTitle>

      {/* Help Sections */}
      <HelpSectionContainer>
        <HelpSection>
          <HelpHeading>Getting Started</HelpHeading>
          <HelpText>
            Welcome to HealthNet! To begin, please login or create an account. Once logged in, you can explore the various features of our platform.
          </HelpText>
        </HelpSection>

        <HelpSection>
          <HelpHeading>Uploading Records</HelpHeading>
          <HelpText>
            You can upload your medical records securely using the "Upload Records" feature. Please ensure your files are in a supported format.
          </HelpText>
        </HelpSection>

        <HelpSection>
          <HelpHeading>Viewing Records</HelpHeading>
          <HelpText>
            Access and view your uploaded medical records securely in the "View Records" section.
          </HelpText>
        </HelpSection>
      </HelpSectionContainer>
    </HelpContainer>
  );
};

export default Help;
