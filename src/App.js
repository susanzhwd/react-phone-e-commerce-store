import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./component/Navbar";
import ProductList from "./component/ProductList";
import Details from "./component/Details";
import Cart from "./component/Cart";
import Default from "./component/Default";
import Modal from "./component/Modal";

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <ProductList />
        </Route>
        <Route exact path="/details">
          <Details />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route path="*">
          <Default />
        </Route>
      </Switch>
      <Modal />
    </>
  );
};

export default App;
