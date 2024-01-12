import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORY_PRODUCTS } from "../utils/queries";

const CategoryPage = () => {
  const { categoryId } = useParams();

  const { loading, data } = useQuery(QUERY_CATEGORY_PRODUCTS, {
    variables: { categoryId },
  });

  if (loading) return <div>Loading...</div>;

  const category = data?.category;
  console.log(category)
  const products = category.products || [];


  return (
  <div>
          <h2>{category.name} Category</h2>
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
