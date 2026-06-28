import React from "react";
import Login from "../components/Login";
import NavBarr from "../components/home/NavBarr"; // fixed path

const LoginPage = () => {
  return (
    <div>
     <NavBarr />
    <div className="flex items-center justify-center bg-gray-100">
      <Login />
    </div>
    </div>
  );
};

export default LoginPage;