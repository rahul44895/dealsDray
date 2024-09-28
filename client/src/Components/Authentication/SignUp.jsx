import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "../../Context/Authentication/Authentication";

export default function SignUp() {
  const { signup } = useContext(AuthenticationContext);

  const [credentials, setCredentials] = useState({
    f_userName: "",
    f_Pwd: "",
    f_Confirm_Pwd: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !credentials.f_userName ||
      !credentials.f_Pwd ||
      !credentials.f_Confirm_Pwd
    ) {
      return alert("All fields are required.");
    }
    signup(credentials);
  };

  return (
    <>
      <h1 className="bg-warning p-1">SignUp</h1>
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ height: "70vh" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="f_userName"
              value={credentials.f_userName}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="f_Pwd"
              value={credentials.f_Pwd}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              name="f_Confirm_Pwd"
              value={credentials.f_Confirm_Pwd}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-warning">
            Submit
          </button>
        </form>
        <div id="emailHelp" className="form-text">
          Already have an account ? Click here to{" "}
          <Link to="/login">
            <span
              style={{
                color: `rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 1)) `,
                textDecoration: "underline ",
              }}
            >
              Login
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
