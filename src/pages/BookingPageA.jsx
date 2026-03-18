import React from "react";
import Navbar from "../components/Navbar"; // ✅ make sure Navbar is imported
import BookingA from "../components/BookingA";
import Footer from "../components/Footer";

const BookingPageA = () => {
  return (
    <div className="">
    
      <Navbar />
      <div className="flex items-center justify-center py-10">
        <BookingA />
      </div>
      <Footer />
    </div>
  );
};

export default BookingPageA;