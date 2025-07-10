// API Configuration
export const API_URL = 'https://bidly.onrender.com/api'; // Render
// export const API_URL = 'http://10.0.2.2:3000/api'; // Android emulator localhost
// export const API_URL = 'http://localhost:3000/api'; // iOS simulator localhost

// API Endpoints
export const ENDPOINTS = {
    PING: () => `${API_URL}/ping`,
    SIGNUP: () => `${API_URL}/signUp`,
    SIGNIN: () => `${API_URL}/signIn`,
    EDIT_PROFILE: (id) => `${API_URL}/editProfile/${id}`,
    CHANGE_PASSWORD: (id) => `${API_URL}/changePassword/${id}`,
    AUCTION: (id) => `${API_URL}/auction/${id}`,
    CLOSE_AUCTION: (id) => `${API_URL}/auction/close/${id}`,
    AUCTIONS: (id) => `${API_URL}/auctions/${id}`,
    FEED: (id) => `${API_URL}/feed/${id}`,
    EMPTY_SEARCH: (id) => `${API_URL}/emptySearch/${id}`,
    SEARCH: (id, input) => `${API_URL}/search/${id}/${input}`,
    BID: () => `${API_URL}/bid`,
    BIDS: (id) => `${API_URL}/bids/${id}`,
};
