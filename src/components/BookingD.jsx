




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiArrowRight,
  HiUser,
  HiPencil,
  HiBriefcase,
  HiDocument,
  HiCheckCircle,
  HiClock,
  HiX,
  HiExclamationCircle,
} from "react-icons/hi";
import api from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DOC_LABELS = {
  mechanic_certification: "Mechanic Certification",
  government_id:          "Government ID",
  drivers_license:        "Driver's License",
  profile_photo:          "Profile Photo",
  business_license:       "Business License",
};

const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

const StatusBadge = ({ status }) => {
  const map = {
    pending:  "bg-yellow-100 text-yellow-700",
    verified: "bg-emerald-100 text-emerald-700",
    rejected: "bg-red-100 text-red-600",
  };
  return (
    <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${map[status] ?? "bg-gray-100 text-gray-500"}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const StatusIcon = ({ status }) => {
  if (status === "pending")  return <HiClock       className="text-yellow-500 shrink-0" size={22} />;
  if (status === "verified") return <HiCheckCircle className="text-emerald-500 shrink-0" size={22} />;
  if (status === "rejected") return <HiX           className="text-red-500 shrink-0"    size={22} />;
  return null;
};

const Row = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-400 uppercase tracking-wide">{label}</span>
    <span className="text-gray-800 font-medium text-sm mt-0.5">{value || "—"}</span>
  </div>
);

const Field = ({ label, name, value, onChange, type = "text", textarea = false }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</label>
    {textarea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
        placeholder={label}
      />
    ) : (
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder={label}
      />
    )}
  </div>
);

const BookingD = ({ currentStep = 4, totalSteps = 5 }) => {
  const navigate = useNavigate();
  const progressPercentage = (currentStep / totalSteps) * 100;

  // ── API state ──────────────────────────────────────────────────────────────
  const [reviewData,  setReviewData]  = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);

  // ── Displayed data (editable locally) ─────────────────────────────────────
  const [pi,  setPi]  = useState(null);  // personalInformation
  const [pd,  setPd]  = useState(null);  // professionalDetails
  const [docs, setDocs] = useState([]);

  // ── UI state ───────────────────────────────────────────────────────────────
  const [showModal,   setShowModal]   = useState(false);
  const [modalType,   setModalType]   = useState("");
  const [draft,       setDraft]       = useState(null);
  const [confirmed,   setConfirmed]   = useState(false);
  const [submitting,  setSubmitting]  = useState(false);

  // ── Fetch /provider/onboarding/review on mount ─────────────────────────────
  useEffect(() => {
    const fetchReview = async () => {
      try {
        setLoading(true);
        setError(null);
        const res  = await api.get("/provider/onboarding/review");
        const data = res.data;

        setReviewData(data);
        setConfirmed(data.termsAccepted ?? false);
        setPi(data.personalInformation   ?? {});
        setPd(data.professionalDetails   ?? {});
        setDocs(data.documents           ?? []);
      } catch (err) {
        const raw = err?.response?.data;
        setError(
          raw?.message ||
          raw?.error   ||
          (typeof raw === "string" ? raw : null) ||
          "Failed to load review data."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchReview();
  }, []);

  // ── Modal helpers ──────────────────────────────────────────────────────────
  const openModal = (type) => {
    if (type === "personal")     setDraft({ ...pi });
    if (type === "professional") setDraft({ ...pd });
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setDraft(null); };

  const saveChanges = () => {
    if (modalType === "personal")     setPi(draft);
    if (modalType === "professional") setPd(draft);
    closeModal();
  };

  const handleDraftChange = (e) => {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!confirmed) return;

    const payload = {
      agreeToTerms:    true,
      confirmAccuracy: true,
      notes:           "satisfactory",
    };

    try {
      setSubmitting(true);
      await api.post("/provider/onboarding/submit", payload);
      toast.success("Application submitted successfully!");
      setTimeout(() => navigate(`/booking/${currentStep + 1}`), 1500);
    } catch (err) {
      const raw = err?.response?.data;
      toast.error(
        raw?.message ||
        raw?.error   ||
        err?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => navigate(`/booking/${currentStep - 1}`);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading profile...
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="w-full max-w-3xl p-6 mx-auto bg-white shadow-md rounded-xl flex flex-col items-center justify-center gap-3 min-h-[200px]">
        <p className="text-red-500 text-sm">{error}</p>
        <button onClick={() => window.location.reload()} className="text-sm text-[#1D52AF] underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl p-6 mx-auto space-y-6 bg-white shadow-md rounded-xl">

      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <p className="font-semibold text-gray-700">Step {currentStep}: Review Your Application</p>
        <p className="text-gray-500">{currentStep}/{totalSteps}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="bg-[#1D52AF] h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* ── Personal Information ─────────────────────────────────────────────── */}
      <div className="p-4 space-y-3 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <p className="flex items-center gap-2 font-semibold text-gray-700">
            <HiUser className="text-[#1D52AF]" /> Personal Information
          </p>
          <button onClick={() => openModal("personal")} className="flex items-center gap-1 text-[#1D52AF] bg-white px-3 py-1 rounded-md hover:bg-gray-100 transition text-sm mt-2 md:mt-0">
            <HiPencil /> Edit
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
          <Row label="Full Name"    value={pi.fullName} />
          <Row label="Email"        value={pi.email} />
          <Row label="Phone Number" value={pi.phoneNumber} />
          <Row label="Address"      value={`${pi.address ?? ""}, ${capitalize(pi.city)}, ${(pi.state ?? "").toUpperCase()}`} />
        </div>
      </div>

      {/* ── Professional Details ─────────────────────────────────────────────── */}
      <div className="p-4 space-y-3 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <p className="flex items-center gap-2 font-semibold text-gray-700">
            <HiBriefcase className="text-[#1D52AF]" /> Professional Details
          </p>
          <button onClick={() => openModal("professional")} className="flex items-center gap-1 text-[#1D52AF] bg-white px-3 py-1 rounded-md hover:bg-gray-100 transition text-sm mt-2 md:mt-0">
            <HiPencil /> Edit
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
          <Row label="Specialization"          value={pd.specialization} />
          <Row label="Secondary Specializations" value={pd.secondarySpecializations?.join(", ") || "—"} />
          <Row label="Years of Experience"     value={pd.yearsOfExperience != null ? `${pd.yearsOfExperience} years` : "—"} />
          <Row label="Years in Business"       value={pd.yearsInBusiness  != null ? `${pd.yearsInBusiness} years`  : "—"} />
          <Row label="Workshop Name"           value={pd.workshopName} />
          <Row label="Business Phone"          value={pd.businessPhoneNumber} />
          <Row label="Service Areas"           value={pd.serviceAreas?.join(", ") || "—"} />
          <Row label="Service Radius"          value={pd.serviceRadius != null ? `${pd.serviceRadius} km` : "—"} />
          {pd.description && (
            <div className="col-span-2">
              <Row label="Description" value={pd.description} />
            </div>
          )}
        </div>
      </div>

      {/* ── Uploaded Documents ───────────────────────────────────────────────── */}
      <div className="p-4 space-y-3 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <p className="flex items-center gap-2 font-semibold text-gray-700">
            <HiDocument className="text-[#1D52AF]" /> Uploaded Documents
          </p>
          <button onClick={() => navigate(`/booking/${currentStep - 1}`)} className="flex items-center gap-1 text-[#1D52AF] bg-white px-3 py-1 rounded-md hover:bg-gray-100 transition text-sm mt-2 md:mt-0">
            <HiPencil /> Edit
          </button>
        </div>

        {docs.length === 0 ? (
          <div className="flex items-center gap-2 p-3 rounded-md bg-amber-50 border border-amber-100">
            <HiExclamationCircle className="text-amber-500 shrink-0" size={20} />
            <p className="text-sm text-amber-700">
              No documents uploaded yet. Please add your mechanic certification and government ID before submitting.
            </p>
          </div>
        ) : (
          docs.map((doc) => (
            <div key={doc.id} className="flex flex-col items-start justify-between gap-2 p-3 rounded-md md:flex-row md:items-center bg-gray-50">
              <div className="flex items-center gap-3">
                <img
                  src={doc.fileUrl}
                  alt={doc.fileName}
                  className="w-10 h-10 rounded object-cover border border-gray-200 shrink-0"
                />
                <div>
                  <p className="font-medium text-sm text-gray-800">{DOC_LABELS[doc.type] ?? doc.type}</p>
                  <p className="text-xs text-gray-500 truncate max-w-[200px]">{doc.fileName}</p>
                  <StatusBadge status={doc.status} />
                </div>
              </div>
              <StatusIcon status={doc.status} />
            </div>
          ))
        )}
      </div>

      {/* ── Confirmation Checkbox ─────────────────────────────────────────────── */}
      <div className="flex items-start gap-3 mt-2">
        <input
          type="checkbox"
          id="confirm"
          className="w-5 h-5 mt-0.5 text-[#1D52AF] border-gray-300 rounded focus:ring-[#1D52AF] shrink-0"
          checked={confirmed}
          onChange={() => setConfirmed((v) => !v)}
        />
        <label htmlFor="confirm" className="text-sm text-gray-600 leading-relaxed">
          I confirm that all the information provided above is accurate and I agree to MokaNik's{" "}
          <a href="#" className="text-blue-600 underline">Terms of Service</a> and{" "}
          <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
        </label>
      </div>

      {/* canSubmit warning */}
      {!reviewData?.canSubmit && (
        <p className="text-xs text-yellow-600 bg-yellow-50 border border-yellow-200 rounded-md px-3 py-2">
          Your application is incomplete. Please go back and fill in all required steps before submitting.
        </p>
      )}

      {/* ── Navigation ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col justify-between gap-3 pt-2 sm:flex-row">
        <button
          onClick={handleBack}
          disabled={submitting}
          className="w-full px-5 py-2 text-sm text-gray-600 border rounded-md sm:w-auto hover:text-black disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!confirmed || submitting}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 rounded-md transition text-sm font-medium
            ${confirmed && !submitting
              ? "bg-[#1D52AF] text-white hover:bg-blue-800"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
        >
          {submitting ? (
            <>
              <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Submitting...
            </>
          ) : (
            <>Submit For Verification <HiArrowRight /></>
          )}
        </button>
      </div>

      {/* ── Toast Container ─────────────────────────────────────────────────── */}
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} closeOnClick pauseOnHover />

      {/* ── Edit Modal ───────────────────────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-xl overflow-y-auto max-h-[90vh]">
            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              Edit {modalType === "personal" ? "Personal Information" : "Professional Details"}
            </h2>

            {modalType === "personal" && draft && (
              <div className="space-y-3">
                <Field label="Full Name"    name="fullName"    value={draft.fullName    ?? ""} onChange={handleDraftChange} />
                <Field label="Email"        name="email"       type="email" value={draft.email ?? ""} onChange={handleDraftChange} />
                <Field label="Phone Number" name="phoneNumber" value={draft.phoneNumber ?? ""} onChange={handleDraftChange} />
                <Field label="Address"      name="address"     value={draft.address     ?? ""} onChange={handleDraftChange} />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="City"  name="city"  value={draft.city  ?? ""} onChange={handleDraftChange} />
                  <Field label="State" name="state" value={draft.state ?? ""} onChange={handleDraftChange} />
                </div>
              </div>
            )}

            {modalType === "professional" && draft && (
              <div className="space-y-3">
                <Field label="Specialization"     name="specialization"     value={draft.specialization     ?? ""} onChange={handleDraftChange} />
                <Field label="Years of Experience" name="yearsOfExperience" type="number" value={draft.yearsOfExperience ?? ""} onChange={handleDraftChange} />
                <Field label="Years in Business"   name="yearsInBusiness"   type="number" value={draft.yearsInBusiness   ?? ""} onChange={handleDraftChange} />
                <Field label="Workshop Name"       name="workshopName"      value={draft.workshopName       ?? ""} onChange={handleDraftChange} />
                <Field label="Business Phone"      name="businessPhoneNumber" value={draft.businessPhoneNumber ?? ""} onChange={handleDraftChange} />
                <Field label="Service Radius (km)" name="serviceRadius"     type="number" value={draft.serviceRadius     ?? ""} onChange={handleDraftChange} />
                <Field label="Description"         name="description"       value={draft.description        ?? ""} onChange={handleDraftChange} textarea />
              </div>
            )}

            <div className="flex flex-col justify-end gap-2 mt-6 sm:flex-row">
              <button onClick={closeModal}  className="px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 text-gray-700">Cancel</button>
              <button onClick={saveChanges} className="px-4 py-2 text-sm rounded-md bg-[#1D52AF] text-white hover:bg-blue-800 font-medium">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingD;