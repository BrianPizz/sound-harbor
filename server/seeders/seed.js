const db = require("../config/connection");
const { User, Product, Order, Category, Review, Cart } = require("../models");
const userSeeds = require("./userSeeds.json");
const categorySeeds = require("./categorySeeds.json");
const productSeeds = require("./productSeeds.json");
const cleanDB = require("./cleanDB");
const mongoose = require("mongoose");
require("dotenv").config();

const getRandomQuantity = () => Math.floor(Math.random() * 5) + 1;
const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

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

    // Use the category names to get category IDs
    const productSeedsWithCategoryIds = productSeeds.map((productSeed) => ({
      ...productSeed,
      category: categories.find(
        (category) => category.name === productSeed.category
      )._id,
      _id: new mongoose.Types.ObjectId(),
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

    // Create reviews for products
    for (const product of productSeedsWithCategoryIds) {
      const productReviews = [];
      const productDocument = await Product.findOne({ name: product.name });
      const productId = productDocument._id;
      // Assign random reviews to users
      for (const user of users) {
        const review = {
          user: user._id,
          product: productId,
          comment: `This is a great product!`,
          rating: getRandomRating(),
        };

        productReviews.push(review);
      }

      // Create reviews for the product
      const createdReviews = await Review.create(productReviews);

      console.log(`Product ID (After Reviews): ${product._id}`);
      console.log(`Reviews for Product: ${JSON.stringify(productReviews, null, 2)}`);
      console.log(`Created Reviews: ${JSON.stringify(createdReviews, null, 2)}`);
    

      // Extract the IDs from the created reviews
      const reviewIds = createdReviews.map((review) => review._id);

      // Update the product's reviews array with the review IDs
      await Product.findByIdAndUpdate(productId, {
        $push: { reviews: reviewIds },
      });
    }
  } catch (err) {
    console.error(err);
  } finally {
    await db.close();
  }

  console.log("Seed data inserted successfully!");
});
