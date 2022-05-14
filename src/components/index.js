import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ProductsProvider } from '../hooks/ProductsContext';
import { useLocalStorage } from './../hooks/useLocalStorage';
import CartContext from './../hooks/CartContext';
import TokenContext from './../hooks/TokenContext';

import Signin from './Signin';
import SignUp from './Signup';
import Home from './Home';

export default function App() {
  const [cart, setCart] = useState([]);
  const [token, setToken] = useLocalStorage('token', null);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <TokenContext.Provider value={{ token, setToken }}>
        <ProductsProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/signin' element={<Signin />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/' element={<Home />} />
            </Routes>
          </BrowserRouter>
        </ProductsProvider>
      </TokenContext.Provider>
    </CartContext.Provider>
  );
}
