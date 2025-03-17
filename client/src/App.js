import React from "react";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import ConnectWallet from "./components/ConnectWallet";
import OptionsPage from "./components/OptionsPage";
import UploadRecords from "./components/UploadRecords";
import ViewRecords from "./components/ViewRecords";
import Help from "./components/Help";
import ContactUs from "./components/ContactUs"; 
import { AuthContext } from "./contexts/AuthContext";
 
function App() {
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useContext(AuthContext);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={isLoggedIn ? <UserProfile user={user} /> : <Homepage />} />
        <Route path="/connect-wallet" element={isLoggedIn ? <ConnectWallet /> : <Homepage />} />
        <Route path="/options" element={<OptionsPage />} />
        <Route path="/upload-records" element={isLoggedIn ? <UploadRecords /> : <Homepage />} />
        <Route path="/view-records" element={isLoggedIn ? <ViewRecords /> : <Homepage />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contactUs" element={<ContactUs />} />
      </Routes>
    </>
  );
}

export default App;
