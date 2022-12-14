import axios from "axios";
import React, { createContext, useState } from "react";



const dataContext = createContext()

const DataFetcher = ({children}) => {

    const [products, setProducts] = useState([])
    const getAllProducts = async() => {
        const {data} = await axios.get('http://localhost:5000/api/products')
        setProducts(data)
    }

  return (
    <dataContext.Provider
    value={{
        getAllProducts,
        products
    }}>
        {children}
    </dataContext.Provider>
  
  )
}

export const useProvider = () => {
    const context = React.useContext(dataContext);
    if (context === "undefined") {
      throw new Error("useAuth must be used within the auth provider");
    }
    return context;
  };

export default DataFetcher

