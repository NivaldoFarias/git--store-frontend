import React, { useState, useEffect, useContext } from 'react';
import dotenv from 'dotenv';
import axios from 'axios';
import Typewriter from 'typewriter-effect';
import { IoClose } from 'react-icons/io5';
import { FaShoppingCart, FaBars } from 'react-icons/fa';

import ProductsContext from './../hooks/ProductsContext';
import CartContext from './../hooks/CartContext';
import logo from './../assets/git--store-logo.png';
import Product from './Product';

dotenv.config();

function Home() {
  const [sideBar, setSideBar] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [categories, setCategories] = useState();
  const [selected, setSelected] = useState();

  const { products, setProducts } = useContext(ProductsContext);
  const { cart, setCart } = useContext(CartContext);
  console.log(products);

  useEffect(() => {
    const URL = process.env.REACT_APP_API_URL;
    axios
      .get(`${URL}/products`)
      .then((response) => {
        const dbProducts = response.data;
        setProducts(dbProducts);
        setCart(dbProducts.map((product) => ({ ...product, volume: 1 })));
        setCategories(dbProducts.map((product) => product.category));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function buildHomePage() {
    return (
      <>
        <header>
          <img src={logo} alt="git --store" />
          <Typewriter
            onInit={(typewriter) => {
              typewriter.typeString('git --store').pauseFor(3000).start();
            }}
          />
        </header>
        <div className="banner"></div>
        <nav>
          <div>
            <div className="nav-menu">
              {sideBar ? (
                <IoClose onClick={toggleSideBar} className="menu" />
              ) : (
                <FaBars onClick={toggleSideBar} className="menu" />
              )}

              <FaShoppingCart onClick={toggleCart} className="cart" />
            </div>
            {/*
            !for desktop 
            <div className="nav-item">
              nav-item
            </div>
            <div className="nav-item">
              nav-item
            </div>
            <div className="nav-item">
              nav-item
            </div> 
          */}
          </div>
          <aside className={sideBar ? undefined : 'hidden-aside'}>
            <div className="sidebar-item">Login/Logout</div>
            <div className="sidebar-item">Historico</div>
            <div className="sidebar-item">Checkout</div>
          </aside>
        </nav>
        <div className="products">
          {products ? (
            products.map((product, index) => {
              return <Product key={index} product={product} />;
            })
          ) : (
            <></>
          )}
        </div>
        <div className={cartModal ? 'cart-modal' : 'hidden'}>
          <div className="cart-box">
            <FaShoppingCart className="cart-close" onClick={toggleCart} />
            {cart.map((product, index) => {
              return (
                <div key={index} className="cart-item">
                  <span>{product.title}</span>
                  <span>{product.price}</span>
                  <span>{product.volume} unidade(s)</span>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );

    function toggleSideBar() {
      setSideBar(!sideBar);
    }

    function toggleCart() {
      setCartModal(!cartModal);
    }
  }

  const homePage = buildHomePage();

  return <main id="home-page">{homePage}</main>;
}

export default Home;
