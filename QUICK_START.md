# Quick Start Guide

## Installation (One-Time Setup)
```bash
npm install
```

## Run the App

### Option 1: Using Expo Go (Recommended for Testing)
```bash
npm start
```
Then:
1. Install "Expo Go" app on your Android phone from Google Play
2. Scan the QR code shown in terminal
3. App will open on your phone

### Option 2: Android Emulator
```bash
npm run android
```
Requires Android Studio and emulator setup.

### Option 3: iOS Simulator (macOS only)
```bash
npm run ios
```
Requires Xcode installation.

## Using the App

### Track Food
1. Tap "🍼 Food" button
2. Enter amount (e.g., "120ml")
3. Adjust time if needed
4. Tap "Save"

### Track Sleep
1. Tap "😴 Sleep" button
2. Start time is pre-filled with current time
3. Leave end time blank (update later) or fill if baby already woke up
4. Tap "Save"

### Track Diaper
1. Tap "🧷 Diaper" button
2. Select: Pee, Poop, or Both
3. Adjust time if needed
4. Tap "Save"

### View History
1. Switch to "Analysis" tab at bottom
2. Use filter buttons to show specific types
3. Tap trash icon to delete a record

## Troubleshooting

### "Metro bundler failed to start"
```bash
# Clear cache and restart
npm start -- --clear
```

### "Unable to resolve module"
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### App won't load on phone
- Ensure phone and computer are on same WiFi network
- Check firewall isn't blocking port 8081
- Try restarting Expo with `npm start`

## File Structure Quick Reference
- `App.js` - Main app entry point
- `src/screens/` - HomeScreen and AnalysisScreen
- `src/components/` - Food, Sleep, Diaper forms
- `src/utils/storage.js` - Data persistence layer

## Key Commands
```bash
npm start          # Start development server
npm run android    # Run on Android
npm run ios        # Run on iOS (macOS only)
```

## Support
See full documentation:
- `README.md` - Complete guide
- `TESTING.md` - Testing checklist
- `PROJECT_SUMMARY.md` - Technical details
