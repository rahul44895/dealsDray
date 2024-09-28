import React, { useContext, useState } from "react";
import { EmployeeContext } from "../../Context/Authentication/Employee/Employee";

export default function EmployeeCreate() {
  const { createEmployee } = useContext(EmployeeContext);

  const [empDetails, setEmpDetails] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_Gender: "",
    f_Course: [],
    f_Image: "",
  });
  const onChange = (e) => {
    setEmpDetails({ ...empDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createEmployee(empDetails);
    if (res) {
      setEmpDetails({
        f_Name: "",
        f_Email: "",
        f_Mobile: "",
        f_Designation: "",
        f_Gender: "",
        f_Course: [],
        f_Image: "",
      });
    }
  };
  return (
    <div>
      <h1 className="bg-warning p-1">Employee - Create</h1>
      <form style={{ width: "80%", margin: "auto" }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="f_Name" className="form-label">
            Name
          </label>
          <input
            className="form-control"
            id="f_Name"
            name="f_Name"
            value={empDetails.f_Name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="f_Email" className="form-label">
            Email
          </label>
          <input
            className="form-control"
            id="f_Email"
            name="f_Email"
            type="email"
            value={empDetails.f_Email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="f_Mobile" className="form-label">
            Mobile
          </label>
          <input
            className="form-control"
            id="f_Mobile"
            name="f_Mobile"
            value={empDetails.f_Mobile}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="f_Designation" className="form-label">
            Designation
          </label>
          <select
            className="form-dropdown"
            id="f_Designation"
            name="f_Designation"
            onChange={(e) => {
              if (e.target.value === "SELECT")
                return alert("Select a designation");
              onChange(e);
            }}
          >
            <option value="SELECT">SELECT</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="mb-3 ">
          <label htmlFor="f_Gender" className="form-label">
            Gender
          </label>
          <div className="d-flex gap-5">
            <div>
              <input
                type="radio"
                id="f_GenderM"
                name="f_Gender"
                value="M"
                className="m-1"
                onChange={(e) => {
                  setEmpDetails({ ...empDetails, f_Gender: e.target.value });
                }}
              />
              <label htmlFor="f_GenderM">Male</label>
            </div>
            <div>
              <input
                type="radio"
                id="f_GenderF"
                name="f_Gender"
                value="F"
                className="m-1"
                onChange={(e) => {
                  setEmpDetails({ ...empDetails, f_Gender: e.target.value });
                }}
              />
              <label htmlFor="f_GenderF">Female</label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="f_Course" className="form-label">
            Course
          </label>
          <div className="d-flex gap-5">
            <div>
              <input
                type="checkbox"
                id="f_CourseMCA"
                name="f_CourseMCA"
                value="MCA"
                className="m-1"
                onChange={(e) => {
                  const { value, checked } = e.target;
                  let updatedCourses;

                  if (checked) {
                    // Add the course to the list
                    updatedCourses = [...empDetails.f_Course, value];
                  } else {
                    // Remove the course from the list
                    updatedCourses = empDetails.f_Course.filter(
                      (course) => course !== value
                    );
                  }

                  setEmpDetails({
                    ...empDetails,
                    f_Course: updatedCourses,
                  });
                }}
              />
              <label htmlFor="f_CourseMCA">MCA</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="f_CourseBCA"
                name="f_CourseBCA"
                value="BCA"
                className="m-1"
                onChange={(e) => {
                  const { value, checked } = e.target;
                  let updatedCourses;

                  if (checked) {
                    // Add the course to the list
                    updatedCourses = [...empDetails.f_Course, value];
                  } else {
                    // Remove the course from the list
                    updatedCourses = empDetails.f_Course.filter(
                      (course) => course !== value
                    );
                  }

                  setEmpDetails({
                    ...empDetails,
                    f_Course: updatedCourses,
                  });
                }}
              />
              <label htmlFor="f_CourseBCA">BCA</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="f_CourseBSC"
                name="f_CourseBSC"
                value="BSC"
                className="m-1"
                onChange={(e) => {
                  const { value, checked } = e.target;
                  let updatedCourses;

                  if (checked) {
                    // Add the course to the list
                    updatedCourses = [...empDetails.f_Course, value];
                  } else {
                    // Remove the course from the list
                    updatedCourses = empDetails.f_Course.filter(
                      (course) => course !== value
                    );
                  }

                  setEmpDetails({
                    ...empDetails,
                    f_Course: updatedCourses,
                  });
                }}
              />
              <label htmlFor="f_CourseBSC">BSc.</label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="f_Image" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="f_Image"
            name="f_Image"
            onChange={(e) => {
              const type = e.target.files[0].type;
              if (
                type !== "image/png" &&
                type !== "image/jpg" &&
                type !== "image/jpeg"
              ) {
                return alert("Only jpg/png files are allowed.");
              }
              setEmpDetails({ ...empDetails, f_Image: e.target.files[0] });
            }}
          />
        </div>
        <button type="submit" className="btn btn-warning">
          Submit
        </button>
      </form>
    </div>
  );
}
