import express from 'express';
import User from '../models/user.js';
import Auction from '../models/auction.js';

const router = express.Router();

// Ping Pong endpoint
router.get('/ping', (req, res) => {
    console.log('Ping request received');
    res.status(200).json({ message: 'pong' });
});

// Signup Route
router.post('/signup', async (req, res) => {
    console.log('Signup request received, info:', req.body);
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Create new user
        const user = new User({
            name,
            email,
            password
        });

        // Save user
        const newUser = await user.save();

        // Return user without password
        const userResponse = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            stats: newUser.stats
        };

        res.status(201).json(userResponse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Create Auction Route
router.post('/auction', async (req, res) => {
    console.log('Auction creation request received, info:', req.body);
    try {
        const { title, description, seller } = req.body;

        // Validate required fields
        if (!title) {
            console.log('Title is missing');
            return res.status(400).json({ message: 'Title is required' });
        }
        if (!description) {
            console.log('Description is missing');
            return res.status(400).json({ message: 'Description is required' });
        }
        if (!seller) {
            console.log('Seller is missing');
            return res.status(400).json({ message: 'Seller is required' });
        }

        // Check if seller exists
        const sellerExists = await User.findById(seller);
        if (!sellerExists) {
            console.log('Seller not found');
            return res.status(404).json({ message: 'Seller not found' });
        }

        // Create new auction
        const auction = new Auction({
            title,
            description,
            seller
        });

        // Save auction
        const newAuction = await auction.save();
        console.log('Auction created:', newAuction);

        // Update seller's stats
        await User.findByIdAndUpdate(
            seller,
            { $inc: { 'stats.createdAuctions': 1 } }
        );
        console.log('Seller\'s stats updated');

        res.status(201).json(newAuction);
    } catch (error) {
        console.error('Error creating auction:', error.message);
        res.status(400).json({ message: error.message });
    }
});

export default router; 