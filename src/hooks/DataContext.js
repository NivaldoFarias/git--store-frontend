import React, { createContext, useState } from "react";
import axios from "axios";

export const DataContext = createContext({});

export const DataProvider = (props) => {
  const [products, setProducts] = useState(() => {
    axios.get("").then((response) => {
      setProducts(response.data).catch((err) => console.log(err));
    });
  });

  const [categories, setCategories] = useState(() => {
    axios
      .get("")
      .then((response) => setCategories(response.data))
      .catch((err) => console.log(err));
  });

  const [selected, setSelected] = useState();

  return (
    <DataContext.Provider
      value={{
        products,
        categories,
        selected,
        setSelected,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
