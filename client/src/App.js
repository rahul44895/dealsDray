import { Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Cookie from "js-cookie";
import Home from "./Components/Home/Home.jsx";
import Login from "./Components/Authentication/Login.jsx";
import SignUp from "./Components/Authentication/SignUp.jsx";
import AuthenticationState from "./Context/Authentication/Authentication.js";
import Navbar from "./Components/Home/Navbar.jsx";
import EmployeeState from "./Context/Authentication/Employee/Employee.js";
import Employee from "./Components/Employee/Employee.jsx";
import EmployeeCreate from "./Components/Employee/EmployeeCreate.jsx";
import EmployeeUpdate from "./Components/Employee/EmployeeUpdate.jsx";

function App() {
  const ProtectedRoute = ({ element: Component }) => {
    const token = Cookie.get("token");
    return token ? Component : <Navigate to={"/login"} />;
  };

  return (
    <AuthenticationState>
      <EmployeeState>
        <Navbar />

        <Routes>
          <Route
            exact
            path="/"
            element={<ProtectedRoute element={<Home />} />}
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route
            exact
            path="/employee"
            element={<ProtectedRoute element={<Employee />} />}
          />
          <Route
            exact
            path="/employee/create"
            element={<ProtectedRoute element={<EmployeeCreate />} />}
          />
          <Route
            exact
            path="/employee/update"
            element={<ProtectedRoute element={<EmployeeUpdate />} />}
          />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </EmployeeState>
    </AuthenticationState>
  );
}

export default App;
