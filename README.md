# Current Time ChatGPT App

A simple beginner-friendly ChatGPT app built with the OpenAI Apps SDK that shows the current time when asked.

## What This App Does

This app demonstrates the basics of building ChatGPT apps using the OpenAI Apps SDK. When users ask for the time in ChatGPT, this app will respond with the current date and time.

## Project Structure

```
├── app.json          # App manifest with function definitions
├── index.js          # Main app logic and server
├── package.json      # Dependencies and scripts
└── README.md         # This file
```

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the App

```bash
npm start
```

The app will start on port 3000 (or the PORT environment variable if set).

### 3. Test the App Locally

Check if the app is running:
```bash
curl http://localhost:3000/health
```

### 4. Connect to ChatGPT

To use this app with ChatGPT:

1. Make sure your app is publicly accessible (use ngrok or similar for local testing)
2. Go to ChatGPT and navigate to the Apps section
3. Add a new app and provide your app's URL
4. ChatGPT will now be able to call your app's functions!

## How It Works

### App Manifest (app.json)

The `app.json` file defines your app's metadata and available functions:
- **name**: Display name of your app
- **description**: What your app does
- **functions**: Array of functions ChatGPT can call

### Main Application (index.js)

The `index.js` file contains:
1. **App initialization**: Creates a new App instance from the SDK
2. **Function handler**: Implements the `get_current_time` function that returns the current time
3. **Express server**: Serves the app and handles incoming requests from ChatGPT

### Function Handler

```javascript
app.function('get_current_time', {
  description: 'Get the current date and time',
  handler: async () => {
    // Returns current time information
  }
});
```

## Testing Locally

Use ngrok to expose your local server:

```bash
ngrok http 3000
```

Then use the ngrok URL when configuring your app in ChatGPT.

## Learn More

- [OpenAI Apps SDK Documentation](https://developers.openai.com/apps-sdk/)
- [ChatGPT Apps Overview](https://openai.com/chatgpt/apps)

## Next Steps

Once you understand this basic app, you can:
- Add more functions with different capabilities
- Accept parameters in your functions
- Integrate with external APIs
- Add error handling and validation
- Deploy to a production environment
