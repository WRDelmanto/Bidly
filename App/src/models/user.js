class User {
    constructor(id, name, email, picture = null, stats = { createdAuctions: 0, bids: 0, wonAuctions: 0 }) {
        this._id = id;
        this.name = name;
        this.email = email;
        this.picture = picture;
        this.stats = stats;
    }
}

module.exports = User; 