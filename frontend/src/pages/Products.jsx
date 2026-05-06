import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Products = () => {
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: "Apple iPhone 15 Pro Max",
    price: 165000,
    rating: 4.8,
    reviews: 1243,
    stock: "In Stock",
    description:
      "A17 Pro chip, titanium design, advanced camera system, and all-day battery life.",
    images: [
      "/iphone1.png",
      "/iphone2.png",
      "/iphone3.png",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="mt-30 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ================= LEFT - IMAGE ================= */}
        <div className="space-y-4">

          <Card className="p-4">
            <img
              src={product.images[0]}
              alt="product"
              className="w-full h-80 object-contain"
            />
          </Card>

          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-20 h-20 object-cover border rounded-md cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>

        </div>

        {/* ================= CENTER - INFO ================= */}
        <div className="space-y-4">

          <h1 className="text-2xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-2">
            <span className="text-yellow-500 font-bold">⭐ {product.rating}</span>
            <span className="text-gray-500">({product.reviews} reviews)</span>
          </div>

          <p className="text-green-600 font-semibold">
            {product.stock}
          </p>

          <p className="text-gray-700">{product.description}</p>

          <div className="text-3xl font-bold text-blue-600">
            ৳{product.price}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 border rounded"
            >
              -
            </button>

            <span>{quantity}</span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 border rounded"
            >
              +
            </button>
          </div>

        </div>

        {/* ================= RIGHT - BUY BOX ================= */}
        <div>
          <Card className="p-5 sticky top-5">

            <CardContent className="space-y-4">

              <div className="text-2xl font-bold text-blue-600">
                ৳{product.price}
              </div>

              <p className="text-green-600 font-medium">
                {product.stock}
              </p>

              <p className="text-sm text-gray-500">
                Free delivery within 2–3 days
              </p>

              <div className="space-y-2">

                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                  Add to Cart
                </Button>

                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Buy Now
                </Button>

              </div>

              <p className="text-xs text-gray-500">
                Secure transaction • Cash on Delivery available
              </p>

            </CardContent>

          </Card>
        </div>

      </div>
    </div>
  );
};

export default Products;