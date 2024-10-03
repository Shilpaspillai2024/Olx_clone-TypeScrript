// import React, { createContext, ReactNode, useState } from 'react'


// interface SearchContextType{
//     search:string;
//     setSearch: (search: string) => void;

// }


// export const SearchContext = createContext<SearchContextType | undefined>(undefined)

// const SearchContextProvider = ({children}:{children:ReactNode}) => {

//     const [search,setSearch]=useState<string>('');
//   return (
//     <div>
//         <SearchContext.Provider value={{search,setSearch}}>
//           {children}
//         </SearchContext.Provider>
      
//     </div>
//   )
// }

// export default SearchContextProvider
import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define the context type
interface SearchContextType {
  search: string;
  setSearch: (search: string) => void;
}

// Create the context with undefined as default value
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Create the provider component
const SearchContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [search, setSearch] = useState<string>('');

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

// Create a custom hook for easier usage of the context
const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchContextProvider');
  }
  return context;
};

// Export the context and provider
export { SearchContext, SearchContextProvider, useSearchContext };
