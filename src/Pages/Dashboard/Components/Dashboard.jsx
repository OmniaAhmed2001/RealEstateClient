import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

function Dashboard() {
  const { token } = useSelector((state) => state.user);
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    mostExpensive: { price: 0, name: "" },
    totalListings: 0,
  });

  useEffect(() => {
    console.log(token);
    const fetchData = async () => {
      const usersRes = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/user/allUsers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const listingsRes = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/listing/get/countListings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const expensiveRes = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/listing/get/maxPrice`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const usersData = await usersRes.json();
      const listingsData = await listingsRes.json();
      const expensiveData = await expensiveRes.json();

      console.log(usersData, listingsData);

      setDashboardData({
        totalUsers: usersData.count,
        mostExpensive: {
          price: expensiveData.maxPrice,
          name: expensiveData.name,
        },
        totalListings: listingsData.count,
      });
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-evenly items-center flex-col lg:flex-row">
      <Card
        icon="assets/image 12.png"
        description="Total Users"
        value={dashboardData.totalUsers}
      />
      <Card
        icon="assets/image 9.png"
        description="Most Expensive Real Estate"
        value={`${dashboardData.mostExpensive.name}  $${dashboardData.mostExpensive.price}`}
      />
      <Card
        icon="assets/128.png"
        description="Total Real Estates"
        value={dashboardData.totalListings}
      />
    </div>
  );
}

export default Dashboard;
