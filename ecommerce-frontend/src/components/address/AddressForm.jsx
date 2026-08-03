import { useEffect, useState } from "react";

function AddressForm({
  initialData,
  onSubmit,
  onCancel,
}) {

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  useEffect(() => {

    if (initialData) {

      setFormData(initialData);

    }

  }, [initialData]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit(formData);

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-8">

        <h2 className="text-2xl font-bold mb-6">

          {initialData ? "Edit Address" : "Add Address"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            name="addressLine1"
            placeholder="Address Line 1"
            value={formData.addressLine1}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            name="addressLine2"
            placeholder="Address Line 2"
            value={formData.addressLine2}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

            <input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

          </div>

          <div className="grid grid-cols-2 gap-4">

            <input
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

            <input
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

          </div>

          <div className="flex justify-end gap-4 pt-6">

            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Save Address
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default AddressForm;