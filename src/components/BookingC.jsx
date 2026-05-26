






import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../assets/images/Background.png";
import { HiLockClosed, HiArrowRight, HiOutlineIdentification,
  HiOutlinePhotograph, HiOutlineOfficeBuilding, HiOutlineUpload,
  HiCheckCircle, HiX } from "react-icons/hi";
import api from "../api/axios";

// documentType must match exactly what the backend expects in the URL param
const documents = [
  {
    title: "Mechanic Certification",
    desc: "Provide your ASE or equivalent trade certification.",
    icon: <HiOutlineIdentification />,
    buttonText: "Upload Certificate",
    isCamera: false,
    documentType: "mechanic_certification",
    required: true,
  },
  {
    title: "Government ID",
    desc: "Upload a clear photo of your ID card or Passport.",
    icon: <HiOutlineIdentification />,
    buttonText: "Upload ID",
    isCamera: false,
    documentType: "government_id",
    required: true,
  },
  
  {
    title: "Profile Photo",
    desc: "A clear front-facing photo of yourself.",
    icon: <HiOutlinePhotograph />,
    buttonText: "Take Photo",
    isCamera: true,
    documentType: "profile_photo",
    required: true,
  },
  {
    title: "Business License",
    desc: "Required if you operate as a registered shop.",
    icon: <HiOutlineOfficeBuilding />,
    buttonText: "Upload Business License",
    isCamera: false,
    documentType: "business_license",
    required: false,
  },
];

// per-document upload state shape: idle | uploading | success | error
const IDLE      = "idle";
const UPLOADING = "uploading";
const SUCCESS   = "success";
const ERROR     = "error";

const BookingC = ({ currentStep = 3, totalSteps = 5 }) => {
  const navigate = useNavigate();
  const progressPercentage = (currentStep / totalSteps) * 100;

  const [previews,     setPreviews]     = useState({});   // { documentType: objectURL }
  const [uploadStatus, setUploadStatus] = useState({});   // { documentType: IDLE|UPLOADING|SUCCESS|ERROR }
  const [uploadErrors, setUploadErrors] = useState({});   // { documentType: string }
  const [submitting,   setSubmitting]   = useState(false);

  const fileRefs = useRef([]);

  // ── Upload a single file immediately after selection ──────────────────────
  const handleFileChange = async (index, file) => {
    if (!file) return;
    const { documentType } = documents[index];

    // show preview straight away
    setPreviews((p) => ({ ...p, [documentType]: URL.createObjectURL(file) }));

    // reset previous error
    setUploadErrors((p) => ({ ...p, [documentType]: null }));
    setUploadStatus((p) => ({ ...p, [documentType]: UPLOADING }));

    try {
      const formData = new FormData();
      formData.append("file", file);



      const res = await api.post(
        `/provider/onboarding/upload/${documentType}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );


      setUploadStatus((p) => ({ ...p, [documentType]: SUCCESS }));
    } catch (err) {


      const raw = err?.response?.data;
      console.log(err.response);
      const msg =
        raw?.message ||
        raw?.error ||
        raw?.errors?.[0]?.message ||
        raw?.errors?.[0] ||
        (typeof raw === "string" ? raw : null) ||
        JSON.stringify(raw) ||
        "Upload failed. Check console (F12) for full error.";

      setUploadErrors((p) => ({ ...p, [documentType]: `[${err?.response?.status}] ${msg}` }));
      setUploadStatus((p) => ({ ...p, [documentType]: ERROR }));
    }
  };

  // ── Next: make sure all required docs are uploaded ────────────────────────
  const handleNext = (e) => {
    e.preventDefault();

    const missing = documents
      .filter((d) => d.required && uploadStatus[d.documentType] !== SUCCESS)
      .map((d) => d.title);

    if (missing.length) {
      alert(`Please upload the following required documents:\n• ${missing.join("\n• ")}`);
      return;
    }

    navigate(`/booking/${currentStep + 1}`);
  };

  const handleBack = () => navigate(`/booking/${currentStep - 1}`);

  
  const StatusBadge = ({ docType }) => {
    const status = uploadStatus[docType];
    if (status === UPLOADING)
      return (
        <span className="flex items-center gap-1 text-xs text-blue-600 font-medium">
          <span className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          Uploading…
        </span>
      );
    if (status === SUCCESS)
      return (
        <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
          <HiCheckCircle size={14} /> Uploaded
        </span>
      );
    if (status === ERROR)
      return (
        <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
          <HiX size={14} /> Failed — tap to retry
        </span>
      );
    return null;
  };

  
  return (
    <div className="max-w-2xl p-6 mx-auto space-y-6 bg-white shadow-md rounded-xl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-semibold text-gray-700">
          Step {currentStep}: Document Verification
        </p>
        <p className="text-gray-500">{currentStep}/{totalSteps}</p>
      </div>

      {/* Progress */}
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="bg-[#1D52AF] h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      
      <div>
        <h2 className="text-lg font-semibold">Verify Your Identity</h2>
        <p className="text-sm text-gray-600">
          Upload your documents to get verified on the platform.
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {documents.map((item, index) => {
          const status  = uploadStatus[item.documentType] || IDLE;
          const errMsg  = uploadErrors[item.documentType];
          const preview = previews[item.documentType];

          return (
            <div
              key={item.documentType}
              className={`flex flex-col gap-4 p-4 transition border rounded-lg sm:flex-row sm:items-center sm:justify-between hover:shadow-sm ${
                status === SUCCESS
                  ? "border-emerald-200 bg-emerald-50/30"
                  : status === ERROR
                  ? "border-red-200 bg-red-50/30"
                  : "border-gray-100"
              }`}
            >
              {/* LEFT */}
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="text-[#1D52AF] text-xl mt-1">{item.icon}</div>

                {/* Text */}
                <div className="space-y-1">
                  <p className="font-semibold text-gray-800">
                    {item.title}
                    {!item.required && (
                      <span className="ml-1.5 text-[10px] font-normal text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                        Optional
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600">{item.desc}</p>

                  {/* Status badge */}
                  <StatusBadge docType={item.documentType} />

                  {/* Error message */}
                  {errMsg && (
                    <p className="text-xs text-red-500">{errMsg}</p>
                  )}

                  {/* Upload button */}
                  <button
                    type="button"
                    onClick={() => fileRefs.current[index]?.click()}
                    disabled={status === UPLOADING}
                    className="flex items-center gap-2 mt-2 text-[#1D52AF] bg-[#E2E8F0] py-2 px-3 rounded-md text-sm font-medium hover:bg-[#d1d9e6] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <HiOutlineUpload />
                    {preview ? "Change" : item.buttonText}
                  </button>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    capture={item.isCamera ? "environment" : undefined}
                    ref={(el) => (fileRefs.current[index] = el)}
                    className="hidden"
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                  />
                </div>
              </div>

              {/* RIGHT — preview */}
              <div className="flex items-center justify-center w-full sm:w-28 h-28 p-2 overflow-hidden rounded-md bg-blue-50 shrink-0 relative">
                <img
                  src={preview || Background}
                  alt="preview"
                  className="object-contain w-full h-full"
                />
                {status === SUCCESS && (
                  <div className="absolute top-1 right-1 bg-emerald-500 text-white rounded-full p-0.5">
                    <HiCheckCircle size={14} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={handleBack}
          className="text-sm text-gray-600 hover:text-black"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={submitting}
          className="flex items-center gap-2 bg-[#1D52AF] text-white px-5 py-2 rounded-md hover:bg-blue-800 transition text-sm disabled:opacity-60"
        >
          Next <HiArrowRight />
        </button>
      </div>

      {/* Security note */}
      <div className="flex items-start gap-2 mt-4 text-gray-700 bg-[#E2E8F0] p-3 rounded-md">
        <HiLockClosed className="text-[#1D52AF] mt-1 shrink-0" size={20} />
        <p className="text-sm">
          Your documents are processed securely and used only for verification
          purposes. MokaNik uses bank-level encryption to protect your data.
          Verification usually takes 24–48 hours.
        </p>
      </div>
    </div>
  );
};

export default BookingC;