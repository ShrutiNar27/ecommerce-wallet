import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100">
        {children}
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;