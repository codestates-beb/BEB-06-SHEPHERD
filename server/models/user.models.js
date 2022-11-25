const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  account: { type: String, required: true },
  address: { type: String, required: true },
  sendOrder: { type: String, required: true },
  takeOrder: { type: String, required: true },
});

// 첫번째 인자 : 모델 이름 (대문자로 시작, 단수형으로 선언)
// 두번째 인자 : 모델에 참조할 스키마
module.exports = mongoose.model("User", userSchema);
