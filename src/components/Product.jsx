import axios from "axios";
import dotenv from "dotenv";
import { useContext } from "react";

import TokenContext from "../hooks/TokenContext";

dotenv.config();

export default function Product({ product, cart, setCart }) {
  const { token } = useContext(TokenContext);

  function addToCart() {
    const URL = process.env.REACT_APP_API_URL;
    const item = { ...product, quantity: 1 };
    axios
      .put(`${URL}/users/cart`, item, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const productIndex = cart.findIndex((item) => item._id === product._id);

        if (productIndex === -1) {
          setCart([...cart, response.data]);
          return;
        }

        cart[productIndex].quantity += 1;
        setCart([...cart]);
      });
  }

  return (
    <article className="product">
      <a href="#">
        <img src={product.image} alt={product.title} />
      </a>
      <h1>{product.title}</h1>
      <span>{product.price}</span>
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
