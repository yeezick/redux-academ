import { useEffect, Fragment } from "react";

// useSelector is used to access a slice's state, dispatch is used to update it
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
// the link between the action creator thunk and this file
import sendCartdata from "./store/cart-slice"


// an inherent problem is that react will trigger the useEffect and send a request to the backend on load/refresh, then reset the user's cart and notification status
// a simple solution to resolve this could be to check if isInitial is true, it will be until we change it. since isInitial is outside of the component, it is created when the body parser first loads it 
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const visibleCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
   
    if (isInitial) {
      isInitial = false;
      return;
    }

    // 
    dispatch(sendCartdata(cart)) 

    // why is dispatch necessary for useEffect dependency again?
    // dispatch is a dependency; safe because redux assures the function will never change, thus never trigger useEffect
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
      <Layout>
        {visibleCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
