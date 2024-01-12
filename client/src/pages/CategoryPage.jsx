import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";

const CategoryPage = () => {
  const { categoryId } = useParams();


  const { loading, data } = useQuery(QUERY_PRODUCTS);

  if (loading) return <div>Loading...</div>;


  const products = data.products.filter(
    (product) => product.category?._id === categoryId
  );

  return (
    <div>
      <h2>Products in Category</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <p>{product.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
