import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPopup from './LoginPopup';
import FormPage from './FormPage';
import DisplayPage from './DisplayPage';

function App() {
  const [showLogin, setShowLogin] = useState(true); // Initially show the login popup
  const navigate = useNavigate(); // This will work now inside Router context

  const handleSignUpClick = () => {
    setShowLogin(false); // Hide the login popup
    navigate('/form'); // Navigate to the form page when the user clicks "Sign Up"
  };

  return (
    <div className="App">
      {showLogin ? (
        <LoginPopup setShowLogin={setShowLogin} handleSignUpClick={handleSignUpClick} />
      ) : (
        <Routes>
          <Route path="/form" element={<FormPage />} />
          <Route path="/display" element={<DisplayPage />} />
        </Routes>
      )}
    </div>
  );
}

// Wrap the App component inside Router to provide routing context
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
