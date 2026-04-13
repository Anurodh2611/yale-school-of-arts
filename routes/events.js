import express from 'express';
import Event from '../models/Event.js';
import Application from '../models/Application.js';
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

// ✅ POST /api/events/apply — Student applies to an event
router.post('/apply', authMiddleware, async (req, res) => {
    try {
        const { eventId } = req.body;
        const studentId = req.user.id;

        if (!eventId) {
            return res.status(400).json({ error: 'eventId is required' });
        }

        // Check if event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Check if already applied
        const existingApplication = await Application.findOne({ studentId, eventId });
        if (existingApplication) {
            return res.status(400).json({ error: 'Already applied for this event' });
        }

        const application = new Application({
            studentId,
            eventId
        });

        await application.save();
        res.status(201).json({ message: '✅ Application successful', application });
    } catch (error) {
        console.error('Apply error:', error);
        res.status(500).json({ error: 'Failed to apply for event' });
    }
});

// ✅ GET /api/events/applications — Fetch applied event IDs for logged-in student
router.get('/applications', authMiddleware, async (req, res) => {
    try {
        const studentId = req.user.id;
        const applications = await Application.find({ studentId }).select('eventId');
        const appliedEventIds = applications.map(app => app.eventId);
        res.json(appliedEventIds);
    } catch (error) {
        console.error('Fetch applications error:', error);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
});

router.get('/registrations', authMiddleware, adminOnly, async (req, res) => {
    try {
        const registrations = await Application.find()
            .populate('studentId', 'username email')
            .populate('eventId', 'title date')
            .sort({ createdAt: -1 });

        const formattedRegistrations = registrations.map((registration) => ({
            _id: registration._id,
            appliedAt: registration.appliedAt,
            student: registration.studentId
                ? {
                    _id: registration.studentId._id,
                    username: registration.studentId.username,
                    email: registration.studentId.email
                }
                : null,
            event: registration.eventId
                ? {
                    _id: registration.eventId._id,
                    title: registration.eventId.title,
                    date: registration.eventId.date
                }
                : null
        }));

        res.json(formattedRegistrations);
    } catch (error) {
        console.error('Fetch registrations error:', error);
        res.status(500).json({ error: 'Failed to fetch registrations' });
    }
});

export default router;