import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { trackPageView } from "../services/analytics";

const MainLayout = () => {
  const location = useLocation();

useEffect(() => {
  trackPageView(location.pathname + location.search);
}, [location]);
  return (
    <>
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;