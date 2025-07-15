const express = require('express');
const cors = require('cors');
require('dotenv').config();
const auth = require('./middleware/auth');
const orderRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'https://poland-full-stack-task.vercel.app',
  credentials: true,
};

// ✅ CORS & preflight applied globally
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Must be above auth

app.use(express.json());

app.get('/', (req, res) => res.send('Backend is up!'));

// ✅ Apply route AFTER cors and preflight are handled
app.use('/orders', auth, orderRoutes);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
