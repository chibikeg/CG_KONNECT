const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const likeRoutes = require('./routes/likeRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const messageRoutes = require('./routes/messageRoutes');
const commentRoutes = require('./routes/commentRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const followRoutes = require('./routes/followRoutes');
const friendshipRoutes = require('./routes/friendshipRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

//Global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/carts', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/conversations', conversationRoutes);
app.use('/api/v1/follows', followRoutes);
app.use('/api/v1/friendships', friendshipRoutes);
app.use('/api/v1/likes', likeRoutes);

//Health check route
app.get('/', (req, res) => {
    res.status(200).json({ 
        success: true,
        message: 'Welcome to CGKONNECT API' });
});

app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ 
        success: true,
        message: 'CGKONNECT API is healthy' });
});

module.exports = app;
