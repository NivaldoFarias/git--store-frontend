import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
import { IoClose } from 'react-icons/io5';

import CartContext from '../hooks/CartContext';
import TokenContext from '../hooks/TokenContext';

dotenv.config();

function CartItem({ product }) {
  const { price, title, product_id, image_url } = product;
  let { volume } = product;
  const { cart, setCart } = useContext(CartContext);
  const { token } = useContext(TokenContext);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(volume);
    if (volume === 0) {
      const newCart = cart.filter((item) => item.product_id !== product_id);
      setCart(newCart);
    }
  }, [volume]);

  function cartReq() {
    if (!token) return;
    const URL = `${process.env.REACT_APP_API_URL}/session/cart`;
    axios
      .put(URL, cart, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => console.log('ENVIADO AO DB'))
      .catch((e) => console.log(e));
  }

  function addOne() {
    volume = quantity + 1;
    const newCart = cart.map((item) => {
      if (item.product_id === product_id) item.volume++;
      return item;
    });
    setCart(newCart);
    cartReq();
  }

  function subOne() {
    volume = quantity - 1;
    const newCart = cart.map((item) => {
      if (item.product_id === product_id) item.volume--;
      return item;
    });
    setCart(newCart);
    cartReq();
  }

  return (
    <div className="cart-modal__item">
      <IoClose
        className="cart-modal__item__delete"
        onClick={() => {
          const newCart = cart.filter((item) => item.product_id !== product_id);
          setCart(newCart);
        }}
      />
      <a href="#">
        <img src={image_url} alt={title} />
      </a>
      <h1>{title}</h1>
      <div className="cart-modal__item__info">
        <span>R$ {price} × </span>
        <button onClick={subOne}>-</button>
        <input
          type="number"
          step="1"
          min="0"
          value={quantity}
          onChange={(e) => {
            setQuantity(parseInt(e.target.value));
            volume = quantity;
            const newCart = cart.map((item) => {
              if (item.product_id === product_id) item.volume = e.target.value;
              return item;
            });
            setCart(newCart);
            cartReq();
          }}
        />
        <button onClick={addOne}>+</button>
      </div>
      <span>
        subtotal - R$ {quantity === '' ? '0' : (price * quantity).toFixed(2)}
      </span>
    </div>
  );
}

export default CartItem;
