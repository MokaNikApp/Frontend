import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineSparkles,
  HiOutlineCog,
  HiOutlineBeaker,
  HiOutlineLightningBolt,
  HiOutlineCloud,
  HiOutlineAdjustments,
  HiLocationMarker,
  HiCalendar,
  HiClock,
} from "react-icons/hi";
import Background2 from "../../assets/images/Background2.png";

const BookService = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const navigate = useNavigate();
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("San Francisco, CA 94103");
  const [selectedVehicle, setSelectedVehicle] = useState("2022 Tesla Model 3 (Gray)");

  const services = [
    {
      id: 1,
      icon: <HiOutlineSparkles className="text-3xl" />,
      title: "Full Oil Change",
      price: 89.0,
    },
    {
      id: 2,
      icon: <HiOutlineCog className="text-3xl" />,
      title: "Tire Rotation",
      price: 45.0,
    },
    {
      id: 3,
      icon: <HiOutlineBeaker className="text-3xl" />,
      title: "Brake Repair",
      price: 120.0,
    },
    {
      id: 4,
      icon: <HiOutlineLightningBolt className="text-3xl" />,
      title: "Engine Diagnostic",
      price: 99.0,
    },
    {
      id: 5,
      icon: <HiOutlineCloud className="text-3xl" />,
      title: "AC Service",
      price: 75.0,
    },
    {
      id: 6,
      icon: <HiOutlineAdjustments className="text-3xl" />,
      title: "Battery Replacement",
      price: 150.0,
    },
    {
      id: 7,
      icon: <HiOutlineSparkles className="text-3xl" />,
      title: "Spark Plug Replacement",
      price: 65.0,
    },
    {
      id: 8,
      icon: <HiOutlineCog className="text-3xl" />,
      title: "Air Filter Replacement",
      price: 40.0,
    },
    {
      id: 9,
      icon: <HiOutlineBeaker className="text-3xl" />,
      title: "Transmission Service",
      price: 200.0,
    },
    {
      id: 10,
      icon: <HiOutlineLightningBolt className="text-3xl" />,
      title: "Wheel Alignment",
      price: 85.0,
    },
    {
      id: 11,
      icon: <HiOutlineCloud className="text-3xl" />,
      title: "Suspension Service",
      price: 180.0,
    },
    {
      id: 12,
      icon: <HiOutlineAdjustments className="text-3xl" />,
      title: "Other Service",
      price: 0,
    },
  ];

  const mechanics = [
    { 
      id: 1, 
      name: "Marco Rossi", 
      rating: "4.9 (120 reviews)", 
      badge: "EXPERT",
      services: [1, 2, 3, 4, 9, 10, 11] // Full range of services
    },
    { 
      id: 2, 
      name: "Lara Smith", 
      rating: "4.8 (95 reviews)", 
      badge: "SENDER",
      services: [2, 3, 5, 6, 8] // Tire, Brake, AC, Battery, Air Filter
    },
    { 
      id: 3, 
      name: "John Doe", 
      rating: "4.7 (80 reviews)", 
      badge: "FAST",
      services: [1, 4, 5, 7, 12] // Oil, Diagnostics, AC, Spark Plugs, Other
    },
  ];

  const times = ["09:00am", "11:00am", "01:00pm", "03:00pm", "05:00pm", "07:00pm"];

  const toggleService = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getSelectedServicesData = () => {
    return services.filter((s) => selectedServices.includes(s.id));
  };

  const getMechanicServices = () => {
    if (!selectedMechanic) return services;
    const mechanic = mechanics.find((m) => m.id === selectedMechanic);
    return services.filter((s) => mechanic?.services.includes(s.id));
  };

  const getMechanicName = () => {
    return mechanics.find((m) => m.id === selectedMechanic)?.name || "";
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const subtotal = getSelectedServicesData().reduce((sum, s) => sum + s.price, 0);
  const serviceFee = subtotal > 0 ? 10.0 : 0;
  const tax = subtotal > 0 ? Math.round((subtotal + serviceFee) * 0.05 * 100) / 100 : 0;
  const total = subtotal + serviceFee + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slide-in-up {
          animation: slideInUp 0.4s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-down {
          animation: slideInDown 0.4s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
          opacity: 0;
        }

        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
          opacity: 0;
        }

        .service-card {
          transition: all 0.25s ease;
          position: relative;
        }

        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(29, 82, 175, 0.08);
        }

        .service-card.selected {
          background: linear-gradient(135deg, #1D52AF 0%, #1a4a9e 100%);
          color: white;
          box-shadow: 0 8px 20px rgba(29, 82, 175, 0.25);
          border-color: #1D52AF;
        }

        .mechanic-item {
          transition: all 0.25s ease;
          position: relative;
        }

        .mechanic-item:hover {
          transform: translateX(3px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }

        .mechanic-item.selected {
          border-color: #1D52AF;
          background: linear-gradient(135deg, #f0f7ff 0%, #e8f1ff 100%);
          box-shadow: 0 2px 8px rgba(29, 82, 175, 0.1);
        }

        .time-slot {
          transition: all 0.25s ease;
          position: relative;
        }

        .time-slot:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        .time-slot.selected {
          background: #1D52AF;
          color: white;
          border-color: #1D52AF;
          box-shadow: 0 4px 12px rgba(29, 82, 175, 0.25);
        }

        .summary-item {
          animation: slideInUp 0.3s ease-out;
        }

        .summary-card {
          transition: all 0.25s ease-out;
        }

        .input-field {
          transition: all 0.25s ease;
          background: linear-gradient(to bottom, #ffffff, #fafbfc);
        }

        .input-field:focus {
          box-shadow: 0 0 0 3px rgba(29, 82, 175, 0.1);
          border-color: #1D52AF;
          background: #ffffff;
        }

        .select-field {
          transition: all 0.25s ease;
          background: linear-gradient(to bottom, #ffffff, #fafbfc);
        }

        .select-field:focus {
          box-shadow: 0 0 0 3px rgba(29, 82, 175, 0.1);
          border-color: #1D52AF;
          background: #ffffff;
        }

        .btn-confirm {
          transition: all 0.25s ease;
          position: relative;
        }

        .btn-confirm:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(29, 82, 175, 0.25);
        }

        .btn-confirm:active:not(:disabled) {
          transform: translateY(0);
        }

        .btn-apply {
          transition: all 0.2s ease;
        }

        .btn-apply:hover {
          background: #dbe4f0;
        }

        .stagger-1 { animation-delay: 0.05s; }
        .stagger-2 { animation-delay: 0.1s; }
        .stagger-3 { animation-delay: 0.15s; }

        .card-base {
          background: white;
          border: 1px solid #f0f1f3;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .card-base:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start p-6 max-w-7xl mx-auto">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Location & Vehicle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-slide-in-up stagger-1">
            {/* Service Location */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-800 mb-3 text-sm tracking-wide">
                Service Location
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <HiLocationMarker className="text-lg" />
                </span>
                <input
                  type="text"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  placeholder="Enter location"
                  className="input-field w-full pl-10 pr-4 py-2.5 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Vehicle Select */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-800 mb-3 text-sm tracking-wide">
                Vehicle
              </label>
              <select 
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="select-field w-full border border-gray-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231D52AF' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: '32px' }}
              >
                <option>2022 Tesla Model 3 (Gray)</option>
                <option>2023 Toyota Camry (White)</option>
                <option>2021 Honda Civic (Blue)</option>
              </select>
            </div>
          </div>

          {/* Service Selection */}
          <div className="space-y-5 animate-slide-in-up stagger-2">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {selectedMechanic ? `${getMechanicName()}'s Services` : "Select Service"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {selectedMechanic 
                  ? `Available services offered by ${getMechanicName()}`
                  : "Choose one or more services for your vehicle"
                }
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(selectedMechanic ? getMechanicServices() : services).map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`service-card flex flex-col items-center justify-center p-5 rounded-lg text-center space-y-3 border-2 animate-slide-in-up transition-all ${
                    selectedServices.includes(service.id)
                      ? "selected"
                      : "bg-white text-gray-900 border-gray-100 hover:border-gray-200"
                  }`}
                  style={{ animationDelay: `${150 + index * 30}ms` }}
                >
                  <div className="transition-all duration-300">
                    {service.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{service.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {service.price > 0 ? `$${service.price.toFixed(2)}` : "Get custom quote"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            {selectedMechanic && getMechanicServices().length === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <p className="text-sm text-yellow-800">This mechanic doesn't offer any services.</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-in-up stagger-3">
            {/* Schedule Card */}
            <div className="card-base p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Schedule</h3>

              {/* Date Picker */}
              <div className="mb-5">
                <label className="block mb-2 font-semibold text-gray-800 text-sm">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate || ""}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="input-field w-full border border-gray-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Time Slots */}
              <div>
                <label className="block mb-3 font-semibold text-gray-800 text-sm">
                  Time Slots
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {times.map((time, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedTime(time)}
                      className={`time-slot border-2 rounded-lg py-2.5 text-xs font-semibold transition-all ${
                        selectedTime === time
                          ? "selected"
                          : "bg-white text-gray-700 border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mechanics Card */}
            <div className="card-base p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Available Mechanics
              </h3>

              {/* Mechanic List */}
              <div className="space-y-2.5">
                {mechanics.map((mech) => (
                  <button
                    key={mech.id}
                    onClick={() => {
                      setSelectedMechanic(mech.id);
                      setSelectedServices([]); // Clear services when mechanic changes
                    }}
                    className={`mechanic-item w-full flex items-center justify-between p-3 border-2 rounded-lg transition-all ${
                      selectedMechanic === mech.id
                        ? "selected border-[#1D52AF]"
                        : "bg-white border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    {/* Image + Info */}
                    <div className="flex items-center gap-3 flex-1">
                      <img
                        src={Background2}
                        alt={mech.name}
                        className="w-11 h-11 rounded-full object-cover flex-shrink-0 ring-2 ring-blue-100"
                      />
                      <div className="text-left min-w-0">
                        <p className="font-semibold text-sm text-gray-900">{mech.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-xs text-gray-500">{mech.rating}</p>
                          <span className="text-xs text-blue-600 font-medium">•</span>
                          <p className="text-xs text-blue-600 font-medium">{mech.services.length} services</p>
                        </div>
                      </div>
                    </div>

                    {/* Badge */}
                    <div
                      className={`text-xs px-2.5 py-1 rounded-full font-bold flex-shrink-0 ml-2 ${
                        mech.badge === "EXPERT"
                          ? "bg-green-100 text-green-700"
                          : mech.badge === "SENDER"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {mech.badge}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Summary) */}
        <div className="space-y-6 animate-slide-in-down">
          <div className="card-base rounded-xl p-6 overflow-y-auto sticky top-6" style={{ maxHeight: 'calc(100vh - 10px)' }}>
            {/* Header */}
            <div className="bg-gradient-to-br from-[#1D52AF] to-[#1645a0] text-white p-5 rounded-lg mb-6 shadow-lg">
              <p className="text-lg font-bold">Book Summary</p>
              <p className="text-xs opacity-80 mt-2">Order #MK-78219</p>
            </div>

            {/* Content */}
            <div className="space-y-4 summary-card">
              {/* Location */}
              <div className="summary-item flex items-start gap-3 pb-4 border-b border-gray-100">
                <div className="bg-blue-50 p-2.5 rounded-lg text-lg flex-shrink-0">
                  📍
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Location</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {selectedLocation || "Not selected"}
                  </p>
                </div>
              </div>

              {/* Vehicle */}
              <div className="summary-item flex items-start gap-3 pb-4 border-b border-gray-100">
                <div className="bg-blue-50 p-2.5 rounded-lg text-lg flex-shrink-0">
                  🚗
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Vehicle</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {selectedVehicle || "Not selected"}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="summary-item flex items-start gap-3 pb-4 border-b border-gray-100">
                <div className="bg-blue-50 p-2.5 rounded-lg text-lg flex-shrink-0">
                  <HiCalendar className="text-[#1D52AF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Date</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {selectedDate ? formatDate(selectedDate) : "Not selected"}
                  </p>
                </div>
              </div>

              {/* Time */}
              <div className="summary-item flex items-start gap-3 pb-4 border-b border-gray-100">
                <div className="bg-blue-50 p-2.5 rounded-lg text-lg flex-shrink-0">
                  <HiClock className="text-[#1D52AF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Time</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {selectedTime ? selectedTime : "Not selected"}
                  </p>
                </div>
              </div>

              {/* Mechanic */}
              <div className="summary-item flex items-start gap-3 pb-4 border-b border-gray-100">
                <img
                  src={Background2}
                  alt="Selected Mechanic"
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-blue-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Mechanic</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {selectedMechanic ? mechanics.find((m) => m.id === selectedMechanic)?.name : "Not selected"}
                  </p>
                </div>
              </div>

              {/* Services */}
              {getSelectedServicesData().length > 0 && (
                <div className="pb-4 border-b border-gray-100">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-3">
                    Services ({selectedServices.length})
                  </p>
                  <div className="space-y-2">
                    {getSelectedServicesData().map((service) => (
                      <div
                        key={service.id}
                        className="summary-item flex items-center justify-between p-3 bg-blue-50 rounded-lg text-sm"
                      >
                        <span className="font-semibold text-gray-800">
                          {service.title}
                        </span>
                        <span className="text-[#1D52AF] font-bold">
                          ${service.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing */}
              {getSelectedServicesData().length > 0 && (
                <>
                  <div className="space-y-3 text-sm pb-4 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600 font-medium">Subtotal</p>
                      <p className="font-bold text-gray-900">
                        ${subtotal.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600 font-medium">Service Fee</p>
                      <p className="font-bold text-gray-900">
                        ${serviceFee.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600 font-medium">Tax (5%)</p>
                      <p className="font-bold text-gray-900">
                        ${tax.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center py-4 border-b border-gray-100">
                    <p className="text-gray-800 font-bold text-base">Total</p>
                    <p className="text-2xl font-bold text-[#1D52AF]">
                      ${total.toFixed(2)}
                    </p>
                  </div>
                </>
              )}

              {/* Promo */}
              {getSelectedServicesData().length > 0 && (
                <div className="flex gap-2">
                  <input
                    placeholder="Promo code"
                    className="input-field flex-1 border border-gray-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="btn-apply bg-gray-200 hover:bg-gray-300 px-4 py-2.5 rounded-lg text-sm font-bold text-gray-800 transition-colors">
                    Apply
                  </button>
                </div>
              )}

              {/* Button */}
             <button
              disabled={selectedServices.length === 0}
              onClick={() => {
                if (selectedServices.length > 0) {
                  navigate("/payment-management");
                }
              }}
              className={`btn-confirm w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 text-base transition-all ${
                selectedServices.length > 0
                  ? "bg-gradient-to-r from-[#1D52AF] to-[#1645a0] text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Confirm Booking →
            </button>

              {/* Note */}
              <p className="text-xs text-gray-400 leading-relaxed text-center">
                By confirming, you agree to MokaNik's Terms of Service and Privacy Policy.
                Cancellation is free up to 24h before.
              </p>
            </div>
          </div>

          {/* Map Card */}
          <div className="card-base p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-50 p-2.5 rounded-lg">
                <HiLocationMarker className="text-[#1D52AF] text-lg" />
              </div>
              <h2 className="font-bold text-gray-900">Service Location</h2>
            </div>

            <div className="w-full h-32 rounded-lg overflow-hidden border border-gray-100">
              <iframe
                title="map"
                className="w-full h-full border-0"
                src="https://maps.google.com/maps?q=lagos&t=&z=13&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookService;