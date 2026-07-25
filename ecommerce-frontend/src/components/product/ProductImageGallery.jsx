import { useState } from "react";

const images = [
  "https://picsum.photos/600/600?random=1",
  "https://picsum.photos/600/600?random=2",
  "https://picsum.photos/600/600?random=3",
  "https://picsum.photos/600/600?random=4",
];

function ProductImageGallery() {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div>
      {/* Main Image */}
      <div className="border rounded-xl overflow-hidden">
        <img
          src={selectedImage}
          alt="Product"
          className="w-full h-[450px] object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 mt-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`border rounded-lg overflow-hidden ${
              selectedImage === image
                ? "border-blue-500 border-2"
                : "border-gray-300"
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductImageGallery;