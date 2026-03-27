


import React from 'react';
import Background2 from '../../assets/images/Background2.png';
import { HiPencil } from 'react-icons/hi';

const ProfileSettings = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={Background2}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex-1">
          <p className="text-xl font-semibold">Alex Johnson</p>
          <p className="text-gray-500 text-sm">
            Manage your account information and preferences
          </p>

          {/* Buttons */}
          <div className="mt-2 flex gap-2">
            <button className="px-4 py-1 bg-[#1C52AF] text-white rounded-full text-sm">
              Active
            </button>
            <button className="px-4 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">
              Pro Account
            </button>
          </div>
        </div>

        {/* Edit Profile */}
        <button className="flex items-center gap-1 text-white p-2 rounded-md bg-[#1C52AF] cursor-pointer mt-2 sm:mt-0">
          <HiPencil className="w-5 h-5" />
          <span>Edit profile</span>
        </button>
      </div>


        <div className="lg:col-span-2 p-4 sm:p-6 bg-white shadow-md rounded-xl space-y-5">
  <h1 className="text-xl font-semibold mb-4">Personal Information</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {/* Full Name */}
    <div className="space-y-1">
      <p className="text-gray-500 text-sm">Full Name</p>
      <h2 className="font-medium">Alex Johnson</h2>
    </div>

    {/* Email Address */}
    <div className="space-y-1">
      <p className="text-gray-500 text-sm">Email Address</p>
      <h2 className="font-medium">alex.johnson@example.com</h2>
    </div>

    {/* Phone Number */}
    <div className="space-y-1">
      <p className="text-gray-500 text-sm">Phone Number</p>
      <h2 className="font-medium">+1 (555) 000-1234</h2>
    </div>

    {/* Birthday */}
    <div className="space-y-1">
      <p className="text-gray-500 text-sm">Birthday</p>
      <h2 className="font-medium">June 12, 1992</h2>
    </div>
  </div>
</div>

<div className="">
    
</div>
    </div>
  );
};

export default ProfileSettings;
