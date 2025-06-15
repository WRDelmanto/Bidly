// API Configuration
export const API_URL = 'https://bidly.onrender.com/api'; // Render
// export const API_URL = 'http://10.0.2.2:3000/api'; // Android emulator localhost
// export const API_URL = 'http://localhost:3000/api'; // iOS simulator localhost

// API Endpoints
export const ENDPOINTS = {
    PING: `${API_URL}/ping`,
    SIGNUP: `${API_URL}/signUp`,
    SIGNIN: `${API_URL}/signIn`,
    AUCTION: `${API_URL}/auction`,
    AUCTIONS: `${API_URL}/auctions`,
    FEED: `${API_URL}/feed`,
    EMPTY_SEARCH: `${API_URL}/emptySearch`,
    SEARCH: `${API_URL}/search`,
};
