// Address of the signaling/relay server (server/signal.js).
// On a shared Wi-Fi or hotspot with no internet, use the host machine's LAN IP.
export const SIGNAL_URL = 'ws://192.168.1.10:8080';

// Leave empty for calls on the same local network.
// For calls across different networks, add a STUN/TURN server, e.g.
// [{ urls: 'stun:stun.l.google.com:19302' }]. That requires internet.
export const ICE_SERVERS = [];

// The two logins that share one phone number.
export const PROFILES = ['personal', 'work'];
