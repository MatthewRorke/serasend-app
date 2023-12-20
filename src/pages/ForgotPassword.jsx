import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZodError, z } from "zod";

import { changeUserPassword, loginUser, registerUser, requestPasswordReset } from "../api/userApi";
import ErrorAlert from "../components/ErrorAlert";
import LoadingButton from "../components/LoadingButton";
import { storeInLocal } from "../utils/Utils";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const navigateTo = useNavigate();

  const registrationSchema = z.object({
    email: z.string().email(),
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

  const emailHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const registrationData = { email };
      if (!isValidRegistrationData(registrationData)) {
        throw new Error("Invalid input. Please check entered data.");
      }
      storeInLocal("forgotPasswordEmail", email);
      requestPasswordReset(email).then((res) => {
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

  return (
    <div class='relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white'>
      <div class='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img class='mx-auto h-10 w-auto' src='https://img.icons8.com/ios/100/new-post--v1.png' alt='Serasend' />
        <h2 class='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Forgot password</h2>
      </div>

      <div class='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <div class='w-full max-w-md'>
          {error && <ErrorAlert heading={"Failed"} message={"Invalid input"} />}
          <form class='space-y-6' onSubmit={(e) => loginHandler(e)}>
            <div>
              <label htmlFor='email' class='block text-sm font-medium leading-6 text-gray-900'>
                Email
              </label>
              <div class='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  class='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>

            <div>
              <LoadingButton
                primaryText={"Send reset instructions"}
                secondaryText={"Processing..."}
                loading={loading}
                disabled={loading}
                callback={emailHandler}
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

export default ForgotPassword;
