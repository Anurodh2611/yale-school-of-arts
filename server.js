import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/contactdb';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected');

        // Start server ONLY after DB connects
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
    });


// ✅ Schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    query: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);


// ✅ Routes

// Auth routes
app.use('/auth', authRoutes);

// Health check (optional but useful)
app.get('/', (req, res) => {
    res.send('API is running...');
});


// Contact form route
app.post('/contact', async (req, res) => {
    try {
        console.log('📥 Incoming data:', req.body);

        // Basic validation
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