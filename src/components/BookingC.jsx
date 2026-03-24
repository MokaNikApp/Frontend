




import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../assets/images/Background.png";
import { HiLockClosed } from "react-icons/hi"; // this exists
import {
  HiArrowRight,
  HiOutlineIdentification,
  HiOutlinePhotograph,
  HiOutlineOfficeBuilding,
  HiOutlineUpload,
  
} from "react-icons/hi";

const BookingC = ({ currentStep = 3, totalSteps = 5 }) => {
  const navigate = useNavigate();
  const progressPercentage = (currentStep / totalSteps) * 100;

  const [files, setFiles] = useState({});
  const [previews, setPreviews] = useState({});
  const fileRefs = useRef([]);

  // Handle file
  const handleFileChange = (index, file) => {
    if (!file) return;

    setFiles((prev) => ({ ...prev, [index]: file }));

    const previewUrl = URL.createObjectURL(file);
    setPreviews((prev) => ({ ...prev, [index]: previewUrl }));
  };

  // Navigation
  const handleNext = (e) => {
    e.preventDefault();
    navigate(`/booking/${currentStep + 1}`);
  };

  const handleBack = () => {
    navigate(`/booking/${currentStep - 1}`);
  };

  // Documents with custom button text
  const documents = [
    {
      title: "Mechanic Certification",
      desc: "Provide your ASE or equivalent trade certification.",
      icon: <HiOutlineIdentification />,
      buttonText: "Take Certificate",
      isCamera: false,
    },
    {
      title: "Government ID",
      desc: "Upload a clear photo of your ID card or Passport.",
      icon: <HiOutlineIdentification />,
      buttonText: "Upload ID",
      isCamera: false,
    },
    {
      title: "Driver's License",
      desc: "Upload a valid driver's license.",
      icon: <HiOutlineIdentification />,
      buttonText: "Upload License",
      isCamera: false,
    },
    {
      title: "Profile Photo",
      desc: "A clear front-facing photo of yourself.",
      icon: <HiOutlinePhotograph />,
      buttonText: "Take Photo",
      isCamera: true,
    },
    {
      title: "Business License (Optional)",
      desc: "Required if you operate as a registered shop.",
      icon: <HiOutlineOfficeBuilding />,
      buttonText: "Upload Business License",
      isCamera: false,
    },
  ];

  return (
    <div className="max-w-2xl p-6 mx-auto space-y-6 bg-white shadow-md rounded-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-semibold text-gray-700">
          Step {currentStep}: Document Verification
        </p>
        <p className="text-gray-500">
          {currentStep}/{totalSteps}
        </p>
      </div>

      {/* Progress */}
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="bg-[#1D52AF] h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Title */}
      <div>
        <h2 className="text-lg font-semibold">Verify Your Identity</h2>
        <p className="text-sm text-gray-600">
          Upload your documents to get verified on the platform.
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {documents.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 p-4 transition border border-gray-100 rounded-lg sm:flex-row sm:items-center sm:justify-between hover:shadow-sm"
          >
            {/* LEFT */}
            <div className="flex items-start gap-4">
              
              {/* Icon */}
              <div className="text-[#1D52AF] text-xl mt-1">
                {item.icon}
              </div>

              {/* Text */}
              <div className="space-y-1">
                <p className="font-semibold text-gray-800">
                  {item.title}
                </p>
                <p className="text-sm text-gray-600">
                  {item.desc}
                </p>

                {/* Button */}
                <button
                  onClick={() => fileRefs.current[index].click()}
                  className="flex items-center gap-2 mt-2 text-[#1D52AF] bg-[#E2E8F0] py-2 p-2 rounded-md text-sm font-medium hover:underline"
                >
                  <HiOutlineUpload />
                  {files[index] ? "Change" : item.buttonText}
                </button>

                {/* Hidden Input */}
                <input
                  type="file"
                  accept="image/*"
                  capture={item.isCamera ? "environment" : undefined}
                  ref={(el) => (fileRefs.current[index] = el)}
                  className="hidden"
                  onChange={(e) =>
                    handleFileChange(index, e.target.files[0])
                  }
                />
              </div>
            </div>

            {/* RIGHT PREVIEW */}
            <div className="flex items-center justify-center w-full p-2 overflow-hidden rounded-md h-28 bg-blue-50 sm:w-28">
              <img
                src={previews[index] || Background}
                alt="preview"
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-4">
        <button
          onClick={handleBack}
          className="text-sm text-gray-600 hover:text-black"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 bg-[#1D52AF] text-white px-5 py-2 rounded-md hover:bg-blue-800 transition text-sm"
        >
          Next
          <HiArrowRight />
        </button>
      </div>
  <div className="flex items-start gap-2 mt-4 text-gray-700 bg-[#E2E8F0] p-2 rounded-md py-2">
  <HiLockClosed className="text-[#1D52AF] mt-1" size={20} />
  <p className="text-sm">
    Your documents are processed securely and used only for verification purposes. MokaNik uses bank-level encryption to protect your data. Verification usually takes 24-48 hours.
  </p>
</div>
    </div>
  );
};

export default BookingC;