import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCT } from "../utils/queries";

const ProductPage = () => {
const { productId } = useParams();

const {loading, data } = useQuery(QUERY_PRODUCT, {
    variables: {productId},
});

if (loading) return <div>Loading...</div>;

const product = data.product;

console.log(product)

    return <div>Product Page</div>;
  };
  
  export default ProductPage;
  