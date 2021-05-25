import React, { useState } from "react";
import Product from "./Product";
import Title from "./Title";

import { ProductConsumer } from "../context";

const ProductList = () => {
  // const { products } = useGlobalContext();
  // console.log(products);
  return (
    <>
      <div className="py-5">
        <div className="container">
          <Title name="our" title="products" />
          <div className="row">
            <ProductConsumer>
              {(value) => {
                return value.products.map((product) => {
                  return <Product key={product.id} product={product} />;
                });
              }}
            </ProductConsumer>
            {/* {products.map((product) => {
              return <Product key={product.id} {...product} />;
            })} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
