



import React from "react";
import Background2 from "../../assets/images/Background2.png";
import {
  HiPencil,
  HiOutlineTruck,
  HiOutlinePlus,
  HiOutlineLockClosed,
  HiOutlineShieldCheck,
  HiOutlineHome,
} from "react-icons/hi";

const ProfileSettings = () => {
  return (
    <div className="p-4 space-y-6">
      {/* TOP SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <img
          src={Background2}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />

        <div className="flex-1">
          <p className="text-xl font-semibold">Alex Johnson</p>
          <p className="text-gray-500 text-sm">
            Manage your account information and preferences
          </p>

          <div className="mt-2 flex gap-2">
            <button className="px-4 py-1 bg-[#1C52AF] text-white rounded-full text-sm">
              Active
            </button>
            <button className="px-4 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">
              Pro Account
            </button>
          </div>
        </div>

        <button className="flex items-center gap-1 text-white px-3 py-2 rounded-md bg-[#1C52AF]">
          <HiPencil className="w-5 h-5" />
          Edit Profile
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-4">

          {/* PERSONAL INFORMATION */}
          <div className="p-4 sm:p-6 bg-white border border-gray-200 rounded-xl space-y-5">
            <h1 className="text-xl font-semibold">Personal Information</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Full Name</p>
                <h2 className="font-medium">Alex Johnson</h2>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Email Address</p>
                <h2 className="font-medium">alex.johnson@example.com</h2>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Phone Number</p>
                <h2 className="font-medium">+1 (555) 000-1234</h2>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Birthday</p>
                <h2 className="font-medium">June 12, 1992</h2>
              </div>
            </div>
          </div>

          {/* SAVED ADDRESSES */}
          <div className="p-4 sm:p-6 bg-white border border-gray-200 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <HiOutlineHome className="w-5 h-5 text-[#1C52AF]" />
                <h2 className="font-semibold">Saved Addresses</h2>
              </div>

              <button className="flex items-center gap-2 text-[#1C52AF] font-medium">
                <HiOutlinePlus className="w-5 h-5" />
                Add
              </button>
            </div>

            <div className="flex items-start gap-3 mb-3">
              <HiOutlineHome className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">Home Address</p>
                  <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                    Default
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  123 Maple Street, San Francisco, CA 94105
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <HiOutlineHome className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="font-medium">Office Address</p>
                <p className="text-sm text-gray-500">
                  456 Market Street, San Francisco, CA 94103
                </p>
              </div>
            </div>
          </div>


         <div className="w-full h-52 rounded-lg overflow-hidden border">
    <iframe
      title="location-map"
      className="w-full h-full border-0"
      src="https://maps.google.com/maps?q=lagos&t=&z=13&ie=UTF8&iwloc=&output=embed"
      loading="lazy"
    ></iframe>
  </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">

          {/* VEHICLES */}
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">My Vehicles</h2>
              <span className="text-sm text-blue-600 cursor-pointer">
                View All
              </span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <HiOutlineTruck className="w-6 h-6 text-[#1C52AF]" />
              <div>
                <p className="font-medium">2023 Tesla Model 3</p>
                <p className="text-sm text-gray-500">
                  Last serviced Oct 12
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <HiOutlineTruck className="w-6 h-6 text-[#1C52AF]" />
              <div>
                <p className="font-medium">2021 BMW X5</p>
                <p className="text-sm text-gray-500">
                  Service due in 500mi
                </p>
              </div>
            </div>

            <button className="flex items-center gap-2 text-[#1C52AF] font-medium">
              <HiOutlinePlus className="w-5 h-5" />
              Add New Vehicle
            </button>
          </div>

          {/* PROFILE COMPLETENESS */}
          <div className="bg-[#1C52AF] text-white p-6 rounded-xl border border-gray-200">
            <p className="text-lg font-semibold mb-2">
              Profile Completeness
            </p>
            <p className="text-sm mb-4">
              Complete your profile to unlock premium features and faster support.
            </p>

            <div className="w-full bg-white/30 rounded-full h-3">
              <div
                className="bg-white h-3 rounded-full"
                style={{ width: "85%" }}
              ></div>
            </div>

            <div className="flex justify-between mt-2 text-sm">
              <p>85% Complete</p>
              <p>Level 4</p>
            </div>

            <button className="mt-4 bg-white text-[#1C52AF] py-2 rounded-lg font-medium w-full">
              Learn More
            </button>
          </div>

          {/* SECURITY */}
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <h1 className="text-lg font-semibold mb-3">Security</h1>

            <div className="flex items-center gap-2 mb-3 cursor-pointer">
              <HiOutlineLockClosed className="w-5 h-5 text-gray-600" />
              <p>Change Password</p>
            </div>

            <div className="flex items-center gap-2 cursor-pointer">
              <HiOutlineShieldCheck className="w-5 h-5 text-gray-600" />
              <p>Two-Factor Authentication</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
