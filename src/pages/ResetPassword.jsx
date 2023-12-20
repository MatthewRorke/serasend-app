import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ZodError, z } from "zod";

import { changeUserPassword, loginUser, registerUser, resetPassword } from "../api/userApi";
import ErrorAlert from "../components/ErrorAlert";
import LoadingButton from "../components/LoadingButton";
import { getFromLocal } from "../utils/Utils";

function ResetPassword() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const [error, setError] = useState(null);
  const navigateTo = useNavigate();

  const registrationSchema = z.object({
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

  const passwordHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const registrationData = { password, email, token };
      if (!isValidRegistrationData(registrationData)) {
        throw new Error("Invalid input. Please check entered data.");
      }

      resetPassword(email, password, token).then((res) => {
        if (!res || !res.success) {
          setError(res.data.message);
        } else {
          navigateTo("/login");
        }
      });
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
    setEmail(getFromLocal("forgotPasswordEmail") || "");
  }, []);

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

  return (
    <div class='relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white'>
      <div class='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img class='mx-auto h-10 w-auto' src='https://img.icons8.com/ios/100/new-post--v1.png' alt='Serasend' />
        <h2 class='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Reset password</h2>
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
                primaryText={"Reset"}
                secondaryText={"Processing..."}
                loading={loading}
                disabled={loading || !passwordMatch}
                callback={passwordHandler}
                width={"full"}
                type={"submit"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
