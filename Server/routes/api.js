import express from 'express';
import User from '../models/user.js';
import Auction from '../models/auction.js';
import mongoose from "mongoose";

const router = express.Router();

// Ping Pong endpoint
router.get('/ping', (req, res) => {
    console.log('Ping request received');
    res.status(200).json({ message: 'pong' });
});

// Signup Route
router.post('/signUp', async (req, res) => {
    console.log('Signup request received, info: ', req.body);
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const user = new User({
            name,
            email,
            password
        });

        const newUser = await user.save();

        const userResponse = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            stats: newUser.stats
        };

        console.log('User saved successfully: ', userResponse);

        res.status(201).json(userResponse);
    } catch (error) {
        console.error('Error in signup: ', error);
        res.status(400).json({ message: error.message });
    }
});

// Signin Route
router.post('/signIn', async (req, res) => {
    console.log('Signin request received, info: ', req.body);

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.log('Missing required fields');
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password !== password) {
            console.log('Invalid password for user: ', email);
            return res.status(401).json({ message: 'Invalid password' });
        }

        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            stats: user.stats
        };

        console.log('User signed in successfully: ', userResponse);
        res.status(200).json(userResponse);
    } catch (error) {
        console.error('Error in signin: ', error);
        res.status(400).json({ message: error.message });
    }
});

// Create Auction
router.post('/auction', async (req, res) => {
    console.log('[POST] Auction request received, info:', req.body);

    try {
        const { title, description, seller } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        if (!description) {
            return res.status(400).json({ message: 'Description is required' });
        }

        if (!seller) {
            return res.status(400).json({ message: 'Seller is required' });
        }

        const sellerExists = await User.findById(seller);

        if (!sellerExists) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        const auction = new Auction({
            title,
            description,
            seller
        });

        const newAuction = await auction.save();

        const updatedUser = await User.findByIdAndUpdate(
            seller,
            { $inc: { 'stats.createdAuctions': 1 } },
            { new: true }
        );

        console.log('Auction created:', newAuction);
        console.log('Seller stats updated:', updatedUser);

        res.status(201).json({
            user: updatedUser,
            auction: newAuction
        });
    } catch (error) {
        console.error('Error creating auction:', error.message);
        res.status(400).json({ message: error.message });
    }
});

// Get Auctions by ID
router.get('/auctions/:id', async (req, res) => {
    console.log('Auctions by id fetch request received, info:', req.params.id);

    try {
        const { id } = req.params;

        const auctions = await Auction.find({ seller: id });

        res.status(200).json(auctions || []);
    } catch (error) {
        console.error('Error fetching auctions:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Fetch Auction Feed and Exclude Seller ID
router.get('/feed/:id', async (req, res) => {
    console.log('Feed request received, info:', req.params.id);

    try {
        const { id } = req.params;

        const auctions = await Auction.aggregate([
            {
                $match: {
                    seller: { $ne: id },
                    isClosed: false
                }
            },
            { $sample: { size: 1 } }
        ]);

        console.log('Auction feed fetched:', auctions.length ? auctions[0] : 'No auctions found');

        res.status(200).json(auctions[0] || null);
    } catch (error) {
        console.error('Error fetching auctions:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Fetch Auctions without Search String and Exclude Seller ID
router.get('/emptySearch/:id', async (req, res) => {
    console.log('EmptyString request received, info:', req.params.id);

    try {
        const { id } = req.params;

        const auctions = await Auction.aggregate([
            {
                $match: {
                    seller: { $ne: id },
                    isClosed: false
                }
            },
            { $sample: { size: 50 } }
        ]);

        console.log('Auctions fetched:', auctions.length ? auctions.length : 'No auctions found');

        res.status(200).json(auctions || []);
    } catch (error) {
        console.error('Error fetching auctions:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Fetch Auctions with Search String and Exclude Seller ID
router.get('/search/:id/:searchString', async (req, res) => {
    console.log('Search request received, info:', req.params.id, req.params.searchString);

    try {
        const { id, searchString } = req.params;

        const auctions = await Auction.aggregate([
            {
                $match: {
                    seller: { $ne: id },
                    isClosed: false,
                    $or: [
                        { title: { $regex: new RegExp(searchString, 'i') } },
                        { description: { $regex: new RegExp(searchString, 'i') } }
                    ]
                }
            },
            {
                $sample: { size: 50 }
            }
        ]);

        console.log('Auctions fetched with search string:', auctions.length ? auctions.length : 'No auctions found');

        res.status(200).json(auctions || []);
    } catch (error) {
        console.error('Error fetching auctions:', error.message);
        res.status(500).json({ message: error.message });
    }
});

export default router;
