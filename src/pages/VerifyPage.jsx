import React from "react";
import Verify from "../components/Verify"; 
import Navbar from "../components/Navbar";

const VerifyPage = () => {
  return (
    <div className="">
     <Navbar />
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <Verify />
    </div>
    </div>
  );
};

export default VerifyPage;