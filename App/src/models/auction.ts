import { User } from "./user";
import { Bid } from "./bid";

export interface Auction {
    _id: string;
    title: string;
    description: string;
    seller: User;
    isClosed: boolean;
    highestBid?: Bid;
}
