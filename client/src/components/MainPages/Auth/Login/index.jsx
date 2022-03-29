import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className={styles.login__page}>
      <h2 className={styles.login__title}>Login</h2>
      <form onSubmit={loginSubmit} className={styles.login__form}>
        <p>
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className={styles.login__input}
            value={user.email}
            onChange={onChangeInput}
          />
        </p>

        <p>
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={user.password}
            className={styles.login__input}
            autoComplete="on"
            onChange={onChangeInput}
          />
        </p>

        <div className={styles.row}>
          <button className={styles.login__btn} type="submit">
            Login
          </button>
          <Link to="/register" className={styles.register__btn}>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
