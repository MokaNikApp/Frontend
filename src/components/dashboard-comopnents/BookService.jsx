






import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import api from "../../api/axios";

const getServiceIcon = (category) => {
  const iconMap = {
    oil_change: <HiOutlineSparkles className="text-3xl" />,
    tire_rotation: <HiOutlineCog className="text-3xl" />,
    brake_repair: <HiOutlineBeaker className="text-3xl" />,
    engine_diagnostic: <HiOutlineLightningBolt className="text-3xl" />,
    ac_service: <HiOutlineCloud className="text-3xl" />,
    electrical: <HiOutlineLightningBolt className="text-3xl" />,
    suspension: <HiOutlineAdjustments className="text-3xl" />,
    transmission: <HiOutlineCog className="text-3xl" />,
  };
  return iconMap[category] || <HiOutlineSparkles className="text-3xl" />;
};

const convertTo24Hour = (t) => {
  if (!t) return "";
  const match = t.match(/^(\d{1,2}):(\d{2})(am|pm)$/i);
  if (!match) return t;
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = match[3].toLowerCase();
  if (period === "pm" && hours !== 12) hours += 12;
  if (period === "am" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${minutes}`;
};

const BookService = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");

  // Location fields — separate inputs
  const [serviceAddress, setServiceAddress] = useState("");
  const [serviceCity, setServiceCity] = useState("");
  const [serviceState, setServiceState] = useState("");
  const [serviceZip, setServiceZip] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [servicesRes, vehiclesRes] = await Promise.all([
          api.get("/services"),
          api.get("/vehicles"),
        ]);
        const servicesData = servicesRes.data?.data || servicesRes.data || [];
        const vehiclesData = vehiclesRes.data?.data || vehiclesRes.data || [];
        if (!Array.isArray(servicesData)) throw new Error("Invalid services response format");
        if (!Array.isArray(vehiclesData)) throw new Error("Invalid vehicles response format");
        if (isMounted) {
          setServices(servicesData);
          setVehicles(vehiclesData);
          if (vehiclesData.length > 0) setSelectedVehicleId(vehiclesData[0].id);
        }
      } catch (err) {
        if (isMounted) {
          const msg = err.response?.data?.message || err.message || "Failed to load data.";
          setError(msg);
          toast.error(msg);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, []);

  const times = ["09:00am", "11:00am", "01:00pm", "03:00pm", "05:00pm", "07:00pm"];

  const toggleService = (id) =>
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  const getSelectedServicesData = () => services.filter((s) => selectedServices.includes(s.id));
  const getSelectedVehicle = () => vehicles.find((v) => v.id === selectedVehicleId);

  const formatDate = (d) => {
    if (!d) return null;
    return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });
  };

  const subtotal = getSelectedServicesData().reduce((s, i) => s + parseFloat(i.price || 0), 0);
  const serviceFee = subtotal > 0 ? 10.0 : 0;
  const tax = subtotal > 0 ? Math.round((subtotal + serviceFee) * 0.05 * 100) / 100 : 0;
  const total = subtotal + serviceFee + tax;

  const handleConfirmBooking = async () => {
    if (selectedServices.length === 0) return toast.warning("Please select at least one service.");
    if (!selectedDate) return toast.warning("Please select a date.");
    if (!selectedTime) return toast.warning("Please select a time slot.");
    if (!selectedVehicleId) return toast.warning("Please select a vehicle.");
    if (!serviceAddress.trim()) return toast.warning("Please enter a street address.");
    if (!serviceCity.trim()) return toast.warning("Please enter a city.");
    if (!serviceState.trim()) return toast.warning("Please enter a state.");

    const [primaryServiceId, ...additionalServiceIds] = selectedServices;
    const additionalServiceNames = services
      .filter((s) => additionalServiceIds.includes(s.id))
      .map((s) => s.name);

    const bookingPayload = {
      vehicleId: selectedVehicleId,
      serviceId: primaryServiceId,
      scheduledDate: selectedDate,
      scheduledTime: convertTo24Hour(selectedTime),
      serviceAddress: serviceAddress.trim(),
      serviceCity: serviceCity.trim(),
      serviceState: serviceState.trim(),
      serviceZip: serviceZip.trim(),
      notes: "",
      additionalServices: additionalServiceNames,
    };

    console.log("Booking Payload:", bookingPayload);

    try {
      setBookingLoading(true);
      const response = await api.post("/bookings", bookingPayload);
      const bookingData = response.data?.data || response.data;
      console.log("Booking success:", bookingData);
      toast.success("Booking confirmed! Redirecting to payment...");
      setTimeout(() => navigate("/payment-management", { state: { booking: bookingData } }), 1500);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to create booking. Please try again.";
      toast.error(message);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D52AF] mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
            <p className="text-red-700 font-semibold mb-2">Error Loading Data</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#1D52AF] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#1645a0] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="light" />

      <style>{`
        @keyframes slideInUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideInDown { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }
        .animate-slide-in-up { animation: slideInUp 0.4s ease-out forwards; opacity:0; }
        .animate-slide-in-down { animation: slideInDown 0.4s ease-out forwards; opacity:0; }
        .stagger-1 { animation-delay:0.05s; }
        .stagger-2 { animation-delay:0.1s; }
        .stagger-3 { animation-delay:0.15s; }
        .stagger-4 { animation-delay:0.2s; }
        .card-base { background:white; border:1px solid #f0f1f3; box-shadow:0 1px 3px rgba(0,0,0,0.05); }
        .card-base:hover { box-shadow:0 4px 12px rgba(0,0,0,0.08); }
        .form-input {
          width:100%; border:1px solid #e5e7eb; border-radius:8px; padding:10px 14px;
          font-size:0.875rem; color:#111827; background:#fff; outline:none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input::placeholder { color:#9ca3af; }
        .form-input:focus { border-color:#1D52AF; box-shadow:0 0 0 3px rgba(29,82,175,0.1); }
        .form-input.has-icon { padding-left:40px; }
        .form-label { display:block; font-size:0.75rem; font-weight:600; color:#6b7280; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:6px; }
        .service-card { transition:all 0.25s ease; }
        .service-card:hover { transform:translateY(-4px); box-shadow:0 8px 16px rgba(29,82,175,0.08); }
        .service-card.selected {
          background:linear-gradient(135deg,#1D52AF 0%,#1a4a9e 100%);
          color:white; box-shadow:0 8px 20px rgba(29,82,175,0.25); border-color:#1D52AF;
        }
        .time-slot { transition:all 0.2s ease; }
        .time-slot:hover { background:#f0f7ff; border-color:#93b4e8; }
        .time-slot.selected { background:#1D52AF; color:white; border-color:#1D52AF; box-shadow:0 4px 12px rgba(29,82,175,0.25); }
        .btn-confirm { transition:all 0.25s ease; }
        .btn-confirm:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 8px 16px rgba(29,82,175,0.3); }
        .btn-confirm:active:not(:disabled) { transform:translateY(0); }
        .summary-row { display:flex; align-items:flex-start; gap:12px; padding-bottom:16px; border-bottom:1px solid #f3f4f6; }
        .summary-icon { background:#eff6ff; padding:10px; border-radius:8px; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
        .summary-label { font-size:0.7rem; font-weight:700; color:#9ca3af; text-transform:uppercase; letter-spacing:0.06em; }
        .summary-value { font-size:0.875rem; font-weight:600; color:#111827; margin-top:3px; }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start p-6 max-w-7xl mx-auto">

        {/* ── Left Column ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Vehicle */}
          <div className="card-base rounded-xl p-6 animate-slide-in-up stagger-1">
            <h3 className="text-base font-bold text-gray-900 mb-4">Your Vehicle</h3>
            <div className="flex flex-col">
              <label className="form-label">Select Vehicle</label>
              <div className="relative">
                
                <select
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  className="form-input has-icon appearance-none pr-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231D52AF' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 14px center",
                  }}
                >
                  {vehicles.length === 0 ? (
                    <option value="">No vehicles found</option>
                  ) : (
                    vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.year} {v.brand} {v.model} ({v.color}) — {v.plateNumber}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4 animate-slide-in-up stagger-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Select Service</h2>
              <p className="text-sm text-gray-500 mt-1">Choose one or more services for your vehicle</p>
            </div>
            {services.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <p className="text-sm text-yellow-800">No services available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {services.map((service, i) => (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`service-card flex flex-col items-center justify-center p-5 rounded-xl text-center space-y-3 border-2 transition-all animate-slide-in-up ${
                      selectedServices.includes(service.id)
                        ? "selected"
                        : "bg-white text-gray-900 border-gray-100 hover:border-blue-200"
                    }`}
                    style={{ animationDelay: `${180 + i * 30}ms` }}
                  >
                    <div>{getServiceIcon(service.category)}</div>
                    <div>
                      <p className="font-semibold text-sm leading-snug">{service.name}</p>
                      <p className={`text-xs mt-1 ${selectedServices.includes(service.id) ? "text-blue-200" : "text-gray-400"}`}>
                        ${parseFloat(service.price || 0).toFixed(2)}
                      </p>
                      {service.estimatedDurationMinutes && (
                        <p className={`text-xs mt-0.5 ${selectedServices.includes(service.id) ? "text-blue-200" : "text-gray-400"}`}>
                          {service.estimatedDurationMinutes} min
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Service Location */}
          <div className="card-base rounded-xl p-6 animate-slide-in-up stagger-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="bg-blue-50 p-2 rounded-lg">
                <HiLocationMarker className="text-[#1D52AF] text-lg" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Service Location</h3>
                <p className="text-xs text-gray-500 mt-0.5">Where should the mechanic come?</p>
              </div>
            </div>

            {/* Row 1: Street Address (full width) */}
            <div className="mb-4">
              <label className="form-label">Street Address <span className="text-red-400">*</span></label>
              <input
                type="text"
                value={serviceAddress}
                onChange={(e) => setServiceAddress(e.target.value)}
                placeholder="e.g. 123 Main Street"
                className="form-input"
              />
            </div>

            {/* Row 2: City + State side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="form-label">City <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={serviceCity}
                  onChange={(e) => setServiceCity(e.target.value)}
                  placeholder="e.g. Ibadan"
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">State <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={serviceState}
                  onChange={(e) => setServiceState(e.target.value)}
                  placeholder="e.g. Oyo"
                  className="form-input"
                />
              </div>
            </div>

            {/* Row 3: ZIP (half width) */}
            <div className="sm:w-1/2">
              <label className="form-label">ZIP / Postal Code</label>
              <input
                type="text"
                value={serviceZip}
                onChange={(e) => setServiceZip(e.target.value)}
                placeholder="e.g. 100001"
                className="form-input"
                maxLength={10}
              />
            </div>

            {/* Live address preview */}
            {(serviceAddress || serviceCity || serviceState) && (
              <div className="mt-4 flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
                <HiLocationMarker className="text-[#1D52AF] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#1D52AF] font-medium">
                  {[serviceAddress, serviceCity, serviceState, serviceZip]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
            )}
          </div>

          {/* Schedule */}
          <div className="card-base p-6 rounded-xl animate-slide-in-up stagger-4">
            <div className="flex items-center gap-2 mb-5">
              <div className="bg-blue-50 p-2 rounded-lg">
                <HiCalendar className="text-[#1D52AF] text-lg" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Schedule</h3>
            </div>

            <div className="mb-5">
              <label className="form-label">Select Date <span className="text-red-400">*</span></label>
              <input
                type="date"
                value={selectedDate || ""}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Preferred Time <span className="text-red-400">*</span></label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-1">
                {times.map((time, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTime(time)}
                    className={`time-slot border-2 rounded-lg py-2.5 text-xs font-semibold transition-all ${
                      selectedTime === time
                        ? "selected"
                        : "bg-white text-gray-600 border-gray-200"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column — Summary ── */}
        <div className="animate-slide-in-down">
          <div className="card-base rounded-xl p-6 sticky top-6 overflow-y-auto" style={{ maxHeight: "calc(100vh - 48px)" }}>

            {/* Header */}
            <div className="bg-gradient-to-br from-[#1D52AF] to-[#1645a0] text-white p-5 rounded-xl mb-6 shadow-lg">
              <p className="text-lg font-bold">Booking Summary</p>
              <p className="text-xs opacity-70 mt-1">Order #MK-78219</p>
            </div>

            <div className="space-y-4">

              {/* Location summary */}
              <div className="summary-row">
                <div className="summary-icon"><HiLocationMarker className="text-[#1D52AF]" /></div>
                <div>
                  <p className="summary-label">Location</p>
                  <p className="summary-value">
                    {serviceAddress || serviceCity || serviceState
                      ? [serviceAddress, serviceCity, serviceState, serviceZip].filter(Boolean).join(", ")
                      : "Not entered"}
                  </p>
                </div>
              </div>

              {/* Vehicle summary */}
              <div className="summary-row">
                <div className="summary-icon"><span className="text-base">🚗</span></div>
                <div>
                  <p className="summary-label">Vehicle</p>
                  <p className="summary-value">
                    {getSelectedVehicle()
                      ? `${getSelectedVehicle().year} ${getSelectedVehicle().brand} ${getSelectedVehicle().model} (${getSelectedVehicle().color})`
                      : "Not selected"}
                  </p>
                </div>
              </div>

              {/* Date summary */}
              <div className="summary-row">
                <div className="summary-icon"><HiCalendar className="text-[#1D52AF]" /></div>
                <div>
                  <p className="summary-label">Date</p>
                  <p className="summary-value">{selectedDate ? formatDate(selectedDate) : "Not selected"}</p>
                </div>
              </div>

              {/* Time summary */}
              <div className="summary-row">
                <div className="summary-icon"><HiClock className="text-[#1D52AF]" /></div>
                <div>
                  <p className="summary-label">Time</p>
                  <p className="summary-value">{selectedTime || "Not selected"}</p>
                </div>
              </div>

              {/* Selected services */}
              {getSelectedServicesData().length > 0 && (
                <div className="pb-4 border-b border-gray-100">
                  <p className="summary-label mb-3">Services ({selectedServices.length})</p>
                  <div className="space-y-2">
                    {getSelectedServicesData().map((s) => (
                      <div key={s.id} className="flex items-center justify-between bg-blue-50 rounded-lg px-3 py-2.5">
                        <span className="text-sm font-semibold text-gray-800">{s.name}</span>
                        <span className="text-sm font-bold text-[#1D52AF]">${parseFloat(s.price || 0).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Totals */}
              {getSelectedServicesData().length > 0 && (
                <>
                  <div className="space-y-2.5 text-sm pb-4 border-b border-gray-100">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service Fee</span>
                      <span className="font-semibold text-gray-900">${serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tax (5%)</span>
                      <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-[#1D52AF]">${total.toFixed(2)}</span>
                  </div>

                  {/* Promo */}
                  <div className="flex gap-2">
                    <input
                      placeholder="Promo code"
                      className="form-input flex-1"
                    />
                    <button className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors">
                      Apply
                    </button>
                  </div>
                </>
              )}

              {/* Confirm */}
              <button
                disabled={selectedServices.length === 0 || bookingLoading}
                onClick={handleConfirmBooking}
                className={`btn-confirm w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition-all ${
                  selectedServices.length > 0 && !bookingLoading
                    ? "bg-gradient-to-r from-[#1D52AF] to-[#1645a0] text-white shadow-md"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {bookingLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Processing...
                  </>
                ) : (
                  "Confirm Booking →"
                )}
              </button>

              <p className="text-xs text-gray-400 text-center leading-relaxed">
                By confirming, you agree to MokaNik's Terms of Service and Privacy Policy. Cancellation is free up to 24h before.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookService;