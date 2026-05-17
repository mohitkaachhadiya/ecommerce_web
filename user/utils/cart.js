export const normalizeCartItems = (cart = []) =>
  cart.map((item) => ({
    ...item.product,
    qty: item.quantity,
    _id: item._id,
  }));

export const getCartTotal = (cartItems = []) =>
  cartItems.reduce((total, item) => total + item.proPrice * (item.qty || 1), 0);
