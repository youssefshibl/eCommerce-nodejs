const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Category = require("../models/Categories");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Address = require("../models/Address");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const PaymentType = require("../models/PaymentType");

const delete_old_documents = true;

mongoose
  .connect(`mongodb://${process.env.MONGO_IP}:27017/test`)
  .then(async () => {
    console.log("connected");
    // delete all documents in all collections
    if (delete_old_documents) {
      try {
        // get all collections
        let collections = await mongoose.connection.db.listCollections();
        collections = await collections.toArray();
        for (let i = 0; i < collections.length; i++) {
          const collection = collections[i];
          const delete_collection = await mongoose.connection.db
            .collection(collection.name)
            .deleteMany({});
          if (delete_collection.acknowledged) {
            console.log(
              `all documents in collection ${collection.name} deleted`
            );
          }
        }
      } catch (error) {
        console.log(error);
        return;
      }
    }

    await seed();
  })
  .catch((err) => {
    console.log(err);
  });

async function seed() {
  // add users
  console.log("+ adding users")
  let users = await addusers(10);


  // add addresses for each user
  console.log("+ adding addresses")
  for (let i = 0; i < users.length; i++) {
    let addresses = await addaddresses(2, users[i]);
    users[i].addresses = addresses;
  }


  // add categories
  console.log("+ adding categories")
  let categories = await addcategories(4);


  // add products for each category
  console.log("+ adding products")
  let products = [];
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    products.push(...(await addproducts(10, category)));
  }


  // add products to cart for user
  console.log("+ adding products to cart")
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < products.length / 4; j++) {
      await addproduct_to_cart(users[i], products[j]);
    }
  }


  // add payment type
  console.log("+ adding payment type")
  let payment_type = await addpaymenttype();

  // make order for each user
  console.log("+ adding orders with payment for every order")
  let orders = [];
  for (let i = 0; i < 5; i++) {
    const user = users[i];
    const cart = await Cart.findOne({ user_id: user._id }).populate(
      "products.product_id"
    );
    if (cart) {
      let amount = cart.products.reduce((acc, product) => {
        return acc + product.quantity * product.product_id.price;
      }, 0);
      // make payment
      let payment = new Payment({
        user_id: user._id,
        payment_type: payment_type,
        amount: amount,
        status: "paid",
      });
      await payment.save();

      const order = new Order({
        user_id: user._id,
        products: cart.products,
        payment: payment,
        address: user.addresses[0],
      });
      await order.save();
      cart.products = [];
      await cart.save();
      orders.push(order);
    }
  }
  console.log("------------------- done -----------------");
  // close connection
  mongoose.connection.close();
}

async function addusers(n) {
  let users = [];
  for (let i = 0; i < n; i++) {
    const newUser = new User({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      passwordHash: bcrypt.hashSync("test", 10),
      email_verify: true,
      isAdmin: true,
    });
    await newUser.save();
    users.push(newUser);
  }
  return users;
}

async function addaddresses(n, user) {
  let addresses = [];
  for (let i = 0; i < n; i++) {
    const newAddress = new Address({
      user_id: user._id,
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      postalCode: faker.location.zipCode(),
      country: faker.location.country(),
    });
    await newAddress.save();
    addresses.push(newAddress);
  }
  return addresses;
}

async function addcategories(n) {
  let categories = [];
  for (let i = 0; i < n; i++) {
    const newCategory = new Category({
      name: faker.commerce.department(),
      description: faker.commerce.productDescription(),
      image: faker.image.avatar(),
    });
    await newCategory.save();
    categories.push(newCategory);
  }
  return categories;
}

async function addproducts(n, category) {
  let products = [];
  for (let i = 0; i < n; i++) {
    const newProduct = new Product({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      image: faker.image.avatar(),
      price: faker.commerce.price(),
      category: category,
    });
    await newProduct.save();
    products.push(newProduct);
  }
  return products;
}

async function addproduct_to_cart(user, product) {
  let cart = await Cart.findOne({ user_id: user._id });
  product = await Product.findOne({ _id: product._id });
  if (!cart) {
    cart = new Cart({
      user_id: user._id,
      products: [{ product_id: product._id, quantity: 1 }],
    });
  } else {
    let product_index = cart.products.findIndex((p) => {
      return p.product_id.toString() === product._id.toString();
    });
    if (product_index === -1) {
      cart.products.push({ product_id: product._id, quantity: 1 });
    } else {
      cart.products[product_index].quantity++;
    }
  }

  await cart.save();
  return cart;
}

async function addpaymenttype() {
  let payment_type = new PaymentType({
    method: "Cash on Delivery",
    description: "Pay when you receive the product",
    status: "active",
  });
  await payment_type.save();
  return payment_type;
}
