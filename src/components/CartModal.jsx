import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dotenv from 'dotenv';
import { FaShoppingCart } from 'react-icons/fa';

import CartContext from './../hooks/CartContext';
import TokenContext from '../hooks/TokenContext';

dotenv.config();

export default function CartModal({ cartModal, toggleCart }) {
  const { cart } = useContext(CartContext);
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  let total = 0;

  function purchase() {
    const URL = process.env.REACT_APP_API_URL;
    axios
      .get(`${URL}/sessions`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        //! Aqui verificou que esta logado !
        const items = cart.map((item) => {
          console.log(item);
          delete item.image_url;
          delete item.price;
          delete item.title;

          return item;
        });
        console.log(items);
        axios
          .post(
            `${URL}/session/purchase`,
            { items, amount: total },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => alert('Compra concluida'))
          .catch((err) => alert('ERRO !'));
      })
      .catch((err) => {
        //! Aqui verificou que nao esta logado !
        alert('Voce precisa logar pra continuar !');
        navigate('/signin');
      });
  }

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
        <button onClick={purchase}>Finalizar compra</button>
      </div>
    </div>
  );
}
