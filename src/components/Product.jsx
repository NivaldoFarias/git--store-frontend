import { useContext, useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import dotenv from 'dotenv';
import 'react-confirm-alert/src/react-confirm-alert.css';

import ProductsContext from './../hooks/ProductsContext';
import CartContext from './../hooks/CartContext';
import TokenContext from '../hooks/TokenContext';

dotenv.config();

export default function Product({ product }) {
  let { image_url, title, price, _id, inventory, shell_id } = product;
  const [btnClick, setBtnClick] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  const { token } = useContext(TokenContext);
  const { products, setProducts } = useContext(ProductsContext);

  function cartReq() {
    if (!token) return;
    const URL = `https://git--store.herokuapp.com/api/session/cart`;
    axios
      .put(URL, cart, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => console.log('ENVIADO AO DB'))
      .catch((e) => console.log(e));
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(cartReq, [cart]);

  function buildProduct() {
    const btnClass = btnClick ? 'styled-btn clicked' : 'styled-btn';
    const balance = price.toFixed(2).toString().split('.');
    let amount = null;
    let cents = null;
    if (balance) {
      if (price.balance * 1 === 0) {
        amount = '0,';
        cents = '00';
      } else {
        amount = balance[0];
        cents = `,${balance[1]}`;
      }
    }

    return (
      <>
        <a href="#">
          <img src={image_url} alt={title} />
        </a>
        <h1>{title}</h1>
        <div className="text-container">
          <p className="text-container__price">
            <span>R$</span>&nbsp;
            {amount}
            <span>{cents}</span>
          </p>
          <p className="text-container__shell-id">
            id <span>{shell_id}</span>
          </p>
        </div>
        <button
          className={inventory === 0 ? `${btnClass} disabled` : `${btnClass}`}
          onClick={addToCart}
        >
          git add {shell_id}
        </button>
      </>
    );

    function addToCart() {
      setBtnClick(true);

      setTimeout(() => {
        if (inventory < 1) {
          return confirmAlert({
            message: `Product not in stock, please try again.`,
            buttons: [
              {
                label: 'OK',
                onClick: () => null,
              },
            ],
          });
        }

        const newItem = { product_id: _id, title, price, image_url, volume: 1 };
        setProducts(
          products.map((prod) => {
            if (prod._id === _id) prod.inventory--;
            return prod;
          })
        );
        const index = cart.findIndex((item) => item.product_id === _id);
        if (index !== -1) {
          cart[index].volume++;
          setCart([...cart]);
        } else setCart((prevState) => [...prevState, newItem]);
        setBtnClick(false);
      }, 400);
    }
  }

  const productBody = buildProduct();

  return <article className="product">{productBody}</article>;
}
