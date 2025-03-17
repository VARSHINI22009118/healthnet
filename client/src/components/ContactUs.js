import React from 'react';
import styled, { keyframes } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import contactImage from '../assets/contact.jpg'; // Correct path for background image

library.add(faMapMarkerAlt, faPhone, faEnvelope);

// Animation for a subtle pulse effect
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url(${contactImage});
  background-size: cover;
  background-position: center;
`;

const ContactBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 15px;

  /* Glowing border effect */
  border: 2px solid #00ffff;
  box-shadow: 
    0 0 10px #00ffff, 
    0 0 20px #00ffff, 
    0 0 30px #00ffff, 
    0 0 40px #00ffff;

  /* Semi-transparent black background */
  background-color: rgba(0, 0, 0, 0.75);

  animation: ${pulse} 2s infinite;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #00ffff;
  text-align: center;
  font-family: 'Orbitron', sans-serif;
  margin-bottom: 1.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #fff;
  font-family: 'Montserrat', sans-serif;

  &:hover {
    transform: scale(1.05);
    color: #ccc;
    transition: all 0.2s ease-in-out;
  }
`;

const ContactUs = () => {
  return (
    <Container>
      {/* Contact box containing both title and contact details */}
      <ContactBox>
        <Title>Contact Us</Title>
        <ContactItem>
          <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '0.5rem' }} />
          Team 205, Saveetha Engineering College, Chennai, TN
        </ContactItem>
        <ContactItem>
          <FontAwesomeIcon icon={faPhone} style={{ marginRight: '0.5rem' }} />
          +91 6382507800
        </ContactItem>
        <ContactItem>
          <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '0.5rem' }} />
          kaialexis0613@gmail.com
        </ContactItem>
      </ContactBox>
    </Container>
  );
};

export default ContactUs;
