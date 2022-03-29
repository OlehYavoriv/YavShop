import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Products from "./Products/index";
import Login from "./Auth/Login/index";
import Register from "./Auth/Register/index";
import OrderHistory from "./History/index";
import OrderDetails from "./History/OrderDetails";
import Categories from "./Categories/index";
import Cart from "./Cart/index";
import NotFound from "./Utils/NotFound/index";
import About from "./About/index";
import FAQ from "./FAQ/index";
import DetailProduct from "./ProductDetail/index";
import { GlobalState } from "../../GlobalState";
import CreateProduct from "./CreateProduct/index";

const Pages = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userApi.isLogged;
  const [isAdmin] = state.userApi.isAdmin;
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/detail/:id" element={<DetailProduct />} />
      <Route path="/about" element={<About />} />

      <Route
        exact
        path="/login"
        element={isLogged ? <NotFound /> : <Login />}
      />
      <Route
        path="/register"
        element={isLogged ? <NotFound /> : <Register />}
      />

      <Route
        path="/category"
        element={isAdmin ? <Categories /> : <NotFound />}
      />
      <Route
        path="/create_product"
        element={isAdmin ? <CreateProduct /> : <NotFound />}
      />

      <Route
        path="/edit_product/:id"
        element={isAdmin ? <CreateProduct /> : <NotFound />}
      />

      <Route
        path="/history"
        element={isLogged ? <OrderHistory /> : <NotFound />}
      />
      <Route
        path="/history/:id"
        element={isLogged ? <OrderDetails /> : <NotFound />}
      />

      <Route path="/faq" element={<FAQ />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Pages;
