import dotenv from 'dotenv';
import { useContext } from 'react';

import CartContext from './../hooks/CartContext';

dotenv.config();

export default function Product({ product, products, setProducts }) {
  let { image_url, title, price, _id, inventory } = product;
  const { cart, setCart } = useContext(CartContext);

  function addToCart() {
    console.log('adding');
    const newItem = { _id, title, price, image_url, volume: 1 };

    if (inventory < 1) {
      alert('Produto sem estoque');
      return;
    }

    setProducts(
      products.map((prod) => {
        if (prod._id === _id) prod.inventory--;
        return prod;
      })
    );
    console.log(inventory);

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
