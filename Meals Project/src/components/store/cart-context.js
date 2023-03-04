import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

// const cart-context = () => {
//   return (
//     <div>cart-context</div>
//   )
// }

export default CartContext;
