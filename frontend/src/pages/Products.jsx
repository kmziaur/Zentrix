import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FilterSidebar from "@/components/FilterSidebar";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";
import axios from "axios";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading,setLoading] = useState(false);
  const [priceRange,setPriceRange] = useState([0,999999]);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8000/api/v1/product/getallproducts`,
      );
      if (res.data.success) {
        setAllProducts(res.data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // console.log(allProducts);

  return (
    <div className=" pt-10 pb-10">
      <div className="mt-30 max-w-7xl mx-auto flex gap-7">
        {/*sidebar*/}
        <FilterSidebar allProducts={allProducts} priceRange={priceRange} />

        {/* main product section */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-end md-4">
            <Select>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="highToLow">Price: High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
            {allProducts.map((product) => {
              return <ProductCard key={product._id} product={product} loading={loading} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
