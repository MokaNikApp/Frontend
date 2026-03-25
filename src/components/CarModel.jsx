import React, { useState } from 'react';
import { HiUpload } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const CarModel = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const carBrands = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Ford'];
  const carModels = {
    Toyota: ['Camry', 'Corolla', 'RAV4'],
    Honda: ['Civic', 'Accord', 'CR-V'],
    BMW: ['X5', '3 Series', 'i8'],
    Mercedes: ['C-Class', 'E-Class', 'GLE'],
    Ford: ['Focus', 'F-150', 'Mustang'],
  };
  const carYears = ['2026', '2025', '2024', '2023', '2022', '2021'];

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleContinue = () => {
    // Optional: validate inputs before navigating
    if (!brand || !model || !year || !plateNumber) {
      alert('Please fill in all car details');
      return;
    }

    // Navigate to Verified page
    navigate('/verified', { state: { brand, model, year, plateNumber, file } });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Tell us about your car</h1>
          <p className="text-gray-600 text-sm">
            Providing accurate details helps our concierge team provide precise service estimates.
          </p>
        </div>

        {/* Car Brand & Model */}
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-semibold">Car Brand</label>
            <select
              value={brand}
              onChange={(e) => { setBrand(e.target.value); setModel(''); }}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1D52AF]"
            >
              <option value="">Select Brand</option>
              {carBrands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-semibold">Car Model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={!brand}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1D52AF] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Select Model</option>
              {brand && carModels[brand].map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        {/* Year & Plate Number */}
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-semibold">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1D52AF]"
            >
              <option value="">Select Year</option>
              {carYears.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-semibold">Plate Number</label>
            <input
              type="text"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              placeholder="Enter Plate Number"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1D52AF]"
            />
          </div>
        </div>

        {/* Upload */}
        <div className="flex justify-center">
          <label
            htmlFor="car-doc"
            className="flex items-center gap-2 bg-blue-50 text-[#1D52AF] px-4 py-2 rounded cursor-pointer hover:bg-blue-100 transition"
          >
            <HiUpload className="text-xl" />
            {file ? file.name : 'Upload car documents'}
          </label>
          <input
            id="car-doc"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleContinue}
            className="w-full bg-[#1D52AF] text-white py-2 rounded hover:bg-[#15418A] transition"
          >
            Continue
          </button>
          <button className="w-full text-[#1D52AF] py-2 rounded hover:underline">
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarModel;