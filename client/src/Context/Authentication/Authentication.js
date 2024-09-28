import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthenticationContext = createContext();
export { AuthenticationContext };

const AuthenticationState = (props) => {
  const host = process.env.REACT_APP_HOST;
  const navigate = useNavigate();

  const signup = async (credentials) => {
    const response = await fetch(`${host}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    // console.log(data);
    if (data.success) {
      localStorage.setItem("f_userName", data.user.f_userName);
      navigate("/");
    } else {
      return alert(data.error);
    }
  };

  const login = async (credentials) => {
    const response = await fetch(`${host}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    // console.log(data);
    if (data.success) {
      localStorage.setItem("f_userName", data.user.f_userName);
      navigate("/");
    } else {
      return alert(data.error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${host}/users/logout`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.removeItem("f_userName");
        navigate("/login");
      } else {
        return alert(data.error || "Logout Failed");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <AuthenticationContext.Provider value={{ signup, login, logout }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationState;
