import axios from 'axios';
import dotenv from 'dotenv';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import CartItem from './CartItem';

import CartContext from './../hooks/CartContext';
import TokenContext from './../hooks/TokenContext';

dotenv.config();

function CartModal({ cartModal, toggleCart }) {
  const { cart, setCart } = useContext(CartContext);
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const CONFIG = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  function buildCartModal() {
    let total = cart
      .reduce((acc, product) => acc + product.price * product.volume, 0)
      .toFixed(2);
    const content = cart.length ? (
      <>
        {cart.map((product, index) => {
          return <CartItem key={index} product={product} total={total} />;
        })}
        <span className="cart-modal__total">
          Total: R$
          {total}
        </span>
        <button className="cart-modal__purchase" onClick={closePurchase}>
          Checkout
        </button>
      </>
    ) : (
      <div className="cart-modal__empty">Cart Empty</div>
    );
    return (
      <div className="cart-modal__container">
        <header>
          <h1>Shopping Cart</h1>
          <IoClose className="cart-modal__close" onClick={toggleCart} />
        </header>
        {content}
      </div>
    );

    function closePurchase() {
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
                toggleCart();
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

      function handleUserOffline(err) {
        confirmAlert({
          message: 'Voce precisa logar pra continuar !',
          buttons: [
            {
              label: 'login',
              onClick: () => navigate('/signin'),
            },
            {
              label: 'cancelar',
              onClick: () => null,
            },
          ],
        });
      }

      function handleUserOnline(response) {
        const items = cart.map((item) => {
          console.log(item);
          delete item.image_url;
          delete item.price;
          delete item.title;

          return item;
        });
        axios
          .post(`${URL}/session/purchase`, { items, amount: total }, CONFIG)
          .then(handleSuccess)
          .catch(handleError);
      }
    }
  }

  const cartModalBody = buildCartModal();

  return (
    <div className={cartModal ? 'cart-modal' : 'hidden'}>{cartModalBody}</div>
  );
}

export default CartModal;
