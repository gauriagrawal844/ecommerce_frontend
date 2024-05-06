import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../UI/InputField';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import GradientButton from '../../UI/GradiantButton';
import { login, signup } from '../../services/userApi';
import { toast } from 'sonner';
import { getErrorMessage, getSuccessMessage } from '../../utils/function';
export default function Login() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!user.email || !user.password) {
        return toast.warning('Please fill all fields');
      }
      setLoading(true);
      const res = await login(user);
      setUser({
        email: '',
        password: '',
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
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email"
                  onChange={(e) => handleChangeInput(e)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <InputField
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="password"
                  onChange={(e) => handleChangeInput(e)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                 {showPassword ? (
                <FaEyeSlash size={26} onClick={togglePassword} />
                 ) : (
                <FaEye size={26} onClick={togglePassword} />
                 )}
                 
              </div>
            </div>

            <div>
              <GradientButton
                color={'cyan'}
                loading={loading}
                color2={'red'}
                type="submit"
                label="Sign In"
                className="w-full text-center py-3 rounded bg-green  hover:bg-green-dark focus:outline-none my-1"
              />
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              SignUp Now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
