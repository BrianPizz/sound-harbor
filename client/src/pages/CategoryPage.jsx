import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORY, QUERY_PRODUCTS } from "../utils/queries";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { categoryId } = useParams();

  // Fetch category name
  const { loading: categoryLoading, data: categoryData } = useQuery(
    QUERY_CATEGORY,
    {
      variables: { categoryId },
    }
  );

  // Fetch products in the category
  const { loading: productsLoading, data: productsData } =
    useQuery(QUERY_PRODUCTS);

  if (categoryLoading || productsLoading) return <div>Loading...</div>;

  const category = categoryData.category;
  const products = productsData.products.filter(
    (product) => product.category?._id === categoryId
  );

  return (
    <div className="container mx-auto px-8 mt-3">
      <Link className="text-red-600" to={`/`}>Home</Link>
      <h2 className="text-3xl font-semibold mb-6">{category.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full object-cover mb-4 rounded-md"
              />
              <p className="text-xl font-semibold mb-2">{product.name}</p>
              <p className="text-gray-700">${product.price.toFixed(2)}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Add to Cart
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
