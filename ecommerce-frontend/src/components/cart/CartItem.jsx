import { Minus, Plus, Trash2 } from "lucide-react";

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div className="flex justify-between items-center border rounded-xl p-6 mb-5 shadow-sm">

      {/* Product Info */}
      <div className="flex items-center gap-5">

        <img
          src={`https://picsum.photos/120/120?random=${item.productId}`}
          alt={item.productName}
          className="w-28 h-28 rounded-lg object-cover"
        />

        <div>

          <h2 className="text-xl font-semibold">
            {item.productName}
          </h2>

          <p className="text-gray-500 mt-2">
            ₹{item.price}
          </p>

          <p className="text-blue-600 font-semibold mt-2">
            Subtotal : ₹{item.subtotal}
          </p>

        </div>

      </div>

      {/* Quantity + Remove */}
      <div className="flex flex-col items-end gap-5">

        <div className="flex items-center border rounded-lg overflow-hidden">

          <button
            onClick={() => onDecrease(item)}
            className="px-4 py-2 hover:bg-gray-100"
          >
            <Minus size={18} />
          </button>

          <span className="px-5">
            {item.quantity}
          </span>

          <button
            onClick={() => onIncrease(item)}
            className="px-4 py-2 hover:bg-gray-100"
          >
            <Plus size={18} />
          </button>

        </div>

        <button
          onClick={() => onRemove(item.productId)}
          className="flex items-center gap-2 text-red-500 hover:text-red-700"
        >
          <Trash2 size={18} />
          Remove
        </button>

      </div>

    </div>
  );
}

export default CartItem;