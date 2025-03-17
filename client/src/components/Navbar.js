import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import UserIcon from './UserIcon'; // Import your UserIcon component
import { MdMenu } from 'react-icons/md'; // Import the Menu icon from react-icons

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

const glow = keyframes`
  0% {
    text-shadow: 0 0 5px #00ffff;
  }
  50% {
    text-shadow: 0 0 10px #ff00ff;
  }
  100% {
    text-shadow: 0 0 5px #00ffff;
  }
`;

const Container = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  z-index: 1001;
  animation: ${glow} 1.5s infinite;
`;

const HealthnetLogo = styled.h2`
  color: #fff;
  font-size: 1.8rem;
  font-family: 'Bebas Neue', sans-serif;
  text-shadow: 0 0 5px #00ffff, 0 0 10px #ff00ff;
  animation: ${glow} 1.5s infinite;
  letter-spacing: 2px;
  cursor: pointer;
`;

const NavbarContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  z-index: 1000;
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  border: none;
  background: linear-gradient(90deg, #00ffff, #ff00ff);
  color: black;
  font-size: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 10px #00ffff, 0 0 20px #ff00ff;
  cursor: pointer;
  margin-right: 20px;
  animation: ${(props) => (props.isDropdownOpen ? pulse : 'none')} 1s infinite;

  &:hover {
    box-shadow: 0 0 15px #00ffff, 0 0 30px #ff00ff;
  }

  ${(props) =>
    props.isHidden &&
    `
    opacity: 0;
    pointer-events: none; 
  `}
`;

const MenuButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid #00ffff;
  box-shadow: 0 0 10px #00ffff, 0 0 20px #ff00ff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1001;
  animation: ${(props) => (props.isMenuClicked ? pulse : 'none')} 1s infinite;

  &:hover {
    box-shadow: 0 0 15px #00ffff, 0 0 30px #ff00ff;
  }
`;

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 15px #00ffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 999;

  ${(props) =>
    props.isOpen &&
    `
    transform: translateX(0);
  `}
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const StyledLink = styled(Link)`
  color: #00ffff;
  text-decoration: none;
  padding: 5px 10px;
  display: block;
  font-size: 0.9rem;
  border: 1px solid #00ffff;
  border-radius: 5px;
  margin-bottom: 5px;
  animation: ${glow} 1.5s infinite;

  &:hover {
    color: #ff00ff;
    text-shadow: 0 0 5px #ff00ff, 0 0 10px #00ffff;
  }
`;

const LoginDropdown = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 20px;
  width: 150px;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px;
  border-radius: 5px;
  display: ${(props) => (props.isDropdownOpen ? 'block' : 'none')};
  z-index: 1001;
`;

const DropdownItem = styled.div`
  padding: 5px 10px;
  border-radius: 3px;
  margin-bottom: 5px;
  cursor: pointer;
  border: 1px solid #00ffff;
  animation: ${glow} 1.5s infinite;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Navbar = ({ isLoggedIn, onLogout, user, navigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const nav = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsMenuClicked(!isMenuClicked);
  };

  const toggleLoginDropdown = () => setIsLoginDropdownOpen(!isLoginDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsOpen(false);
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsLoginDropdownOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <Container>
        <HealthnetLogo onClick={() => nav('/')}>Healthnet</HealthnetLogo>
      </Container>
      <NavbarContainer>
        {!isLoggedIn ? (
          <>
            <LoginButton
              onClick={toggleLoginDropdown}
              isDropdownOpen={isLoginDropdownOpen}
              isHidden={isOpen}
            >
              Login/Signup
            </LoginButton>
            <LoginDropdown
              ref={dropdownRef}
              isDropdownOpen={isLoginDropdownOpen}
            >
              <DropdownItem>
                <Link to="/login">Login</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/signup">Signup</Link>
              </DropdownItem>
            </LoginDropdown>
          </>
        ) : (
          <Link to="/profile">
            <UserIcon onClick={() => nav('/profile')} user={user} />
          </Link>
        )}
        <MenuButton onClick={toggleMenu} isMenuClicked={isMenuClicked}>
          <MdMenu size={24} color="#00ffff" />
        </MenuButton>
      </NavbarContainer>
      <MenuContainer ref={menuRef} isOpen={isOpen}>
        <LinksContainer>
          {isLoggedIn && (
            <>
              <StyledLink to="/profile" onClick={toggleMenu}>
                Account
              </StyledLink>
              <StyledLink to="/viewRecords" onClick={toggleMenu}>
                View Records
              </StyledLink>
              <StyledLink to="/uploadRecords" onClick={toggleMenu}>
                Upload Records
              </StyledLink>
            </>
          )}
          <StyledLink to="/contactUs" onClick={toggleMenu}>
            Contact Us
          </StyledLink>
          <StyledLink to="/help" onClick={toggleMenu}>
            Help
          </StyledLink>
          {isLoggedIn && (
            <StyledLink onClick={onLogout}>
              Logout
            </StyledLink>
          )}
        </LinksContainer>
      </MenuContainer>
    </>
  );
};

export default Navbar;
