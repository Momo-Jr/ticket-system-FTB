import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth || {}
  );

  const onChange = (event, id) => {
    setFormData((prevState) => ({
      ...prevState,
      [id]: event.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> SignIn
        </h1>
        <p>Login into your account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(event) => onChange(event, "email")}
              id="email"
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(event) => onChange(event, "password")}
              id="password"
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
