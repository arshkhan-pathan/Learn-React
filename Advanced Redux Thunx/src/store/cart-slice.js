import { createSlice } from "@reduxjs/toolkit";

//
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0 },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },

    addItemToCart(state, action) {
      // console.log(action.payload);
      state.totalQuantity++;
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id); //returns object of exisiting item value if item already exists
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
          //this block will execute when we will add item first time in our cart
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const exisitingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      // state.changed = true;
      if (exisitingItem.quantity === 1) {
        // if item quantity is one thenon delete we have to remove it from our items list
        // for removing it from our item list we will use filter function 😊
        state.items = state.items.filter((item) => item.id !== id); // it will return all item states but wont return the item whose id is equal to our givrn id in PAYLOAD
      } else {
        exisitingItem.quantity--;
        exisitingItem.price = exisitingItem.totalPrice - exisitingItem.price;
      }
    },
  },
});

// cart actions THUNKS

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-45246-default-rtdb.firebaseio.com/cart.json"
      );
      const data = await response.json();
      return data;
    };
    const CartData = await fetchData();
    dispatch(cartActions.replaceCart(CartData));
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    console.log("sending");
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-45246-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
    };
    sendRequest();
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice;
