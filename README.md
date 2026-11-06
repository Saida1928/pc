# MyChat (scaffold)

Mobile-only chat, 1:1 voice/video calls and screen share. Phone-number login with no OTP, and two profiles per number (personal and work). No groups, no status updates, no feed.

## Layout

- `App.js`: routes between login and home
- `src/config.js`: signaling URL, ICE servers, profile names
- `src/account.js`: phone login (one account per number) and per-profile endpoint IDs
- `src/signal.js`: WebSocket client for signaling and chat relay
- `src/chatStore.js`: local chat history (AsyncStorage)
- `src/call.js`: WebRTC calls and screen share
- `src/screens/LoginScreen.js`, `src/screens/HomeScreen.js`: UI
- `server/signal.js`: small relay server (WebSocket)

## Run it

1. `npm install`, then `npx expo install --fix` to align native module versions.
2. On a machine on the same Wi-Fi or a phone hotspot: `npm run signal`. Put that machine's LAN IP into `SIGNAL_URL` in `src/config.js`.
3. Build a dev client: `npx expo run:android` (or `run:ios`). `react-native-webrtc` needs native code, so Expo Go won't work.
4. Install on two phones on the same network and log in with different numbers.

## Before you build further: the real limits

- **"No internet" works only on a shared local network.** Phones on the same Wi-Fi or hotspot can chat and call with no internet. Across different networks you need STUN/TURN servers, which means internet. Phone-to-phone with no network at all (Bluetooth or Wi-Fi Direct) is not implemented, and video over Bluetooth isn't realistic.
- **Messages to an offline recipient are dropped.** The relay doesn't store anything. You need a server queue or a local outbox.
- **No OTP means no proof of number ownership.** Anyone can log in as any number. Safer options: bind the account to a device key on first login, and approve new devices from an already-logged-in phone (not by SMS).
- **Screen share:** Android works through MediaProjection, which `react-native-webrtc` supports. iOS needs a ReplayKit broadcast extension, which isn't included. Screen share replaces the camera track, so start the call with video on.
- **Calls in the background** need CallKit (iOS) and ConnectionService (Android). Not included.
- **Not encrypted.** Chat messages pass through the relay in plaintext. Add end-to-end encryption before anyone uses this for real conversations.
- **Personal and work profiles** are separate endpoints with separate chat history on the same phone. They are not a security boundary.
- **Login design:** I read "looks like a normal social flow" as a plain phone-number sign-in screen in a familiar social-app style.
- **Untested:** dependencies weren't installed and the app wasn't run, since this environment has no package network access.
