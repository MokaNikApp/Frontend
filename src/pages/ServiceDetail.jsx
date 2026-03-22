import Navbar from "../components/home/NavBarr";
import Footer from "../components/home/Footers";

import ServiceHero from "../components/serviceDetail/ServiceHero";
import ServiceIncludes from "../components/serviceDetail/ServiceIncludes";
import ServiceExtra from "../components/serviceDetail/ServiceExtra";
import Testimonials from "../components/home/Testimonials";
import RelatedService from "../components/serviceDetail/RelatedService";

export default function ServiceDetail() {
  return (
    <>
      <Navbar />
      <ServiceHero />
      <ServiceIncludes />
      <ServiceExtra />
      <Testimonials title="What our customers say" />
      <RelatedService />
      <Footer />
    </>
  );
}