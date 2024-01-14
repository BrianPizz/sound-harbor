import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCT } from "../utils/queries";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const { productId } = useParams();

  const { loading: productLoading, data: productData } = useQuery(QUERY_PRODUCT, {
    variables: { productId },
  });

  if (productLoading) return <div>Loading...</div>;

  const product = productData.product;

  return (
    <div className="container mx-auto">
        <div className="my-2">
      <Link to={`/category/${product.category._id}`}>
        Back to category
      </Link>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            className="w-full rounded-lg"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <p className="text-2xl font-bold text-green-600">
              ${product.price.toFixed(2)}
            </p>
            <span className="ml-2 text-gray-500">In Stock</span>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
