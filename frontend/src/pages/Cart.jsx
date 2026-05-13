import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "@/redux/productSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.product);

  // Fetch cart on page load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const res = await axios.get("http://localhost:8000/api/v1/cart", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (res.data.success) {
          dispatch(setCart(res.data.cart));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, [dispatch]);

  const updateQuantity = async (productId, type) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await axios.put(
        "http://localhost:8000/api/v1/cart/update",
        { productId, type },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  const removeItem = async (productId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await axios.delete(
        `http://localhost:8000/api/v1/cart/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success("Item removed");
      }
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl mt-20 font-bold mb-6">Your Cart</h1>

      {cart?.items?.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart?.items?.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
            >
              {/* Product Image + Name */}
              <div className="flex items-center gap-4">
                <img
                  src={item.productId?.productImg?.[0]?.url}
                  alt={item.productId?.productName}
                  className="w-20 h-20 object-cover rounded"
                />

                <div>
                  <h2 className="line-clamp-2 font-semibold w-110 ">
                    {item.productId?.productName}
                  </h2>
                  <p className="text-gray-600">৳{item.price}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => updateQuantity(item.productId._id, "decrease")}
                  className="bg-pink-700"
                >
                  -
                </Button>

                <span>{item.quantity}</span>

                <Button
                  onClick={() => updateQuantity(item.productId._id, "increase")}
                  className="bg-pink-700"
                >
                  +
                </Button>
              </div>

              <p className="font-semibold">৳{item.price * item.quantity}</p>

              {/* Remove */}
              <Button
                onClick={() => removeItem(item.productId._id)}
                className="bg-red-500"
              >
                Remove
              </Button>
            </div>
          ))}

          {/* Total Price */}
          <div className="text-right mt-6 text-xl font-bold">
            Total: ৳{cart?.totalPrice || 0}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
