import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ username: "",email: "", password: "" });
  const [add, { loading, error, data }] = useMutation(ADD_USER);

  // handle form input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // call add user mutation on submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await add({
        variables: { ...formState },
      });
      console.log(data)
      Auth.login(data.addUser.token);
      // Redirect to the home page after successful login
      navigate.push("/");
    } catch (e) {
      console.error(e);
    }

    setFormState({
    username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex justify-center h-screen bg-sky-600">
      <div className="text-center rounded-md bg-white m-auto w-1/2 p-6">
        <p className="text-4xl my-6 font-bold">Sound Harbor</p>
        <h2 className="text-2xl mb-3 font-light text-slate-600">Create an Account</h2>
        <form onSubmit={handleFormSubmit} className="text-left">
        <div className="mb-3 transition-all duration-300">
            <label htmlFor="username" className="text-slate-500">Username:</label>
            <input
              type="username"
              id="username"
              name="username"
              value={formState.username}
              onChange={handleChange}
              required
              className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div className="mb-3 transition-all duration-300">
            <label htmlFor="email" className="text-slate-500">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div className="mb-3 transition-all duration-300">
            <label htmlFor="password" className="text-slate-500">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-700 text-white mt-2 p-2 rounded-sm hover:bg-sky-800 transition-all duration-300"
          >
            {loading ? "Signing up..." : "Create Account"}
          </button>
        </form>
        {error && <p className="text-red-500">Error: {error.message}</p>}
        <p className="mt-3 text-slate-600">
          Already have an account? <Link to="/" className="underline text-sky-500">Log in here</Link>.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
