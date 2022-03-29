import React, { useContext } from "react";
import { GlobalState } from "../../../../GlobalState";
import styles from "./styles.module.scss";

const Filters = () => {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = state.productsApi.category;
  const [sort, setSort] = state.productsApi.sort;
  const [search, setSearch] = state.productsApi.search;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };

  return (
    <div className={styles.filter__menu}>
      <div className={styles.filter__row}>
        <select name="category" value={category} onChange={handleCategory}>
          <option value="">All Products</option>
          {categories.map((category) => (
            <option value={"category=" + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        value={search}
        placeholder="Search..."
        className={styles.search__input}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      <div>
        <select className={styles.new_sort} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best sales</option>
          <option value="sort=-price">Price: Hight-Low</option>
          <option value="sort=price">Price: Low-Hight</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
