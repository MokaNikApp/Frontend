import React from "react";
import Navbar from "../components/Navbar";
import CarModel from "../components/CarModel";

const CarModelPage = () => {
  return (
    <div className="">
     <Navbar />
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <CarModel />
    </div>
    </div>
  );
};

export default CarModelPage;