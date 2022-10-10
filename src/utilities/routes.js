import { createBrowserRouter } from "react-router-dom";
import About from "../component/About/About";
import ErrorPage from "../component/Error-Page/ErrorPage";
import Home from "../component/Home/Home";
import Inventory from "../component/Inventory/Inventory";
import OrderReview from "../component/OrderReview/OrderReview";
import Shop from "../component/Shop/Shop";
import Main from "../Layouts/Main";

import { cartAndProductData } from "../Loader/getCart&ProductData";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main> </Main>,
    errorElement: <ErrorPage></ErrorPage>,
    loader: cartAndProductData,

    children: [
      { path: "/", element: <Home></Home> },
      {
        path: "/shop",

        element: <Shop></Shop>,
      },
      { path: "/orders", element: <OrderReview></OrderReview> },
      { path: "/inventory", element: <Inventory></Inventory> },
      { path: "/about", element: <About></About> },
    ],
  },
]);
export default router;
