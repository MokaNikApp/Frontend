import Navbar from "../components/home/NavBarr";
import SearchBar from "../components/services/SearchBar";
import Categories from "../components/services/Categories";
import ServicesGrid from "../components/services/ServicesGrid";
import WhyChoose from "../components/home/WhyChoose";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/services/CTA";
import Footer from "../components/services/Footers";

export default function Services() {
  return (
    <div className="bg-white">
      <Navbar />

      <div className="px-4 sm:px-6 lg:px-24">
        <SearchBar />
        <Categories />
        <ServicesGrid />
      </div>

      <WhyChoose />
      <Testimonials title="What our customers say" />
      <CTA />
      <Footer />
    </div>
  );
}