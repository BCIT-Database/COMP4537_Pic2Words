import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./slices/userSlice";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from "./components/Navigation";
import Login from './components/LoginPage';
import Register from './components/RegisterPage';
import HomePage from './components/HomePage';
import ForgotPassword from './components/ForgotPasswordPage';
import ResetPassword from './components/ResetPasswordPage';
import ReceiptUpload from './components/ReceiptUploadPage';

const AppContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/receipt-upload' element={<ReceiptUpload />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='*' element={<div> 404 page 😖</div>} />
      </Routes>
    </>
  )


  // .env variables used so far:
  // PORT=5000
  // MONGO_URI=
  // JWT_SECRET
  // NODE_ENV=development
  // CLOUDINARY_CLOUD_NAME=
  // CLOUDINARY_API_KEY=
  // CLOUDINARY_API_SECRET=
  // EMAIL_USER =
  // EMAIL_PASS =

  // Delete mysql variables 
  // MYSQL_HOST=
  // MYSQL_PORT=
  // MYSQL_USER=
  // MYSQL_PASSWORD=
  // MYSQL_DATABASE=
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
