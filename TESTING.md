# BabyMonitor Testing Guide

## Manual Testing Instructions

### Prerequisites
1. Install dependencies: `npm install`
2. Start the development server: `npm start`

### Testing on Android
1. Run `npm run android` or scan the QR code with Expo Go app
2. The app should launch showing the Home screen

### Testing Features

#### Home Screen
- [ ] Verify three buttons are displayed: Food (🍼), Sleep (😴), Diaper (🧷)
- [ ] Verify buttons are properly styled and responsive to touch

#### Food Tracking
1. Tap the "Food" button
2. Verify a modal opens with:
   - Title: "🍼 Food Record"
   - Time field (pre-filled with current time)
   - Amount field (placeholder text)
   - Cancel and Save buttons
3. Enter amount (e.g., "120ml")
4. Tap "Save"
5. Verify success alert appears
6. Verify modal closes

#### Sleep Tracking
1. Tap the "Sleep" button
2. Verify a modal opens with:
   - Title: "😴 Sleep Record"
   - Start Time field (pre-filled with current time)
   - End Time field (optional, with help text)
   - Cancel and Save buttons
3. Test with start time only (leave end time blank)
4. Tap "Save"
5. Verify success alert appears
6. Verify modal closes

#### Diaper Tracking
1. Tap the "Diaper" button
2. Verify a modal opens with:
   - Title: "🧷 Diaper Change"
   - Time field (pre-filled with current time)
   - Three option buttons: Pee (💧), Poop (💩), Both (💧💩)
   - Cancel and Save buttons
3. Select one option (verify it highlights)
4. Tap "Save"
5. Verify success alert appears
6. Verify modal closes

#### Analysis Screen
1. Navigate to "Analysis" tab at the bottom
2. Verify all saved records are displayed in chronological order
3. Verify each record shows:
   - Icon matching the type
   - Activity type
   - Timestamp
   - Details (amount, times, etc.)
   - Delete button (🗑️)
4. Test filter buttons:
   - Tap "All" - verify all records show
   - Tap "🍼 Food" - verify only food records show
   - Tap "😴 Sleep" - verify only sleep records show
   - Tap "🧷 Diaper" - verify only diaper records show
5. Test delete functionality:
   - Tap delete button on a record
   - Verify confirmation alert appears
   - Tap "Delete"
   - Verify record is removed from the list

#### Data Persistence
1. Add several records of different types
2. Close the app completely
3. Reopen the app
4. Navigate to Analysis tab
5. Verify all previous records are still present

### Edge Cases to Test
- [ ] Try saving a food record without entering amount (should show error)
- [ ] Try saving a diaper record without selecting type (should show error)
- [ ] Add many records (10+) and verify scrolling works
- [ ] Test with empty state (no records) - should show "No records yet" message
- [ ] Verify modal can be closed by tapping Cancel

## Expected Behavior

### Data Format
Records should be stored with:
- Unique ID (timestamp-based)
- Type (food/sleep/diaper)
- Timestamp (ISO string)
- Type-specific fields:
  - Food: amount, time
  - Sleep: startTime, endTime
  - Diaper: type (pee/poop/both), time

### Visual Design
- Clean, modern interface with emoji icons
- Color-coded buttons (Food: peach, Sleep: lavender, Diaper: light blue)
- Green accent color (#4CAF50) for active states and headers
- Smooth modal animations
- Responsive card-based layout for records

## Known Limitations
- Time input is text-based (no native time picker for simplicity)
- No edit functionality (records can only be deleted)
- No data export feature
- Local storage only (no cloud sync)
