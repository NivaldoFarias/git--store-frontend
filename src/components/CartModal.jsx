import { useContext, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

import CartContext from './../hooks/CartContext';

export default function CartModal({ cartModal, toggleCart }) {
  const { cart } = useContext(CartContext);
  let total = 0;

  return (
    <div className={cartModal ? 'cart-modal' : 'hidden'}>
      <div className="cart-box">
        <FaShoppingCart className="cart-close" onClick={toggleCart} />
        {cart.map((product, index) => {
          total += product.price * product.volume;
          return (
            <div key={index} className="cart-item">
              <span>{product.title}</span>
              <span>R$ {product.price}</span>
              <span>{product.volume} unidade(s)</span>
            </div>
          );
        })}
        <span>Total: R${total}</span>
      </div>
    </div>
  );
}
