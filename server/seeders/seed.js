const db = require("../config/connection");
const { User, Product, Order, Category } = require("../models");
const userSeeds = require("./userSeeds.json");
const categorySeeds = require("./categorySeeds.json");
const productSeeds = require("./productSeeds.json");
const cleanDB = require("./cleanDB");
require("dotenv").config();

const getRandomQuantity = () => Math.floor(Math.random() * 5) + 1;

db.once("open", async () => {
  try {
    // Clean DB for users, orders, products, and categories
    await cleanDB("User", "users");
    await cleanDB("Order", "orders");
    await cleanDB("Product", "products");
    await cleanDB("Category", "categories");

    // Create users
    const users = await User.create(userSeeds);
    console.log(users);

    // Create categories
    const categories = await Category.create(categorySeeds);
    console.log(categories);

    // Use the category names to get category IDs
    const productSeedsWithCategoryIds = productSeeds.map((productSeed) => ({
      ...productSeed,
      category: categories.find(
        (category) => category.name === productSeed.category
      ),
    }));

    await Product.create(
      productSeedsWithCategoryIds.map(({ _id, ...rest }) => rest)
    );

    // Populate users' carts with product IDs
    const productIds = await Product.find().distinct("_id");
    for (const user of users) {
      user.cart = productIds;
      await user.save();
    }

    // Create random orders for users
    for (const user of users) {
      const randomProductIds = productIds.slice(0, 3);

      const orderProducts = randomProductIds.map((productId) => ({
        product: productId,
        quantity: getRandomQuantity(),
      }));

      let totalAmount = 0;
      for (const orderProduct of orderProducts) {
        const product = await Product.findById(orderProduct.product);
        totalAmount += product.price * orderProduct.quantity;
      }

      const order = await Order.create({
        user: user._id,
        products: orderProducts,
        totalAmount,
      });

      user.orders.push(order._id);
      await user.save();
    }
  } catch (err) {
    console.error(err);
  } finally {
    await db.close();
  }

  console.log("Seed data inserted successfully!");
});
