import { User } from "./user";
import { Auction } from "./auction";

export interface Bid {
    _id: string;
    amount: number;
    auction: Auction;
    bidder: User;
}
