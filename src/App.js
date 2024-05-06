import React from 'react';
import Navbar from './components/Navbar';
import { Toaster } from 'sonner';
import AllProducts from './components/Product/AllProducts';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';
const App = () => {
  return (
    <>
      <Toaster position="top-center" richColors />
      <Navbar />
      <Routes>
        <Route path="/product/create" element={<AllProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<h1>About</h1>} />
      </Routes>
    </>
  );
};

export default App;
