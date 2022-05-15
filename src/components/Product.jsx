import dotenv from 'dotenv';
import { useContext } from 'react';

import CartContext from './../hooks/CartContext';

dotenv.config();

export default function Product({ product }) {
  const { image_url, title, price, _id } = product;
  const { cart, setCart } = useContext(CartContext);

  function addToCart() {
    console.log('adding');
    const newItem = { _id, title, price, image_url, volume: 1 };

    const index = cart.findIndex((item) => item._id === _id);

    if (index !== -1) cart[index].volume++;
    else cart.push(newItem);

    console.log(cart);
    setCart([...cart]);
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
