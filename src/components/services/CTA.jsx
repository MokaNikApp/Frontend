export default function CTA() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-24">
      <div className="bg-blue-800 rounded-2xl text-center py-12 px-4 sm:px-6 text-white">
        
        {/* TITLE */}
        <h2 className="text-2xl sm:text-3xl font-bold">
          Ready to book your service?
        </h2>

        {/* TEXT */}
        <p className="mt-4 text-blue-100 max-w-xl mx-auto text-sm sm:text-base px-2 sm:px-0">
          Join thousands of happy car owners who have found their
          trusted local mechanic through AutoFix.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          
          <button className="w-full sm:w-auto bg-white text-blue-800 hover:bg-blue-700 hover:text-white hover:text-base transition-all px-6 py-3 rounded-lg font-medium">
            Get Started Now
          </button>

          <button className="w-full sm:w-auto border border-white hover:bg-white hover:text-blue-800 hover:text-base transition-all px-6 py-3 rounded-lg">
            Become a Mechanic
          </button>

        </div>

      </div>
    </section>
  );
}