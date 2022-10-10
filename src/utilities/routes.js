import { createBrowserRouter } from "react-router-dom";
import About from "../component/About/About";
import ErrorPage from "../component/Error-Page/ErrorPage";
import Home from "../component/Home/Home";
import Inventory from "../component/Inventory/Inventory";
import OrderReview from "../component/OrderReview/OrderReview";
import Shop from "../component/Shop/Shop";
import RootLayout from "../Layouts/RootLayout";
import DetailsProduct from "../component/DetailsProduct/DetailsProduct";

import {
  cartAndProductData,
  fetchProducts,
} from "../Loader/getCart&ProductData";

const router = createBrowserRouter([
  {
    element: <RootLayout> </RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    loader: cartAndProductData,
    shouldRevalidate: ({ currentUrl }) => {
      // only revalidate if the submission originates from
      // the `/meal-plans/new` route.
      return false;
    },

    children: [
      { path: "/", element: <Home></Home> },
      {
        path: "/shop",
        element: <Shop></Shop>,
      },
      {
        path: "/details/:pid",
        loader: ({ params }) => {
          return fetchProducts(params.pid);
        },
        shouldRevalidate: ({ currentUrl }) => {
          // only revalidate if the submission originates from
          // the `/meal-plans/new` route.
          return false;
        },
        element: <DetailsProduct></DetailsProduct>,

        // element: <DetailsProduct></DetailsProduct>,
      },
      { path: "/orders", element: <OrderReview></OrderReview> },
      { path: "/inventory", element: <Inventory></Inventory> },
      { path: "/about", element: <About></About> },
    ],
  },
]);
export default router;
