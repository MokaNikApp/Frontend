import React from "react";
import Verified from "../components/Verified"; 
import Navbar from "../components/Navbar";

const VerifiedPage = () => {
  return (
    <div className="">
     <Navbar />
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <Verified />
    </div>
    </div>
  );
};

export default VerifiedPage;