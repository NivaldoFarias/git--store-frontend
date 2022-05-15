import axios from 'axios';
import { useContext } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaShoppingCart } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import CartContext from './../hooks/CartContext';
import TokenContext from './../hooks/TokenContext';

export default function CartModal({ cartModal, toggleCart }) {
  const { cart } = useContext(CartContext);
  const { token } = useContext(TokenContext);
  const CONFIG = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  let total = 0;

  function buildCartModal() {
    return (
      <div className="cart-modal__container">
        <IoClose className="cart-modal__close" onClick={toggleCart} />
        {cart.map((product, index) => {
          const { price, volume, title } = product;
          total += price * volume;

          return (
            <div key={index} className="cart-modal__item">
              <span>{title}</span>
              <span>R$ {price}</span>
              <span>{volume} unit(s)</span>
            </div>
          );
        })}
        <span>Total: R${total}</span>
        <button onClick={closePurchase}>Close Purchase</button>
      </div>
    );

    function closePurchase() {
      const URL = `http://localhost:5000/api/session/purchase`;
      const items = cart.map((item) => {
        delete item.image_url;
        delete item.price;
        delete item.title;

        return item;
      });
      const body = { items, amount: total };

      axios.post(URL, body, CONFIG).then(handleSuccess).catch(handleError);

      function handleSuccess(_res) {
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
    }
  }

  const cartModalBody = buildCartModal();

  return (
    <div className={cartModal ? 'cart-modal' : 'hidden'}>{cartModalBody}</div>
  );
}
