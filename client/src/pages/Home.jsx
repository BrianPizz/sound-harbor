import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../utils/queries";
import Categories from "../components/Categories";
import Auth from "../utils/auth";
import Login from "./LoginPage";

const Home = () => {
  const { loading, data } = useQuery(QUERY_CATEGORIES);
  const categories = data?.categories || [];
  const isLoggedIn = Auth.loggedIn();

  return (
    <div>
      {isLoggedIn ? (
        <div className="flex justify-center">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Categories categories={categories} title="Categories" />
          )}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
