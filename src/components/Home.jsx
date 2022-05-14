import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
import Typewriter from 'typewriter-effect';
import { IoClose } from 'react-icons/io5';
import { FaShoppingCart, FaBars } from 'react-icons/fa';

import Product from './Product';

import { ProductsContext } from './../hooks/ProductsContext';
import TokenContext from '../hooks/TokenContext';

import logo from './../assets/git--store-logo.png';

dotenv.config();

function Home() {
  const [sideBar, setSideBar] = useState(false);
  const [cartModal, setCartModal] = useState(false);

  const { products, setProducts } = useContext(ProductsContext);
  const { cart, setCart } = useContext(CartContext);
  const { token } = useContext(TokenContext);
  console.log(cart);

  function toggleSideBar() {
    setSideBar(!sideBar);
  }

  function toggleCart() {
    setCartModal(!cartModal);
    //TODO
  }

  function getProducts() {
    const URL = process.env.REACT_APP_API_URL;
    axios
      .get(`${URL}/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function getCart() {
    const URL = process.env.REACT_APP_API_URL;
    axios
      .get(`${URL}/users/cart`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCart(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  useEffect(() => {
    setProducts(teste);
    // getProducts();
    getCart();
  }, []);

  return (
    <main id='home-page'>
      <header>
        <img src={logo} alt='git --store' />
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString('git --store').pauseFor(3000).start();
          }}
        />
      </header>
      <div className='banner'></div>
      <nav>
        <div>
          <div className='nav-menu'>
            {sideBar ? (
              <IoClose onClick={toggleSideBar} className='menu' />
            ) : (
              <FaBars onClick={toggleSideBar} className='menu' />
            )}

            <FaShoppingCart onClick={toggleCart} className='cart' />
          </div>
          {/* //!for desktop 
                    <div className="nav-item">
                        nav-item
                    </div>
                    <div className="nav-item">
                        nav-item
                    </div>
                    <div className="nav-item">
                        nav-item
                    </div> */}
        </div>
        <aside className={sideBar ? undefined : 'hidden-aside'}>
          <div className='sidebar-item'>Login/Logout</div>
          <div className='sidebar-item'>Historico</div>
          <div className='sidebar-item'>Checkout</div>
        </aside>
      </nav>
      <div className='products'>
        {products ? (
          products.map((product) => {
            return <Product product={product} cart={cart} setCart={setCart} />;
          })
        ) : (
          <></>
        )}
      </div>
      <div className={cartModal ? 'cart-modal' : 'hidden'}>
        <div className='cart-box'>
          <FaShoppingCart className='cart-close' onClick={toggleCart} />
          {cart.map((product) => {
            return (
              <div className='cart-item'>
                <span>{product.title}</span>
                <span>{product.price}</span>
                <span>{product.quantity} unidade(s)</span>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Home;
