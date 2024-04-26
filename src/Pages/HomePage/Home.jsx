// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector } from "react-redux";

export default function Home() {

  const user = useSelector((state) => state.currentUser);
  console.log(user);
  return <div>Home</div>;
}
