import { useEffect, useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  MapPin,
  CheckCircle,
} from "lucide-react";

import { toast } from "react-toastify";

import AddressForm from "@/components/address/AddressForm";

import {
  getAllAddresses,
  deleteAddress,
  setDefaultAddress,
  addAddress,
} from "@/services/addressService";

function Addresses() {

  const [addresses, setAddresses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const fetchAddresses = async () => {

    try {

      const data = await getAllAddresses();

      setAddresses(data);

    } catch (error) {

      console.error(error);

      toast.error("Failed to fetch addresses");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchAddresses();

  }, []);

  const handleAddAddress = async (addressData) => {

    try {

      await addAddress(addressData);

      toast.success("Address added successfully");

      setShowForm(false);

      fetchAddresses();

    } catch (error) {

      console.error(error);

      toast.error("Failed to add address");

    }

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this address?")) {
      return;
    }

    try {

      await deleteAddress(id);

      toast.success("Address deleted successfully");

      fetchAddresses();

    } catch (error) {

      console.error(error);

      toast.error("Failed to delete address");

    }

  };

  const handleDefault = async (id) => {

    try {

      await setDefaultAddress(id);

      toast.success("Default address updated");

      fetchAddresses();

    } catch (error) {

      console.error(error);

      toast.error("Failed to update default address");

    }

  };

  if (loading) {

    return (
      <div className="text-center py-16 sm:py-20 text-lg sm:text-xl">
        Loading Addresses...
      </div>
    );

  }

  return (

    <div className="max-w-6xl mx-auto px-5 sm:px-6 py-8 sm:py-10">

      {/* Page Header */}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">

        <h1 className="text-3xl sm:text-4xl font-bold">
          My Addresses
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >

          <Plus size={18} />

          Add Address

        </button>

      </div>


      {addresses.length === 0 ? (

        <div className="bg-white rounded-xl shadow-md p-10 sm:p-16 text-center">

          <MapPin
            size={50}
            className="mx-auto text-gray-400 mb-4 sm:w-[60px] sm:h-[60px]"
          />

          <h2 className="text-xl sm:text-2xl font-bold">
            No Addresses Found
          </h2>

          <p className="text-gray-500 mt-2">
            Add your first delivery address.
          </p>

        </div>

      ) : (

        <div className="space-y-5 sm:space-y-6">

          {addresses.map((address) => (

            <div
              key={address.id}
              className="bg-white shadow-md rounded-xl p-5 sm:p-6"
            >

              {/* Address Content + Actions */}

              <div className="flex flex-col lg:flex-row lg:justify-between gap-5">

                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-3">

                    <h2 className="text-lg sm:text-xl font-bold break-words">
                      {address.fullName}
                    </h2>

                    {address.isDefault && (

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Default
                      </span>

                    )}

                  </div>

                  <p className="mt-3 text-gray-600 break-words">
                    {address.addressLine1}
                  </p>

                  {address.addressLine2 && (

                    <p className="text-gray-600 break-words">
                      {address.addressLine2}
                    </p>

                  )}

                  <p className="text-gray-600 break-words">
                    {address.city}, {address.state}
                  </p>

                  <p className="text-gray-600 break-words">
                    {address.country} - {address.postalCode}
                  </p>

                  <p className="mt-2 font-medium break-words">
                    📞 {address.phoneNumber}
                  </p>

                </div>


                {/* Actions */}

                <div className="flex flex-wrap gap-3 lg:items-start">

                  {!address.isDefault && (

                    <button
                      onClick={() => handleDefault(address.id)}
                      className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm sm:text-base"
                    >

                      <CheckCircle size={18} />

                      Default

                    </button>

                  )}

                  <button
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm sm:text-base"
                  >

                    <Pencil size={18} />

                    Edit

                  </button>

                  <button
                    onClick={() => handleDelete(address.id)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm sm:text-base"
                  >

                    <Trash2 size={18} />

                    Delete

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

      {showForm && (

        <AddressForm
          initialData={null}
          onSubmit={handleAddAddress}
          onCancel={() => setShowForm(false)}
        />

      )}

    </div>

  );

}

export default Addresses;