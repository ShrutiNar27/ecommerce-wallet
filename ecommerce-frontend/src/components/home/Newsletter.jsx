function Newsletter() {
  return (
    <section className="bg-blue-600 text-white py-20 mt-20">
      <div className="max-w-4xl mx-auto px-6 text-center">

        <h2 className="text-4xl font-bold">
          Stay Updated
        </h2>

        <p className="mt-4 text-blue-100">
          Subscribe to get exclusive offers, new arrivals and exciting discounts.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-96 px-5 py-3 rounded-lg text-black outline-none bg-white"
          />

          <button className="bg-black hover:bg-gray-900 px-6 py-3 rounded-lg">
            Subscribe
          </button>

        </div>

      </div>
    </section>
  );
}

export default Newsletter;