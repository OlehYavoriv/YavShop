import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import Loading from "../Utils/Loader/Loader";
import styles from "./styles.module.scss";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description: "",
  content: "",
  category: "",
  _id: "",
};
const CreateProduct = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin] = state.userApi.isAdmin;
  const [token] = state.token;

  const navigate = useNavigate();
  const param = useParams();

  const [products] = state.productsApi.products;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.productsApi.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You're not an admin");
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      const file = e.target.files[0];

      if (!file) return alert("File not exist.");

      if (file.size > 1024 * 1024) return alert("Size too large!");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      if (!images) return alert("No Image Upload");

      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/products",
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      }

      setCallback(!callback);

      navigate("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };
  return (
    <div className={styles.create_product}>
      <div className={styles.upload}>
        <input
          type="file"
          name="file"
          className={styles.file_up}
          onChange={handleUpload}
        />
        {loading ? (
          <div className={styles.file_img}>
            {" "}
            <Loading />
          </div>
        ) : (
          <div className={styles.file_img} style={styleUpload}>
            <img src={images ? images.url : ""} alt="New product img" />
            <span onClick={handleDestroy}>x</span>
          </div>
        )}
      </div>
      <form className={styles.create_product__form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="product_id">Product id</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            className={styles.create_product__fields}
            value={product.product_id}
            onChange={handleChangeInput}
            disabled={onEdit}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="prtitleoduct_id">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className={styles.create_product__fields}
            value={product.title}
            onChange={handleChangeInput}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            required
            className={styles.create_product__fields}
            value={product.price}
            onChange={handleChangeInput}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            className={styles.create_product__fields}
            value={product.description}
            onChange={handleChangeInput}
            rows="5"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            className={styles.create_product__fields}
            value={product.content}
            onChange={handleChangeInput}
            rows="7"
          />
        </div>

        <div className={styles.row}>
          <select
            name="category"
            id="category"
            value={product.category}
            onChange={handleChangeInput}
          >
            <option value="">Please select category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className={styles.btn} type="submit">
          {onEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
