import axios from "axios";
import dotenv from "dotenv";
import { useContext } from "react";

import CartContext from "./../hooks/CartContext";
import TokenContext from "./../hooks/TokenContext";

dotenv.config();

export default function Product({ product }) {
  const { image, title, price, _id } = product;
  const { cart, setCart } = useContext(CartContext);
  const { token } = useContext(TokenContext);

  function addToCart() {
    const URL = process.env.API_URL;
    const item = { ...product, quantity: 1 };
    axios
      .put(`${URL}/users/cart`, item, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((_res) => {
        const productIndex = cart.findIndex((item) => item._id === _id);

        if (productIndex === -1) {
          setCart([...cart, item]);
          return;
        }

        cart[productIndex].quantity += 1;
        setCart([...cart]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  return (
    <article className="product">
      <a href="#">
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
