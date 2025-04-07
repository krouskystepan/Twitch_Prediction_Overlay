# Twitch Predictions WebSocket Integration

This project allows integration with Twitch's prediction system using WebSockets. It listens to prediction events on Twitch and provides an API to interact with them. It's built with Next.js.

## Features

- WebSocket integration with Twitch to listen to prediction events (`channel.prediction.begin`, `channel.prediction.lock`, `channel.prediction.end`).
- OAuth authentication with Twitch to access the prediction data.
- API endpoints to fetch predictions for a specific broadcaster.

## Requirements

- npm for managing dependencies
- A Twitch Developer account to create an application and get the required credentials

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/Twitch_Prediction_Overlay
   cd Twitch_Prediction_Overlay
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up your `.env` file:

   - Copy `.env.example` to `.env`:
   - Fill in the required values:
     - `TWITCH_CLIENT_ID` and `TWITCH_CLIENT_SECRET` from your Twitch developer app.
     - `TWITCH_REDIRECT_URI` for the OAuth callback (e.g., `http://localhost:3000/auth/callback`).

4. Start the application:

   ```bash
   npm run dev
   ```

   The app will start on `http://localhost:3000`.

## Usage

- Go to `/auth/login` to log in with your Twitch account and authorize the application.
- In `/dev` endpoint you can mock predictions. So you can develop without Twitch Affiliate
- After successful login, the app will redirect to `/predictions/{channelName}` where you can view the predictions for that channel.

## Endpoints

- **GET `/api/auth/login`**: Redirects to Twitch for login and OAuth authorization.
- **GET `/api/auth/callback`**: Callback URL for Twitch OAuth, receives the authorization code and exchanges it for a token.
- **GET `/api/predictions/{channelName}`**: Fetches the current predictions for a specific channel.

## Contributing

We welcome contributions from the community! If you would like to help improve this project, please follow the instructions in the CONTRIBUTING.md (TBD) to get started.

## License

This project is licensed under the MIT License.
