import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headset,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on orders above ₹999.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure online payment gateway.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day hassle-free return policy.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "Customer support whenever you need it.",
  },
];

function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold">
          Why Choose Us
        </h2>

        <p className="text-gray-600 mt-3">
          Everything you need for a seamless shopping experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-5">
                <Icon
                  size={42}
                  className="text-blue-600"
                />
              </div>

              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-3">
                {feature.description}
              </p>
            </div>
          );
        })}

      </div>

    </section>
  );
}

export default WhyChooseUs;