const express = require("express");
const cors = require("cors");
const app = express();
const mongodb = require("mongodb");
const Nodemailer = require("nodemailer");
const { MongoClient, ServerApiVersion } = require("mongodb");
const Razorpay = require("razorpay");
const axios = require("axios");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const port = 5000;
const uri =
  "mongodb+srv://pooranid13_db_user:j8rmasxDQFMvQIjS@cluster0.je88hko.mongodb.net/?appName=Cluster0";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoClient = new MongoClient(uri, {
  tls: true,
  tlsAllowInvalidCertificates: true,
  serverApi: {
    version: ServerApiVersion.v1,
  },
});

const instance = new Razorpay({
  key_id: "rzp_test_SJSheVuOFMMZr3",
  key_secret: "yZaLpCCbCjW4wZndCJ89V3y0",
});

const connect = async () => {
  try {
    await mongoClient.connect();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
connect().catch(console.error);

app.get("/products", async (req, res) => {
  try {
    const database = mongoClient.db("desibazaar");
    const productsCollection = database.collection("products");
    const products = await productsCollection.find().toArray();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const database = mongoClient.db("desibazaar");
    const productsCollection = database.collection("products");
    const product = await productsCollection.findOne({ pdt_id: id });
    res.json(product);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/product/add-to-cart", async (req, res) => {
  try {
    const { uid, pid } = req.body;
    const database = mongoClient.db("desibazaar");
    const usersCollection = database.collection("users");
    const user = await usersCollection.findOne({ uid: uid });
    if (user) {
      await usersCollection.updateOne({ uid: uid }, { $push: { cart_items: pid } });
      res.json({ message: "Item added to cart successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/product/buy-now', async (req, res) => {
  
    const { uid, pid, price } = req.body;
    const options = {
            amount: price * 100, // amount in the smallest currency unit (e.g., paise for INR)
            currency: 'INR',
            receipt : 'receipt' + Math.random(),
    };
    try{
      const response = await instance.orders.create(options);
      res.status(200).json({
          success: true,
          order: response  
      });
    }catch(error){
      console.error('Error creating order:', error);
      return res.status(500).send('Error creating order');
    }
});

app.post('/product/update_order', async (req, res) => {
    const { uid, pid, payment_id, order_id, signature } = req.body;
    try {
      const database = mongoClient.db("desibazaar");
      const usersCollection = database.collection("users");
      const user = await usersCollection.findOne({ uid: uid }); 
      if (user) {
        await usersCollection.updateOne(
          { uid: uid},
          { $push: { order_items: { pid, payment_id, order_id, signature } } }
        );
        await usersCollection.updateOne(
          { uid: uid },
          { $pull: { cart_items: pid } }
        );
        res.json({ message: "Order updated successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/product/update_orders', async (req, res) => {
    const { uid, pids, payment_id, order_id, signature } = req.body;
    try {
      const database = mongoClient.db("desibazaar");
      const usersCollection = database.collection("users");
      const user = await usersCollection.findOne({ uid: uid }); 
      if (user) {
        await usersCollection.updateOne(
          { uid: uid},
          { $push: { order_items: { $each: pids.map(pid => ({ pid, payment_id, order_id, signature })) } } }
        );
        await usersCollection.updateOne(
          { uid: uid },
          { $pull: { cart_items: { $in: pids } } }
        );
        res.json({ message: "Order updated successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/popular", async (req, res) => {
  try {
    const product_id = ['men_2', 'women_2', 'kids_2', 'home_2', 'access_2', 'men_3', 'women_3', 'kids_3', 'home_3', 'access_3'];
    const database = mongoClient.db("desibazaar");
    const productsCollection = database.collection("products");
    const products = await productsCollection.find({ pdt_id: { $in: product_id } }).toArray();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/myorders", async (req, res) => {
  try {
    const uid = req.query.uid;
    const database = mongoClient.db("desibazaar");
    const usersCollection = database.collection("users");
    const productsCollection = database.collection("products");
    const order_products = await usersCollection.findOne({ uid : uid} , {projection: { order_items: 1, _id: 0 } });
    console.log('Order items 1 ', order_products);
    if (!order_products || order_products.order_items.length === 0) {
      return res.json([]);
    }
    const product_ids = order_products.order_items.map(item => item.pid);
    const products = await productsCollection.find({ pdt_id: { $in: product_ids } }).limit(10).toArray();
    console.log('Order items 2 ', products);
    res.json(products);
    } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/mycart", async (req, res) => {
  try {
    const uid = req.query.uid;
    const database = mongoClient.db("desibazaar");
    const usersCollection = database.collection("users");
    const productsCollection = database.collection("products");
    const cart_product = await usersCollection.findOne({ uid : uid} , {projection: { cart_items: 1, _id: 0 } });
    if (!cart_product || cart_product.cart_items.length === 0) {
      return res.json([]);
    }
    const productIds = cart_product.cart_items;
    const products = await productsCollection.find({ pdt_id: { $in: productIds } }).toArray();
    res.json(products);
    console.log('Cart items ', products);
    } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/recommended", async (req, res) => {
  try {
    const product_id = ['men_1', 'women_1', 'kids_1', 'home_1', 'access_1', 'men_4', 'women_4', 'kids_4', 'home_4', 'access_4'];
    const database = mongoClient.db("desibazaar");
    const productsCollection = database.collection("products");
    const products = await productsCollection.find({ pdt_id: { $in: product_id } }).toArray();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/", async (req, res) => {
  try {
    const uid = req.body.uid;
    const email = req.body.email;
    const displayName = req.body.displayName;
    const photoURL = req.body.photoURL;
    const cart_items = req.body.cart_items;
    const order_items = req.body.order_items;
    const db = mongoClient.db("desibazaar");
    const collection = db.collection("users");
    const existing = await collection.findOne({ uid: uid });
    if (!existing) {
      const result = await collection.insertOne({
        uid,
        email,
        displayName,
        photoURL,
        cart_items,
        order_items,
      });
      res.status(200).json(result);
    } else {
      res.status(200).json({ message: "User data already exists" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/contact", async (req, res) => {
  
  const { name, subject, message, email } = req.body;

  try {

    //   const transporter = Nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "poorani.d13@gmail.com",
    //     pass: "ipmg vybt yzon sacb",
    //   },
    //   tls: {
    //         rejectUnauthorized: false,
    //     },
    // });

    const transporter = Nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "poorani.d13@gmail.com",
        pass: "ipmg vybt yzon sacb",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions1 = {
      from: email,
      to: "poorani.d13@gmail.com",
      subject: `${subject}`,
      text: `${message}`,
    };
    await transporter.sendMail(mailOptions1);
    console.log('Email 1 sent successfully');
    const mailOptions2 = {
      from: "poorani.d13@gmail.com",
      to: email,
      subject: "Re: " + subject,
      text: `Thank you for contacting us. We have received your message and will get back to you shortly.\n\nYour Message:\n${message}`,
    };
    await transporter.sendMail(mailOptions2);
    console.log('Email 2 sent suc cessfully');
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/removefromcart", async (req, res) => {
  try {
    const { uid, pdt_id } = req.body;
    const database = mongoClient.db("desibazaar");  
    const usersCollection = database.collection("users");
    const user = await usersCollection.findOne({ uid: uid });
    if (user) {
      await usersCollection.updateOne(
        { uid: uid },
        { $pull: { cart_items: pdt_id } }
      );
      res.json({ message: "Item removed from cart successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error removing item from cart: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
