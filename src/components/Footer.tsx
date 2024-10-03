import olxx from "../assets/olxx.svg";
import bike from "../assets/bikewale.svg";
import car from "../assets/cartrade.svg";
import cartrade from "../assets/cartrade_tech.svg";
import carwale from "../assets/carwale.svg";
import mob from "../assets/mobility.svg";

const Footer = () => {
  return (
    <div className="bg-cyan-950 h-56 p-4">
      <div className="flex ">
        <img src={cartrade} alt="Cartrade Tech" className="w-80 h-32" />

        <div className="border-l border-gray-300 h-32 mx-4"></div>

        <div className="flex items-center justify-between ml-4 p-4">
          <img src={olxx} alt="OLX" className="w-20 h-24 mr-9" />
          <img src={bike} alt="Bikewale" className="w-28 h-24 mr-9" />
          <img src={car} alt="Cartrade" className="w-28 h-24 mr-9" />
          <img src={carwale} alt="Carwale" className="w-28 h-24 mr-9" />
          <img src={mob} alt="Mobility" className="w-28 h-24 ml-9" />
        </div>
      </div>

      <div className="flex items-end justify-between mt-4">
        <h1 className="text-white text-sm ml-4">Help - Sitemap</h1>
        <h1 className="text-white text-sm">
          All rights reserved © 2006-2024 OLX
        </h1>
      </div>
    </div>
  );
};

export default Footer;
