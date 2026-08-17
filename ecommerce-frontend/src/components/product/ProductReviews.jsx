import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    rating: 5,
    comment: "Amazing sound quality and battery backup. Highly recommended!",
  },
  {
    id: 2,
    name: "Priya Patel",
    rating: 4,
    comment: "Comfortable to wear and the noise cancellation is excellent.",
  },
  {
    id: 3,
    name: "Amit Verma",
    rating: 5,
    comment: "Worth every rupee. Delivery was quick as well.",
  },
];

function ProductReviews() {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 sm:p-8 mt-8 sm:mt-10">

      <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
        Customer Reviews
      </h2>

      <div className="space-y-5 sm:space-y-6">

        {reviews.map((review) => (

          <div
            key={review.id}
            className="border-b last:border-b-0 pb-5 sm:pb-6"
          >

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">

              <h3 className="font-semibold text-sm sm:text-base">
                {review.name}
              </h3>

              <div className="flex">

                {[...Array(review.rating)].map((_, index) => (

                  <Star
                    key={index}
                    size={16}
                    fill="gold"
                    color="gold"
                  />

                ))}

              </div>

            </div>

            <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">
              {review.comment}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ProductReviews;