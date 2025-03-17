import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Importing video from assets folder
import profileVideo from '../assets/profile.mp4';

// Define the ProfileContainer for styling
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  position: relative;
  z-index: 1;
  overflow: hidden;
  padding-top: 50px;
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

const Avatar = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 5px solid gold;
  box-shadow: 0 0 20px gold, 0 0 40px gold;
  object-fit: cover;
  animation: glow 1.5s infinite alternate;
`;

const NameBox = styled.div`
  padding: 20px;
  width: 500px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  box-shadow: 0 0 15px gold, 0 0 30px gold;
  font-size: 1.5rem;
  text-align: center;
  color: #ffcc00;
  margin-bottom: 30px;
  animation: pulse 2s infinite;
`;

const InfoBox = styled.div`
  margin: 15px 0;
  padding: 20px;
  width: 500px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  box-shadow: 0 0 15px gold, 0 0 30px gold;
  font-size: 1.5rem;
  text-align: center;
  color: #ffcc00;
  animation: pulse 2s infinite;
`;

const Form = styled.form`
  background: rgba(0, 0, 0, 0.7);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 0 15px gold, 0 0 30px gold;
  text-align: center;
  width: 500px;
  margin-top: 30px;
  font-size: 1.2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 12px 0;
  border: 2px solid gold;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: gold;
  font-size: 1.2rem;
  text-shadow: 0 0 5px silver, 0 0 10px silver; /* Silver glow */
  text-outline: 1px solid black; /* Black outline */
  
  &:focus {
    outline: none;
    border-color: #ffcc00;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(90deg, #ffcc00, #ff9900);
  color: black;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 15px gold, 0 0 30px gold;
  margin-top: 20px;
  font-size: 1.2rem;

  &:hover {
    box-shadow: 0 0 25px gold, 0 0 50px gold;
  }
`;

const EditProfileButton = styled(Button)`
  font-size: 0.8rem;
  padding: 8px;
  background: linear-gradient(90deg, #ffcc00, #ff9900);
  margin-top: 20px;
  width: 120px;
  height: 40px;
  text-align: center;
`;

const CancelButton = styled(Button)`
  background: linear-gradient(90deg, #ff4040, #ff0000);
  margin-top: 10px;
  font-size: 1rem;
  width: 48%;
`;

const WalletStatus = styled.div`
  margin-top: 20px;
  font-size: 1.2rem;
  color: gold;
  animation: pulse 2s infinite;
`;

const ShowPasswordToggle = styled.span`
  cursor: pointer;
  color: gold;
  font-size: 1.5rem;
  margin-left: 10px;
`;

const UserProfile = ({ user }) => {
  const [profileData, setProfileData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profilePic: user.profilePic || '',
    walletAddress: user.walletAddress || '',
    password: '',
    showPassword: false,
  });

  const [editing, setEditing] = useState(false);

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setProfileData({ ...profileData, showPassword: !profileData.showPassword });
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        // Upload image to server or external service
        const response = await axios.post('http://localhost:3001/api/upload', formData);
        setProfileData({ ...profileData, profilePic: response.data.url });
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:3001/api/users/${user.username}`, profileData);
      alert('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setProfileData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePic: user.profilePic || '',
      walletAddress: user.walletAddress || '',
      password: '',
      showPassword: false,
    });
  };

  return (
    <ProfileContainer>
      {/* Background Video from the assets folder */}
      <BackgroundVideo autoPlay muted loop>
        <source src={profileVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>

      <Avatar src={profileData.profilePic || '/assets/default-avatar.png'} alt="Profile Avatar" />

      {/* Name Box */}
      <NameBox>{`${profileData.firstName} ${profileData.lastName}`}</NameBox>

      {editing ? (
        <Form>
          <Input
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
          />
          <Input
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
          <Input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <Input
            type={profileData.showPassword ? 'text' : 'password'}
            name="password"
            value={profileData.password}
            onChange={handleInputChange}
            placeholder="Password"
          />
          <ShowPasswordToggle onClick={togglePasswordVisibility}>
            {profileData.showPassword ? '🙈' : '👁️'}
          </ShowPasswordToggle>
          <Input
            type="file"
            onChange={handleProfilePicChange}
            accept="image/*"
          />
          <Button type="button" onClick={handleSaveChanges}>
            Save Changes
          </Button>
          <CancelButton type="button" onClick={handleCancelEdit}>
            Cancel
          </CancelButton>
        </Form>
      ) : (
        <>
          {/* Profile Details */}
          <InfoBox>{profileData.email}</InfoBox>
          <WalletStatus>
            {profileData.walletAddress ? (
              `Wallet Address: ${profileData.walletAddress}`
            ) : (
              'Wallet Not Connected'
            )}
          </WalletStatus>

          {/* Edit Profile Button */}
          <EditProfileButton onClick={() => setEditing(true)}>
            Edit Profile
          </EditProfileButton>
        </>
      )}
    </ProfileContainer>
  );
};

export default UserProfile;
