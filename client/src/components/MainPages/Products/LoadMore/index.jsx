import React, { useContext } from "react";
import { GlobalState } from "../../../../GlobalState";
import styles from "./styles.module.scss";

const LoadMore = () => {
  const state = useContext(GlobalState);
  const [page, setPage] = state.productsApi.page;
  const [result] = state.productsApi.result;

  return (
    <div className={styles.loadMore}>
      {result < page * 8 ? (
        ""
      ) : (
        <button
          className={styles.loadMore__btn}
          onClick={() => setPage(page + 1)}
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default LoadMore;
