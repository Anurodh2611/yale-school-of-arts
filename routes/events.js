import express from 'express';
import Event from '../models/Event.js';
import authMiddleware from '../middleware/auth.js';
import adminOnly from '../middleware/adminOnly.js';

const router = express.Router();

// GET /api/events — public, returns all events sorted by date
router.get('/', async (req, res) => {
    try {
        const events = await Event.find()
            .populate('createdBy', 'username')
            .sort({ date: 1 });
        res.json(events);
    } catch (error) {
        console.error('Events fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// POST /api/events — admin only
router.post('/', authMiddleware, adminOnly, async (req, res) => {
    try {
        const { title, description, date } = req.body;

        if (!title || !description || !date) {
            return res.status(400).json({ error: 'title, description, and date are required' });
        }

        const newEvent = new Event({
            title,
            description,
            date: new Date(date),
            createdBy: req.user.id
        });

        await newEvent.save();
        const populated = await newEvent.populate('createdBy', 'username');
        res.status(201).json(populated);
    } catch (error) {
        console.error('Event creation error:', error);
        res.status(500).json({ error: 'Failed to create event' });
    }
});

export default router;
