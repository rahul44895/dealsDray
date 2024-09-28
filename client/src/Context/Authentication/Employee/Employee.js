import { createContext, useCallback, useState } from "react";

const EmployeeContext = createContext();
export { EmployeeContext };

const EmployeeState = (props) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const host = process.env.REACT_APP_HOST;

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${host}/employees`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      const data = await response.json();
      // console.log(data);
      if (data.success) {
        setEmployees(data.employees);
      } else {
        alert("Some error occurred");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  }, [host]);

  const createEmployee = async (empDetails) => {
    // console.log({ empDetails });
    const formData = new FormData();

    formData.append("f_Name", empDetails.f_Name);
    formData.append("f_Email", empDetails.f_Email);
    formData.append("f_Mobile", empDetails.f_Mobile);
    formData.append("f_Designation", empDetails.f_Designation);
    formData.append("f_Gender", empDetails.f_Gender);
    formData.append("f_Image", empDetails.f_Image);
    empDetails.f_Course.forEach((course, index) => {
      formData.append(`f_Course[${index}]`, course);
    });

    const response = await fetch(`${host}/employees/create`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await response.json();
    if (data.success) {
      alert(data.message);
      return true;
    } else {
      alert(data.error);
    }
    return false;
  };

  const deleteEmployee = async (empDetails) => {
    const confirm = window.confirm(
      `Are you sure that you wanna delete ${empDetails.f_Name}`
    );
    if (!confirm) return;
    const response = await fetch(`${host}/employees/delete/${empDetails._id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();
    if (data.success) {
      alert(data.message);
      let tempList = JSON.parse(JSON.stringify(employees));
      tempList = tempList.filter((curr) => curr._id !== empDetails._id);
      setEmployees(tempList);
    } else {
      alert(data.error);
    }
  };

  const updateEmployee = async (empDetails) => {
    // console.log(empDetails);
    const formData = new FormData();

    formData.append("f_Name", empDetails.f_Name);
    formData.append("f_Email", empDetails.f_Email);
    formData.append("f_Mobile", empDetails.f_Mobile);
    formData.append("f_Designation", empDetails.f_Designation);
    formData.append("f_Gender", empDetails.f_Gender);
    if (empDetails.f_Image) formData.append("f_Image", empDetails.f_Image);
    empDetails.f_Course.forEach((course, index) => {
      formData.append(`f_Course[${index}]`, course);
    });

    const response = await fetch(`${host}/employees/update/${empDetails._id}`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });
    const data = await response.json();
    if (data.success) {
      alert(data.message);
    } else {
      alert(data.error);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        setEmployees,
        loading,
        fetchEmployees,
        createEmployee,
        deleteEmployee,
        updateEmployee,
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeState;
