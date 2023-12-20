import React, { useEffect, useState } from "react";

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

    const maxTimeInterval = 10 * 60 * 1000; // 10 Minutes

    if (cachedUserData && lastUpdatedTimestamp && Date.now() - parseInt(lastUpdatedTimestamp, 10) < maxTimeInterval) {
      setUser(cachedUserData.user);
      setPackageItem(cachedUserData.packageItem);
      setWallet(cachedUserData.wallet);
    } else {
      getUser(token).then((res) => {
        if (res.success) {
          setPackageItem((prev) => ({
            ...prev,
            name: res.data.packageName,
            rate: res.data.packageRate || 0,
          }));
          setWallet((prev) => ({ ...prev, amount: res.data.amount }));
          setUser((prev) => ({ ...prev, alias: res.data.alias, email: res.data.email }));

          storeInLocal(
            "userData",
            JSON.stringify({
              user: { alias: res.data.alias, email: res.data.email },
              packageItem: { name: res.data.packageName, rate: res.data.packageRate },
              wallet: { amount: res.data.amount },
            })
          );
          storeInLocal("userDataTimestamp", Date.now());
        }
      });
    }
  }, [token]);

  return (
    <MainLayout>
      <div class='flex space-x-4'>
        <div class='flex-1 bg-white p-6 m-6 rounded-lg shadow-md min-w-[200px]'>
          <h2 class='text-xl font-semibold mb-4'>Current Subscription</h2>
          <p class='text-gray-600'>{packageItem.name || "Unspecified"}</p>
          <div class='mt-4'>
            <span class='text-blue-500 font-semibold'>{`${packageItem.rate?.toFixed(2)}`}</span>
            <span class='text-gray-500'> R / month</span>
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
