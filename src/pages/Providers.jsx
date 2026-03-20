import { useNavigate } from "react-router-dom";

export default function Providers() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Join the MokaNik Network
        </h1>

        <p className="mt-4 text-gray-600">
          Connect with customers, grow your income, and build your reputation.
        </p>

        <button
          onClick={() => navigate("/onboarding")}
          className="mt-6 bg-black text-white px-6 py-3 rounded"
        >
          Join Now
        </button>
      </div>

      {/* Benefits Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border rounded">
          <h3 className="font-semibold">More Customers</h3>
          <p className="text-sm text-gray-500">
            Get access to verified clients near you.
          </p>
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-semibold">Flexible Work</h3>
          <p className="text-sm text-gray-500">
            Choose when and where you work.
          </p>
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-semibold">Secure Payments</h3>
          <p className="text-sm text-gray-500">
            Get paid quickly and safely.
          </p>
        </div>
      </div>
    </div>
  );
}