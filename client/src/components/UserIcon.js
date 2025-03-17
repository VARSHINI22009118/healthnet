import React from 'react';
import styled from 'styled-components';

const UserIconContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: black;  /* Black background */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;
  box-shadow: 0 0 15px #00ffff, 0 0 30px #ff00ff;

  &:hover {
    box-shadow: 0 0 25px #00ffff, 0 0 40px #ff00ff;
  }
`;

const InitialLetter = styled.span`
  font-size: 1.8rem;
  font-weight: bold;
  color: #00ffff;
  text-shadow: 0 0 5px #00ffff, 0 0 10px #ff00ff;
`;

const UserIcon = ({ userName }) => {
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : '';

  return (
    <UserIconContainer>
      <InitialLetter>{firstLetter}</InitialLetter>
    </UserIconContainer>
  );
};

export default UserIcon;
