import React from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import { ProductConsumer } from "../../context";
import Product from "../Product";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import { useHistory } from "react-router-dom";

const Cart = () => {
  const history = useHistory();
  return (
    <section>
      <ProductConsumer>
        {(value) => {
          const { cart } = value;
          console.log(cart);
          if (cart.length > 0) {
            return (
              <>
                <Title name="your" title="cart" />
                <CartColumns />
                <CartList value={value} />
                <CartTotals value={value} history={history} />
              </>
            );
          } else {
            return <EmptyCart />;
          }
        }}
      </ProductConsumer>
    </section>
  );
};

export default Cart;
