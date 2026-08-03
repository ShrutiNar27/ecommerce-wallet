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

      <div className="text-center py-20 text-xl">

        Loading Addresses...

      </div>

    );

  }

  return (

    <div className="max-w-6xl mx-auto px-6 py-10">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">

          My Addresses

        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >

          <Plus size={18} />

          Add Address

        </button>

      </div>

      {addresses.length === 0 ? (

        <div className="bg-white rounded-xl shadow-md p-16 text-center">

          <MapPin
            size={60}
            className="mx-auto text-gray-400 mb-4"
          />

          <h2 className="text-2xl font-bold">

            No Addresses Found

          </h2>

          <p className="text-gray-500 mt-2">

            Add your first delivery address.

          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {addresses.map((address) => (

            <div
              key={address.id}
              className="bg-white shadow-md rounded-xl p-6"
            >

              <div className="flex justify-between">

                <div>

                  <div className="flex items-center gap-3">

                    <h2 className="text-xl font-bold">

                      {address.fullName}

                    </h2>

                    {address.isDefault && (

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">

                        Default

                      </span>

                    )}

                  </div>

                  <p className="mt-3 text-gray-600">

                    {address.addressLine1}

                  </p>

                  {address.addressLine2 && (

                    <p className="text-gray-600">

                      {address.addressLine2}

                    </p>

                  )}

                  <p className="text-gray-600">

                    {address.city}, {address.state}

                  </p>

                  <p className="text-gray-600">

                    {address.country} - {address.postalCode}

                  </p>

                  <p className="mt-2 font-medium">

                    📞 {address.phoneNumber}

                  </p>

                </div>

                <div className="flex gap-3">

                  {!address.isDefault && (

                    <button
                      onClick={() => handleDefault(address.id)}
                      className="flex items-center gap-2 text-green-600 hover:text-green-700"
                    >

                      <CheckCircle size={18} />

                      Default

                    </button>

                  )}

                  <button
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >

                    <Pencil size={18} />

                    Edit

                  </button>

                  <button
                    onClick={() => handleDelete(address.id)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
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