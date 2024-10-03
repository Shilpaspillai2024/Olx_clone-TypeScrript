import React, { useState } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../firebase/setup";

type Product = {
  id: string;
  title: string;
  price: string;
  category: string;
  image: string;
};

interface SellPageProps {
  addProduct: (product: Product) => void;
}

const SellPage: React.FC<SellPageProps> = ({ addProduct }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);

      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!image) {
      alert("Please upload an image.");
      return;
    }
    setLoading(true);

    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        ()=>{

        },
        (error) => {
            console.error("Error uploading image:", error);
            setLoading(false); 
          },

        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          const newProduct: Product = {
            id: "",
            title,
            price,
            category,
            image: downloadURL,
          };

          const docRef = await addDoc(collection(db, "products"), newProduct);

          console.log("Document written with ID: ", docRef.id);

          addProduct(newProduct);
          resetForm();
          setLoading(false);
          navigate("/");
        }
      );
    } catch (error) {
      console.error("Error saving product: ", error);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setCategory("");
    setImage(null);
    setImagePreview(null);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Sell Your Item
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter product title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Price
              </label>
              <input
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Category
              </label>
              <input
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-60 h-60 rounded-md"
                />
              </div>
            )}
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-cyan-900 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-950 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellPage;
