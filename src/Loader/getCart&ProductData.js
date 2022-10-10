import { getStoredCart } from "../utilities/fakedb";

const fetchProducts = async (pid = null) => {
  const response = await fetch("/products.json");
  const products = await response.json();
  if(pid) {
    return products.find(p => p.id === pid)
  }
  return products
}
const cartAndProductData = async () => {
  const products = await fetchProducts();

  const savedCart = getStoredCart();

  const initialCart = [];

  for (const id in savedCart) {
    const foundProduct = products.find((product) => product.id === id);

    if (foundProduct) {
      const quantity = savedCart[id];

      foundProduct.quantity = quantity;

      initialCart.push(foundProduct);
    }
  }
  return { products, initialCart };
};

export {
  cartAndProductData,
  fetchProducts
}
