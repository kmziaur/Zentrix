import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length > 5) {
      toast.error("You can upload up to 5 images only.");
      selectedFiles.splice(5);
    }

    setImages(selectedFiles);
    setPreviewImages(selectedFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!productName || !productDesc || !productPrice || !category || !brand) {
      toast.error("Please complete all fields.");
      return;
    }

    if (images.length === 0) {
      toast.error("Please add at least one product image.");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productDesc", productDesc);
    formData.append("productPrice", productPrice);
    formData.append("category", category);
    formData.append("brand", brand);

    images.forEach((image) => {
      formData.append("files", image);
    });

    setLoading(true);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Product created successfully.");
        navigate("/dashboard/products");
      } else {
        toast.error(response.data.message || "Unable to create product.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-10 pb-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">Add New Product</h1>
            <p className="text-sm text-slate-500">
              Create a new product listing for your store.
            </p>
          </div>
          <Button onClick={() => navigate("/dashboard/products")} className="bg-pink-600 hover:bg-pink-700">
            Back to Products
          </Button>
        </div>

        <Card className="border-slate-200/80 shadow-sm">
          <CardHeader>
            <CardTitle>Product details</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="productName">Product name</Label>
                  <Input
                    id="productName"
                    name="productName"
                    value={productName}
                    onChange={(event) => setProductName(event.target.value)}
                    placeholder="Example: Wireless Headphones"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productPrice">Price</Label>
                  <Input
                    id="productPrice"
                    name="productPrice"
                    type="number"
                    value={productPrice}
                    onChange={(event) => setProductPrice(event.target.value)}
                    placeholder="10000"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    placeholder="Example: Electronics"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    name="brand"
                    value={brand}
                    onChange={(event) => setBrand(event.target.value)}
                    placeholder="Example: Zentrix"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productDesc">Description</Label>
                <textarea
                  id="productDesc"
                  name="productDesc"
                  value={productDesc}
                  onChange={(event) => setProductDesc(event.target.value)}
                  rows={6}
                  className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-base outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/50"
                  placeholder="Enter a product description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productImg">Product images (up to 5)</Label>
                <input
                  id="productImg"
                  name="files"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm text-slate-700"
                />
              </div>

              {previewImages.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-3">
                  {previewImages.map((src, index) => (
                    <div key={index} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      <img src={src} alt={`Product preview ${index + 1}`} className="h-40 w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              <Button type="submit" className="bg-pink-600 hover:bg-pink-700 w-full md:w-auto" disabled={loading}>
                {loading ? "Saving product..." : "Create product"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;
