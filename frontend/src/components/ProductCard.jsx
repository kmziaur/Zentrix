import React from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/productSlice";

const ProductCard = ({ product, loading }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/cart/add",
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success("Product added to cart");
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    }
  };

  const handleAddToCart = () => {
    addToCart(product._id);
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden h-max">
      {/* IMAGE */}
      <div className="flex justify-center items-center w-full h-full aspect-square overflow-hidden">
        {loading ? (
          <Skeleton className="w-full h-full rounded-lg" />
        ) : (
          <img
            src={product.productImg[0]?.url}
            alt={product.productName}
            className="w-45.5 h-47.5 transition-transform duration-300 hover:scale-105"
          />
        )}
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="px-2 space-y-2 my-2">
          <Skeleton className="w-50 h-4" />
          <Skeleton className="w-25 h-4" />
          <Skeleton className="w-37.5 h-8" />
        </div>
      ) : (
        <div className="px-2 space-y-1">
          <h1 className="font-semibold h-12 line-clamp-2">
            {product.productName}
          </h1>

          <h2 className="font-bold">৳{product.productPrice}</h2>

          <Button onClick={handleAddToCart} className="bg-pink-600 mb-3 w-full">
            Add to Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
