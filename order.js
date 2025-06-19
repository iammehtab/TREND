const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "trend2", // change to your DB name
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("Connected to MySQL DB");
  }
});

app.post("/api/checkout", (req, res) => {
  const { customer_name, email, phone, address, payment_method, cartData } =
    req.body;

  if (!cartData || cartData.length === 0) {
    return res.status(400).send("Cart is empty");
  }

  const insertQuery = `
    INSERT INTO orders 
    (prod_id, product_name, quantity, price, customer_name, email, phone, address, payment_method)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  cartData.forEach((item) => {
    db.query(
      insertQuery,
      [
        item.id || null,
        item.name,
        item.quantity || 1,
        item.currentprice,
        customer_name,
        email,
        phone,
        address,
        payment_method,
      ],
      (err) => {
        if (err) {
          console.error("Insert failed:", err);
        }
      }
    );
  });

  res.status(200).send("Order placed successfully");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
