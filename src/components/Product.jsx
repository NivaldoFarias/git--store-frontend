import { useContext } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import ProductsContext from './../hooks/ProductsContext';
import CartContext from './../hooks/CartContext';

export default function Product({ product }) {
  let { image_url, title, price, _id, inventory, shell_id } = product;
  const { cart, setCart } = useContext(CartContext);
  const { products, setProducts } = useContext(ProductsContext);

  function buildProduct() {
    let amount = null;
    let cents = null;
    const balance = price.toFixed(2).toString().split('.');
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
            <span>R$</span> {amount}
            <span>{cents}</span>
          </p>
          <p className="text-container__shell-id">
            id <span>{shell_id}</span>
          </p>
        </div>
        <button
          className={inventory === 0 ? 'disabled' : undefined}
          onClick={addToCart}
        >
          git add {shell_id}
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
      if (index !== -1) {
        cart[index].volume++;
        setCart([...cart]);
      } else setCart([...cart, newItem]);
    }
  }

  const productBody = buildProduct();

  return <article className="product">{productBody}</article>;
}
