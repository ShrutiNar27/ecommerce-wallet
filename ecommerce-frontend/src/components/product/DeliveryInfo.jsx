import { Truck, RotateCcw, ShieldCheck } from "lucide-react";

function DeliveryInfo() {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 mt-10">

      <h2 className="text-2xl font-bold mb-6">
        Delivery & Services
      </h2>

      <div className="space-y-5">

        <div className="flex items-center gap-4">
          <Truck className="text-blue-600" />
          <div>
            <p className="font-semibold">Free Delivery</p>
            <p className="text-gray-500 text-sm">
              Delivery within 3–5 business days.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <RotateCcw className="text-green-600" />
          <div>
            <p className="font-semibold">7-Day Return Policy</p>
            <p className="text-gray-500 text-sm">
              Easy returns within 7 days.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ShieldCheck className="text-purple-600" />
          <div>
            <p className="font-semibold">1 Year Warranty</p>
            <p className="text-gray-500 text-sm">
              Manufacturer warranty included.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default DeliveryInfo;