import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZodError, z } from "zod";

import { changeUserPassword } from "../api/userApi";
import ErrorAlert from "../components/ErrorAlert";
import LoadingButton from "../components/LoadingButton";
import PriceCardAlt from "../components/PriceCardAlt";
import MainLayout from "../layout/MainLayout";
import { PACKAGE_LISTING } from "../utils/Constants";
import { getFromLocal, storeInLocal } from "../utils/Utils";

function Settings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);

  const [changeEmail, setChangeEmail] = useState(false);
  const [changeAlias, setChangeAlias] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [error, setError] = useState(null);

  const [loadingPasswordConfig, setLoadingPasswordConfig] = useState(false);
  const [showPackage, setShowPackage] = useState(0);

  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });
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

  useEffect(() => {
    if (newPassword === "") {
      setPasswordMatch(null);
    } else {
      setPasswordMatch(
        newPassword === confirmPassword &&
          requirements.length &&
          requirements.uppercase &&
          requirements.lowercase &&
          requirements.digit
      );
    }
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    setRequirements((prev) => ({ ...prev, length: newPassword.length >= 8 }));
    setRequirements((prev) => ({ ...prev, uppercase: /[A-Z]/.test(newPassword) }));
    setRequirements((prev) => ({ ...prev, lowercase: /[a-z]/.test(newPassword) }));
    setRequirements((prev) => ({ ...prev, digit: /\d/.test(newPassword) }));
  }, [newPassword]);

  useEffect(() => {
    setShowPackage(parseInt(getFromLocal("selectedPackagePurchase") || 0));
  }, []);

  const handleUserConfig = (e) => {
    e.preventDefault();
    // Update email
    // Update alias
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (changePassword) {
      setLoadingPasswordConfig(true);
      const registrationData = { password: newPassword };
      if (!isValidRegistrationData(registrationData)) {
        throw new Error("Invalid input. Please check entered data.");
      }
      changeUserPassword(getFromLocal("token"), newPassword, currentPassword)
        .then((res) => {
          if (!res || !res.success) {
            setError(res.data.error);
          } else {
            navigateTo("/login");
          }
        })
        .finally(() => {
          setLoadingPasswordConfig(false);
        });
    }
  };

  const handlePackageSelection = (e) => {
    e.preventDefault();
    storeInLocal("selectedPackagePurchase", e.target.id);
    storeInLocal("selectedPackagePurchase", showPackage);
    navigateTo("/packages/checkout");
  };

  return (
    <MainLayout>
      <div class='flex flex-wrap items-start justify-center h-screen p-4'>
        {/* <div class='bg-white rounded shadow-md max-w-2xl min-w-2xl w-full space-y-8 m-3 p-6'>
          <h2 className='text-2xl font-bold mb-4'>User Configuration</h2>
          <form id='configForm' className='space-y-4' onSubmit={(e) => handleUserConfig(e)}>
            <div className='flex flex-col md:flex-row items-start md:items-center space-y-8 md:space-y-0 md:space-x-8'>
              <div className='flex items-center w-96'>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700 p-3'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='mt-1 p-2 block w-full rounded-md border-gray-300'
                  disabled={!changeEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <label className='relative inline-flex items-center cursor-pointer md:ml-auto'>
                <input
                  type='checkbox'
                  checked={changeEmail}
                  className='sr-only peer'
                  onChange={(e) => setChangeEmail(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>Change Email</span>
              </label>
            </div>

            <div className='flex flex-col md:flex-row items-start md:items-center space-y-8 md:space-y-0 md:space-x-8'>
              <div className='flex items-center w-96'>
                <label htmlFor='alias' className='block text-sm font-medium text-gray-700 p-3'>
                  Alias
                </label>
                <input
                  type='text'
                  id='alias'
                  name='alias'
                  className='mt-1 p-2 block w-full rounded-md border-gray-300'
                  disabled={!changeAlias}
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                />
              </div>

              <label className='relative inline-flex items-center cursor-pointer md:ml-auto'>
                <input
                  type='checkbox'
                  checked={changeAlias}
                  className='sr-only peer'
                  onChange={(e) => setChangeAlias(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>Change Alias</span>
              </label>
            </div>
            <LoadingButton
              primaryText={"Save changes"}
              secondaryText={"Processing..."}
              loading={loadingUserConfig}
              disabled={loadingUserConfig || !(changeAlias || changeEmail)}
              callback={(e) => handleUserConfig(e)}
              width={"34"}
              type={"submit"}
            />
          </form>
        </div> */}
        {error && <ErrorAlert heading={"Login failed"} message={error} />}

        <div className='bg-white rounded shadow-md max-w-2xl min-w-2xl w-full space-y-8 m-3 p-6'>
          <h2 className='text-2xl font-bold mb-4'>Change Password</h2>
          <form id='passwordForm' className='space-y-4' onSubmit={(e) => handlePasswordChange(e)}>
            <label className='relative inline-flex items-center cursor-pointer md:ml-auto'>
              <input
                type='checkbox'
                checked={changePassword}
                className='sr-only peer'
                onChange={(e) => setChangePassword(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>Change Password</span>
            </label>
            <div className='space-y-4'>
              <label htmlFor='current_password' className='block text-sm font-medium text-gray-700'>
                Current password
              </label>
              <input
                type='password'
                id='current_password'
                name='current_password'
                className='mt-1 p-2 block w-full rounded-md border-gray-300'
                onChange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword}
                disabled={!changePassword}
              />
            </div>

            <div className='space-y-4'>
              <label htmlFor='new_password' className='block text-sm font-medium text-gray-700'>
                New password
              </label>
              <input
                type='password'
                id='new_password'
                name='new_password'
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  passwordMatch ? "ring-green-400" : passwordMatch === false ? "ring-red-300" : "ring-gray-300"
                }`}
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                disabled={!changePassword}
              />
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

            <div className='space-y-4'>
              <label htmlFor='confirm_password' className='block text-sm font-medium text-gray-700'>
                Confirm password
              </label>
              <input
                type='password'
                id='confirm_password'
                name='confirm_password'
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  passwordMatch ? "ring-green-400" : passwordMatch === false ? "ring-red-300" : "ring-gray-300"
                }`}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                disabled={!changePassword}
              />
            </div>

            <LoadingButton
              primaryText={"Save changes"}
              secondaryText={"Processing..."}
              loading={loadingPasswordConfig}
              disabled={loadingPasswordConfig || !changePassword || !passwordMatch}
              callback={(e) => handlePasswordChange(e)}
              width={"34"}
              type={"submit"}
              active={!(!changePassword || !passwordMatch)}
            />
          </form>
        </div>

        <div className='bg-white rounded shadow-md max-w-2xl min-w-2xl w-full space-y-8 m-3 p-6'>
          <h2 className='text-2xl font-bold mb-4'>Select package</h2>

          <div class='md:flex'>
            <ul class='flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0'>
              <li>
                <button
                  type='button'
                  class={
                    showPackage === 0
                      ? `text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center w-32 justify-center`
                      : "text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded text-sm px-5 py-2.5 mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 inline-flex items-center w-32 justify-center"
                  }
                  onClick={() => setShowPackage(0)}
                >
                  Starter
                </button>
              </li>
              <li>
                <button
                  type='button'
                  class={
                    showPackage === 1
                      ? `text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center w-32 justify-center`
                      : "text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded text-sm px-5 py-2.5 mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 inline-flex items-center w-32 justify-center"
                  }
                  onClick={() => setShowPackage(1)}
                >
                  Established
                </button>
              </li>
              <li>
                <button
                  type='button'
                  class={
                    showPackage === 2
                      ? `text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center w-32 justify-center`
                      : "text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded text-sm px-5 py-2.5 mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 inline-flex items-center w-32 justify-center"
                  }
                  onClick={() => setShowPackage(2)}
                >
                  Enterprise
                </button>
              </li>
            </ul>
            {showPackage === 0 ? (
              <>
                <PriceCardAlt
                  planName={PACKAGE_LISTING.one.planName}
                  monthlyPrice={PACKAGE_LISTING.one.monthlyCost}
                  listItems={PACKAGE_LISTING.one.itemList}
                  callback={(e) => handlePackageSelection(e)}
                />
              </>
            ) : (
              <></>
            )}

            {showPackage === 1 ? (
              <>
                <PriceCardAlt
                  planName={PACKAGE_LISTING.two.planName}
                  monthlyPrice={PACKAGE_LISTING.two.monthlyCost}
                  listItems={PACKAGE_LISTING.two.itemList}
                  callback={(e) => handlePackageSelection(e)}
                />
              </>
            ) : (
              <></>
            )}

            {showPackage === 2 ? (
              <>
                <PriceCardAlt
                  planName={PACKAGE_LISTING.three.planName}
                  monthlyPrice={PACKAGE_LISTING.three.monthlyCost}
                  listItems={PACKAGE_LISTING.three.itemList}
                  callback={(e) => handlePackageSelection(e)}
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Settings;
