const User = require('./user');
const Auction = require('./auction');

class Bid {
    constructor(id, amount, auction, bidder) {
        this._id = id;
        this.amount = amount;
        this.auction = auction;
        this.bidder = bidder;
    }
}

module.exports = Bid; 