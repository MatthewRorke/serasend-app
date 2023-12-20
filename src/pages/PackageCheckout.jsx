import React, { useState } from "react";

import MainLayout from "../layout/MainLayout";

function PackageCheckout() {
  const planName = "standard";
  const planDescription = "Standard plan for users";
  const monthlyCost = 100;
  const listItems = [
    {
      include: true,
      description: "1 Email address alias",
    },
    {
      include: true,
      description: "1000 email per month",
    },
    {
      include: false,
      description: "1000 email per month",
    },
  ];
  const checkIcon = (
    <svg
      class='flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500'
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      viewBox='0 0 20 20'
    >
      <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
    </svg>
  );

  const unCheckIcon = (
    <svg
      class='flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500'
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      viewBox='0 0 20 20'
    >
      <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
    </svg>
  );

  return (
    <MainLayout>
      <div class='grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32'>
        <div class='px-4 pt-8'>
          <p class='text-xl font-medium'>Order Summary</p>
          <p class='text-gray-400'>Check your items.</p>
          <>
            <div class='mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6'>
              <div class='flex flex-col rounded-lg bg-white sm:flex-row'>
                <div class='flex w-full flex-col px-4 py-4'>
                  <span class='font-semibold'>{planName}</span>
                  <span class='float-right text-gray-400'>{planDescription}</span>
                  <p class='text-lg font-bold'>{monthlyCost} R/month</p>

                  <ul role='list' class='space-y-5 my-7'>
                    {listItems.map((item, index) =>
                      item.include ? (
                        <li class='flex items-center'>
                          {checkIcon}
                          <span class='text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3'>
                            {item.description}
                          </span>
                        </li>
                      ) : (
                        <li class='flex line-through decoration-gray-500'>
                          {unCheckIcon}
                          <span class='text-base font-normal leading-tight text-gray-500 ms-3'>{item.description}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </>
        </div>
        <div class='mt-10 bg-gray-50 px-4 pt-8 lg:mt-0'>
          <p class='text-xl font-medium'>Payment Details</p>
          <p class='text-gray-400'>Complete your order by providing your payment details.</p>
          <div class=''>
            <label htmlFor='email' class='mt-4 mb-2 block text-sm font-medium'>
              Email
            </label>
            <div class='relative'>
              <input
                type='text'
                id='email'
                name='email'
                class='w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                placeholder='your.email@gmail.com'
              />
              <div class='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  class='h-4 w-4 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                  />
                </svg>
              </div>
            </div>
            <label htmlFor='card-holder' class='mt-4 mb-2 block text-sm font-medium'>
              Card Holder
            </label>
            <div class='relative'>
              <input
                type='text'
                id='card-holder'
                name='card-holder'
                class='w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                placeholder='Your full name here'
              />
              <div class='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  class='h-4 w-4 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z'
                  />
                </svg>
              </div>
            </div>
            <label htmlFor='card-no' class='mt-4 mb-2 block text-sm font-medium'>
              Card Details
            </label>
            <div class='flex'>
              <div class='relative w-7/12 flex-shrink-0'>
                <input
                  type='text'
                  id='card-no'
                  name='card-no'
                  class='w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                  placeholder='xxxx-xxxx-xxxx-xxxx'
                />
                <div class='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                  <svg
                    class='h-4 w-4 text-gray-400'
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    viewBox='0 0 16 16'
                  >
                    <path d='M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z' />
                    <path d='M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z' />
                  </svg>
                </div>
              </div>
              <input
                type='text'
                name='credit-expiry'
                class='w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                placeholder='MM/YY'
              />
              <input
                type='text'
                name='credit-cvc'
                class='w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                placeholder='CVC'
              />
            </div>
            <label htmlFor='billing-address' class='mt-4 mb-2 block text-sm font-medium'>
              Billing Address
            </label>
            <div class='flex flex-col sm:flex-row'>
              <div class='relative flex-shrink-0 sm:w-6/12'>
                <input
                  type='text'
                  id='billing-address'
                  name='billing-address'
                  class='w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                  placeholder='Street Address'
                />
              </div>
              <select
                type='text'
                name='billing-state'
                class='w-full rounded-md border border-gray-200 px-6 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
              >
                <option value='State'>Eastern Cape</option>
                <option value='State'>Gauteng</option>
                <option value='State'>Free State</option>
                <option value='State'>KwaZulu-Natal</option>
                <option value='State'>Limpopo</option>
                <option value='State'>Mpumalanga</option>
                <option value='State'>Northern Cape</option>
                <option value='State'>North West</option>
                <option value='State'>Western Cape</option>
              </select>
              <input
                type='text'
                name='billing-zip'
                class='flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                placeholder='ZIP'
              />
            </div>

            <div class='mt-6 border-t border-b py-2'>
              <div class='flex items-center justify-between'>
                <p class='text-sm font-medium text-gray-900'>Subtotal</p>
                <p class='font-semibold text-gray-900'>R{monthlyCost}</p>
              </div>
            </div>
            <div class='mt-6 flex items-center justify-between'>
              <p class='text-sm font-medium text-gray-900'>Total</p>
              <p class='text-2xl font-semibold text-gray-900'>R{monthlyCost}</p>
            </div>
          </div>
          <button class='mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white'>Place Order</button>
        </div>
      </div>
    </MainLayout>
  );
}

export default PackageCheckout;