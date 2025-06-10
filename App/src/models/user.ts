export interface User {
    _id: string;
    name: string;
    email: string;
    picture?: string;
    stats: {
        createdAuctions: number;
        bids: number;
        wonAuctions: number;
    };
}
