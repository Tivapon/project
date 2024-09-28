const bcrypt = require('bcryptjs'); // อย่าลืม import bcrypt ที่นี่
const jwt = require('jsonwebtoken'); // อย่าลืม import jwt ที่นี่
const User = require('../models/User'); // import model user

exports.loginUser = async (req, res) => {
  const { phoneNumber } = req.body;

  // ตรวจสอบว่ามีการระบุเบอร์โทรศัพท์หรือไม่
  if (!phoneNumber) {
    return res.status(400).json({ msg: 'Phone number is required' });
  }

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    // สร้าง JWT โทเค็น
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // ตรวจสอบว่ามีการระบุอีเมลและรหัสผ่านหรือไม่
  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password are required' });
  }

  try {
    const admin = await User.findOne({ email });

    // ตรวจสอบว่าผู้ใช้เป็นแอดมินและมีอยู่จริงหรือไม่
    if (!admin || !admin.isAdmin) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // ตรวจสอบความถูกต้องของรหัสผ่าน
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // สร้าง JWT โทเค็น
    const token = jwt.sign(
      { id: admin._id, isAdmin: admin.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
