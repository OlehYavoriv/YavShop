import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import styles from "./styles.module.scss";
import PaypalButton from "./PaypalButton";

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userApi.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      "/api/payment",
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );

    setCart([]);
    addToCart([]);
    alert("You have successfully placed an order.");
  };

  if (cart.length === 0)
    return <h2 className={styles.empty__text}>Cart Empty</h2>;

  return (
    <div>
      {cart.map((product) => (
        <div className={styles.cart} key={product._id}>
          <img src={product.images.url} alt="Product img" />

          <div className={styles.box_detail}>
            <h2 className={styles.cart__title}>{product.title}</h2>

            <h3 className={styles.cart__price}>
              $ {product.price * product.quantity}
            </h3>
            <p className={styles.cart__descr}>{product.description}</p>
            <p className={styles.cart__content}>{product.content}</p>

            <div className={styles.amount}>
              <button onClick={() => decrement(product._id)}> - </button>
              <span>{product.quantity}</span>
              <button onClick={() => increment(product._id)}> + </button>
            </div>

            <div
              className={styles.delete}
              onClick={() => removeProduct(product._id)}
            >
              X
            </div>
          </div>
        </div>
      ))}

      <div className={styles.total}>
        <h3>Total: $ {total}</h3>
        <PaypalButton total={total} tranSuccess={tranSuccess} />
      </div>
    </div>
  );
}

export default Cart;
