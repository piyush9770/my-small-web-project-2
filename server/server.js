require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const ideaRoutes = require('./routes/idea');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('DB Connected'))
.catch(err=>console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/ideas', ideaRoutes);

app.listen(5000, ()=>console.log('Server running on 5000'));
