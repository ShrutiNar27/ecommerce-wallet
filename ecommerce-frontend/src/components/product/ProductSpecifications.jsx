function ProductSpecifications() {
  const specifications = [
    { label: "Brand", value: "Sony" },
    { label: "Model", value: "WH-1000XM5" },
    { label: "Color", value: "Black" },
    { label: "Connectivity", value: "Bluetooth 5.3" },
    { label: "Battery Life", value: "30 Hours" },
    { label: "Warranty", value: "1 Year" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-5 sm:p-8 mt-8 sm:mt-10">

      <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
        Specifications
      </h2>

      <div className="divide-y">

        {specifications.map((spec, index) => (

          <div
            key={index}
            className="flex justify-between gap-4 py-3 sm:py-4"
          >

            <span className="font-medium text-gray-600 text-sm sm:text-base">
              {spec.label}
            </span>

            <span className="font-semibold text-sm sm:text-base text-right">
              {spec.value}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ProductSpecifications;