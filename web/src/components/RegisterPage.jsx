import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

function PasswordInput({ password, setPassword, requirements }) {
  return (
    <div>
      <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
      {/* Password Validation Message */}
      <div id="message" className="text-xs mt-2 text-center">
        <p className="text-center mb-2">Password must contain the following:</p>
        <p className={requirements.hasLowercase ? "text-green-500" : "text-red-500"}>
          A <b>lowercase</b> letter
        </p>
        <p className={requirements.hasUppercase ? "text-green-500" : "text-red-500"}>
          A <b>capital (uppercase)</b> letter
        </p>
        <p className={requirements.hasNumber ? "text-green-500" : "text-red-500"}>
          A <b>number</b>
        </p>
        <p className={requirements.hasSymbol ? "text-green-500" : "text-red-500"}>
          A <b>symbol</b>
        </p>
        <p className={requirements.minLength ? "text-green-500" : "text-red-500"}>
          Minimum <b>10 characters</b>
        </p>
      </div>
    </div>
  );
}

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [requirements, setRequirements] = useState({
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSymbol: false,
    minLength: false,
  });

  const [passwordError, setPasswordError] = useState(false);

  const checkRequirements = (value) => {
    setRequirements({
      hasLowercase: /[a-z]/.test(value),
      hasUppercase: /[A-Z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      minLength: value.length >= 10,
    });
  };

  const handlePasswordChange = (value) => {
    setFormData((prev) => ({ ...prev, password: value }));
    checkRequirements(value);
    setPasswordError(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    //check if password meets requirements
    const isPasswordValid = Object.values(requirements).every((req) => req);
    if (email && password && isPasswordValid) {
      dispatch(
        registerUser({ email, password })
      )
        .unwrap()
        .then(() => {
          navigate("/login");
        })
        .catch((err) => {
          alert(err.message || "Registration failed.");
        });
    } else if (!isPasswordValid) {
      setPasswordError(true);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">Create Your Account</h2>
        {status === "loading" && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <PasswordInput
            password={formData.password}
            setPassword={handlePasswordChange}
            requirements={requirements}
          />
          {passwordError && (
            <p className="text-center text-red-500 text-sm mt-2">
              Please make sure your password meets all the requirements!!
            </p>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
          >
            Submit
          </button>
        </form>
        <p className="mt-4 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
