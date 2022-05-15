import axios from 'axios';
import dotenv from 'dotenv';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import CartContext from './../hooks/CartContext';
import TokenContext from './../hooks/TokenContext';

dotenv.config();

export default function CartModal({ cartModal, toggleCart }) {
  const { cart } = useContext(CartContext);
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const CONFIG = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  let total = 0;

  function buildCartModal() {
    return (
      <div className="cart-box">
        <FaShoppingCart className="cart-close" onClick={toggleCart} />
        {cart.map((product, index) => {
          const { price, volume, title } = product;
          total += price * volume;

          return (
            <div key={index} className="cart-item">
              <span>{title}</span>
              <span>R$ {price}</span>
              <span>{volume} unit(s)</span>
            </div>
          );
        })}
        <span>Total: R${total}</span>
        <button onClick={purchase}>Close Purchase</button>
      </div>
    );

    function purchase() {
      const URL = `${process.env.API_URL}/sessions`;
      axios.get(URL, CONFIG).then(closePurchase).catch(handleError);
    }

    function closePurchase(_res) {
      const URL = `${process.env.API_URL}/session/purchase`;
      const items = cart.map((item) => {
        delete item.image_url;
        delete item.price;
        delete item.title;

        return item;
      });
      const body = { items, amount: total };

      axios
        .post(URL, body, CONFIG)
        .then(handleSuccessfulPurchase)
        .catch(handleErrorDuringPurchase);

      function handleErrorDuringPurchase(err) {
        confirmAlert({
          message: `${err.response.data.message}. Please try again.`,
          buttons: [
            {
              label: 'OK',
              onClick: () => null,
            },
          ],
        });
      }

      function handleSuccessfulPurchase(_res) {
        confirmAlert({
          message: `Purchase successful!`,
          buttons: [
            {
              label: 'OK',
              onClick: () => null,
            },
          ],
        });
      }
    }

    function handleError(err) {
      confirmAlert({
        message: `You must be signed in to make a purchase`,
        buttons: [
          {
            label: 'OK',
            onClick: () => null,
          },
        ],
      });
      console.log(err);
    }
  }

  const cartModalBody = buildCartModal();

  return (
    <div className={cartModal ? 'cart-modal' : 'hidden'}>{cartModalBody}</div>
  );
}
