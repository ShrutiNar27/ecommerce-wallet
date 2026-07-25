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
    <div className="bg-white rounded-xl shadow-md p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6">
        Specifications
      </h2>

      <div className="divide-y">
        {specifications.map((spec, index) => (
          <div
            key={index}
            className="flex justify-between py-4"
          >
            <span className="font-medium text-gray-600">
              {spec.label}
            </span>

            <span className="font-semibold">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductSpecifications;