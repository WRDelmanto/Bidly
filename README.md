## Project Info
#### # ====================================
#### # App Name:		Bidly – A Minimalist Silent Auction Mobile App
#### # Authors:
- **Fabricio Gardin**  
  - ID: 300380186  
  - Email: gardinf@student.douglascollege.ca
- **William Delmanto**  
  - ID: 300375603  
  - Email: rodriguesdelmaw@student.douglascollege.ca
#### # ====================================

## About
Bidly is a cross-platform mobile application built with React Native, designed for silent auctions. The app enables sellers to list items with images and starting bids, while bidders can browse, place bids, and receive real-time notifications—all within a clean, intuitive interface.

## Initial Setup (Windows)

To start developing this app, you need to follow these steps:

1. Download and install
- [Visual Studio Code](https://code.visualstudio.com/download)
- [GitHub Desktop](https://desktop.github.com/)
- [Node.js](https://nodejs.org/en/)
- [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Clone the existing repository Bidly

## Usage

### Setting up the Environment (Windows)

3. Open Command Prompt (cmd) as administrator
4. Navigate to your project directory:
   ```
   cd path\to\Bidly\App
   ```
5. Install all modules:
   ```
   npm install
   ```
6. Initialize the app:
   ```
   npm run bidly
   ```
7. Finally, scan the QR Code with Expo Go app or press "a" to open you emulator:
8. To test the backend, navigate to path\to\Bidly\Server
   ```
   npm run bidly
   ```

## Technical Details

### Dependencies (Frontend)
- [React Native Async Storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage)
- [React Navigation Native](https://www.npmjs.com/package/@react-navigation/native)
- [Expo](https://expo.dev/)
- [Expo Status Bar](https://docs.expo.dev/versions/latest/sdk/status-bar/)
- [React](https://www.npmjs.com/package/react)
- [React Native](https://reactnative.dev/)
- [React Native Stack](https://www.npmjs.com/package/@react-navigation/native-stack)
- [React Native Gesture handler](https://www.npmjs.com/package/react-native-gesture-handler)
- [React Native Reanimated](https://www.npmjs.com/package/react-native-reanimated)
- [React Native Safe Area Context](https://www.npmjs.com/package/react-native-safe-area-context)
- [React Native Screens](https://www.npmjs.com/package/react-native-screens)
- [React Native Status Bar height](https://www.npmjs.com/package/react-native-status-bar-height)
- [React Native Vector Icons](https://www.npmjs.com/package/react-native-vector-icons)

### Dependencies (Backend)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [mongoose](https://www.npmjs.com/package/mongoose)
