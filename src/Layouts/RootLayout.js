import { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

import { cartContext, productContext } from "../contexts/Contexts";

import Footer from "../component/Footer/Footer";
import Header from "../component/Header/Header";

const Main = () => {
  const { products, initialCart } = useLoaderData();

  const [cart, setCart] = useState(initialCart);

  return (
    <productContext.Provider value={products}>
      <cartContext.Provider value={[cart, setCart]}>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
      </cartContext.Provider>
    </productContext.Provider>
  );
};

export default Main;
