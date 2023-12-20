import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZodError, z } from "zod";

import { loginUser, registerUser } from "../api/userApi";
import ErrorAlert from "../components/ErrorAlert";
import LoadingButton from "../components/LoadingButton";
import { storeInLocal } from "../utils/Utils";

function Register() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const [error, setError] = useState(null);
  const navigateTo = useNavigate();

  const registrationSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8),
  });

  const isValidRegistrationData = (data) => {
    try {
      registrationSchema.parse(data);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        return false;
      }
      throw error;
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const registrationData = { username, email, password };
      if (!isValidRegistrationData(registrationData)) {
        throw new Error("Invalid input. Please check entered data.");
      }

      const registerRes = await registerUser(username, email, password);
      if (!registerRes || !registerRes.success) {
        setError(registerRes.data.error);
      } else {
        const loginRes = await loginUser(email, password);
        if (!loginRes || !loginRes.success) {
          setError("Authentication failed");
        }
        storeInLocal("token", loginRes.data.token);

        navigateTo("/register/verify");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });

  useEffect(() => {
    if (password === "") {
      setPasswordMatch(null);
    } else {
      setPasswordMatch(
        password === confirmPassword &&
          requirements.length &&
          requirements.uppercase &&
          requirements.lowercase &&
          requirements.digit
      );
    }
  }, [password, confirmPassword]);
  useEffect(() => {
    setRequirements((prev) => ({ ...prev, length: password.length >= 8 }));
    setRequirements((prev) => ({ ...prev, uppercase: /[A-Z]/.test(password) }));
    setRequirements((prev) => ({ ...prev, lowercase: /[a-z]/.test(password) }));
    setRequirements((prev) => ({ ...prev, digit: /\d/.test(password) }));
  }, [password]);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError(null);
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
        <h2 class='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Create an account</h2>
      </div>

      <div class='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <div class='w-full max-w-md'>
          {error && <ErrorAlert heading={"Login failed"} message={error} />}

          <form class='space-y-6' onSubmit={(e) => registerHandler(e)}>
            <div>
              <label htmlFor='email' class='block text-sm font-medium leading-6 text-gray-900'>
                Email address
              </label>
              <div class='mt-2'>
                <input
                  value={email}
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  class='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='email'
                class='block text-sm font-medium leading-6 text-gray-900'
                data-tooltip-target='tooltip-alias'
              >
                Alias
              </label>
              <span>(alias@serasend.com)</span>
              <div class='mt-2'>
                <input
                  value={username}
                  id='alias'
                  name='alias'
                  type='text'
                  autoComplete='alias'
                  required
                  class='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  onChange={(e) => setUsername(e.target.value)}
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
                  value={password}
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    passwordMatch ? "ring-green-400" : passwordMatch === false ? "ring-red-300" : "ring-gray-300"
                  }`}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <ul>
                <li className='text-gray-500 text-xs'>{requirements.length ? "✓" : "•"} Minimum 8 characters</li>
                <li className='text-gray-500 text-xs'>
                  {requirements.uppercase ? "✓" : "•"} At least one uppercase letter
                </li>
                <li className='text-gray-500 text-xs'>
                  {requirements.lowercase ? "✓" : "•"} At least one lowercase letter
                </li>
                <li className='text-gray-500 text-xs'>{requirements.digit ? "✓" : "•"} At least one digit</li>
              </ul>
            </div>

            <div>
              <div class='flex items-center justify-between'>
                <label htmlFor='confirm_password' class='block text-sm font-medium leading-6 text-gray-900'>
                  Confirm Password
                </label>
              </div>
              <div class='mt-2'>
                <input
                  value={confirmPassword}
                  id='confirm_password'
                  name='confirm_password'
                  type='password'
                  required
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    passwordMatch ? "ring-green-400" : passwordMatch === false ? "ring-red-300" : "ring-gray-300"
                  }`}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <LoadingButton
                primaryText={"Sign up"}
                secondaryText={"Processing..."}
                loading={loading}
                disabled={loading || !passwordMatch}
                callback={registerHandler}
                width={"full"}
                type={"submit"}
              />
            </div>
            <p class='text-sm font-light text-gray-500 dark:text-gray-400'>
              Have an account?{" "}
              <a href='/login' class='font-medium text-primary-600 hover:underline dark:text-primary-500'>
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
