import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/v1/product/getallproducts");
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    const confirmed = window.confirm("Delete this product permanently?");
    if (!confirmed) return;

    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:8000/api/v1/product/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success("Product deleted successfully.");
      loadProducts();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to delete product.");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="pt-10 pb-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">Product Management</h1>
            <p className="text-sm text-slate-500">
              View, manage, and remove products from your store.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate("/dashboard/add-product")} className="bg-pink-600 hover:bg-pink-700">
              Add Product
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600">
            Loading products...
          </div>
        ) : products.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {products.map((product) => (
              <Card key={product._id} className="border-slate-200/80 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <CardTitle>{product.productName}</CardTitle>
                      <p className="text-sm text-slate-500">{product.category} · {product.brand}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      BDT {product.productPrice}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    {product.productImg?.[0]?.url ? (
                      <img
                        src={product.productImg[0].url}
                        alt={product.productName}
                        className="h-28 w-28 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-500">
                        No image
                      </div>
                    )}
                    <p className="text-sm leading-relaxed text-slate-600">
                      {product.productDesc.slice(0, 140)}{product.productDesc.length > 140 ? "..." : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={() => handleDelete(product._id)} className="bg-red-600 hover:bg-red-700">
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center text-slate-500">
            No products found. Add a product to populate the catalog.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProduct;
