// utils/fetchOrders.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// const API_KEY = 'YXBwbGljYXRpb24xNjpYeHI1K0MrNVRaOXBaY2lEcnpiQzBETUZROUxrRzFFYXZuMkx2L0RHRXZRdXNkcmF5R0Y3ZnhDMW1nejlmVmZP';
// const BASE_URL = 'https://api.iai-shop.com/webapi';

async function fetchOrders() {
  try {
    const res = await axios.post(
      `${BASE_URL}/orders/orders/search`,
      {
        status: "all",
        limit: 10
      },
      {
        headers: {
          'Authorization': `Basic ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const rawOrders = res.data.orders || [];

    const formatted = rawOrders.map(order => ({
      orderID: order.order_id,
      products: order.products.map(p => ({
        productID: p.product_id,
        quantity: p.quantity
      })),
      orderWorth: order.summary.total_price
    }));

    const filePath = path.join(__dirname, '..', 'orders.json');
    fs.writeFileSync(filePath, JSON.stringify(formatted, null, 2));
    console.log(`✅ ${formatted.length} orders saved to orders.json`);
  } catch (err) {
    console.error('❌ Failed to fetch orders:', err.response?.data || err.message);
  }
}

module.exports = fetchOrders;
