import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import LoadingContextProvider from "./context/LoadingContext.tsx";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    
      <BrowserRouter>
      <LoadingContextProvider>

       


        <App />
     

        
      </LoadingContextProvider>
      </BrowserRouter>
  
  </StrictMode>
);
