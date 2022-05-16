import { useEffect, useState, useContext } from 'react';
import { IoClose } from 'react-icons/io5';

import CartContext from '../hooks/CartContext';

function CartItem({ product }) {
  const { price, title, product_id, image_url } = product;
  let { volume } = product;
  const { cart, setCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(volume);
    if (volume === 0) {
      const newCart = cart.filter((item) => item.product_id !== product_id);
      setCart(newCart);
    }
  }, [volume]);

  function addOne() {
    setQuantity(quantity + 1);
    volume = quantity;
    const newCart = cart.map((item) => {
      if (item.product_id === product_id) item.volume++;
      return item;
    });
    setCart(newCart);
  }

  function subOne() {
    setQuantity(quantity - 1);
    volume = quantity;
    const newCart = cart.map((item) => {
      if (item.product_id === product_id) item.volume--;
      return item;
    });
    setCart(newCart);
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
          }}
        />
        <button onClick={addOne}>+</button>
      </div>
      <span>subtotal - R$ {(price * quantity).toFixed(2)}</span>
    </div>
  );
}

export default CartItem;
