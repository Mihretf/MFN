import React from "react";
import "./globals.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { Services } from "./pages/Services";
import { BranchDetail } from "./pages/BranchDetail";
import Gallery from "./pages/Gallery";
import { ThemeProvider } from "./providers/ThemeProvider";

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-gray-900 font-sans text-[#1a3c34] dark:text-gray-100 transition-colors duration-300">
          <Header />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:branchId" element={<BranchDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
    </ThemeProvider>
  );
}
