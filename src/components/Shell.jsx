import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { IoChevronUpSharp } from 'react-icons/io5';

import ProductsContext from './../hooks/ProductsContext';
import TokenContext from './../hooks/TokenContext';
import CartContext from './../hooks/CartContext';

import CommandLine from './CommandLine';

function Shell({ closeModal }) {
  const [lineType, setLineType] = useState(['user']);

  const navigate = useNavigate();

  const { token } = useContext(TokenContext);
  const { products, setProducts } = useContext(ProductsContext);
  const { cart, setCart } = useContext(CartContext);

  function buildShell() {
    const availableProducts = products.map((product) => product.shell_id);
    const availableCommands = {
      add: (targets) => {
        let newCart = [...cart];
        for (const target of targets) {
          const product = products.find(
            (product) => product.shell_id === target
          );
          if (invalidTarget(product, target)) continue;
          const newItem = {
            product_id: product._id,
            title: product.title,
            price: product.price,
            image_url: product.image_url,
            volume: 1,
          };

          const index = newCart.findIndex(
            (element) => element.product_id === product._id
          );
          if (index !== -1) newCart[index].volume++;
          else newCart.push(newItem);
        }
        updateCart(newCart);
      },
      rm: (targets) => {
        let newCart = [...cart];
        for (const target of targets) {
          const product = products.find(
            (product) => product.shell_id === target
          );
          if (!newCart.some((item) => product._id === item.product_id))
            continue;

          const index = newCart.findIndex(
            (item) => item.product_id === product._id
          );
          if (index !== -1) {
            newCart[index].volume--;
            if (cart[index].volume === 0) {
              newCart = cart.filter((item) => item.product_id !== product._id);
            }
          }
        }
        updateCart(newCart);
      },
      status: () => {
        setLineType((prevState) => [...prevState, 'status']);
      },
      help: () => {
        setLineType((prevState) => [...prevState, 'help']);
      },
      commit: closePurchase,
    };

    return (
      <>
        <div className="command-shell">
          {lineType.map((type, index) => {
            return (
              <CommandLine
                key={index}
                updateShell={updateShell}
                output={type}
                availableCommands={availableCommands}
              />
            );
          })}
        </div>
        <div className="footer-bar">
          <IoChevronUpSharp className="close-modal-btn" onClick={closeModal} />
        </div>
      </>
    );

    function updateShell(type) {
      if (type === 'clear') {
        setLineType(['clear']);
      } else {
        setLineType((prevState) => [...prevState, type]);
      }
    }

    function invalidTarget(product, shell_id) {
      return !availableProducts.includes(shell_id) || product.inventory < 1;
    }

    function updateCart(newCart) {
      setCart([...newCart]);
    }

    function closePurchase() {
      let total = cart
        .reduce((acc, product) => acc + product.price * product.volume, 0)
        .toFixed(2);
      const CONFIG = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const URL = process.env.REACT_APP_API_URL;
      axios
        .get(`${URL}/sessions`, CONFIG)
        .then(handleUserOnline)
        .catch(handleUserOffline);

      function handleSuccess(_res) {
        confirmAlert({
          message: `Purchase successful!`,
          buttons: [
            {
              label: 'OK',
              onClick: () => {
                setCart([]);
              },
            },
          ],
        });
      }

      function handleError(err) {
        confirmAlert({
          message: `${err.response.data.message}. Please try again.`,
          buttons: [
            {
              label: 'OK',
              onClick: () => null,
            },
          ],
        });
        console.log(err);
      }

      function handleUserOffline(_err) {
        confirmAlert({
          message: 'You must be signed in to purchase!',
          buttons: [
            {
              label: 'Sign in',
              onClick: () => navigate('/signin'),
            },
            {
              label: 'Cancel',
              onClick: () => null,
            },
          ],
        });
      }

      function handleUserOnline(_res) {
        const items = cart.map((item) => {
          console.log(item);
          delete item.image_url;
          delete item.price;
          delete item.title;

          return item;
        });
        axios
          .post(
            `https://git--store.herokuapp.com/api/session/purchase`,
            { items, amount: total },
            CONFIG
          )
          .then(handleSuccess)
          .catch(handleError);
      }
    }
  }

  const shell = buildShell();

  return <div className="shell">{shell}</div>;
}

export default Shell;
