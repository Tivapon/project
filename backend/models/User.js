const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: function () {
      return !this.isAdmin; // ต้องมีสำหรับผู้ใช้ทั่วไป
    },
    unique: true, // เพิ่ม unique เพื่อป้องกันการสร้างผู้ใช้ที่มีเบอร์โทรศัพท์ซ้ำ
  },
  email: {
    type: String,
    required: function () {
      return this.isAdmin; // ต้องมีสำหรับผู้ดูแลระบบ
    },
    unique: true, // เพิ่ม unique เพื่อป้องกันการสร้างผู้ใช้ที่มีอีเมลซ้ำ
  },
  password: {
    type: String,
    required: function () {
      return this.isAdmin; // ต้องมีสำหรับผู้ดูแลระบบ
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', UserSchema);
