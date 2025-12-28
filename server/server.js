require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// ================= CORS (FINAL FIX) =================
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (Postman, curl, mobile apps)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "https://my-small-web-project-2-frontend.onrender.com"
    ];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options('*', cors());

// ================= MIDDLEWARE =================
app.use(express.json());

// ================= ROUTES =================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ideas', require('./routes/idea'));
app.use('/api/admin', require('./routes/admin'));

// ================= SERVER START =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ================= MONGODB CONNECT =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.error('MongoDB error ❌', err));
