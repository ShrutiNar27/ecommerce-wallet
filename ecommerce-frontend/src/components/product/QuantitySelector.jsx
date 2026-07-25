import { useState } from "react";

function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="mt-8">

      <h3 className="font-semibold mb-3">
        Quantity
      </h3>

      <div className="flex items-center w-fit border rounded-lg overflow-hidden">

        <button
          onClick={decrease}
          className="px-4 py-2 hover:bg-gray-100"
        >
          -
        </button>

        <span className="px-6 py-2 border-x">
          {quantity}
        </span>

        <button
          onClick={increase}
          className="px-4 py-2 hover:bg-gray-100"
        >
          +
        </button>

      </div>

    </div>
  );
}

export default QuantitySelector;