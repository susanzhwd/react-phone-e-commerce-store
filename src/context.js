import React, { useState, useEffect } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

//Provider
//Consumer

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [detailedProduct, setDetailedProduct] = useState(detailProduct);
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(detailProduct);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartTax, setCartTax] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // const getProducts = () => {
  //   let products = [...storeProducts];
  //   // products[0].inCart = true;
  //   // products = [...products, products[0].inCart];
  //   setProducts(products);
  // };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    addTotals();
    console.log("cart", cart);
    console.log("products", products);
  }, [cart]);

  const handleDetail = (id) => {
    const product = getItem(id);
    setDetailedProduct(product);
  };

  const getItem = (id) => {
    return products.find((product) => product.id === id);
  };

  const addToCart = (id) => {
    let tempProducts = [...products];
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total += price;
    setProducts([...tempProducts, product]);
    setCart([...cart, product]);
    setDetailedProduct({ product });
  };

  const openModal = (id) => {
    setModalOpen(true);
    const product = getItem(id);
    setModalProduct(product);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const increment = (id) => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count++;
    product.total = product.price * product.count;
    setCart([...tempCart]);
    addTotals();
  };
  const decrement = (id) => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    if (product.count < 1) {
      removeItem(id);
    } else {
      product.count--;
      product.total = product.price * product.count;
      setCart([...tempCart]);
      addTotals();
    }
  };

  const removeItem = (id) => {
    let tempProducts = [...products];
    let tempCart = [...cart];
    tempCart = tempCart.filter((item) => item.id !== id);
    const index = tempProducts.indexOf(getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;
    setCart(tempCart);
    setProducts(tempProducts);
    addTotals();
  };

  const clearCart = () => {
    setCart([]);
    getProducts();
    addTotals();
  };

  const getProducts = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    setProducts(tempProducts);
  };

  const addTotals = () => {
    let subTotal = 0;
    cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    setCartTotal(total);
    setCartTax(tax);
    setCartSubTotal(subTotal);
  };
  return (
    <ProductContext.Provider
      value={{
        products,
        detailedProduct,
        cart,
        cartTax,
        cartTotal,
        cartSubTotal,
        handleDetail,
        addToCart,
        modalOpen,
        modalProduct,
        openModal,
        closeModal,
        increment,
        decrement,
        removeItem,
        clearCart,
        addTotals,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const ProductConsumer = ProductContext.Consumer;

// export const useGlobalContext = () => {
//   return useContext(ProductContext);
// };

export { ProductConsumer, ProductProvider };
