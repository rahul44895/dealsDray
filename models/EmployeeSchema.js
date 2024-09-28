const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
  f_id: { type: Number, required: true },
  f_Name: { type: String, required: true },
  f_Email: { type: String, required: true },
  f_Mobile: { type: String, required: true },
  f_Designation: {
    type: String,
    required: true,
    enum: ["HR", "Manager", "Sales"],
  },
  f_Gender: { type: String, required: true, enum: ["M", "F"] },
  f_Course: [{ type: String, required: true, enum: ["MCA", "BCA", "BSC"] }],
  f_Image: { type: String, required: true },
  f_CreateDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
