const jwt = require('jsonwebtoken'); // อย่าลืม import jwt ที่นี่

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  // ตรวจสอบว่ามีโทเค็นหรือไม่
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // เก็บข้อมูลผู้ใช้ที่ได้รับจากการตรวจสอบ
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token expired, please log in again' });
    }
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
