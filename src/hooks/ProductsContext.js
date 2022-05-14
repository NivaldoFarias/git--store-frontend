import React, { createContext, useState } from 'react';
import axios from 'axios';

export const ProductsContext = createContext({});

export const ProductsProvider = (props) => {
  const [products, setProducts] = useState(() => {
    axios.get('http://localhost:5000/api/products').then((response) => {
      setProducts(response.data).catch((err) => console.log(err));
      setCategories(response.data.map((product) => product.category));
    });
  });

  const [categories, setCategories] = useState();
  const [selected, setSelected] = useState();

  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
        selected,
        setSelected,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
