import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const EditProduct = () => {
  const { productId } = useParams();
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/product/getproduct/${productId}`
        );
        if (response.data.success) {
          const product = response.data.product;
          setProductName(product.productName);
          setProductDesc(product.productDesc);
          setProductPrice(product.productPrice);
          setCategory(product.category);
          setBrand(product.brand);
          setExistingImages(product.productImg || []);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product details.");
        navigate("/dashboard/products");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, navigate]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    const totalImages = existingImages.length + newImages.length + selectedFiles.length;
    
    if (totalImages > 5) {
      toast.error("You can upload up to 5 images total.");
      return;
    }

    setNewImages([...newImages, ...selectedFiles]);
    setPreviewImages([
      ...previewImages,
      ...selectedFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeNewImage = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
    setPreviewImages(previewImages.filter((_, i) => i !== index || i < existingImages.length));
  };

  const removeExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!productName || !productDesc || !productPrice || !category || !brand) {
      toast.error("Please complete all fields.");
      return;
    }

    if (existingImages.length + newImages.length === 0) {
      toast.error("Please keep at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productDesc", productDesc);
    formData.append("productPrice", productPrice);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("existingImages", JSON.stringify(existingImages.map((img) => img.public_id)));

    newImages.forEach((image) => {
      formData.append("files", image);
    });

    setSaving(true);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/product/update/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Product updated successfully.");
        navigate("/dashboard/products");
      } else {
        toast.error(response.data.message || "Unable to update product.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update product.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="pt-10 pb-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">Edit Product</h1>
            <p className="text-sm text-slate-500">
              Update product details and images.
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

              <div className="space-y-4">
                <div>
                  <Label>Current Images ({existingImages.length}/5)</Label>
                  {existingImages.length > 0 && (
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      {existingImages.map((img, index) => (
                        <div key={index} className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                          <img src={img.url} alt={`Product ${index + 1}`} className="h-40 w-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productImg">Add New Images</Label>
                  <input
                    id="productImg"
                    name="files"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm text-slate-700"
                  />
                  <p className="text-xs text-slate-500">
                    Max 5 images total. Current: {existingImages.length + newImages.length}
                  </p>
                </div>

                {previewImages.length > 0 && (
                  <div>
                    <Label>New Images Preview</Label>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      {previewImages.map((src, index) => (
                        <div key={index} className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                          <img src={src} alt={`New preview ${index + 1}`} className="h-40 w-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeNewImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="bg-pink-600 hover:bg-pink-700" disabled={saving}>
                  {saving ? "Saving..." : "Update Product"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/dashboard/products")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProduct;
