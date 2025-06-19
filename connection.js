import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "trend2",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// ✅ API to handle order submission
app.post("/order", (req, res) => {
  const {
    fullname,
    email,
    phone,
    address,
    payment_method,
    cartData,
    cardDetails,
  } = req.body;

  if (!cartData || cartData.length === 0) {
    return res.status(400).json({ error: "Cart is empty!" });
  }

  // Loop through cart items and insert order details
  const values = cartData.map(({ prod_id, quantity }) => [
    prod_id,
    quantity,
    fullname,
    email,
    phone,
    address,
    payment_method,
    cardDetails?.cardName || null,
    cardDetails?.cardNumber || null,
    cardDetails?.expiry || null,
    cardDetails?.cvv || null,
  ]);

  const query = `INSERT INTO billing (prod_id, quantity, customer_name, email, phone, address, payment_method, card_name, card_number, expiry, cvv) VALUES ?`;

  db.query(query, [values], (err, result) => {
    if (err)
      return res.status(500).json({ error: "Database error: " + err.message });
    res.json({
      message: "Order placed successfully!",
      orderId: result.insertId,
    });
  });
});

// ✅ API to fetch orders with product names
app.get("/orders", (req, res) => {
  const query = `
    SELECT billing.billing_id, billing.prod_id, stock.prod_name, billing.quantity, billing.customer_name, billing.purchase_date, billing.payment_method 
    FROM billing 
    JOIN stock ON billing.prod_id = stock.prod_id;
  `;

  db.query(query, (err, result) => {
    if (err)
      return res.status(500).json({ error: "Database error: " + err.message });
    res.json(result);
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
