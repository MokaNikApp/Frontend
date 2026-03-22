export default function CTA() {
  return (
    <section className="py-20 px-6 lg:px-24">
      <div className="bg-blue-800 rounded-2xl text-center py-16 px-6 text-white">
        
        <h2 className="text-3xl font-bold">
          Ready to book your service?
        </h2>

        <p className="mt-4 px-16 text-blue-100 max-w-xl mx-auto">
          Join thousands of happy car owners who have found their
          trusted local mechanic through AutoFix.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          
          <button className="bg-white text-blue-800 hover:bg-blue-700 hover:text-white px-6 py-3 rounded-lg font-medium">
            Get Started Now
          </button>

          <button className="border border-white hover:bg-white hover:text-blue-800 px-6 py-3 rounded-lg">
            Become a Mechanic
          </button>

        </div>
      </div>
    </section>
  );
}