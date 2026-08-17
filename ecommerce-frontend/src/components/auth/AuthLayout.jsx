function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6 sm:py-8">

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Left Side */}

        <div className="bg-blue-600 text-white flex flex-col justify-center p-6 sm:p-10 md:p-12">

          <h1 className="text-3xl sm:text-4xl font-bold">
            ShopEase
          </h1>

          <p className="mt-4 sm:mt-5 text-base sm:text-lg leading-7">
            Discover the latest products with secure shopping,
            fast delivery, and amazing deals.
          </p>

        </div>


        {/* Right Side */}

        <div className="p-6 sm:p-8 md:p-10">

          <h2 className="text-2xl sm:text-3xl font-bold">
            {title}
          </h2>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            {subtitle}
          </p>

          <div className="mt-6 sm:mt-8">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;