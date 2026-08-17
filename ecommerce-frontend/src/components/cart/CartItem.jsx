import { Minus, Plus, Trash2 } from "lucide-react";

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5 border rounded-xl p-4 sm:p-6 mb-5 shadow-sm">

      {/* Product Info */}

      <div className="flex items-center gap-4 sm:gap-5">

        <img
          src={`https://picsum.photos/120/120?random=${item.productId}`}
          alt={item.productName}
          className="w-20 h-20 sm:w-28 sm:h-28 rounded-lg object-cover flex-shrink-0"
        />

        <div className="min-w-0">

          <h2 className="text-lg sm:text-xl font-semibold break-words">
            {item.productName}
          </h2>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            ₹{item.price}
          </p>

          <p className="text-blue-600 font-semibold mt-2 text-sm sm:text-base">
            Subtotal : ₹{item.subtotal}
          </p>

        </div>

      </div>


      {/* Quantity + Remove */}

      <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4">

        {/* Quantity */}

        <div className="flex items-center border rounded-lg overflow-hidden">

          <button
            onClick={() => onDecrease(item)}
            className="px-3 sm:px-4 py-2 hover:bg-gray-100"
            aria-label="Decrease quantity"
          >
            <Minus size={18} />
          </button>

          <span className="px-4 sm:px-5">
            {item.quantity}
          </span>

          <button
            onClick={() => onIncrease(item)}
            className="px-3 sm:px-4 py-2 hover:bg-gray-100"
            aria-label="Increase quantity"
          >
            <Plus size={18} />
          </button>

        </div>


        {/* Remove */}

        <button
          onClick={() => onRemove(item.productId)}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm sm:text-base"
        >
          <Trash2 size={18} />
          Remove
        </button>

      </div>

    </div>
  );
}

export default CartItem;