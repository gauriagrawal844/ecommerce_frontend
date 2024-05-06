import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../UI/InputField';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import GradientButton from '../../UI/GradiantButton';
import { signup } from '../../services/userApi';
import { toast } from 'sonner';
import { getErrorMessage, getSuccessMessage } from '../../utils/function';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNo: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleChangeInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (
        !user.name ||
        !user.email ||
        !user.phoneNo ||
        !user.password ||
        !user.confirmPassword
      ) {
        return toast.warning('Please fill all fields');
      }
      if (user.password !== user.confirmPassword)
        return toast.warning('Password not matching');
      if (user.password.length < 7)
        return toast.warning('Password should have atleast 8 characters');
      setLoading(true);
      const res = await signup(user);
      setUser({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNo: '',
      });
      localStorage.setItem('user', JSON.stringify(res.data.data));
      if (res.data.data.role === 'admin') {
        navigate('/product/create');
      } else {
        navigate('/about');
      }
      toast.success(getSuccessMessage(res));
    } catch (error) {
      console.log(error);
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };
  //   if (loading) return <Loader />;
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
          onSubmit={handleSignUp}
        >
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <InputField
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="name"
            value={user.name}
            placeholder="Full Name"
            onChange={(e) => handleChangeInput(e)}
          />

          <InputField
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            value={user.email}
            placeholder="Email"
            onChange={(e) => handleChangeInput(e)}
          />
          <div className="flex gap-2 items-center w-full border border-grey-light p-3">
            <input
              type={showPassword ? 'text' : 'password'}
              className="block w-full rounded h-full "
              name="password"
              value={user.password}
              placeholder="Password"
              onChange={(e) => handleChangeInput(e)}
            />
            {showPassword ? (
              <FaEyeSlash size={26} onClick={togglePassword} />
            ) : (
              <FaEye size={26} onClick={togglePassword} />
            )}
          </div>
          <InputField
            value={user.confirmPassword}
            type={showPassword ? 'text' : 'password'}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={(e) => handleChangeInput(e)}
          />
          <InputField
            value={user.phoneNo}
            type="tel"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="phoneNo"
            placeholder="Phone number"
            onChange={(e) => handleChangeInput(e)}
          />
          <div className="flex w-full justify-center">
            <GradientButton
              color={'cyan'}
              loading={loading}
              color2={'red'}
              type="submit"
              label="Sign Up"
              className="w-full text-center py-3 rounded bg-green  hover:bg-green-dark focus:outline-none my-1"
            />
          </div>
        </form>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link
            className="no-underline border-b border-blue text-blue"
            to="/login"
          >
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default SignUp;
