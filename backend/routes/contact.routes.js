// routes/contact.routes.js
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/psu_alerts';
const client = new MongoClient(uri);

// Route to get all contacts
router.get('/', async (req, res) => {
    try {
        await client.connect();
        const contacts = await client.db('psu_alerts').collection('contact').find().toArray();
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Failed to fetch contacts' });
    } finally {
        await client.close(); // Ensure client is closed after request
    }
});

module.exports = router;
