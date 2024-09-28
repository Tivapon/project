const User = require('../models/User'); // import model user
const bcrypt = require('bcryptjs'); // อย่าลืม import bcrypt ที่นี่
const jwt = require('jsonwebtoken'); // อย่าลืม import jwt ที่นี่

exports.registerUser = async (req, res) => {
  const { email, password, isAdmin, phoneNumber } = req.body;

  // ตรวจสอบฟิลด์ที่จำเป็นตามว่าผู้ใช้เป็นแอดมินหรือไม่
  if (isAdmin && (!email || !password)) {
    return res.status(400).json({ msg: 'Email and password are required for admin users' });
  } else if (!isAdmin && !phoneNumber) {
    return res.status(400).json({ msg: 'Phone number is required for regular users' });
  }

  try {
    let user;

    // ตรวจสอบผู้ใช้ซ้ำ
    if (isAdmin) {
      user = await User.findOne({ email });
    } else {
      user = await User.findOne({ phoneNumber });
    }

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // สร้างผู้ใช้ใหม่
    user = new User({ email, password, isAdmin, phoneNumber });

    // เข้ารหัสรหัสผ่านหากเป็นแอดมิน
    if (isAdmin) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    // สร้าง JWT payload
    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    };

    // เซ็นชื่อและส่งคืน JWT โทเค็น
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
