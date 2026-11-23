"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


import Adminnavbar from './components/Adminnavbar';
import Orderstabs from './components/Ordertabs';
import Productstabs from './components/Producttabs';
import Slidertabs from './components/Slidertabs';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("orders");
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Text fields state (imageUrl hata diya hai kyunki ab file upload hogi)
  const [newProduct, setNewProduct] = useState({
    title: '', description: '', purityOrBrightness: ''
  });
  
  const [productImageFile, setProductImageFile] = useState(null);

  const [newSlider, setNewSlider] = useState({
    title: '', description: '', tag: 'Announcement'
  });
  const [sliderImageFile, setSliderImageFile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/wahabaliadmin");
      return;
    }
    fetchAllData();
  }, [router]);


 const fetchAllData = async () => {
  setLoading(true);
  const token = localStorage.getItem("adminToken");
  const authHeaders = { Authorization: `Bearer ${token}` };

  // 1. Sliders Fetch (Independent)
  try {
    const resSliders = await fetch(`${API_URL}/api/admin/sliders`);
    const dataSliders = await resSliders.json();
    if (dataSliders.success) {
      setSliders(dataSliders.sliders || dataSliders.data || []);
    }
  } catch (error) {
    console.error("Error fetching sliders:", error);
  }

  // 2. Products Fetch (Independent)
  try {
    const resProducts = await fetch(`${API_URL}/api/admin/products`);
    const dataProducts = await resProducts.json();
    if (dataProducts.success) {
      setProducts(dataProducts.products || dataProducts.data || []);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  // 3. Orders Fetch (Independent)
  try {
    const resOrders = await fetch(`${API_URL}/api/order/getorders`, {

      headers: authHeaders,
    });
    const dataOrders = await resOrders.json();
    if (dataOrders.success) {
      setOrders(dataOrders.orders || dataOrders.data || []);
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
  } finally {
    setLoading(false);
  }
};
  
  const handleStatusChange = async (trackingId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/order/update-status/${trackingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        alert("Order status updated!");
        fetchAllData();
      }
    } catch (error) {
      alert("Error updating order status");
    }
  };

  // ➕ Add Product with FormData (Laptop Image File)
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const formData = new FormData();
    formData.append("title", newProduct.title);
    formData.append("description", newProduct.description);
    formData.append("purityorbrightness", newProduct.purityOrBrightness);
    if (productImageFile) {
      formData.append("image", productImageFile);
    }

    try {
      const res = await fetch(`${API_URL}/api/admin/addproduct`, {
        method: 'POST',
        headers: {
          // Token ko header mein attach karein (Backend middleware ke mutabiq)
          'Authorization': `Bearer ${token}` 
        },
        body: formData // Content-Type header set nahi karna, browser khud handle karega
      });
      const data = await res.json();
      if (data.success) {
        alert("Product added successfully with Cloudinary image!");
        setNewProduct({ title: '', description: '', purityOrBrightness: '' });
        setProductImageFile(null);
        fetchAllData();
      } else {
        alert(data.message || "Error adding product");
      }
    } catch (error) {
      alert("Error adding product");
    }
  };


const handleDeleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`${API_URL}/api/admin/deleteproduct/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        alert("Product deleted!");
        fetchAllData();
      } else {
        alert(data.message || "Failed to delete product");
      }
    } catch (error) {
      alert("Error deleting product");
    }
  }

  const compressImage = (file, maxWidth = 1200, quality = 0.8) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }
            const cleanName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
            resolve(new File([blob], cleanName, { type: "image/jpeg" }));
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
};
  
// Add slider
const handleAddSlider = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("adminToken");
  const formData = new FormData();
  formData.append("title", newSlider.title);
  formData.append("description", newSlider.description);
  formData.append("tag", newSlider.tag);

  if (sliderImageFile) {
    const fileToUpload = await compressImage(sliderImageFile);
    formData.append("image", fileToUpload);
  }

  try {
    const res = await fetch(`${API_URL}/api/admin/addslider`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      alert("Slider banner added successfully!");
      setNewSlider({ title: "", description: "", tag: "Announcement" });
      setSliderImageFile(null);
      fetchAllData();
    } else {
      alert(data.message || "Error adding slider");
    }
  } catch (error) {
    alert("Error adding slider");
  }
};


const handleDeleteSlider = async (id) => {
  if (!confirm("Delete this slider banner?")) return;
  const token = localStorage.getItem("adminToken");

  try {
    const res = await fetch(`${API_URL}/api/admin/deleteslider/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.success) {
      alert("Slider deleted!");
      fetchAllData();
    } else {
      alert(data.message || "Could not delete slider");
    }
  } catch (error) {
    console.error("Delete slider error:", error);
    alert("Error deleting slider");
  }
};

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/wahabaliadmin");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <Adminnavbar onRefresh={fetchAllData} onLogout={handleLogout} />

        {/* Tab Navigation Switches */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3 text-xs">
          <button 
            onClick={() => setActiveTab("orders")}
            className={`py-2 px-4 rounded-xl font-bold transition cursor-pointer ${activeTab === 'orders' ? 'bg-teal-700 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
          >
            📦 Orders Feed ({orders?.length || 0})
          </button>
          <button 
            onClick={() => setActiveTab("products")}
            className={`py-2 px-4 rounded-xl font-bold transition cursor-pointer ${activeTab === 'products' ? 'bg-teal-700 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
          >
            💎 Minerals CRUD ({products?.length || 0})
          </button>
          <button 
            onClick={() => setActiveTab("sliders")}
            className={`py-2 px-4 rounded-xl font-bold transition cursor-pointer ${activeTab === 'sliders' ? 'bg-teal-700 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
          >
            🖼️ Carousel CRUD ({sliders.length})
          </button>
        </div>

        {/* Tab Content Render */}
        {activeTab === "orders" && (
          <Orderstabs orders={orders} loading={loading} onStatusChange={handleStatusChange} />
        )}

        {activeTab === "products" && (
          <Productstabs 
            products={products} 
            newProduct={newProduct} 
            setNewProduct={setNewProduct} 
            setImageFile={setProductImageFile}
            onAddProduct={handleAddProduct} 
            onDeleteProduct={handleDeleteProduct} 
          />
        )}

        {activeTab === "sliders" && (
          <Slidertabs 
            sliders={sliders} 
            newSlider={newSlider} 
            setNewSlider={setNewSlider} 
            setImageFile={setSliderImageFile}
            onAddSlider={handleAddSlider} 
            onDeleteSlider={handleDeleteSlider} 
          />
        )}

      </div>
    </div>
  );
}