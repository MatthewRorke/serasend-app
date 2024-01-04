import React, { useEffect, useState } from "react";

import { getAssignedPackage } from "../api/packageApi";
import { getUser } from "../api/userApi";
import Card1 from "../components/Card1";
import MainLayout from "../layout/MainLayout";
import Header from "../partials/Header";
import DashboardCard01 from "../partials/samples/DashboardCard01";
import DashboardCard12 from "../partials/samples/DashboardCard12";
import WelcomeBanner from "../partials/samples/WelcomeBanner";
import Sidebar from "../partials/Sidebar";
import { getFromLocal, storeInLocal } from "../utils/Utils";

//TODO
// Add package summary
// Add wallet amount
// Add page to buy new package
// Add page to update alias
// Add transactions summary

function Dashboard() {
  const token = getFromLocal("token");
  const [packageItem, setPackageItem] = useState({
    name: "",
    rate: 0,
    maxRequests: 0,
    id: null,
  });

  const [wallet, setWallet] = useState({
    amount: 0,
  });

  const [user, setUser] = useState({
    alias: "",
    email: "",
  });

  useEffect(() => {
    const cachedUserData = JSON.parse(getFromLocal("userData"));
    const lastUpdatedTimestamp = getFromLocal("userDataTimestamp");
    const cachedPackageData = JSON.parse(getFromLocal("userPackage"));
    const maxTimeInterval = -1 * 60 * 1000; // 10 Minutes

    if (
      cachedUserData &&
      lastUpdatedTimestamp &&
      cachedPackageData &&
      Date.now() - parseInt(lastUpdatedTimestamp, 10) < maxTimeInterval
    ) {
      setUser(cachedUserData.user);
      setWallet(cachedUserData.wallet);
      setPackageItem(cachedPackageData);
    } else {
      getUser(token).then((res) => {
        if (res.success) {
          setWallet((prev) => ({ ...prev, amount: res.data.amount }));
          setUser((prev) => ({ ...prev, alias: res.data.alias, email: res.data.email }));

          storeInLocal(
            "userData",
            JSON.stringify({
              user: { alias: res.data.alias, email: res.data.email },
              wallet: { amount: res.data.amount },
            })
          );
          storeInLocal("userDataTimestamp", Date.now());

          getAssignedPackage(token).then((prev) => {
            if (prev.success) {
              const packageData = {
                name: prev.data.package.packageName,
                rate: prev.data.package.monthlyCosts || 0,
                maxRequests: prev.data.package.maxRequests || 0,
                id: prev.data.package.packageId,
                expireAt: prev.data.package.expireAt.date,
              };
              storeInLocal("userPackage", JSON.stringify(packageData));
              setPackageItem(packageData);
            }
          });

          storeInLocal(
            "userData",
            JSON.stringify({
              user: { alias: res.data.alias, email: res.data.email },
              wallet: { amount: res.data.amount },
            })
          );
        }
      });
    }
  }, [token]);

  return (
    <MainLayout>
      <div class='flex space-x-4'>
        <div class='flex-1 bg-white p-6 m-6 rounded-lg shadow-md min-w-[200px]'>
          <h2 class='text-xl font-semibold mb-4'>Current Subscription</h2>
          <p class='text-blue-500 font-semibold'>{packageItem.name || "Unspecified"}</p>
          <div class='mt-4'>
            <span class='text-green-500 font-semibold'>{`${packageItem.rate?.toFixed(2)}`}</span>
            <span class='text-gray-500'> R / month</span>
          </div>
          <div class='mt-4'>
            <span class='text-gray-500'>
              {" "}
              Expires at:{" "}
              {`${new Date(packageItem.expireAt).toLocaleDateString("en-UK", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}`}
            </span>
          </div>
        </div>

        <div class='flex-1 bg-white p-6 m-6 rounded-lg shadow-md min-w-[200px]'>
          <h2 class='text-xl font-semibold mb-4'>Wallet Balance</h2>
          <div class='mt-4'>
            <span class='text-green-500 font-semibold'>{wallet.amount?.toFixed(2)} </span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
