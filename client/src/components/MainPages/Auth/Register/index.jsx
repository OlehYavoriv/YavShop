import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className={styles.register__page}>
      <h2 className={styles.register__title}>Registration</h2>
      <form onSubmit={registerSubmit} className={styles.register__form}>
        <p>
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            className={styles.register__input}
            value={user.name}
            onChange={onChangeInput}
          />
        </p>

        <p>
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className={styles.register__input}
            value={user.email}
            onChange={onChangeInput}
          />
        </p>

        <p>
          {" "}
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={user.password}
            className={styles.register__input}
            autoComplete="on"
            onChange={onChangeInput}
          />
        </p>

        <div className={styles.row}>
          <button className={styles.register__btn} type="submit">
            Register
          </button>
          <Link to="/login" className={styles.login__btn}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
