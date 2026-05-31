import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const FilterSidebar = ({
  search,
  setSearch,
  brand,
  setBrand,
  category,
  setCategory,
  setPriceRange,
  allProducts,
  priceRange,
  className = "",
}) => {
  const Categories = allProducts.map((p) => p.category);
  const UniqueCategory = ["ALL", ...new Set(Categories)];

  const Brands = allProducts.map((p) => p.brand);
  const UniqueBrand = ["ALL", ...new Set(Brands)];

  const handleCategoryClick = (val) => {
    setCategory(val);
  };
  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };
  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= priceRange[1]) setPriceRange([value, priceRange[1]]);
  };
  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= priceRange[0]) setPriceRange([priceRange[0], value]);
  };
  const resetFilters = () => {
    setSearch("");
    setCategory("ALL");
    setBrand("ALL");
    setPriceRange([0, 999999]);
  };

  return (
    <div className={`bg-gray-100 mt-5 p-4 rounded-md h-max w-full md:w-64 ${className}`}>
      <Input
        type="text"
        placeholder="Search here..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
      />
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {UniqueCategory.map((item, index) => (
          <label
            key={index}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-pink-50"
          >
            <input
              type="radio"
              checked={category === item}
              onChange={() => handleCategoryClick(item)}
              className="h-4 w-4 text-pink-600"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
      <h1 className="mt-5 font-semibold text-xl">Brand</h1>
      <select
        className="bg-white w-full border border-gray-200 rounded-md px-3 py-2"
        value={brand}
        onChange={handleBrandChange}
      >
        {UniqueBrand.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <h1 className="mt-5 font-semibold text-xl">Price Range</h1>
      <div className="flex flex-col gap-3">
        <label className="text-sm">
          Price Range: ৳{priceRange[0]} - ৳{priceRange[1]}
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="number"
            min="0"
            max="5000"
            value={priceRange[0]}
            onChange={handleMinChange}
            className="w-full sm:w-24 p-2 border border-gray-300 rounded"
          />
          <span className="text-center text-sm text-gray-600">to</span>
          <input
            type="number"
            min="0"
            max="999999"
            value={priceRange[1]}
            onChange={handleMaxChange}
            className="w-full sm:w-24 p-2 border border-gray-300 rounded"
          />
        </div>
        <input
          type="range"
          min="0"
          max="5000"
          step="100"
          value={priceRange[0]}
          onChange={handleMinChange}
          className="w-full"
        />
        <input
          type="range"
          min="0"
          max="999999"
          step="100"
          value={priceRange[1]}
          onChange={handleMaxChange}
          className="w-full"
        />
      </div>
      <Button onClick={resetFilters} className="bg-pink-600 mt-5 text-white w-full">
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;
