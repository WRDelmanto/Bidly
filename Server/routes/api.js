import express from 'express';
import User from '../models/user.js';
import Auction from '../models/auction.js';
import Bid from '../models/bid.js';
import mongoose from "mongoose";

const router = express.Router();

// Ping Pong check
router.get('/ping', (req, res) => {
    console.log('Ping request received');
    res.status(200).json({ message: 'pong' });
});

// Signup
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

// Signin
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
            picture: user.picture,
            stats: user.stats
        };

        console.log('User signed in successfully: ', userResponse);
        res.status(200).json(userResponse);
    } catch (error) {
        console.error('Error in signin: ', error);
        res.status(400).json({ message: error.message });
    }
});

// Update User
router.put('/editProfile/:id', async (req, res) => {
    console.log('editProfile request received, info: ', req.params, req.body);

    try {
        const { id } = req.params;
        const { name, email, picture } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        const user = await User.findById(new mongoose.Types.ObjectId(id));

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name;
        user.email = email;
        if (picture !== undefined) {
            user.picture = picture;
        }

        const updatedUser = await user.save();

        console.log('User updated successfully: ', updatedUser);

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user: ', error);
        res.status(400).json({ message: error.message });
    }
});

// Change Password
router.put('/changePassword/:id', async (req, res) => {
    console.log('changePassword request received, info: ', req.body);

    try {
        const { id } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: 'User ID and new password are required' });
        }

        const user = await User.findById(new mongoose.Types.ObjectId(id));

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.password = password;

        const updatedUser = await user.save();

        console.log('Password changed successfully: ', updatedUser);

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error changing password: ', error);
        res.status(400).json({ message: error.message });
    }
});

// Create Auction
router.post('/auction', async (req, res) => {
    console.log('[POST] Auction request received, info:', req.body);

    try {
        const { title, description, seller, images } = req.body;

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

        const auctionData = {
            title,
            description,
            seller
        };

        if (images && Array.isArray(images) && images.length > 0 && images != []) {
            auctionData.images = images;
        }

        const auction = new Auction(auctionData);

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
// Get Auction by ID
router.get('/auction/:id', async (req, res) => {
    console.log('Auction by id fetch request received, info:', req.params.id);

    try {
        const { id } = req.params;

        const auction = await Auction.findById(id)
            .populate({ path: 'highestBid', populate: { path: 'bidder' } });

        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }

        res.status(200).json(auction);
    } catch (error) {
        console.error('Error fetching auction:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Get Auctions by User ID
router.get('/auctions/:id', async (req, res) => {
    console.log('Auctions by id fetch request received, info:', req.params.id);

    try {
        const { id } = req.params;

        const auctions = await Auction.find({ seller: new mongoose.Types.ObjectId(id) })
            .populate({ path: 'highestBid', populate: { path: 'bidder' } });

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
        let auctions = await Auction.aggregate([
            {
                $match: {
                    seller: { $ne: new mongoose.Types.ObjectId(id) },
                    isClosed: false
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'seller',
                    foreignField: '_id',
                    as: 'seller'
                }
            },
            {
                $unwind: '$seller'
            },
            { $sample: { size: 1 } }
        ]);

        if (auctions.length > 0) {
            auctions = await Auction.populate(auctions, { path: 'highestBid', populate: { path: 'bidder' } });
        }

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
        let auctions = await Auction.aggregate([
            {
                $match: {
                    seller: { $ne: new mongoose.Types.ObjectId(id) },
                    isClosed: false
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'seller',
                    foreignField: '_id',
                    as: 'seller'
                }
            },
            {
                $unwind: '$seller'
            },
            { $sample: { size: 50 } }
        ]);

        if (auctions.length > 0) {
            auctions = await Auction.populate(auctions, { path: 'highestBid', populate: { path: 'bidder' } });
        }

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
        let auctions = await Auction.aggregate([
            {
                $match: {
                    seller: { $ne: new mongoose.Types.ObjectId(id) },
                    isClosed: false,
                    $or: [
                        { title: { $regex: new RegExp(searchString, 'i') } },
                        { description: { $regex: new RegExp(searchString, 'i') } }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'seller',
                    foreignField: '_id',
                    as: 'seller'
                }
            },
            {
                $unwind: '$seller'
            },
            {
                $sample: { size: 50 }
            }
        ]);

        if (auctions.length > 0) {
            auctions = await Auction.populate(auctions, { path: 'highestBid', populate: { path: 'bidder' } });
        }

        console.log('Auctions fetched with search string:', auctions.length ? auctions.length : 'No auctions found');

        res.status(200).json(auctions || []);
    } catch (error) {
        console.error('Error fetching auctions:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Place Bid
router.post('/bid', async (req, res) => {
    console.log('[POST] Bid request received, info:', req.body);
    try {
        const { amount, auctionId, userId } = req.body;

        if (!amount) {
            return res.status(400).json({ message: 'Amount is required' });
        }

        if (!auctionId) {
            return res.status(400).json({ message: 'Auction is required' });
        }

        if (!userId) {
            return res.status(400).json({ message: 'Bidder is required' });
        }

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' })
        }

        const auctionExists = await Auction.findById(auctionId)
            .populate({ path: 'highestBid', populate: { path: 'bidder' } });

        if (!auctionExists) {
            return res.status(404).json({ message: 'Auction not found' });
        }

        if (auctionExists.isClosed) {
            return res.status(400).json({ message: 'Auction is closed' });
        }

        const bid = new Bid({
            amount,
            auction: auctionId,
            bidder: userId,
        });

        const newBid = await bid.save();

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $inc: { 'stats.bids': 1 } },
            { new: true }
        );

        console.log('Bid created: ', newBid);
        console.log('User updated: ' + updatedUser)

        if (!auctionExists.highestBid || auctionExists.highestBid.amount < newBid.amount) {
            auctionExists.highestBid = newBid._id;
            const updatedAuction = await auctionExists.save();
            await updatedAuction.populate({ path: 'highestBid', populate: { path: 'bidder' } });
            console.log('Auction updated: ', updatedAuction.title);
            res.status(201).json({
                bid: newBid,
                auction: updatedAuction,
                user: updatedUser
            });
            return;
        }

        res.status(201).json({
            bid: newBid,
            auction: auctionExists,
            user: updatedUser
        });
    } catch (error) {
        console.error('Error creating bid:', error.message);
        res.status(400).json({ message: error.message });
    }
});

// Get Bids by Auction ID
router.get('/bids/:auctionId', async (req, res) => {
    try {
        const { auctionId } = req.params;

        const bids = await Bid.find({ auction: auctionId })
            .sort({ createdAt: -1 })
            .populate('bidder', 'name picture');

        res.status(200).json(bids);
    } catch (error) {
        console.error('Error fetching bids:', error.message);
        res.status(500).json({ message: error.message });
    }
});

export default router;
