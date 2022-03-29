import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../Utils/ProductItem/index";
import styles from "./styles.module.scss";

const DetailProduct = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsApi.products;
  const addCart = state.userApi.addCart;

  const [detailProduct, setDetailProduct] = useState([]);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
  }, [params.id, products]);

  if (detailProduct.length === 0) return null;

  return (
    <>
      <div className={styles.detail}>
        <img src={detailProduct.images.url} alt="Product-img" />
        <div className={styles.detail__box}>
          <div className={styles.row}>
            <h2>{detailProduct.title}</h2>
            <h6 className={styles.id}>#id: {detailProduct.product_id}</h6>
          </div>
          <span className={styles.price}>$ {detailProduct.price}</span>
          <p className={styles.details}>{detailProduct.description}</p>
          <p className={styles.details}>{detailProduct.content}</p>
          <p className={styles.sold__info}>Sold: {detailProduct.sold}</p>
          <Link
            to="/cart"
            className={styles.cart}
            onClick={() => addCart(detailProduct)}
          >
            Buy Now
          </Link>
        </div>
      </div>
      <div>
        <h2 className={styles.related__product}>Related products</h2>
        <div className={styles.products}>
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
