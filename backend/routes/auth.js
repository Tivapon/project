const express = require('express');
const router = express.Router();

// User login route
router.post('/login/user', (req, res) => {
    const { phoneNumber } = req.body;

    // Example: Simulate correct phone number for user login
    const correctPhoneNumber = '1234567890';

    if (!phoneNumber) {
        return res.status(400).json({ msg: 'กรุณากรอกเบอร์โทรศัพท์' });
    }

    if (phoneNumber !== correctPhoneNumber) {
        return res.status(401).json({ msg: 'เบอร์โทรศัพท์ไม่ถูกต้อง' });
    }

    // If phone number is correct
    res.json({ msg: 'User login success' });
});

// Admin login route
router.post('/login/admin', (req, res) => {
    const { username, password } = req.body;

    // Example: Simulate correct username and password for admin login
    const correctUsername = 'admin';
    const correctPassword = 'password';

    if (!username || !password) {
        return res.status(400).json({ msg: 'กรุณากรอกอีเมลและรหัสผ่าน' });
    }

    if (username !== correctUsername || password !== correctPassword) {
        return res.status(401).json({ msg: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }

    // If both username and password are correct
    res.json({ msg: 'Admin login success' });
});

module.exports = router;
