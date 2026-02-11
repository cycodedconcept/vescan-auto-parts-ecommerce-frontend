import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AnnouncementBar from "../components/layout/AnnouncementBar";
import Newsletter from "../components/layout/Newsletter";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default MainLayout;
