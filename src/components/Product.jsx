import { useContext } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import ProductsContext from './../hooks/ProductsContext';
import CartContext from './../hooks/CartContext';

export default function Product({ product }) {
  let { image_url, title, price, _id, inventory } = product;
  const { cart, setCart } = useContext(CartContext);
  const { products, setProducts } = useContext(ProductsContext);

  function buildProduct() {
    return (
      <>
        <a href="#">
          <img src={image_url} alt={title} />
        </a>
        <h1>{title}</h1>
        <span>R$ {price}</span>
        <button
          className={inventory === 0 ? 'disabled' : undefined}
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </>
    );

    function addToCart() {
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
      if (index !== -1) setCart([...cart, cart[index].volume++]);
      else setCart([...cart, newItem]);
    }
  }

  const productBody = buildProduct();

  return <article className="product">{productBody}</article>;
}
