import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import PriceCard from "../components/PriceCard";
import MainLayout from "../layout/MainLayout";
import { PACKAGE_LISTING } from "../utils/Constants";
import { storeInLocal } from "../utils/Utils";

function Packages() {
  const navigateTo = useNavigate();

  const handlePackageSelection = (e) => {
    e.preventDefault();
    storeInLocal("selectedPackagePurchase", e.target.id);
    navigateTo("/packages/checkout");
  };

  return (
    <MainLayout>
      <div class='flex flex-wrap items-start justify-center h-screen p-4'>
        <div className='bg-white rounded shadow-md w-full space-y-8 m-3 p-6'>
          <h2 className='text-2xl font-bold mb-4'>Select package</h2>
          <form
            id='packageForm'
            className='flex flex-row justify-center space-x-8'
            onSubmit={(e) => handlePackageSelection(e)}
          >
            <PriceCard
              id={PACKAGE_LISTING.one.planName}
              planName={PACKAGE_LISTING.one.planName}
              monthlyPrice={PACKAGE_LISTING.one.monthlyCost}
              listItems={PACKAGE_LISTING.one.itemList}
              callback={handlePackageSelection}
            />
            <PriceCard
              id={PACKAGE_LISTING.two.planName}
              planName={PACKAGE_LISTING.two.planName}
              monthlyPrice={PACKAGE_LISTING.two.monthlyCost}
              listItems={PACKAGE_LISTING.two.itemList}
              callback={handlePackageSelection}
            />
            <PriceCard
              id={PACKAGE_LISTING.three.planName}
              planName={PACKAGE_LISTING.three.planName}
              monthlyPrice={PACKAGE_LISTING.three.monthlyCost}
              listItems={PACKAGE_LISTING.three.itemList}
              callback={handlePackageSelection}
            />
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default Packages;
