// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
function Dashboard() {
  const { token, currentUser } = useSelector((state) => state.user);
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    mostExpensive: { price: 0, name: "" },
    totalListings: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        setDashboardData({
          totalUsers: usersData.count,
          mostExpensive: {
            price: expensiveData.maxPrice,
            name: expensiveData.name,
          },
          totalListings: listingsData.count,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUser, token]);

  return (
    <div className="flex justify-evenly items-center flex-col lg:flex-row">
      {currentUser.role === "admin" && (
        <>
          {" "}
          <Card
            icon="assets/users.png"
            description="Total Users"
            value={dashboardData.totalUsers}
          />
          <Card
            icon="assets/realestate.png"
            description="Most Expensive Real Estate"
            value={`${dashboardData.mostExpensive.name}  $${dashboardData.mostExpensive.price}`}
          />
          <Card
            icon="assets/128.png"
            description="Total Real Estates"
            value={dashboardData.totalListings}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;
