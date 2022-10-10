import React, { useContext } from "react";
import { toast } from "react-toastify";
import { cartContext } from "../../Layouts/Main";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import OrderItem from "../OrderItem/OrderItem";

const OrderReview = () => {
  const [cart, setCart] = useContext(cartContext);

  const handleRemoveItem = (id) => {
    const remaining = cart.filter((product) => product.id !== id);
    setCart(remaining);
    removeFromDb(id);
    toast.warning("item removed", { autoClose: 500 });
  };

  let total = 0;
  for (const product of cart) {
    total = total + product.price * product.quantity;
  }

  const handleorder = () => {
    if (cart.length) {
      setCart([]);
      deleteShoppingCart();
      return toast.success("checkout Completed", { autoClose: 500 });
    } else {
      return toast.error(" nothing to checkout", { autoClose: 500 });
    }
  };
  return (
    <div className="m-10 flex justify-center items-center ">
      <div className="rounded-2xl flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 dark:bg-gray-900 dark:text-gray-100">
        <h2 className="text-xl font-semibold">Your cart</h2>
        <ul className="flex flex-col divide-y divide-gray-700">
          {cart.map((product) => (
            <OrderItem
              key={product.id}
              product={product}
              handleRemoveItem={handleRemoveItem}
            ></OrderItem>
          ))}
        </ul>
        <div className="space-y-1 text-right">
          <p>
            Total amount:
            <span className="font-semibold">$ {total}</span>
          </p>
          <p className="text-sm dark:text-gray-400">
            Not including taxes and shipping costs
          </p>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border rounded-md dark:border-violet-400"
          >
            Back
            <span className="sr-only sm:not-sr-only">to shop</span>
          </button>
          <button
            onClick={handleorder}
            type="button"
            className="px-6 py-2 border rounded-md dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400"
          >
            <span className="sr-only sm:not-sr-only">Continue to</span>Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
