// server/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const auth = require('./middleware/auth');
const orderRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use('/orders', auth, orderRoutes); // ✅ Protect & route

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
