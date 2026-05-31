import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star } from "lucide-react";

const ProductDesc = ({ product, onAddToCart, loading }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-3xl bg-white p-5 sm:p-8 shadow-sm">

      {/* CATEGORY */}
      <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-500">
        {product.category} {product.brand && `| ${product.brand}`}
      </p>

      {/* TITLE */}
      <h1 className="text-2xl sm:text-4xl font-bold text-slate-900">
        {product.productName}
      </h1>

      {/* PRICE */}
      <div className="flex flex-col gap-1">
        <p className="text-2xl sm:text-3xl font-bold text-emerald-600">
          ৳ {product.productPrice}
        </p>
        <p className="text-sm text-gray-400 line-through">
          ৳ {product.productPrice + 200}
        </p>
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        {product.productDesc}
      </p>

      {/* QUANTITY */}
      <div className="flex items-center justify-between flex-wrap gap-4">

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Qty:</span>

          <div className="flex items-center gap-2 rounded-full border p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-9 w-9 rounded-full bg-pink-600 text-white"
            >
              -
            </button>

            <span className="w-8 text-center">{quantity}</span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="h-9 w-9 rounded-full bg-pink-600 text-white"
            >
              +
            </button>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex w-full sm:w-auto gap-3">
          <Button
            onClick={() => onAddToCart?.(quantity)}
            className="flex-1 sm:flex-none bg-pink-600 text-white"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add
          </Button>

          <Button variant="outline" className="w-12">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* INFO */}
      <div className="border-t pt-5 text-sm text-gray-500 space-y-1">
        <p><b>Availability:</b> In Stock</p>
        <p><b>Shipping:</b> Free Delivery</p>
        <p><b>Warranty:</b> 7 Days Replacement</p>
      </div>
    </div>
  );
};

export default ProductDesc;