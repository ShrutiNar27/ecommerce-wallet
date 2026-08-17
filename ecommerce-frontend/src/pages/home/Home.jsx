import Newsletter from "@/components/home/Newsletter";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";

function Home() {
  return (
    <div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 md:py-24">

        <div className="max-w-7xl mx-auto px-6 md:px-8">

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            Shop Smart.
          </h1>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mt-2">
            Shop Better.
          </h1>

          <p className="mt-5 md:mt-6 text-base sm:text-lg md:text-xl max-w-xl">
            Discover thousands of amazing products at unbeatable prices.
          </p>

          <button className="mt-6 md:mt-8 bg-white text-blue-700 px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold hover:bg-gray-200">
            Shop Now
          </button>

        </div>

      </section>

      {/* Categories */}
      <CategoriesSection />

      {/* Featured Products */}
      <FeaturedProductsSection />

      <WhyChooseUs />

      <Testimonials />

      <Newsletter />

    </div>
  );
}

export default Home;