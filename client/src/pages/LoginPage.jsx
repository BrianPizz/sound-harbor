import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { loading, error, data }] = useMutation(LOGIN_USER);

  // handle form input chhange
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // call log in user mutation on sumbit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
      // Redirect to the home page after successful login
      history.push("/");
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: "",
      password: "",
    });
  };

  return <div>
        <div>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p>Error: {error.message}</p>}
      <p>
        Don't have an account? <Link to="/">Sign up here</Link>.
      </p>
    </div>
  </div>;
};

export default Login;
