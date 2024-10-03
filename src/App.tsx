import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Details from "./components/Details";
import Sellpage from "./components/SellPage";
import { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db} from "./firebase/setup"; 
import { LoadingContext } from "./context/LoadingContext";

interface Product {
  id: string;
  title: string;
  price: string;
  category: string;
  image: string; 
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState("");

  const fetchProductsFromFirestore = async (): Promise<Product[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productData: Product[] = querySnapshot.docs.map((doc) => {
        const product = doc.data() as Product;

        return {
          ...product,
          id: doc.id,
        };
      });

      return productData;
    } catch (error) {
      console.error("Error fetching products from Firestore:", error);
      return [];
    }
  };

  // Fetch products from the Fake Store API
  const fetchProductsFromFakeAPI = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      return data.map((product: any) => ({
        ...product,
        id: product.id || product.title,
      }));
    } catch (error) {
      console.error("Error fetching products from Fake API:", error);
      return [];
    }
  };

  // Function to combine products from both Firestore and Fake Store API
  const loading = useContext(LoadingContext)
  const fetchAllProducts = async () => {
    try {
      loading?.setLoading(true)
      const [firestoreProducts, fakeAPIProducts] = await Promise.all([
        fetchProductsFromFirestore(),
        fetchProductsFromFakeAPI(),
      ]);

      const combinedProducts = [...firestoreProducts, ...fakeAPIProducts];
      setProducts(combinedProducts); // Update products state with both sets of products
      loading?.setLoading(false)
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              products={products}
              search={search}
              menu={menu}
              setSearch={setSearch}
              setMenu={setMenu}
            />
          }
        />
        <Route path="/details" element={<Details />} />
        <Route path="/sell" element={<Sellpage addProduct={addProduct} />} />
      </Routes>
    </>
  );
};

export default App;
