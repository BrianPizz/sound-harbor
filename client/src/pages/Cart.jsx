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

  return (
    <div>
      {cartLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-sky-600">
          <div className="m-auto rounded-lg py-3 md:w-1/2">
            <div className="flex">
              <p className="bg-sky-700 text-white text-2xl px-3 py-2 rounded-tl-lg w-1/4">
                Your cart
              </p>
              <p className="bg-sky-700 text-white px-3 py-2 w-1/4 font-thin">
                Product
              </p>
              <p className="bg-sky-700 text-white px-3 py-2 w-1/4 text-center font-thin">
                Quantity
              </p>
              <p className="bg-sky-700 text-white px-3 py-2 rounded-tr-lg w-1/4 text-center font-thin">
                Price
              </p>
            </div>
            {cartData?.cart.products.map((product) => (
              <div
                key={product.product._id}
                className="py-3 flex justify-between border border-slate-200 bg-white"
              >
                <div
                  className="w-1/4 h-40 mx-3"
                  style={{
                    backgroundImage: `url('${product.product.image}')`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="w-1/4 mt-3 text-lg">
                  <p>{product.product.name}</p>
                </div>
                <div className="w-1/4 text-center mt-3 text-lg font-light">
                  <p>{product.quantity}</p>
                </div>
                <div className="w-1/4">
                  <p className="text-center mt-3 text-lg font-light">
                    $
                    {product.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            ))}
            <p className="bg-white px-3 py-2 rounded-b-lg">
              Total Amount: $
              {cartData?.cart.totalAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
