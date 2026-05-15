import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Breadcrums from "@/components/Breadcrums";
import ProductImg from "@/components/ProductImg";
import ProductDesc from "@/components/ProductDesc";
import { useSelector } from "react-redux";

const SingleProduct = () => {
  const params = useParams();
  const productId = params.id;
  const {products} = useSelector((store) => store.product);
  const product = products.find((p) => p._id === productId);
  console.log("PRODUCT:", productId, product); // Debug log


  return (
    <div className="max-w-6xl mx-auto p-4 mt-24">
        <Breadcrums />
        <div className="mt-10 grid grid-cols-2 items-start">
            <ProductImg />
            <ProductDesc />

        </div>
    </div>
  );
};

export default SingleProduct;
