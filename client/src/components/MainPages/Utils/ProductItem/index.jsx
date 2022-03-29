import React from "react";
import BtnRender from "./BtnRender";
import styles from "./styles.module.scss";

const ProductItem = ({ product, isAdmin, deleteProduct, handleCheck }) => {
  return (
    <div className={styles.product__card}>
      {isAdmin && (
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
        />
      )}

      <img src={product.images.url} alt="" />
      <div className={styles.product__box}>
        <h2 className={styles.product__title} title={product.title}>
          {product.title}
        </h2>
        <span className={styles.product__price}>$ {product.price}</span>
        <p className={styles.product__description}>{product.description}</p>
      </div>
      <BtnRender product={product} deleteProduct={deleteProduct} />
    </div>
  );
};

export default ProductItem;
