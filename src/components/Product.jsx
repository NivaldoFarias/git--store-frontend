import dotenv from 'dotenv';
import { useContext } from 'react';

import CartContext from './../hooks/CartContext';

dotenv.config();

export default function Product({ product }) {
  const { image_url, title, price, _id } = product;
  const { cart, setCart } = useContext(CartContext);

  function addToCart() {
    const newCart = cart.map((item) => {
      if (item._id === _id) {
        return { ...item, volume: item.volume + 1 };
      }
      return item;
    });
    setCart(newCart);
  }

  return (
    <article className="product">
      <a href="#">
        <img src={image_url} alt={title} />
      </a>
      <h1>{title}</h1>
      <span>R$ {price}</span>
      <button onClick={addToCart}>Adicionar ao carrinho</button>
    </article>
  );
}
