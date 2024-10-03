
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoadingContext } from "../context/LoadingContext";
import Loading from "./Loading";



interface Product {
  id: string;       
  title: string;
  price: string;
  category: string;
  image: string;
}

interface ProductsProp {
  products: Product[];
  search: string;
  menu: string;
}

const Home: React.FC<ProductsProp> = ({ products, search, menu }) => {
 

  const loading = useContext(LoadingContext)
  


  // Filter products based on search and menu
  const filteredProducts = products.filter((product) => {

  
    const searchFilter = search ? product.title.toLowerCase().includes(search.toLowerCase()) : true;
    const menuFilter = menu ? product.category.toLowerCase().includes(menu.toLowerCase()) : true;
    return searchFilter && menuFilter;
 
  });

  return (
    loading?.loading ? <Loading/>:
    <div className="grid grid-cols-4 p-5">
      {filteredProducts.map((product) => (
        <div key={product.id} className="border border-spacing-1 p-2 ml-3 mt-3">
          <Link to="/details" state={{ data: product }}>
            <img src={product.image} alt={product.title} className="w-60 h-48" />
            <h1 className="font-bold text-xl">${product.price}</h1>
            <h1>{product.title}</h1>
            <h1>{product.category}</h1>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
