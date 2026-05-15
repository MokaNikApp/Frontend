import UserSidebar from "../../components/Users-admin-components/UserSidebar";
import { Link } from "react-router-dom";
import {
  MdArrowBack,
  MdLocationOn,
  MdWork,
  MdVerified,
  MdCheckCircle,
  MdCancel,
} from "react-icons/md";

export default function MechanicApprovalPage() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <UserSidebar />

      <div className="flex-1 ml-64 p-6">

        {/* BACK */}
        <div className="flex items-center gap-2 text-sm text-blue-600 mb-4">
            <MdArrowBack />
            <Link to="/users-mechanics" className="hover:underline">
                Back to Mechanics Management
            </Link>
        </div>

        {/* PROFILE HEADER */}
        <div className="flex gap-6 items-start mb-6">
          <img
            src="/images/mecappprofile.png"
            className="w-28 h-28 rounded-xl object-cover"
          />

          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-gray-800">
                Robert Fox
              </h2>
              <span className="bg-gray-200 text-gray-600 px-3 py-1 text-xs rounded-full">
                PENDING REVIEW
              </span>
            </div>

            <div className="flex gap-6 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MdLocationOn /> San Francisco, CA
              </span>
              <span className="flex items-center gap-1">
                <MdWork /> 12 Years Experience
              </span>
              <span className="flex items-center gap-1">
                <MdVerified /> Master ASE Certified
              </span>
            </div>

            <div className="flex gap-10 mt-4">
              <div>
                <p className="text-xs text-gray-400">RELIABILITY SCORE</p>
                <p className="text-blue-600 font-bold text-lg">98.4%</p>
              </div>

              <div>
                <p className="text-xs text-gray-400">APPLIED DATE</p>
                <p className="font-semibold">Oct 24, 2023</p>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN SECTION */}
        <div className="space-y-6">

          {/* CERTIFICATIONS (FULL WIDTH) */}
          <div>
            <h3 className="font-semibold mb-3">
              Certification Documents
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-xl shadow">
                <img
                  src="/images/mecappcertifi1.png"
                  className="rounded-lg mb-2"
                />
                <p className="text-sm font-medium">ID Card</p>
                <p className="text-xs text-gray-400">
                  Expires: 12/2026
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl shadow">
                <img
                  src="/images/mecappcertifi2.png"
                  className="rounded-lg mb-2"
                />
                <p className="text-sm font-medium">
                  ASE Certification
                </p>
                <p className="text-xs text-gray-400">
                  ID: MB382-AF
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl shadow">
                <img
                  src="/images/mecappcertifi3.png"
                  className="rounded-lg mb-2"
                />
                <p className="text-sm font-medium">
                  Business License
                </p>
                <p className="text-xs text-gray-400">
                  SF Municipal Code 892-90
                </p>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION */}
          <div className="grid grid-cols-3 gap-6">

            {/* NOTES (LEFT - 2 COLS) */}
            <div className="col-span-2 bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold mb-2">
                Admin Internal Notes
              </h3>

              <textarea
                placeholder="Add internal notes about this candidate..."
                className="w-full h-32 border rounded-lg p-3 text-sm outline-none"
              />

              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>Last edited by Sarah Miller • 2 hours ago</span>
                <span className="text-blue-600">Auto-save enabled</span>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">

              {/* ACTION CARD */}
              <div className="bg-white p-5 rounded-xl shadow space-y-4">
                <h3 className="font-semibold">Application Control</h3>

                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg">
                  <MdCheckCircle /> Approve Mechanic
                </button>

                <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-600 py-2 rounded-lg">
                  <MdCancel /> Reject Application
                </button>

                {/* REJECTION */}
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <p className="text-xs text-red-500 mb-1">
                    REASON FOR REJECTION
                  </p>

                  <textarea
                    placeholder="Specific reason for rejection..."
                    className="w-full border rounded-lg p-2 text-sm"
                  />

                  <button className="w-full mt-2 bg-red-600 text-white py-2 rounded-lg text-sm">
                    CONFIRM REJECTION
                  </button>
                </div>

                <p className="text-xs text-gray-400">
                  Approving will automatically trigger onboarding credentials.
                </p>
              </div>

              {/* REQUEST BUTTON */}
              <button className="w-full border rounded-lg py-2 text-sm bg-white shadow">
                Request More Documents
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}