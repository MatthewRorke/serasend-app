import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { getUser } from "../api/userApi";
import ErrorAlert from "../components/ErrorAlert";
import LoadingButton from "../components/LoadingButton";
import { clearLocal, getFromLocal } from "../utils/Utils";

function VerifyEmail() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigateTo = useNavigate();

  const token = getFromLocal("token");

  const logout = () => {
    clearLocal("token");
    navigateTo("/login");
  };

  const checkVerification = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!token) {
        logout();
      }

      const userData = await getUser(token);
      if (userData && userData.success) {
        if (userData.data.verifiedEmail) {
          navigateTo("/dashboard");
        } else {
          setError("Couldn't verify email...");
        }
      } else {
        logout();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      logout();
    }
    getUser(token).then((res) => {
      if (res && res.success) {
        setEmail(res.data.email);
        if (res.data.verifiedEmail) {
          navigateTo("/dashboard");
        }
      }
    });
  }, []);

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
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white'>
      {error && <ErrorAlert heading={"Verification failed"} message={"Couldn't verify email"} />}
      <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white'>
        <div className='max-w-xl px-5 text-center'>
          <img class='mx-auto h-10 w-auto' src='https://img.icons8.com/ios/100/new-post--v1.png' alt='Serasend' />

          <h2 class='mb-2 text-[42px] font-bold text-zinc-800'>Check your inbox</h2>
          <p class='mb-2 text-lg text-zinc-500'>
            We are glad, that you’re with us! We’ve sent you a verification link to the email address{" "}
            <span class='font-medium text-indigo-500'>{email}</span>.
          </p>
          <br />
          <LoadingButton
            primaryText={"Open the App →"}
            secondaryText={"Processing..."}
            loading={loading}
            callback={checkVerification}
            width={"64"}
          />
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
