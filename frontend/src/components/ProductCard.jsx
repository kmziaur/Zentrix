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
        `${import.meta.env.VITE_API_URL}/api/v1/cart/add`,
        { productId, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (res.data.success) {
        toast.success("Product added to cart");
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="group w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-lg">

      {/* IMAGE */}
      <div className="aspect-square overflow-hidden bg-slate-50">
        {loading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <img
            onClick={() => navigate(`/products/${product._id}`)}
            src={product.productImg?.[0]?.url}
            alt={product.productName}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="space-y-2 p-3 sm:p-4">

        {loading ? (
          <>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-full" />
          </>
        ) : (
          <>
            <h1 className="line-clamp-2 text-sm sm:text-base font-semibold text-slate-900">
              {product.productName}
            </h1>

            <p className="text-base font-bold text-slate-900">
              ৳{product.productPrice}
            </p>

            <Button
              onClick={() => addToCart(product._id)}
              className="w-full bg-pink-600 text-white hover:bg-pink-700"
            >
              Add to Cart
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;