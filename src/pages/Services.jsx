import Navbar from "../components/home/NavBarr";
import SearchBar from "../components/services/SearchBar";
import Categories from "../components/services/Categories";
import ServicesGrid from "../components/services/ServicesGrid";
import WhyChoose from "../components/home/WhyChoose";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/services/CTA";
import Footer from "../components/home/Footers";

export default function Services() {
  return (
    <div>
      <Navbar />
      <SearchBar />
      <Categories />
      <ServicesGrid />
      <WhyChoose />
      <Testimonials title="What our customers say" />
      <CTA />
      <Footer className="bg-white" />
    </div>
  );
}