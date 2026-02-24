export const addToCart = (item) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const exists = cart.find(p => p.id === item.id);

  if (exists) {
    exists.qty += item.qty;
  } else {
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};
