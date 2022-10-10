const Cart = ({ product }) => {
  const { name, price, quantity } = product;
  return (
    <div className=" ">
      <li className="flex items-start justify-between">
        <h3>
          {name}
          <span className="text-sm dark:text-violet-400">x{quantity}</span>
        </h3>
        <div className="text-right">
          <span className="block">{price * quantity}$</span>
          <span className="text-sm dark:text-gray-400">à $ {price}</span>
        </div>
      </li>
    </div>
  );
};

export default Cart;
