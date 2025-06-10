import User from '../models/User.js';
import Auction from '../models/auction.js';
import Bid from '../models/bid.js';

const populateDB = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Auction.deleteMany({});
        await Bid.deleteMany({});

        // Create test users using the signup route
        const users = [];
        const testUsers = [
            {
                name: "Test User 1",
                email: "test1@example.com",
                password: "password123"
            },
            {
                name: "Test User 2",
                email: "test2@example.com",
                password: "password456"
            },
            {
                name: "Test User 3",
                email: "test3@example.com",
                password: "password789"
            }
        ];

        for (const userData of testUsers) {
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Failed to create user: ${error.message}`);
            }

            const user = await response.json();
            users.push(user);
        }

        // Create test auctions using the auction creation endpoint
        const auctions = [];
        const testAuctions = [
            {
                title: "Vintage Watch",
                description: "A beautiful vintage watch from the 1950s",
                seller: users[0]._id
            },
            {
                title: "Antique Vase",
                description: "Chinese antique vase from the Ming dynasty",
                seller: users[1]._id
            }
        ];

        for (const auctionData of testAuctions) {
            const response = await fetch('http://localhost:3000/api/auction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(auctionData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Failed to create auction: ${error.message}`);
            }

            const auction = await response.json();
            auctions.push(auction);
        }

        // Create test bids using existing user and auction IDs
        const bids = await Bid.insertMany([
            {
                amount: 150,
                auction: auctions[0]._id, // First auction
                bidder: users[1]._id // Second user bidding
            },
            {
                amount: 200,
                auction: auctions[0]._id, // First auction
                bidder: users[2]._id // Third user bidding
            },
            {
                amount: 600,
                auction: auctions[1]._id, // Second auction
                bidder: users[0]._id // First user bidding
            },
            {
                amount: 700,
                auction: auctions[1]._id, // Second auction
                bidder: users[2]._id // Third user bidding
            }
        ]);

        // Verify bids were created
        if (!bids || bids.length === 0) {
            throw new Error('Failed to create bids');
        }

        // Update auction highest bids
        await Auction.findByIdAndUpdate(auctions[0]._id, { highestBid: bids[1]._id }); // 200 bid
        await Auction.findByIdAndUpdate(auctions[1]._id, { highestBid: bids[3]._id }); // 700 bid

        console.log('Database populated with test data successfully!');
        console.log(`Created ${users.length} users`);
        console.log(`Created ${auctions.length} auctions`);
        console.log(`Created ${bids.length} bids`);
    } catch (error) {
        console.error('Error populating database:', error);
        throw error;
    }
};

export default populateDB;