const User = require('./user');
const Bid = require('./bid');

class Auction {
    constructor(id, title, description, seller, isClosed = false, highestBid = null) {
        this._id = id;
        this.title = title;
        this.description = description;
        this.seller = seller;
        this.isClosed = isClosed;
        this.highestBid = highestBid;
    }
}

module.exports = Auction; 