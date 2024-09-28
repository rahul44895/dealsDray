import React, { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../../Context/Authentication/Employee/Employee";
import { Link, useNavigate } from "react-router-dom";

export default function Employee() {
  const { employees, setEmployees, fetchEmployees, loading, deleteEmployee } =
    useContext(EmployeeContext);
  const host = process.env.REACT_APP_HOST;
  const navigate = useNavigate();

  const handleFetch = async () => {
    fetchEmployees();
    console.log(employees);
  };
  useEffect(() => {
    handleFetch();
  }, []);

  const formatDate = (val) => {
    const date = new Date(val);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth());
    const year = date.getFullYear().toString().slice(2);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${day}-${monthNames[month]}-${year}`;
  };

  const handleSort = (field) => {
    let sortedField = [...employees];
    if (field === "f_CreateDate") {
      sortedField = sortedField.sort(
        (a, b) => new Date(a.f_CreateDate) - new Date(b.f_CreateDate)
      );
    } else {
      sortedField = sortedField.sort((a, b) => {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
        return 0;
      });
    }
    console.log(sortedField);
    setEmployees(sortedField);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.f_id.toString().includes(searchTerm) ||
      employee.f_Name.toLowerCase().includes(searchTerm) ||
      employee.f_Email.toLowerCase().includes(searchTerm) ||
      employee.f_Mobile.toLowerCase().includes(searchTerm) ||
      employee.f_Designation.toLowerCase().includes(searchTerm) ||
      employee.f_Gender.toLowerCase().includes(searchTerm) ||
      employee.f_Course.some((course) =>
        course.toLowerCase().includes(searchTerm)
      )
  );

  return (
    <div>
      <h1 className="bg-warning p-1">Employee</h1>
      
      {!loading ? (
        <>
          <div
            className="d-flex justify-content-end align-items-center gap-5"
            style={{ padding: "0 1em" }}
          >
            <div>Total Count:{employees.length} </div>
            <Link to="/employee/create">
              <button className="btn btn-warning">Create Employee</button>
            </Link>
          </div>
          <div
            className="d-flex justify-content-end align-items-center gap-5"
            style={{ padding: "0 1em" }}
          >
            <div>Search </div>
            <input
              placeholder="Enter search keyword"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value.toLocaleLowerCase())
              }
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(10, 1fr)",
              gap: "0px",
              width: "100%",
            }}
          >
            <div className="table-header" onClick={() => handleSort("f_id")}>
              Unique ID
            </div>
            <div className="table-header">Image</div>
            <div className="table-header" onClick={() => handleSort("f_Name")}>
              Name
            </div>
            <div className="table-header" onClick={() => handleSort("f_Email")}>
              Email
            </div>
            <div className="table-header">Mobile No.</div>
            <div className="table-header">Designation</div>
            <div className="table-header">Gender</div>
            <div className="table-header">Course</div>
            <div
              className="table-header"
              onClick={() => handleSort("f_CreateDate")}
            >
              Create Date
            </div>
            <div className="table-header">Action</div>

            {filteredEmployees.length > 0 &&
              filteredEmployees.map((employee) => (
                <React.Fragment key={employee._id}>
                  <div className="table-column">{employee.f_id || ""}</div>
                  <div className="table-column">
                    <img
                      src={`${host}/${employee.f_Image}`}
                      alt={employee.f_Name}
                      style={{
                        height: "50px",
                        width: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="table-column">{employee.f_Name}</div>
                  <div className="table-column">{employee.f_Email}</div>
                  <div className="table-column">{employee.f_Mobile}</div>
                  <div className="table-column">{employee.f_Designation}</div>
                  <div className="table-column">{employee.f_Gender}</div>
                  <div className="table-column">
                    {employee.f_Course.map((curr, index) => {
                      return `${curr}${
                        index + 1 != employee.f_Course.length ? ", " : ""
                      }`;
                    })}
                  </div>
                  <div className="table-column">
                    {formatDate(employee.f_CreateDate)}
                  </div>
                  <div className="table-column">
                    <button
                      className="btn btn-warning mx-1"
                      onClick={() => {
                        navigate("/employee/update", { state: { employee } });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => deleteEmployee(employee)}
                    >
                      Delete
                    </button>
                  </div>
                </React.Fragment>
              ))}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
