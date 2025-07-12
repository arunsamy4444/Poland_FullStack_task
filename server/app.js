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

app.use(cors(corsOptions)); // Allow all CORS initially
app.options('*', cors(corsOptions)); // Handle preflight

app.use(express.json());

app.get('/', (req, res) => res.send('Backend is up!'));

app.use('/orders', cors(corsOptions), auth, orderRoutes);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));



// // server/app.js
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const auth = require('./middleware/auth');
// const orderRoutes = require('./routes/orders');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors({
//   origin: 'https://poland-full-stack-task.vercel.app',  // ✅ Updated to actual frontend URL
//   credentials: true
// }));

// app.use('/orders', auth, orderRoutes); // ✅ Protect & route

// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
