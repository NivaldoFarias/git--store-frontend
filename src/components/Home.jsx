import React, { useState, useEffect, useContext } from 'react';
import Typewriter from 'typewriter-effect';
import axios from 'axios';

import { RiTerminalFill, RiShoppingCartLine } from 'react-icons/ri';
import { FiUser } from 'react-icons/fi';

import ProductsContext from './../hooks/ProductsContext';
import getRandomInt from './../utils/getRandomInt';
import CartContext from '../hooks/CartContext';
import TokenContext from '../hooks/TokenContext';

import Product from './Product';
import CartModal from './CartModal';
import Shell from './Shell';

import banner from './../assets/git-commands-alt.png';
import logo from './../assets/git--store-logo.png';

function Home() {
  const [shellModal, setShellModal] = useState(false);
  const [cartModal, setCartModal] = useState(false);

  const { products, setProducts } = useContext(ProductsContext);
  const { setCart } = useContext(CartContext);
  const { token } = useContext(TokenContext);

  useEffect(() => {
    const URL = process.env.REACT_APP_API_URL;
    axios
      .get(`${URL}/products`)
      .then((response) => {
        const dbProducts = response.data;
        setProducts(dbProducts);
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
                .pauseFor(5000)
                .deleteAll()
                .pauseFor(1000)
                .typeString(outputWriter())
                .pauseFor(3000)
                .deleteAll()
                .start();
            }}
          />
        </header>
        <img src={banner} alt="git commands" className="banner" />
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
          <RiTerminalFill
            className="action-icon terminal-icon"
            onClick={openModal}
          />
          <div className="split-bar"></div>
          <RiShoppingCartLine
            className="action-icon cart"
            onClick={toggleCart}
          />
        </footer>
        <div className={shellModal ? 'shell-modal' : 'shell-modal collapsed'}>
          <Shell closeModal={closeModal} />
        </div>
      </>
    );

    function outputWriter() {
      const randomNumber = getRandomInt(1, 6);
      if (randomNumber <= 3) {
        return 'try git help';
      } else if (randomNumber === 4) {
        return 'try git status';
      } else if (randomNumber === 5) {
        return 'try git commit';
      } else return 'open git shell';
    }

    function openModal() {
      setShellModal(true);
    }

    function closeModal() {
      setShellModal(false);
    }

    function toggleCart() {
      setCartModal(!cartModal);
    }
  }

  const homePage = buildHomePage();

  return <main id="home-page">{homePage}</main>;
}

export default Home;
