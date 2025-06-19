import express from "express";
import db from "./db.js";

const router = express.Router();

router.post("/order", async (req, res) => {
  try {
    const {
      fullname,
      email,
      phone,
      address,
      payment_method,
      cartData,
      cardDetails,
    } = req.body;

    if (!cartData || !Array.isArray(cartData) || cartData.length === 0) {
      return res.status(400).json({ message: "Cart is empty or invalid!" });
    }

    const totalAmount = cartData.reduce(
      (sum, item) =>
        sum + parseFloat(item.currentprice) * (parseInt(item.quantity) || 1),
      0
    );

    // Insert customer
    const [customerResult] = await db
      .promise()
      .query(
        "INSERT INTO customers (cust_name, email, phone, address) VALUES (?, ?, ?, ?)",
        [fullname, email, phone, address]
      );
    const customerId = customerResult.insertId;

    // Insert order
    const orderDate = new Date();
    const [orderResult] = await db
      .promise()
      .query(
        "INSERT INTO myorders (customer_id, order_date, total_amount, payment_method, status) VALUES (?, ?, ?, ?, ?)",
        [customerId, orderDate, totalAmount, payment_method, "Pending"]
      );

    const orderId = orderResult.insertId;

    // Prepare order items (validate ids and quantity)
    const items = cartData.map((item) => {
      const prodId = parseInt(item.id);
      const quantity = parseInt(item.quantity) || 1;
      if (!prodId)
        throw new Error("Invalid product ID: " + JSON.stringify(item));
      return [orderId, prodId, quantity];
    });

    await db
      .promise()
      .query(
        "INSERT INTO myorder_items (order_id, prod_id, quantity) VALUES ?",
        [items]
      );
    console.log("Items to insert:", items);
    res.status(200).json({ message: "Order placed successfully!" });
  } catch (err) {
    console.error("ORDER ERROR:", err);

    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        message: "Some items in your cart are invalid or no longer available.",
      });
    }

    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
});

export default router;
