import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const FilterSidebar = ({ allProducts, priceRange }) => {
  const Categories = allProducts.map((p) => p.category);
  const UniqueCategory = ["ALL", ...new Set(Categories)];
  console.log(UniqueCategory);

  const Brands = allProducts.map((p) => p.brand);
  const UniqueBrand = ["ALL", ...new Set(Brands)];

  console.log(UniqueBrand);

  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block w-64">
      {/* search */}
      <Input
        type="text"
        placeholder="Search here..."
        className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
      />
      {/* categories */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {UniqueCategory.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input type="radio" />
            <label>{item}</label>
          </div>
        ))}
      </div>
      {/* Brands */}
      <h1 className="mt-5 font-semibold text-xl">Brand</h1>
      <select className="bg-white w-full border-gray-200 border-md rounded-md">
        {UniqueBrand.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
      {/* Price range */}
      <h1 className="mt-5 font-semibold text-xl">Price Range</h1>
      <div className="flex flex-col gap-2">
        <label>
          Price Range: ৳{priceRange[0]} - ৳{priceRange[1]}
        </label>
        <div className="flex gap-2 items-center ">
          <input
            type="number"
            min="0"
            max="5000"
            className="w-20 p-1 border border-gray-300 rounded"
          />
          <span> - </span>
          <input
            type="number"
            min="0"
            max="999999"
            className="w-20 p-1 border border-gray-300 rounded"
          />
        </div>
        <input
            type="range"
            min="0"
            max="5000"
            step="100"
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="999999"
            step="100"
            className="w-full"
          />
      </div>
      {/* reset button */}
      <Button className="bg-pink-600 mt-5 text-white cursor-pointer w-full ">Reset Filters</Button>
    </div>
  );
};

export default FilterSidebar;
