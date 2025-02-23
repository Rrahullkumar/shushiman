import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CategoryCards from "./components/CategoryCards";
import PopularFood from "./components/PopularFood";
import TrendingSection from "./components/Trending";
import AboutUs from "./components/AboutUS";
import Footer from "./components/Footer";
import CustomerLogin from "./pages/CustomerLogin";
import OwnerLogin from "./pages/OwnerLogin";
import Menu from "./pages/Menu";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <CategoryCards />
              <PopularFood />
              <TrendingSection />
              <AboutUs />
            </>
          }
        />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/owner-login" element={<OwnerLogin />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about-us" element={<AboutUs />} /> {/* Route for AboutUs */}
        <Route path="/contact" element={<Footer />} /> {/* Route for Footer */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;

