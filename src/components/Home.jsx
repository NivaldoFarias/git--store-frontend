import React, { useState, useEffect, useContext } from 'react';
import dotenv from 'dotenv';
import axios from 'axios';
import Typewriter from 'typewriter-effect';
import { IoClose } from 'react-icons/io5';
import { FaShoppingCart, FaBars } from 'react-icons/fa';

import Product from './Product';
import CartModal from './CartModal';

import ProductsContext from './../hooks/ProductsContext';
import CartContext from './../hooks/CartContext';

import logo from './../assets/git--store-logo.png';

dotenv.config();

function Home() {
  const [sideBar, setSideBar] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [categories, setCategories] = useState();
  const [selected, setSelected] = useState();

  const { products, setProducts } = useContext(ProductsContext);

  useEffect(() => {
    const URL = `http://localhost:5000/api/products`;
    axios
      .get(URL)
      .then((response) => {
        const dbProducts = response.data;
        setProducts(dbProducts);
        setCategories(dbProducts.map((product) => product.category));
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            for desktop 
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
            <div className="sidebar-item">Signin/Signou</div>
            <div className="sidebar-item">Transactions</div>
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
        <CartModal cartModal={cartModal} toggleCart={toggleCart} />
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
