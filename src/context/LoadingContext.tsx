import React, { createContext, useState } from 'react'

interface ContextType {
    loading:boolean
    setLoading:React.Dispatch<React.SetStateAction<boolean>>
}

export const LoadingContext = createContext<ContextType | null>(null)

const LoadingContextProvider = ({children}:{children:React.ReactNode}) => {

    const [loading,setLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{loading,setLoading}}>
        {children}
    </LoadingContext.Provider>
  )
}

export default LoadingContextProvider
