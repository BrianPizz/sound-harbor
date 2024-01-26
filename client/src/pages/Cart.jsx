import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_CART } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../utils/mutations";
import { useEffect } from "react";

const Cart = () => {
  // Query logged in user
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);

  const me = userData?.me;
  console.log(me);

  // Query cart with logged in user's id
  const { loading: cartLoading, data: cartData } = useQuery(QUERY_CART, {
    skip: !me, // Skip the query if 'me' is not available
    variables: { userId: me?._id },
  });

  const cart = cartData?.cart;
  console.log(cart);

  const [addToCart] = useMutation(ADD_TO_CART);
  const [removeFromCart] = useMutation(REMOVE_FROM_CART);
  const [clearCart] = useMutation(CLEAR_CART);

  const handleAddToCart = (productId, quantity) => {
    addToCart({
      variables: { productId, quantity },
    });
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart({
      variables: { productId },
    });
  };

  const handleClearCart = () => {
    clearCart();
  };

  return <div>Cart</div>;
};

export default Cart;
