import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { hashPassword } from './utils/passwordUtils.js';
import User from './models/User.js';

// Load environment variables
dotenv.config();

const createAdminUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Admin user details - 
        const adminData = {
            name: 'Admin User',
            email: 'admin@example.com',
            phone: '03001234567',
            password: 'admin123',
            role: 'admin'
        };

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminData.email });
        if (existingAdmin) {
            console.log('⚠️  Admin user already exists with email:', adminData.email);
            console.log('✨ You can login with this email and your password');
            process.exit(0);
        }

        // Hash the password
        const hashedPassword = await hashPassword(adminData.password);

        // Create admin user
        const admin = new User({
            name: adminData.name,
            email: adminData.email,
            phone: adminData.phone,
            password: hashedPassword,
            role: 'admin'
        });

        await admin.save();

        console.log('\n🎉 Admin account created successfully!\n');
        console.log('📧 Email:', adminData.email);
        console.log('🔑 Password:', adminData.password);
        console.log('👑 Role: Admin\n');
        console.log('⚠️  IMPORTANT: Change the password after first login!\n');
        console.log('✨ You can now login at: https://saylani-donation-zakat-system.vercel.app/login\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin user:', error.message);
        process.exit(1);
    }
};

createAdminUser();
