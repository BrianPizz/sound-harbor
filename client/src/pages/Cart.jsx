import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_CART } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../utils/mutations";

const Cart = () => {
  const { loading, data } = useQuery(QUERY_CART);

  if(loading){
    return <div>Loading...</div>
  }

  const cart = data?.cart;

  console.log(cart)

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

  return (<div>
    Cart
  </div>);
};

export default Cart;
