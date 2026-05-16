import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star } from "lucide-react";

const ProductDesc = ({ product, onAddToCart, loading, initialQuantity = 1 }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  // Prevent render crash
  if (!product) {
    return (
      <div className="text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="space-y-6">
      {/* Category */}
      <p className="text-sm text-gray-500 uppercase tracking-wide">
        {product?.category || "N/A"}
        {product?.brand ? `  |  ${product.brand}` : "" }
      </p>

      {/* Product Name */}
      <h1 className="text-3xl font-bold text-gray-900">
        {product?.productName || "No name"}
      </h1>

      {/* Rating (static for now) */}
      <div className="flex items-center gap-2">
        <div className="flex items-center text-yellow-500">
          <Star size={18} fill="currentColor" />
          <Star size={18} fill="currentColor" />
          <Star size={18} fill="currentColor" />
          <Star size={18} fill="currentColor" />
          <Star size={18} />
        </div>

        <span className="text-sm text-gray-500">
          (4.0 Reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-bold text-green-600">
          ৳ {product?.productPrice || 0}
        </h2>

        <span className="text-lg text-gray-400 line-through">
          ৳ {(product?.productPrice || 0) + 200}
        </span>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold mb-2">
          Description
        </h3>

        <p className="text-gray-600 leading-relaxed">
          {product?.productDesc || "No description available"}
        </p>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-4">
        <span className="font-medium">Quantity:</span>

        <div className="flex items-center gap-3">
          <Button
            onClick={decreaseQuantity}
            className="bg-pink-700"
          >
            -
          </Button>

          <span className="text-lg font-semibold">
            {quantity}
          </span>

          <Button
            onClick={increaseQuantity}
            className="bg-pink-700"
          >
            +
          </Button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 pt-4">
        <Button
          onClick={() => onAddToCart?.(quantity)}
          disabled={loading}
          className="flex items-center gap-2 px-8 py-6 text-base"
        >
          <ShoppingCart size={20} />
          {loading ? "Adding..." : "Add to Cart"}
        </Button>

        <Button variant="outline" className="p-6">
          <Heart size={20} />
        </Button>
      </div>

      {/* Extra Info */}
      <div className="border-t pt-6 space-y-2 text-sm text-gray-500">
        <p>
          <span className="font-semibold text-black">
            Availability:
          </span>{" "}
          In Stock
        </p>

        <p>
          <span className="font-semibold text-black">
            Shipping:
          </span>{" "}
          Free delivery available
        </p>

        <p>
          <span className="font-semibold text-black">
            Warranty:
          </span>{" "}
          7 Days Replacement
        </p>
      </div>
    </div>
  );
};

export default ProductDesc;