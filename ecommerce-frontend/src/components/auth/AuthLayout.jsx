function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="bg-blue-600 text-white flex flex-col justify-center p-12">

          <h1 className="text-4xl font-bold">
            ShopEase
          </h1>

          <p className="mt-5 text-lg">
            Discover the latest products with secure shopping,
            fast delivery, and amazing deals.
          </p>

        </div>

        {/* Right Side */}
        <div className="p-10">

          <h2 className="text-3xl font-bold">
            {title}
          </h2>

          <p className="text-gray-500 mt-2">
            {subtitle}
          </p>

          <div className="mt-8">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;