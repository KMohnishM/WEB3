import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './LoginPopup.css';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    termsAgreed: false,
  });

  const navigate = useNavigate(); // Initialize the navigate function

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = () => {
    setFormData((prev) => ({
      ...prev,
      termsAgreed: !prev.termsAgreed,
    }));
  };

  // Handle submit (sign up or login)
  const handleSubmit = () => {
    // Check if all required fields are filled and the checkbox is checked
    if (
      !formData.email ||
      !formData.password ||
      (currState === "Sign Up" && !formData.name) ||
      !formData.termsAgreed
    ) {
      alert("Please fill in all details and agree to the terms.");
      return;
    }

    setShowLogin(false); // Close the login popup

    // Navigate based on the current state
    if (currState === "Sign Up") {
      navigate('/form'); // Navigate to the form page when signing up
    } else {
      // Pass the user data (name, email, password) to the DisplayPage on login
      navigate('/display', { state: { name: formData.name, email: formData.email, password: formData.password } });
    }
  };

  // Close the popup and open the form page
  const closePopupAndOpenForm = () => {
    setShowLogin(false); // Close the login popup
    navigate('/form'); // Navigate to the form page
  };

  return (
    <div className='login-popup'>
      <div className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={closePopupAndOpenForm} alt="close" /> {/* Close and navigate to form */}
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              type="text"
              placeholder='Your name'
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          )}
          <input
            type="email"
            placeholder='Your email'
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder='Password'
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleSubmit}>
          {currState === "Login" ? "Login" : "Create account"}
        </button>
        <div className="login-popup-condition">
          <input
            type="checkbox"
            checked={formData.termsAgreed}
            onChange={handleCheckboxChange}
          />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
        }
      </div>
    </div>
  );
};

export default LoginPopup;
