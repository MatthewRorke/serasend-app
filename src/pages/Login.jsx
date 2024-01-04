import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZodError, z } from "zod";

import { getUser, loginUser } from "../api/userApi";
import ErrorAlert from "../components/ErrorAlert";
import LoadingButton from "../components/LoadingButton";
import { clearLocal, getFromLocal, storeInLocal } from "../utils/Utils";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigateTo = useNavigate();

  const emailHandler = (value) => {
    setEmail(value);
  };

  const passwordHandler = (value) => {
    setPassword(value);
  };
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const isValidLoginData = (data) => {
    try {
      loginSchema.parse(data);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        return false;
      }
      throw error;
    }
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loginData = { email, password };
      if (!isValidLoginData(loginData)) {
        throw new Error("Invalid input. Please check entered data.");
      }

      const response = await loginUser(email, password);
      if (!response || !response.success) {
        throw new Error("Authentication failed");
      }
      storeInLocal("token", response.data.token);

      navigateTo("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getFromLocal("token");
    if (token) {
      getUser(token).then((res) => {
        if (res && res.success) {
          navigateTo("/dashboard");
        } else {
          clearLocal("token");
        }
      });
    }
  }, []);

  useEffect(() => {
    if (error) {
      setVisible(true);

      const timeoutId = setTimeout(() => {
        setError(null);
        setVisible(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [error]);

  return (
    <div class='relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white'>
      <div class='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img class='mx-auto h-10 w-auto' src='https://img.icons8.com/ios/100/new-post--v1.png' alt='Serasend' />
        <h2 class='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign in to your account
        </h2>
      </div>

      <div class='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <div class='w-full max-w-md'>
          {error && <ErrorAlert heading={"Login failed"} message={"Invalid credential combination"} />}
          <form class='space-y-6' onSubmit={(e) => loginHandler(e)}>
            <div>
              <label htmlFor='email' class='block text-sm font-medium leading-6 text-gray-900'>
                Email address
              </label>
              <div class='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  class='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  onChange={(e) => emailHandler(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div class='flex items-center justify-between'>
                <label htmlFor='password' class='block text-sm font-medium leading-6 text-gray-900'>
                  Password
                </label>
              </div>
              <div class='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  class='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  onChange={(e) => passwordHandler(e.target.value)}
                />
              </div>
            </div>
            <div class='flex items-center justify-between'>
              <div class='flex items-start'>
                <div class='flex items-center h-5'></div>
              </div>
              <a
                href='/forgot-password'
                class='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
              >
                Forgot password?
              </a>
            </div>
            <div>
              <LoadingButton
                primaryText={"Sign in"}
                secondaryText={"Processing..."}
                loading={loading}
                callback={loginHandler}
                width={"full"}
                type={"submit"}
              />
            </div>
            <p class='text-sm font-light text-gray-500 dark:text-gray-400'>
              Don’t have an account yet?{" "}
              <a href='/register' class='font-medium text-primary-600 hover:underline dark:text-primary-500'>
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
