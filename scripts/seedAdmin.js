/**
 * Seed Script — Creates an admin user in MongoDB.
 * Run once: node scripts/seedAdmin.js
 *
 * Edit ADMIN_EMAIL / ADMIN_PASSWORD below before running.
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const ADMIN_USERNAME = 'admin';
const ADMIN_EMAIL    = 'admin@yale.edu';
const ADMIN_PASSWORD = 'Admin@1234';   // Change this!

async function seed() {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yaledb';

    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected');

    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
        if (existing.role === 'admin') {
            console.log(`ℹ️  Admin user already exists: ${ADMIN_EMAIL}`);
        } else {
            // Upgrade existing user to admin
            existing.role = 'admin';
            await existing.save();
            console.log(`✅ Upgraded existing user to admin: ${ADMIN_EMAIL}`);
        }
        await mongoose.disconnect();
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    const admin = new User({
        username: ADMIN_USERNAME,
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin'
    });

    await admin.save();
    console.log('');
    console.log('🎉 Admin user created successfully!');
    console.log('┌─────────────────────────────┐');
    console.log(`│  Email:    ${ADMIN_EMAIL}  │`);
    console.log(`│  Password: ${ADMIN_PASSWORD}       │`);
    console.log('└─────────────────────────────┘');
    console.log('');

    await mongoose.disconnect();
    console.log('🔌 Disconnected');
}

seed().catch(err => {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
});
