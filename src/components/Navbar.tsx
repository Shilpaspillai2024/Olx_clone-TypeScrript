import olx from "../assets/olx_logo.png";
import lens from "../assets/search.svg";
import arrow from "../assets/down_arrow.png";
import sea from "../assets/sear.png";
import Login from "./Login";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/setup";


type searchProps = {
  setSearch: any;
};

const Navbar = (props: searchProps) => {
  
  const [loginPop, setLoginPop] = useState(false);
  const [user, setUser] = useState<any>(null);


 


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <div className="flex p-4 bg-slate-100 shadow-md">
        <img src={olx} alt="olx logo" className="w-11 h-9 ml-3" />
        <div className="flex border-2 border-spacing-1 w-64 p-2 border-black ml-5  bg-white">
          <img src={lens} alt="Search" className="w-6 h-5  mt-1" />
          <input placeholder="Location" className="ml-2 outline-none" />
          <img src={arrow} alt="Arrow icon" className="w-8 h-7 ml-2" />
        </div>

        <div className="flex h-12 ml-4 border-2 border-black bg-white">
          <input
            onChange={(e) => props?.setSearch(e.target.value)}
         
            placeholder="Find Cars,Mobiles Phones and more....."
            className="ml-3 w-[500px] outline-none"
          />

          
           
          <img src={sea} alt="Search" className="w-12 h-11 " />
        </div>

        <div className="flex h-12 p-3 ml-10 cursor-pointer">
          <h1 className="font-semibold">ENGLISH</h1>
          <img src={arrow} alt="" className="w-8 h-7" />
        </div>
        

        {user ? (
          <>
                      {/* Show Logout when user is logged in */}
            <div
              onClick={handleLogout}
              className="flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline"
            >
              <h1 className="font-bold text-lg">Logout</h1>
            </div>

            {/* Show Sell button only when logged in */}
            <Link to="/sell">
              <div className="w-28 flex h-12 p-2 ml-6 cursor-pointer rounded-full border border-yellow-500">
                <h1 className="font-bold text-lg ml-3">+ SELL</h1>
              </div>
            </Link>
          </>
        ) : (
          // Show Login button when user is not logged in
          <div
            onClick={() => setLoginPop(!loginPop)}
            className="flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline"
          >
            <h1 className="font-bold text-lg">Login</h1>
          </div>
        )}
      </div>

      {loginPop && <Login setLoginPop={setLoginPop} />}
    </>
  );
};

export default Navbar;
