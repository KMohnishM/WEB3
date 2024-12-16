import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
let i=0;
// Display Page
function DisplayPage() {
    const [company, setCompany] = useState(null);
  
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/companies');
        if (response.data.length > 0) {
          // Display the first company (most recent)
          setCompany(response.data[i]);
          i++;
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };
  
    useEffect(() => {
      fetchCompanyData();
    }, []);
  
    if (!company) {
      return <p>Loading company details...</p>;
    }
  
    return (
      <div className="display-container">
        <h2>Company Details</h2>
        <div className="company-details">
          <div className="card">
            <h3>Name:</h3>
            <p>{company.name}</p>
          </div>
          <div className="card">
            <h3>Logo:</h3>
            <img src={company.logo} alt={company.name} className="company-logo" />
          </div>
          <div className="card">
            <h3>Founder:</h3>
            <p>{company.founderName}</p>
          </div>
          <div className="card">
            <h3>Sector:</h3>
            <p>{company.sector}</p>
          </div>
          <div className="card">
            <h3>Market Size:</h3>
            <p>{company.marketSize}</p>
          </div>
          <div className="card">
            <h3>Target Audience:</h3>
            <p>{company.targetAudience}</p>
          </div>
          <div className="card">
            <h3>Pitch Desk:</h3>
            <img src={company.companyPitchDesk.image} alt="Pitch" className="pitch-image" />
            <p>{company.companyPitchDesk.text}</p>
          </div>
          <div className="card">
            <h3>Equity Structure:</h3>
            <p>{company.companyEquityStructure}</p>
          </div>
          <div className="card">
            <h3>Number of Shares to Sell:</h3>
            <p>{company.numberOfSharesToSell}</p>
          </div>
          <div className="card">
            <h3>Minimum Quantity:</h3>
            <p>{company.minimumQuantity}</p>
          </div>
          <div className="card">
            <h3>Price Per Share:</h3>
            <p>{company.pricePerShare}</p>
          </div>
        </div>
        <Link to="/form" className="back-button">Back to Form</Link>
      </div>
    );
  }
  

  export default DisplayPage;