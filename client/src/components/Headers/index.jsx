import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import styles from "./styles.module.scss";
import MenuIcon from "./icons/menu.svg";
import CloseIcon from "./icons/close.svg";
import CartIcon from "./icons/cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userApi.isLogged;
  const [isAdmin] = state.userApi.isAdmin;
  const [cart] = state.userApi.cart;
  const [menu, setMenu] = useState(false)

  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.removeItem("firstLogin");
    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };
  const styleMenu = {
    left: menu ? 0 : '-100%'
  }

  return (
    <header>
      <div className={styles.menu} onClick={()=> setMenu(!menu)}>
        <img src={MenuIcon} alt="Menu-icon" width="30" />
      </div>
      <div className={styles.logo}>
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "Yav Shop"}</Link>
        </h1>
      </div>
      <ul style={styleMenu}>
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        {isAdmin && adminRouter()}

        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Login & Register</Link>
          </li>
        )}

        <li>
          <Link to="/faq">FAQ</Link>
        </li>
        <li  onClick={()=> setMenu(!menu)}>
          <img
            src={CloseIcon}
            alt="Close-icon"
            width="30"
            className={styles.menu}
          />
        </li>
      </ul>

      {isAdmin ? (
        ""
      ) : (
        <div className={styles.cart__icon}>
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={CartIcon} alt="Cart-icon" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
