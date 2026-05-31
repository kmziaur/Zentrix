import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Breadcrums from "@/components/Breadcrums";
import ProductImg from "@/components/ProductImg";
import ProductDesc from "@/components/ProductDesc";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { setCart } from "@/redux/productSlice";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.id;
  const { products, cart } = useSelector((store) => store.product);
  const productFromStore = products?.find((p) => p._id === productId) || null;
  const cartItem = cart?.items?.find(
    (item) =>
      item.productId?._id === productId ||
      item.productId?.toString() === productId,
  );
  const [fetchedProduct, setFetchedProduct] = useState(null);
  const product = productFromStore || fetchedProduct;
  const [loading, setLoading] = useState(!product);
  const [error, setError] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    if (productFromStore) {
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8000/api/v1/product/getproduct/${productId}`,
        );
        if (res.data.success) {
          setFetchedProduct(res.data.product);
          setError(null);
        } else {
          setError(res.data.message || "Product not found");
        }
      } catch (fetchError) {
        setError(
          fetchError.response?.data?.message || "Unable to load product.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productFromStore, productId]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 mt-24 text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  const handleAddToCart = async (quantity) => {
    if (!product) return;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    try {
      setCartLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/cart/add",
        {
          productId: product._id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success("Product added to cart");
      } else {
        toast.error(res.data.message || "Failed to add product to cart");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add product to cart",
      );
    } finally {
      setCartLoading(false);
    }
  };

  if (error || !product) {
    return (
      <div className="max-w-6xl mx-auto p-4 mt-24 text-center text-red-500">
        {error || "Product not found."}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 mt-24">
      <Breadcrums product={product} />
      <div className="mt-10 grid gap-10 lg:grid-cols-2 items-start">
        <ProductImg images={product.productImg} />
        <ProductDesc
          key={cartItem?.quantity || 1}
          product={product}
          initialQuantity={cartItem?.quantity || 1}
          onAddToCart={handleAddToCart}
          loading={cartLoading}
        />
      </div>
    </div>
  );
};

export default SingleProduct;
