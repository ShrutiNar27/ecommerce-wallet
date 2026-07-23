import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    review:
      "Amazing quality and super fast delivery. I'll definitely shop again!",
  },
  {
    id: 2,
    name: "Rahul Verma",
    review:
      "The products matched the description perfectly. Highly recommended!",
  },
  {
    id: 3,
    name: "Ananya Gupta",
    review:
      "Excellent customer support and hassle-free returns.",
  },
];

function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold">What Our Customers Say</h2>
        <p className="text-gray-600 mt-3">
          Thousands of happy customers trust us every day.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition"
          >
            <div className="flex gap-1 mb-4 text-yellow-500">
              {[...Array(5)].map((_, index) => (
                <Star key={index} size={18} fill="currentColor" />
              ))}
            </div>

            <p className="text-gray-600 italic">
              "{testimonial.review}"
            </p>

            <h4 className="mt-6 font-semibold">
              {testimonial.name}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;