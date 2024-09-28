const express = require("express");
const EmployeeSchema = require("../models/EmployeeSchema");
const router = express.Router();
const upload = require("../middlewares/multer.js");
const fs = require("fs");
const DecodeToken = require("../middlewares/DecodeToken.js");

router.get("/", DecodeToken, async (req, res) => {
  try {
    const employees = await EmployeeSchema.find();
    res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Error fetching employees" });
  }
});

router.post(
  "/create",
  DecodeToken,
  upload.single("f_Image"),
  async (req, res) => {
    const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } =
      req.body;
    const requiredFields = [
      "f_Name",
      "f_Email",
      "f_Mobile",
      "f_Designation",
      "f_Gender",
      "f_Course",
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        deleteFile(req.file?.path);
        return res
          .status(400)
          .json({ success: false, error: `${field} is required.` });
      }
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!req.body.f_Email.match(emailPattern)) {
      deleteFile(req.file?.path);
      return res
        .status(400)
        .json({ success: false, error: "Invalid email format." });
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!req.body.f_Mobile.match(phonePattern)) {
      deleteFile(req.file?.path);
      return res.status(400).json({
        success: false,
        error: "Invalid phone number. It should be exactly 10 digits.",
      });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: `Image is required.` });
    }
    try {
      const existingEmployee = await EmployeeSchema.findOne({ f_Email });
      if (existingEmployee) {
        deleteFile(req.file?.path);
        return res.status(400).json({
          success: false,
          error: "Employee with this email already exists.",
        });
      }
      const totalEmployees = await EmployeeSchema.countDocuments();
      const employee = new EmployeeSchema({
        f_id: totalEmployees + 1,
        f_Name,
        f_Email,
        f_Mobile,
        f_Designation,
        f_Gender,
        f_Course,
        f_Image: req.file.path,
      });
      await employee.save();
      res.status(201).json({
        success: true,
        message: "Employee created successfully",
        employee,
      });
    } catch (error) {
      deleteFile(req.file?.path);
      console.error(error.message);
      res.status(500).json({
        success: false,
        error: "Error creating employee",
        details: error.message,
      });
    }
  }
);

router.put(
  "/update/:id",
  DecodeToken,
  upload.single("f_Image"),
  async (req, res) => {
    const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } =
      req.body;

    try {
      const employee = await EmployeeSchema.findById(req.params.id);
      if (!employee) {
        return res
          .status(404)
          .json({ success: false, error: "Employee not found" });
      }

      // Check for existing email
      if (f_Email) {
        const existingEmployee = await EmployeeSchema.findOne({ f_Email });
        if (
          existingEmployee &&
          existingEmployee._id.toString() !== employee._id.toString()
        ) {
          deleteFile(req.file?.path);
          return res
            .status(400)
            .json({ success: false, error: "Email already registered." });
        }
      }

      // Update employee fields
      if (f_Name) employee.f_Name = f_Name;
      if (f_Email) employee.f_Email = f_Email;
      if (f_Mobile) employee.f_Mobile = f_Mobile;
      if (f_Designation) employee.f_Designation = f_Designation;
      if (f_Gender) employee.f_Gender = f_Gender;
      if (f_Course) employee.f_Course = f_Course;

      // Handle file update
      if (req.file) {
        deleteFile(employee.f_Image); // Delete old image if a new one is uploaded
        employee.f_Image = req.file.path;
      }

      await employee.save();
      res.status(200).json({
        success: true,
        message: "Employee updated successfully",
        employee,
      });
    } catch (error) {
      if (req.file) deleteFile(req.file.path);
      console.error(error);
      res
        .status(500)
        .json({ success: false, error: "Error updating employee details" });
    }
  }
);

router.delete("/delete/:id", DecodeToken, async (req, res) => {
  try {
    const employee = await EmployeeSchema.findById(req.params.id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    await EmployeeSchema.findByIdAndDelete(req.params.id);
    deleteFile(employee.f_Image);
    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      deletedEmployee: employee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Error deleting employee" });
  }
});

const deleteFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.rm(filePath, { recursive: true, force: true }, (err) => {
      if (err) {
        console.error(`Failed to delete file: ${filePath}`, err);
      } else {
        console.log(`${filePath} is deleted successfully.`);
      }
    });
  }
};

module.exports = router;
