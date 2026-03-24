import { useOnboardingStore } from "../store/onboardingStore";

export default function Onboarding() {
  const {
    step,
    nextStep,
    prevStep,
    data,
    updateData,
  } = useOnboardingStore();

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">
        Onboarding - Step {step}
      </h1>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="mt-6 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={data.name || ""}
            onChange={(e) =>
              updateData({ name: e.target.value })
            }
            className="border p-3 rounded"
          />

          <input
            type="email"
            placeholder="Email"
            value={data.email || ""}
            onChange={(e) =>
              updateData({ email: e.target.value })
            }
            className="border p-3 rounded"
          />
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="mt-6 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Business Name"
            value={data.businessName || ""}
            onChange={(e) =>
              updateData({ businessName: e.target.value })
            }
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Service Type"
            value={data.serviceType || ""}
            onChange={(e) =>
              updateData({ serviceType: e.target.value })
            }
            className="border p-3 rounded"
          />
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Confirm Details</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      {/* BUTTONS */}
      <div className="mt-6 flex gap-4">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="px-4 py-2 border rounded"
          >
            Back
          </button>
        )}

        {step < 3 ? (
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => console.log("SUBMIT:", data)}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}