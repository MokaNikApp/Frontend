import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-24">
      <div className="bg-[#1C52AF] rounded-2xl text-center py-12 px-4 sm:px-6 text-white">
        
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

  {/* BUTTON 1 */}
  <Link
    to="/signup"
    className="w-full sm:w-auto bg-white text-[#1C52AF] hover:bg-[#1C52AF] hover:text-white transition-all px-6 py-3 rounded-lg font-medium text-center"
  >
    Get Started Now
  </Link>

  {/* BUTTON 2 */}
  <Link
    to="/signup"
    className="w-full sm:w-auto border border-white hover:bg-white hover:text-blue-800 transition-all px-6 py-3 rounded-lg text-center"
  >
    Become a Mechanic
  </Link>

</div>
      </div>
    </section>
  );
}