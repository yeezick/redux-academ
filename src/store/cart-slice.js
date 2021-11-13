import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

// before investigating the following "thunk", please refer to uiSliceNotifcationWithoutThunk.js as an alternative, naive approach one would take to handling this state and api request 

// creating our own action creator "thunk"
// creating a function that immediately returns an async function
// 1. dispatches function
// 2. then creates a funciton to send the request
// 3. calls the request function inside a try-catch block to catch all errors

// redux toolkit is prepared for function nesting for the sake of flow
// if it sees you are dispatching an action that is a function inside of an action object, it will execute it for you and provide the dispatch function automatically
// this pattern is so common that we want to have action creators that can perform side effects and dispatch other actions to reach their reducers

// this approach is for the sake of keeping components lean and contained
export const sendCartdata = (cart) => {

  return async (dispatch) => {
    // 1)
    dispatch(
      // dispatching an update of state to the store prior to  sending the request for accurate status
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    // 2)
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-4cda8-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };

    // 3)
    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Failed to send cart data!",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
