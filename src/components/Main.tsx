
import Menubar from "./Menubar";
import Navbar from "./Navbar";
import Home from "./Home";
import Footer from "./Footer";


interface Product {
    id:string;
    title: string;
    price: string;
    category: string;
    image: string;
}

interface MainProps {
    products: Product[];
    search: string;
    menu: string;
    setSearch: (search: string) => void;
    setMenu: (menu: string) => void;
}

const Main: React.FC<MainProps> = ({ products, search, menu, setSearch, setMenu }) => {
   
    
    return (
        <div>
            <Navbar setSearch={setSearch} />

            
          
            <Menubar setMenu={setMenu} />
            <Home products={products} search={search} menu={menu} />
           

           

            <Footer />
        </div>
    );
}

export default Main;
