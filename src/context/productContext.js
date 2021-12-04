import { createContext, useState, useContext } from "react";
import data from "../data";
const ProductContext = createContext(data);

export default ProductContext;

export const ProductProvider = ({children }) => {
  // eslint-disable-next-line no-unused-vars

  const [products, setProducts] = useState(data);
  const value = {
    products,
    setProducts,
  };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export function useProducts() {
  return useContext(ProductContext);
}
