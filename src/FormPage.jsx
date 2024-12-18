import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
// Form page
function FormPage() {
    const [formData, setFormData] = useState({
      name: '',
      logo: '',
      currentValuation: '',
      founderName: '',
      sector: '',
      marketSize: '',
      targetAudience: '',
      companyPitchDesk: {
        image: '',
        text: ''
      },
      companyEquityStructure: '',
      numberOfSharesToSell: '',
      minimumQuantity: '',
      pricePerShare: ''
    });
  
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      if (name.includes("companyPitchDesk.")) {
        const [, key] = name.split(".");
        setFormData((prevData) => ({
          ...prevData,
          companyPitchDesk: { ...prevData.companyPitchDesk, [key]: value },
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/api/company', formData);
        alert('Company added successfully!');
        navigate('/display'); // Redirect to the display page after submission
      } catch (error) {
        console.error('Error adding company:', error);
        alert('Error adding company. Please check the console for details.');
      }
    };
  
    return (
      <div className="form-container">
        <h2>Company Form</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="card">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="card">
            <label>Logo (URL):</label>
            <input
              type="text"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
            />
          </div>
  
          <div className="card">
            <label>Current Valuation:</label>
            <input
              type="number"
              name="currentValuation"
              value={formData.currentValuation}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="card">
            <label>Founder Name:</label>
            <input
              type="text"
              name="founderName"
              value={formData.founderName}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="card">
            <label>Sector:</label>
            <input
              type="text"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="card">
            <label>Market Size:</label>
            <input
              type="text"
              name="marketSize"
              value={formData.marketSize}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="card">
            <label>Target Audience:</label>
            <input
              type="text"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="card">
            <label>Company Pitch Desk Image (URL):</label>
            <input
              type="text"
              name="companyPitchDesk.image"
              value={formData.companyPitchDesk.image}
              onChange={handleChange}
            />
          </div>
  
          <div className="card">
            <label>Company Pitch Desk Text:</label>
            <textarea
              name="companyPitchDesk.text"
              value={formData.companyPitchDesk.text}
              onChange={handleChange}
            />
          </div>
  
          <div className="card">
            <label>Equity Structure:</label>
            <textarea
              name="companyEquityStructure"
              value={formData.companyEquityStructure}
              onChange={handleChange}
            />
          </div>
  
          <div className="card">
            <label>Number of Shares to Sell:</label>
            <input
              type="number"
              name="numberOfSharesToSell"
              value={formData.numberOfSharesToSell}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="card">
            <label>Minimum Quantity to Buy:</label>
            <input
              type="number"
              name="minimumQuantity"
              value={formData.minimumQuantity}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="card">
            <label>Price per Share:</label>
            <input
              type="number"
              name="pricePerShare"
              value={formData.pricePerShare}
              onChange={handleChange}
              required
            />
          </div>
  
          <button type="submit" className="submit-button">Add Company</button>
        </form>
      </div>
    );
  }
  

  export default FormPage;