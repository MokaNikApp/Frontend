import Navbar from "../components/home/NavBarr";
import Footer from "../components/home/Footers";

import ServiceHero from "../components/serviceDetail/ServiceHero";
import ServiceIncludes from "../components/serviceDetail/ServiceIncludes";
import ServiceExtra from "../components/serviceDetail/ServiceExtra";
import Testimonials from "../components/home/Testimonials";
import RelatedService from "../components/serviceDetail/RelatedService";

export default function ServiceDetail() {
  return (
    <div className="bg-white">

      <Navbar />

      {/* MAIN CONTENT WRAPPER */}
      <main className="space-y-12 lg:space-y-16">

        <ServiceHero />

        <div className="px-6 lg:px-24">
          <ServiceIncludes />
        </div>

        <div className="px-6 lg:px-24">
          <ServiceExtra />
        </div>

        <Testimonials title="What our customers say" />

        <div className="px-6 lg:px-24">
          <RelatedService />
        </div>

      </main>

      <Footer />

    </div>
  );
}