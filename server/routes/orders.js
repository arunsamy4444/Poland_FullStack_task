// routes/orders.js
const express = require('express');
const fs = require('fs');
const router = express.Router();
const jsonToCSV = require('../utils/toCSV'); // At top if not already


router.get('/', (req, res) => {
  const { minWorth, maxWorth } = req.query;
  let orders = JSON.parse(fs.readFileSync('orders.json'));

  if (minWorth || maxWorth) {
    orders = orders.filter(o => {
      const worth = o.orderWorth;
      return (!minWorth || worth >= Number(minWorth)) &&
             (!maxWorth || worth <= Number(maxWorth));
    });
  }

  res.json(orders);
});

router.get('/export', (req, res) => {
  try {
    const orders = JSON.parse(fs.readFileSync('orders.json', 'utf-8'));

    // ✅ Flatten product arrays
    const flattened = orders.map(order => {
      const productIDs = order.products.map(p => p.productID).join(',');
      const productNames = order.products.map(p => p.name).join(',');
      const quantities = order.products.map(p => p.quantity).join(',');

      return {
        orderID: order.orderID,
        productIDs,
        productNames,
        quantities,
        orderWorth: order.orderWorth
      };
    });

    const csv = jsonToCSV(flattened);

    res.header('Content-Type', 'text/csv');
    res.attachment('orders.csv');
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to export CSV' });
  }
});
// router.get('/export', (req, res) => {
//   const orders = JSON.parse(fs.readFileSync('orders.json'));
//   const csv = jsonToCSV(orders);

//   res.header('Content-Type', 'text/csv');
//   res.attachment('orders.csv');
//   res.send(csv);
// });


router.get('/:id', (req, res) => {
  const orders = JSON.parse(fs.readFileSync('orders.json'));
  const order = orders.find(o => o.orderID === req.params.id);

  if (!order) return res.status(404).json({ error: 'Order not found' });

  res.json(order);
});


module.exports = router;
