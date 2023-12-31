import crypto from "crypto";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getPackageCheckoutForm, getPackages, getSinglePackage } from "../api/packageApi";
import LoadingButton from "../components/LoadingButton";
import PriceCard from "../components/PriceCard";
import MainLayout from "../layout/MainLayout";
import { PACKAGE_LISTING } from "../utils/Constants";
import { getFromLocal, storeInLocal } from "../utils/Utils";

const buttonString = `<button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center w-full justify-center">
<span class="flex-shrink-0">Checkout</span>
</button>
</form>`;

function PackageCheckout() {
  const navigateTo = useNavigate();
  const [subscriptionPackages, setSubscriptionPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState(null);
  const token = getFromLocal("token");
  const packageId = getFromLocal("selectedPackagePurchase");

  useEffect(() => {
    setLoadingPackages(true);
    getSinglePackage(token, packageId)
      .then((res) => {
        setSubscriptionPackages(res.data.package);
      })
      .finally(() => {
        setLoadingPackages(false);
      });
    getPackageCheckoutForm(token, packageId).then((res) => {
      setCheckoutForm(res.data.message + buttonString);
    });
  }, []);

  return (
    <MainLayout>
      <div class='flex flex-wrap items-start justify-center h-screen p-4'>
        <div className='bg-white rounded shadow-md w-full space-y-8 m-3 p-6'>
          <h2 className='text-2xl font-bold mb-4'>Order Summary</h2>
          <div class='px-4 pt-8'>
            {!loadingPackages && checkoutForm ? (
              <div class='mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6'>
                <div class='flex flex-col rounded-lg bg-white sm:flex-row'>
                  <div class='flex w-full flex-col px-4 py-4'>
                    <span class='font-semibold'>{subscriptionPackages.packageName} package</span>
                    <span class='float-right text-gray-400'>
                      {subscriptionPackages.packageMonthlyRate.toLocaleString("en-US")} Emails per month
                    </span>
                    <p class='text-lg font-bold'>
                      {subscriptionPackages.packageMonthlyCost.toLocaleString("en-US")} R/month
                    </p>
                  </div>
                </div>

                <div dangerouslySetInnerHTML={{ __html: checkoutForm }} />
              </div>
            ) : (
              <div role='status' class='flex items-center justify-center h-screen'>
                <svg
                  aria-hidden='true'
                  class='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
                <span class='sr-only'>Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default PackageCheckout;
