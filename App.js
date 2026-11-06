import React, { useEffect, useState } from 'react';
import { loadAccount, setProfile, signOut } from './src/account';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  const [account, setAccount] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadAccount().then((a) => {
      setAccount(a);
      setReady(true);
    });
  }, []);

  if (!ready) return null;
  if (!account) return <LoginScreen onDone={setAccount} />;

  return (
    <HomeScreen
      account={account}
      onSwitch={async (p) => setAccount(await setProfile(account, p))}
      onSignOut={async () => {
        await signOut();
        setAccount(null);
      }}
    />
  );
}
