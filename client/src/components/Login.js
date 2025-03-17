import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import loginVideo from '../assets/login.mp4'; // Import the background video

const LoginContainer = styled.div`
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

const SignupLink = styled.p`
  color: #00ffff;
  margin-top: 20px;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #ff00ff;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        username,
        password,
      });

      // Notify parent of successful login
      onLogin(response.data.user);
      window.location.href = '/'; // Redirect to homepage
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred.');
    }
  };

  return (
    <LoginContainer>
      <BackgroundVideo autoPlay muted loop>
        <source src={loginVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
        <SignupLink onClick={() => (window.location.href = '/signup')}>
          No account? Create one
        </SignupLink>
      </Form>
    </LoginContainer>
  );
};

export default Login;
