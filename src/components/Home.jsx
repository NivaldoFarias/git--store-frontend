import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Typewriter from 'typewriter-effect';
import { IoClose } from 'react-icons/io5';
import { RiTerminalFill, RiShoppingCartLine } from 'react-icons/ri';
import { FiUser } from 'react-icons/fi';
import { FaBars } from 'react-icons/fa';

import ProductsContext from './../hooks/ProductsContext';

import Product from './Product';
import CartModal from './CartModal';
import logo from './../assets/git--store-logo.png';

function Home() {
  const [sideBar, setSideBar] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [categories, setCategories] = useState();

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
            options={{
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString('git --store')
                .pauseFor(10000)
                .deleteAll()
                .pauseFor(1000)
                .start();
            }}
          />
        </header>
        <div className="banner"></div>
        <nav>
          <div>
            {/* <div className="nav-menu">
              {sideBar ? (
                <IoClose onClick={toggleSideBar} className="menu" />
              ) : (
                <FaBars onClick={toggleSideBar} className="menu" />
              )}
            </div> */}
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
