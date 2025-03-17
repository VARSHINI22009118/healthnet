import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import bgVideo from '../assets/bg-video.mp4';
import { AuthContext } from '../contexts/AuthContext';

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #00ffff;
  text-align: center;
`;

const Heading = styled(motion.h1)`
  font-size: 3rem;
  color: #00ffff;
  text-shadow: 0 0 10px #00ffff, 0 0 20px #ff00ff;
  margin-bottom: 20px;
`;

const Subheading = styled(motion.h2)`
  font-size: 1.5rem;
  color: #ff00ff;
  margin-bottom: 40px;
`;

const StartButton = styled(motion.button)`
  padding: 15px 30px;
  border: none;
  background: linear-gradient(90deg, #00ffff, #ff00ff);
  color: black;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0 0 10px #00ffff, 0 0 20px #ff00ff;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 15px #00ffff, 0 0 30px #ff00ff;
    transition: all 0.3s ease;
    transform: scale(1.05);
  }
`;

const Homepage = () => {
  const { isLoggedIn } = useContext(AuthContext); // Access login state from Context
  const navigate = useNavigate();

  const handleStartClick = () => {
    if (isLoggedIn) {
      navigate('/connect-wallet');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <VideoBackground autoPlay loop muted>
        <source src={bgVideo} type="video/mp4" />
      </VideoBackground>
      <Overlay />
      <Content>
        <Heading
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Your Health, Reimagined
        </Heading>
        <Subheading
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          Secure, Private, and Accessible Healthcare in the Digital Age
        </Subheading>
        <StartButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleStartClick}
        >
          START
        </StartButton>
      </Content>
    </>
  );
};

export default Homepage;
