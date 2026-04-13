import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Prevent duplicate applications
applicationSchema.index({ studentId: 1, eventId: 1 }, { unique: true });

export default mongoose.model('Application', applicationSchema);
