import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useLocalStorage } from './../hooks/useLocalStorage';
import CartContext from './../hooks/CartContext';
import TokenContext from './../hooks/TokenContext';
import ProductsContext from '../hooks/ProductsContext';

import Signin from './Signin';
import SignUp from './Signup';
import Home from './Home';

export default function App() {
  const [cart, setCart] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [token, setToken] = useLocalStorage('token', null);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <TokenContext.Provider value={{ token, setToken }}>
        <ProductsContext.Provider value={{ products, setProducts }}>
          <BrowserRouter>
            <Routes>
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </ProductsContext.Provider>
      </TokenContext.Provider>
    </CartContext.Provider>
  );
}
