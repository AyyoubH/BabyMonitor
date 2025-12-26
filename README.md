# BabyMonitor

A lightweight React Native mobile app built with Expo to monitor your baby's sleep, food intake, and diaper changes.

## Features

- **Food Tracking**: Record feeding times and amounts
- **Sleep Tracking**: Track sleep start and end times
- **Diaper Tracking**: Log diaper changes (pee, poop, or both)
- **Analysis View**: View all records in a filterable grid
- **Local Storage**: All data is stored locally using AsyncStorage

## Technologies Used

- **React Native**: Mobile app framework
- **Expo**: Development platform for easier setup and deployment
- **React Navigation**: Bottom tab navigation
- **AsyncStorage**: Local data persistence
- **Lightweight**: Minimal dependencies for optimal performance

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AyyoubH/BabyMonitor.git
cd BabyMonitor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Running the App

### Android
```bash
npm run android
```

### iOS (macOS only)
```bash
npm run ios
```

### Web
```bash
npm run web
```

For Android/iOS, you can also use the Expo Go app on your phone:
1. Install Expo Go from the App Store or Google Play
2. Scan the QR code shown after running `npm start`

## Usage

### Home Screen
- Tap the **Food** button to record a feeding (enter time and amount)
- Tap the **Sleep** button to track sleep (enter start time, optionally end time)
- Tap the **Diaper** button to log a diaper change (select pee, poop, or both)

### Analysis Screen
- View all your baby's activity records
- Filter by activity type (All, Food, Sleep, Diaper)
- Delete records by tapping the trash icon

## Project Structure

```
BabyMonitor/
├── src/
│   ├── components/
│   │   ├── FoodForm.js
│   │   ├── SleepForm.js
│   │   └── DiaperForm.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   └── AnalysisScreen.js
│   └── utils/
│       └── storage.js
├── assets/
├── App.js
├── app.json
└── package.json
```

## License

MIT

