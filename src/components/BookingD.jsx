




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; 
// import { 
//   HiArrowRight, 
//   HiUser, 
//   HiPencil, 
//   HiBriefcase, 
//   HiDocument, 
//   HiCheckCircle 
// } from "react-icons/hi";

// const BookingD = ({ currentStep = 4, totalSteps = 5 }) => {
//   const navigate = useNavigate();
//   const progressPercentage = (currentStep / totalSteps) * 100;

//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState(""); // "personal", "professional", "documents"

//   // Form state
//   const [personal, setPersonal] = useState({
//     fullName: "Ricardo Milos",
//     email: "ricardo.m@mechanic.com",
//     phone: "+1 (555) 123-4567",
//   });

//   const [professional, setProfessional] = useState({
//     specialization: "Diesel Engines & Transmission",
//     experience: "8 Years",
//     workshop: "Milos Performance Center",
//   });

//   const handleNext = () => navigate(`/booking/${currentStep + 1}`);
//   const handleBack = () => navigate(`/booking/${currentStep - 1}`);

//   const openModal = (type) => {
//     setModalType(type);
//     setShowModal(true);
//   };

//   const closeModal = () => setShowModal(false);

//   const handlePersonalChange = (e) => {
//     const { name, value } = e.target;
//     setPersonal((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleProfessionalChange = (e) => {
//     const { name, value } = e.target;
//     setProfessional((prev) => ({ ...prev, [name]: value }));
//   };

//   const saveChanges = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className="w-full max-w-3xl p-6 mx-auto space-y-6 bg-white shadow-md rounded-xl">
      
//       {/* Header */}
//       <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
//         <p className="font-semibold text-gray-700">
//           Step {currentStep}: Review Your Application
//         </p>
//         <p className="text-gray-500">{currentStep}/{totalSteps}</p>
//       </div>

//       {/* Progress Bar */}
//       <div className="w-full h-2 bg-gray-200 rounded-full">
//         <div
//           className="bg-[#1D52AF] h-2 rounded-full transition-all duration-300"
//           style={{ width: `${progressPercentage}%` }}
//         />
//       </div>

//       {/* Personal Information */}
//       <div className="p-4 space-y-2 bg-white rounded-lg shadow-sm">
//         <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
//           <p className="flex items-center gap-2 font-semibold text-gray-700">
//             <HiUser className="text-[#1D52AF]" /> Personal Information
//           </p>
//           <button
//             onClick={() => openModal("personal")}
//             className="flex items-center gap-1 text-[#1D52AF] bg-white px-2 py-1 rounded-md hover:bg-gray-100 transition text-sm mt-2 md:mt-0"
//           >
//             <HiPencil /> Edit
//           </button>
//         </div>

//         <div className="flex flex-col justify-between gap-1 md:flex-row">
//           <p>Full Name</p>
//           <p>{personal.fullName}</p>
//         </div>
//         <div className="flex flex-col justify-between gap-1 md:flex-row">
//           <p>Email</p>
//           <p>{personal.email}</p>
//         </div>
//         <div className="flex flex-col justify-between gap-1 md:flex-row">
//           <p>Phone Number</p>
//           <p>{personal.phone}</p>
//         </div>
//       </div>

//       {/* Professional Details */}
//       <div className="p-4 space-y-2 bg-white rounded-lg shadow-sm">
//         <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
//           <p className="flex items-center gap-2 font-semibold text-gray-700">
//             <HiBriefcase className="text-[#1D52AF]" /> Professional Details
//           </p>
//           <button
//             onClick={() => openModal("professional")}
//             className="flex items-center gap-1 text-[#1D52AF] bg-white px-2 py-1 rounded-md hover:bg-gray-100 transition text-sm mt-2 md:mt-0"
//           >
//             <HiPencil /> Edit
//           </button>
//         </div>

//         <div className="flex flex-col justify-between gap-1 md:flex-row">
//           <p>Specialization</p>
//           <p>{professional.specialization}</p>
//         </div>
//         <div className="flex flex-col justify-between gap-1 md:flex-row">
//           <p>Years of Experience</p>
//           <p>{professional.experience}</p>
//         </div>
//         <div className="flex flex-col justify-between gap-1 md:flex-row">
//           <p>Workshop Name</p>
//           <p>{professional.workshop}</p>
//         </div>
//       </div>

//       {/* Uploaded Documents */}
//       <div className="p-4 space-y-2 bg-white rounded-lg shadow-sm">
//         <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
//           <p className="flex items-center gap-2 font-semibold text-gray-700">
//             <HiDocument className="text-[#1D52AF]" /> Uploaded Documents
//           </p>
//           <button
//             onClick={() => openModal("documents")}
//             className="flex items-center gap-1 text-[#1D52AF] bg-white px-2 py-1 rounded-md hover:bg-gray-100 transition text-sm mt-2 md:mt-0"
//           >
//             <HiPencil /> Edit
//           </button>
//         </div>

//         {/* Document List */}
//         {[{name: "Mechanic Certification", file: "cert_2023.pdf"}, {name: "Government ID", file: "id_card_front.jpg"}].map((doc, i) => (
//           <div key={i} className="flex flex-col items-start justify-between gap-2 p-2 rounded-md md:flex-row md:items-center bg-gray-50">
//             <div className="flex items-center gap-2">
//               <HiDocument className="text-gray-500" size={20} />
//               <div>
//                 <p className="font-medium">{doc.name}</p>
//                 <p className="text-sm text-gray-600">{doc.file}</p>
//               </div>
//             </div>
//             <HiCheckCircle className="text-[#22C55E]" size={24} />
//           </div>
//         ))}
//       </div>

//       {/* Navigation Buttons */}
      

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
//           <div className="w-full max-w-md p-6 bg-white rounded-lg overflow-y-auto max-h-[90vh]">
//             <h2 className="mb-4 text-lg font-semibold">
//               Edit {modalType === "personal" ? "Personal Info" : modalType === "professional" ? "Professional Info" : "Documents"}
//             </h2>

//             {modalType === "personal" && (
//               <div className="space-y-2">
//                 <input
//                   name="fullName"
//                   value={personal.fullName}
//                   onChange={handlePersonalChange}
//                   className="w-full px-2 py-1 border rounded"
//                   placeholder="Full Name"
//                 />
//                 <input
//                   name="email"
//                   value={personal.email}
//                   onChange={handlePersonalChange}
//                   className="w-full px-2 py-1 border rounded"
//                   placeholder="Email"
//                 />
//                 <input
//                   name="phone"
//                   value={personal.phone}
//                   onChange={handlePersonalChange}
//                   className="w-full px-2 py-1 border rounded"
//                   placeholder="Phone"
//                 />
//               </div>
//             )}

//             {modalType === "professional" && (
//               <div className="space-y-2">
//                 <input
//                   name="specialization"
//                   value={professional.specialization}
//                   onChange={handleProfessionalChange}
//                   className="w-full px-2 py-1 border rounded"
//                   placeholder="Specialization"
//                 />
//                 <input
//                   name="experience"
//                   value={professional.experience}
//                   onChange={handleProfessionalChange}
//                   className="w-full px-2 py-1 border rounded"
//                   placeholder="Experience"
//                 />
//                 <input
//                   name="workshop"
//                   value={professional.workshop}
//                   onChange={handleProfessionalChange}
//                   className="w-full px-2 py-1 border rounded"
//                   placeholder="Workshop Name"
//                 />
//               </div>
//             )}

//             {modalType === "documents" && (
//               <p className="text-gray-600">Document editing can be added here</p>
//             )}

//             <div className="flex flex-col justify-end gap-2 mt-4 sm:flex-row">
//               <button
//                 onClick={closeModal}
//                 className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={saveChanges}
//                 className="px-4 py-2 rounded-md bg-[#1D52AF] text-white hover:bg-blue-800"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex items-start gap-2 mt-4">
//   <input
//     type="checkbox"
//     id="confirm"
//     className="w-5 h-5 text-[#1D52AF] border-gray-300 rounded focus:ring-[#1D52AF]"
//   />
//   <div className="flex flex-col">
//     <p className="text-sm text-gray-600">
//       I confirm that all the information provided above is accurate and I agree to MokaNik's{' '}
//       <a href="#" className="text-blue-600 underline">Terms of Service</a> and{' '}
//       <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
//     </p>
//   </div>
// </div>

// <div className="flex flex-col justify-between gap-2 pt-4 sm:flex-row">
//         <button
//           onClick={handleBack}
//           className="text-sm text-gray-600 hover:text-black"
//         >
//           Back
//         </button>

//         <button
//           onClick={handleNext}
//           className="flex items-center justify-center gap-2 bg-[#1D52AF] text-white px-5 py-2 rounded-md hover:bg-blue-800 transition text-sm"
//         >
//           Submit For Verification
//           <HiArrowRight />
//         </button>
//       </div>

//     </div>
//   );
// };

// export default BookingD;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  HiArrowRight, 
  HiUser, 
  HiPencil, 
  HiBriefcase, 
  HiDocument, 
  HiCheckCircle 
} from "react-icons/hi";

const BookingD = ({ currentStep = 4, totalSteps = 5 }) => {
  const navigate = useNavigate();
  const progressPercentage = (currentStep / totalSteps) * 100;

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "personal", "professional", "documents"
  const [confirmed, setConfirmed] = useState(false);

  const [personal, setPersonal] = useState({
    fullName: "Ricardo Milos",
    email: "ricardo.m@mechanic.com",
    phone: "+1 (555) 123-4567",
  });

  const [professional, setProfessional] = useState({
    specialization: "Diesel Engines & Transmission",
    experience: "8 Years",
    workshop: "Milos Performance Center",
  });

  const documents = [
    { name: "Mechanic Certification", file: "cert_2023.pdf" },
    { name: "Government ID", file: "id_card_front.jpg" }
  ];

  const handleNext = () => {
    if (!confirmed) {
      alert("Please confirm the information before submitting.");
      return;
    }
    navigate(`/booking/${currentStep + 1}`);
  };

  const handleBack = () => navigate(`/booking/${currentStep - 1}`);

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonal((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfessionalChange = (e) => {
    const { name, value } = e.target;
    setProfessional((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full max-w-3xl p-6 mx-auto space-y-6 bg-white shadow-md rounded-xl">

      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <p className="font-semibold text-gray-700">
          Step {currentStep}: Review Your Application
        </p>
        <p className="text-gray-500">{currentStep}/{totalSteps}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="bg-[#1D52AF] h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Personal Information */}
      <div className="p-4 space-y-2 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <p className="flex items-center gap-2 font-semibold text-gray-700">
            <HiUser className="text-[#1D52AF]" /> Personal Information
          </p>
          <button
            onClick={() => openModal("personal")}
            className="flex items-center gap-1 text-[#1D52AF] bg-white px-3 py-1 rounded-md hover:bg-gray-100 transition text-sm mt-2 md:mt-0"
          >
            <HiPencil /> Edit
          </button>
        </div>

        {["Full Name", "Email", "Phone Number"].map((field, idx) => (
          <div key={idx} className="flex flex-col justify-between gap-1 md:flex-row">
            <p className="text-gray-600">{field}</p>
            <p className="font-medium">
              {field === "Full Name" ? personal.fullName : field === "Email" ? personal.email : personal.phone}
            </p>
          </div>
        ))}
      </div>

      {/* Professional Details */}
      <div className="p-4 space-y-2 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <p className="flex items-center gap-2 font-semibold text-gray-700">
            <HiBriefcase className="text-[#1D52AF]" /> Professional Details
          </p>
          <button
            onClick={() => openModal("professional")}
            className="flex items-center gap-1 text-[#1D52AF] bg-white px-3 py-1 rounded-md hover:bg-gray-100 transition text-sm mt-2 md:mt-0"
          >
            <HiPencil /> Edit
          </button>
        </div>

        {["Specialization", "Years of Experience", "Workshop Name"].map((field, idx) => (
          <div key={idx} className="flex flex-col justify-between gap-1 md:flex-row">
            <p className="text-gray-600">{field}</p>
            <p className="font-medium">
              {field === "Specialization" ? professional.specialization : field === "Years of Experience" ? professional.experience : professional.workshop}
            </p>
          </div>
        ))}
      </div>

      {/* Uploaded Documents */}
      <div className="p-4 space-y-2 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <p className="flex items-center gap-2 font-semibold text-gray-700">
            <HiDocument className="text-[#1D52AF]" /> Uploaded Documents
          </p>
          <button
            onClick={() => openModal("documents")}
            className="flex items-center gap-1 text-[#1D52AF] bg-white px-3 py-1 rounded-md hover:bg-gray-100 transition text-sm mt-2 md:mt-0"
          >
            <HiPencil /> Edit
          </button>
        </div>

        {documents.map((doc, i) => (
          <div key={i} className="flex flex-col items-start justify-between gap-2 p-3 rounded-md md:flex-row md:items-center bg-gray-50">
            <div className="flex items-center gap-2">
              <HiDocument className="text-gray-500" size={20} />
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-gray-600">{doc.file}</p>
              </div>
            </div>
            <HiCheckCircle className="text-[#22C55E]" size={24} />
          </div>
        ))}
      </div>

      {/* Checkbox */}
      <div className="flex items-start gap-3 mt-4">
        <input
          type="checkbox"
          id="confirm"
          className="w-5 h-5 mt-1 text-[#1D52AF] border-gray-300 rounded focus:ring-[#1D52AF]"
          checked={confirmed}
          onChange={() => setConfirmed(!confirmed)}
        />
        <label htmlFor="confirm" className="text-sm text-gray-600">
          I confirm that all the information provided above is accurate and I agree to MokaNik's{' '}
          <a href="#" className="text-blue-600 underline">Terms of Service</a> and{' '}
          <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
        </label>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col justify-between gap-3 pt-4 sm:flex-row">
        <button
          onClick={handleBack}
          className="w-full px-5 py-2 text-sm text-gray-600 border rounded-md sm:w-auto hover:text-black"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1D52AF] text-white px-5 py-2 rounded-md hover:bg-blue-800 transition text-sm"
        >
          Submit For Verification
          <HiArrowRight />
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-md p-6 bg-white rounded-lg overflow-y-auto max-h-[90vh]">
            <h2 className="mb-4 text-lg font-semibold">
              Edit {modalType === "personal" ? "Personal Info" : modalType === "professional" ? "Professional Info" : "Documents"}
            </h2>

            {modalType === "personal" && (
              <div className="space-y-2">
                <input
                  name="fullName"
                  value={personal.fullName}
                  onChange={handlePersonalChange}
                  className="w-full px-2 py-1 border rounded"
                  placeholder="Full Name"
                />
                <input
                  name="email"
                  value={personal.email}
                  onChange={handlePersonalChange}
                  className="w-full px-2 py-1 border rounded"
                  placeholder="Email"
                />
                <input
                  name="phone"
                  value={personal.phone}
                  onChange={handlePersonalChange}
                  className="w-full px-2 py-1 border rounded"
                  placeholder="Phone"
                />
              </div>
            )}

            {modalType === "professional" && (
              <div className="space-y-2">
                <input
                  name="specialization"
                  value={professional.specialization}
                  onChange={handleProfessionalChange}
                  className="w-full px-2 py-1 border rounded"
                  placeholder="Specialization"
                />
                <input
                  name="experience"
                  value={professional.experience}
                  onChange={handleProfessionalChange}
                  className="w-full px-2 py-1 border rounded"
                  placeholder="Experience"
                />
                <input
                  name="workshop"
                  value={professional.workshop}
                  onChange={handleProfessionalChange}
                  className="w-full px-2 py-1 border rounded"
                  placeholder="Workshop Name"
                />
              </div>
            )}

            {modalType === "documents" && (
              <p className="text-gray-600">Document editing can be added here</p>
            )}

            <div className="flex flex-col justify-end gap-2 mt-4 sm:flex-row">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="px-4 py-2 rounded-md bg-[#1D52AF] text-white hover:bg-blue-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BookingD;



