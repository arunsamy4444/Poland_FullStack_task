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

// ✅ Apply CORS globally to all routes and preflight
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight always allowed

app.use(express.json());

app.get('/', (req, res) => res.send('Backend is up!'));

// ✅ Apply CORS BEFORE auth
app.use('/orders', auth, orderRoutes);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
