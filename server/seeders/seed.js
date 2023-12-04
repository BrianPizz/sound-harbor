const db = require("../config/connection");
const { User, Product, Order, Category, Review, Cart } = require("../models");
const userSeeds = require("./userSeeds.json");
const categorySeeds = require("./categorySeeds.json");
const productSeeds = require("./productSeeds.json");
const cleanDB = require("./cleanDB");
require("dotenv").config();

db.once("open", async () => {
  try {
    // Clean DB for users, orders, products, and categories
    await cleanDB("User", "users");
    await cleanDB("Order", "orders");
    await cleanDB("Review", "reviews");
    await cleanDB("Product", "products");
    await cleanDB("Category", "categories");

    // Create users
    const users = await User.create(userSeeds);
    console.log(users);

    // Create categories
    const categories = await Category.create(categorySeeds);
    console.log(categories);

    // assign products to category
    const productCategoryMap = [
      { productIndex: 0, categoryIndex: 0 },
      { productIndex: 1, categoryIndex: 1 },
      { productIndex: 2, categoryIndex: 2 },
      { productIndex: 3, categoryIndex: 3 },
      { productIndex: 4, categoryIndex: 4 },
      { productIndex: 5, categoryIndex: 5 },
      { productIndex: 6, categoryIndex: 5 },
      { productIndex: 7, categoryIndex: 5 },
      { productIndex: 8, categoryIndex: 5 },
      { productIndex: 9, categoryIndex: 5 },
    ];

    // Create products
    const products = await Product.create(
      productCategoryMap.map(({ productIndex, categoryIndex }) => ({
        ...productSeeds[productIndex],
        category: categories[categoryIndex]._id
      }))
    );
    console.log(products);

  } catch (err) {
    console.error(err);
  } finally {
    await db.close();
  }

  console.log("Seed data inserted successfully!");
});
