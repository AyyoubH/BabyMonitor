#!/bin/bash

# BabyMonitor Setup Script
echo "🍼 Setting up BabyMonitor App..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✓ npm found: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "🚀 To start the app:"
    echo "   npm start          - Start Metro bundler"
    echo "   npm run android    - Run on Android"
    echo "   npm run ios        - Run on iOS (macOS only)"
    echo ""
    echo "📱 Or use Expo Go:"
    echo "   1. Install Expo Go app on your phone"
    echo "   2. Run 'npm start'"
    echo "   3. Scan the QR code with your phone"
    echo ""
else
    echo "❌ Installation failed. Please check the errors above."
    exit 1
fi
