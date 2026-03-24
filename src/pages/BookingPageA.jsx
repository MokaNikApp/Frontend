import React from "react";
import Navbar from "../components/Navbar"; // ✅ make sure Navbar is imported
import BookingA from "../components/BookingA";
import Footer from "../components/Footer";

const BookingPageA = () => {
  return (
    <div className="">
    
      <Navbar />
      <div className="flex px-6 items-center justify-center py-6 sm:py-10">
        <BookingA />
      </div>
      <Footer />
    </div>
  );
};

export default BookingPageA;