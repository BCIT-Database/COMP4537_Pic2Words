import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../slices/userSlice";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.users);

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      dispatch(
        forgotPassword( email )
      )
        .unwrap()
        .then(() => {
          setMessage(response.message);
        })
        .catch((err) => {
          setMessage(err.message || "Failed to send reset link.");
        });
    } else {
      setMessage("Please enter a valid email.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">Request Password Reset</h2>
        {status === "loading" && <p className="text-center text-gray-500">Loading...</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition">Send Reset Link</button>
        </form>
           {message && <p className={`text-center mt-4 ${status === "failed" ? "text-red-500" : "text-gray-600"}`}>{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;