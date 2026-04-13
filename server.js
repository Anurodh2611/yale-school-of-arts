import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Vite dev server
    credentials: true
}));
app.use(express.json());

// ✅ MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yaledb';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected');

        // Start server ONLY after DB connects
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });


// ✅ Schema (contact form — existing)
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    query: { type: String, required: true }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);


// ✅ Routes

// Health check
app.get('/', (req, res) => {
    res.send('Yale School of Arts API is running...');
});

// Auth routes
app.use('/auth', authRoutes);

// Events routes
app.use('/api/events', eventRoutes);

// Contact form route
app.post('/contact', async (req, res) => {
    try {
        console.log('📥 Incoming data:', req.body);
        const { name, email, query } = req.body;
        if (!name || !email || !query) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ message: '✅ Data saved successfully' });
    } catch (error) {
        console.error('❌ ERROR:', error);
        res.status(500).json({ error: error.message });
    }
});