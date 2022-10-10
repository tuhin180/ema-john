import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { cartContext, productContext } from "../../Layouts/Main";
import { addToDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import SingleProduct from "../SingleProduct/SingleProduct";

const Shop = () => {
  const products = useContext(productContext);

  const [cart, setCart] = useContext(cartContext);

  const handleAddToCart = (product) => {
    let newCart = [];
    const exist = cart.find(
      (existingProduct) => existingProduct.id === product.id
    );
    if (!exist) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      const rest = cart.filter(
        (existingProduct) => existingProduct.id !== product.id
      );
      exist.quantity = exist.quantity + 1;
      newCart = [...rest, exist];
    }

    setCart(newCart);
    addToDb(product.id);
    toast.success("product Added", { autoClose: 500 });
  };

  // calculation

  let subtotal = 0;
  for (const product of cart) {
    subtotal = subtotal + product.price * product.quantity;
  }
  const discount = (20 / 100) * subtotal;
  const itemtotal = subtotal - discount;
  const total = itemtotal + 4.5;

  return (
    <div className="mt-2">
      <h1 className="text-center text-2xl text-orange-400">Happy Shopping!!</h1>
      <div className="grid grid-cols-3 mt-4 gap-3">
        <div className="col-span-2  grid grid-cols-3 gap-3">
          {products.map((product) => (
            <SingleProduct
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
            ></SingleProduct>
          ))}
        </div>
        {/* cart item  */}
        <div className="sticky top-0">
          <div className="  rounded-2xl flex flex-col max-w-md p-6 space-y-4 divide-y sm:w-96 sm:p-10 divide-gray-700 dark:bg-gray-900 dark:text-gray-100">
            <h2 className="text-2xl font-semibold">Order items</h2>
            <ul className="flex flex-col pt-4 space-y-2">
              {cart.map((product) => (
                <Cart key={product.id} product={product}></Cart>
              ))}
            </ul>
            <div className="pt-4 space-y-2">
              <div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-3 h-3 mt-1 fill-current dark:text-violet-400"
                  >
                    <path d="M485.887,263.261,248,25.373A31.791,31.791,0,0,0,225.373,16H64A48.055,48.055,0,0,0,16,64V225.078A32.115,32.115,0,0,0,26.091,248.4L279.152,486.125a23.815,23.815,0,0,0,16.41,6.51q.447,0,.9-.017a23.828,23.828,0,0,0,16.79-7.734L486.581,296.479A23.941,23.941,0,0,0,485.887,263.261ZM295.171,457.269,48,225.078V64A16.019,16.019,0,0,1,64,48H225.373L457.834,280.462Z"></path>
                    <path d="M148,96a52,52,0,1,0,52,52A52.059,52.059,0,0,0,148,96Zm0,72a20,20,0,1,1,20-20A20.023,20.023,0,0,1,148,168Z"></path>
                  </svg>
                  <span className="dark:text-gray-400">
                    Spend $20.00, get 20% off
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>-{discount}</span>
              </div>
            </div>
            <div className="pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>$0.50</span>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <span>Delivery fee</span>
                  <span>$4.00</span>
                </div>
                <Link
                  rel="noopener noreferrer"
                  to="/"
                  className="text-xs hover:underline dark:text-violet-400"
                >
                  How do our fees work?
                </Link>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="font-semibold">${total}</span>
                </div>
                <button
                  type="button"
                  className="w-full py-2 font-semibold border rounded dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400"
                >
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
