import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../utils/queries";
import Categories from "../components/Categories";

const Home = () => {
  const { loading, data } = useQuery(QUERY_CATEGORIES);
  const categories = data?.categories || [];

  return (
    <div className="flex justify-center">
      {loading ? (
        <div>Loding...</div>
      ) : (
        <Categories categories={categories} title="Categories" />
      )}
    </div>
  );
};

export default Home;
