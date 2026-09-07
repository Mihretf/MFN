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
import { LenisScrollProvider } from "./components/ui/LenisScrollProvider";

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
      <LenisScrollProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-alabaster text-warm-slate font-sans selection:bg-[#AE8F05]/20 selection:text-sacred-gold">
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
      </LenisScrollProvider>
    </ThemeProvider>
  );
}
