import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Confetti from 'react-confetti';
import signupVideo from '../assets/signup.mp4'; // Import background video

// Styled Components
const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #0b0f15;
  color: #fff;
  position: relative;
  overflow: hidden;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const Form = styled.form`
  background: rgba(0, 0, 0, 0.8);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px #00ffff, 0 0 20px #ff00ff;
  text-align: center;
  width: 400px;
  z-index: 1;
  animation: pulse 2s infinite;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #00ffff;
  border-radius: 5px;
  background: #13161d;
  color: #00ffff;
  font-size: 1.2rem;

  &::placeholder {
    color: #00ffff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: linear-gradient(90deg, #00ffff, #ff00ff);
  color: black;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 15px #00ffff, 0 0 30px #ff00ff;
  }
`;

const SuccessMessage = styled.h1`
  color: #00ffff;
  text-shadow: 0 0 10px #00ffff, 0 0 20px #ff00ff;
  font-size: 2.5rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1.2rem;
  animation: pulse 1s infinite;
`;

const ConfettiWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/users/register', formData);
      setSuccess(true);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred.');
    }
  };

  return (
    <SignupContainer>
      <BackgroundVideo autoPlay muted loop>
        <source src={signupVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>

      {success ? (
        <ConfettiWrapper>
          <SuccessMessage>Account Created Successfully!</SuccessMessage>
          <Confetti />
          <Button onClick={() => window.location.href = '/login'}>Login</Button>
        </ConfettiWrapper>
      ) : (
        <Form onSubmit={handleSubmit}>
          <h2 style={{ color: '#00ffff', textShadow: '0 0 10px #00ffff' }}>Signup</h2>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input name="username" placeholder="Username" onChange={handleChange} required />
          <Input name="firstName" placeholder="First Name" onChange={handleChange} required />
          <Input name="lastName" placeholder="Last Name" onChange={handleChange} required />
          <Input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <Input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <Input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />
          <Button type="submit">Signup</Button>
        </Form>
      )}
    </SignupContainer>
  );
};

export default Signup;
