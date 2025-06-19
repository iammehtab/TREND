import fs from "fs/promises";
import connection from "./db.js";

try {
  const data = await fs.readFile("./products.json", "utf8");
  const json = JSON.parse(data);
  const products = json.products;

  const sql = `INSERT INTO products (name, current_price, original_price, image_url) VALUES ?`;

  // Convert ₹1899 to 1899.00 as number
  const values = products.map((product) => {
    const priceStr = product.price.replace(/[₹,]/g, "").trim(); // remove ₹ and commas
    const currentPrice = parseFloat(priceStr);
    return [
      product.name,
      currentPrice,
      currentPrice, // using same price for original_price if not available
      product.image,
    ];
  });

  connection.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
    } else {
      console.log(`✅ Inserted ${result.affectedRows} products.`);
    }
    connection.end();
  });
} catch (err) {
  console.error("❌ Failed to insert products:", err);
}
