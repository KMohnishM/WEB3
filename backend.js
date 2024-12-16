const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection string (replace with your actual connection string)
const MONGO_URI = 'mongodb://localhost:27017/startupdb'; // Replace 'startupdb' with your desired database name
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define Schema and Model
const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    logo: { type: String }, // URL or file path to the logo
    currentValuation: { type: Number, required: true },
    founderName: { type: String, required: true },
    sector: { type: String, required: true },
    marketSize: { type: String, required: true },
    targetAudience: { type: String, required: true },
    companyPitchDesk: {
        image: { type: String }, // URL or file path to the image
        text: { type: String }
    },
    companyEquityStructure: { type: String }, // Detailed description
    numberOfSharesToSell: { type: Number, required: true },
    minimumQuantity: { type: Number, required: true },
    pricePerShare: { type: Number, required: true }
});
const Company = mongoose.model('Company', CompanySchema);

// API to add a new company
app.post('/api/company', async (req, res) => {
    try {
        const company = new Company(req.body);
        await company.save();
        res.status(201).json(company);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to get all companies
app.get('/api/companies', async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to get a single company by ID
app.get('/api/company/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) return res.status(404).json({ error: 'Company not found' });
        res.json(company);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to update a company by ID
app.put('/api/company/:id', async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!company) return res.status(404).json({ error: 'Company not found' });
        res.json(company);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to delete a company by ID
app.delete('/api/company/:id', async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) return res.status(404).json({ error: 'Company not found' });
        res.json({ message: 'Company deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
const PORT = 5000; // Use a fixed port number
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
