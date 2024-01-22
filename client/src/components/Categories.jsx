import { Link } from "react-router-dom";

const Categories = ({ categories, title }) => {
  if (!categories.length) {
    return <p>No Categories</p>;
  }

  return (
    <div className="w-3/4 mt-6 py-2">
      <p className="text-2xl font-semibold text-center">{title}</p>
      <div className="flex justify-between px-2 mt-4">
        {categories.map((category) => (
          <button key={category._id} className="p-2 transition-transform transform hover:scale-105 hover:bg-blue-600 hover:text-white rounded-md">
            <Link to={`/category/${category._id}`}>{category.name}</Link>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
