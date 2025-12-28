require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROUTES =================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ideas', require('./routes/idea'));
app.use('/api/admin', require('./routes/admin'));

// ================= MONGODB CONNECT =================
mongoose.connect(process.env.MONGO_URI)
  
.then(() => {
  console.log('MongoDB connected ✅');
})
.catch((err) => {
  console.error('MongoDB connection failed ❌');
  console.error(err);
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
