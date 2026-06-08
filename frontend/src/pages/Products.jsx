import { useCallback, useEffect, useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

const Products = () => {
  const { products } = useSelector((store) => store.product);

  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("ALL");
  const [priceRange, setPriceRange] = useState([0, 999999]);
  const [sortOrder, setSortOrder] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getAllProducts = useCallback(async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/getallproducts`,
      );

      if (res.data.success) {
        setAllProducts(res.data.products);
        dispatch(setProducts(res.data.products));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void getAllProducts();
    }, 0);

    return () => clearTimeout(timer);
  }, [getAllProducts]);

  useEffect(() => {
    if (!allProducts.length) return;

    let filtered = [...allProducts];

    // Search
    if (search.trim()) {
      filtered = filtered.filter((p) =>
        p.productName.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Category
    if (category !== "ALL") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase(),
      );
    }

    // Brand
    if (brand !== "ALL") {
      filtered = filtered.filter(
        (p) => p.brand.toLowerCase() === brand.toLowerCase(),
      );
    }

    // Price
    filtered = filtered.filter(
      (p) => p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1],
    );

    // Sorting
    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.productPrice - a.productPrice);
    }

    dispatch(setProducts(filtered));
  }, [search, category, brand, priceRange, sortOrder, allProducts, dispatch]);

  return (
    <div className="pt-24 pb-14 bg-white min-h-screen">
      {/* CENTER WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* MOBILE FILTER TOGGLE */}
          <div className="lg:hidden w-full flex flex-col gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex w-full items-center justify-between rounded-2xl border border-pink-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-pink-300 hover:bg-pink-50"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-pink-600" />
                {showFilters ? "Hide filters" : "Show filters"}
              </span>
              <ChevronDown className={`h-4 w-4 text-slate-500 transition ${showFilters ? "rotate-180" : ""}`} />
            </button>

            <div className="w-full md:hidden">
              <Select onValueChange={(value) => setSortOrder(value)}>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Sort by Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="lowToHigh">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="highToLow">
                      Price: High to Low
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-1/4">
            <div className="sticky top-24">
              <FilterSidebar
                search={search}
                setSearch={setSearch}
                brand={brand}
                setBrand={setBrand}
                category={category}
                setCategory={setCategory}
                allProducts={allProducts}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                className={`${showFilters ? "block" : "hidden"} lg:block`}
              />
            </div>
          </div>

          {/* PRODUCTS SECTION */}
          <div className="flex-1">
            {/* HEADER */}
            <div className="hidden md:flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                All Products
              </h2>

              <Select onValueChange={(value) => setSortOrder(value)}>
                <SelectTrigger className="w-56 h-11">
                  <SelectValue placeholder="Sort by Price" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="lowToHigh">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="highToLow">
                      Price: High to Low
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  loading={loading}
                />
              ))}
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
