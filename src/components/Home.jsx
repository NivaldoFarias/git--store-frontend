import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Typewriter from 'typewriter-effect';

import { RiTerminalFill, RiShoppingCartLine } from 'react-icons/ri';
import { FiUser } from 'react-icons/fi';
import { FaBars } from 'react-icons/fa';

import ProductsContext from './../hooks/ProductsContext';
import CartContext from '../hooks/CartContext';
import TokenContext from '../hooks/TokenContext';

import Product from './Product';
import CartModal from './CartModal';
import logo from './../assets/git--store-logo.png';

function Home() {
  const [sideBar, setSideBar] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [categories, setCategories] = useState();

  const { products, setProducts } = useContext(ProductsContext);
  const { setCart } = useContext(CartContext);
  const { token } = useContext(TokenContext);

  useEffect(() => {
    const URL = `http://localhost:5000/api`;
    axios
      .get(`${URL}/products`)
      .then((response) => {
        const dbProducts = response.data;
        setProducts(dbProducts);
        setCategories(dbProducts.map((product) => product.category));
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${URL}/session/cart`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const dbCart = response.data;
        setCart(dbCart);
      });
    // eslint-disable-next-line,  react-hooks/exhaustive-deps
  }, []);

  function buildHomePage() {
    return (
      <>
        <header>
          <img src={logo} alt="git --store" />
          <Typewriter
            options={{
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString('git --store')
                .pauseFor(10000)
                .deleteAll()
                .pauseFor(1000)
                .typeString('open git shell')
                .pauseFor(3000)
                .deleteAll()
                .start();
            }}
          />
        </header>
        <div className="banner"></div>
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
        <footer>
          <FiUser className="action-icon user-icon" />
          <div className="split-bar"></div>
          <RiTerminalFill className="action-icon terminal-icon " />
          <div className="split-bar"></div>
          <RiShoppingCartLine
            className="action-icon cart"
            onClick={toggleCart}
          />
        </footer>
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
