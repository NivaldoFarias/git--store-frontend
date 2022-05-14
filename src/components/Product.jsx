import dotenv from 'dotenv';
import { useContext } from 'react';

import CartContext from './../hooks/CartContext';

dotenv.config();

export default function Product({ product }) {
  const { image, title, price, _id } = product;
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
    <article className='product'>
      <a href='#'>
        <img src={image} alt={title} />
      </a>
      <h1>{title}</h1>
      <span>{price}</span>
      <button onClick={addToCart}>Adicionar ao carrinho</button>
    </article>
  );
}

/*
Adicionar ao carrinho 
->
Reservar temporariamente o item adicionado (remover um na quantidade do item no database)
->


*/
