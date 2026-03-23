export default function ProviderCTA() {
  return (
    <section className="bg-blue-800 text-white text-center py-16 px-6">

      <h2 className="text-2xl font-semibold">
        Ready to grow your business?
      </h2>

      <p className="text-blue-100 px-22 text-sm mt-3 max-w-xl mx-auto">
        Join MokaNik today and start connecting with local customers who need your expertise.
        Application takes less than 10 minutes.
      </p>

      {/* BUTTONS */}
      <div className="flex justify-center gap-4 mt-6 flex-wrap">

        <button className="bg-white text-blue-700 px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-gray-100">
          Start Your Application
        </button>

        <button className="border border-white px-5 py-2 rounded-md text-sm hover:bg-white hover:text-blue-700">
          Talk to Support
        </button>

      </div>

      {/* SMALL TEXT */}
      <p className="text-xs text-blue-200 mt-4">
        No long-term contracts. Pause your profile anytime.
      </p>

    </section>
  );
}