import React, { useEffect, useState } from "react";
import { loadAuthApp } from "./utils/loadAuthApp";

function App(): JSX.Element {
  const [AuthApp, setAuthApp] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Set a random UID (user1 or user2) in localStorage
    const randomUid = Math.random() < 0.5 ? "user1" : "user2";
    localStorage.setItem("uid", randomUid);
    loadAuthApp()
      .then((authAppModule) => {
        setAuthApp(() => authAppModule.default); // Assuming default export is the root component
      })
      .catch((error) => {
        console.error("Error loading Auth App:", error);
      });
  }, []);

  if (!AuthApp) {
    return <div>Loading Auth App...</div>;
  }

  return (
    <div>
      <h1>Wrapper App</h1>
      <AuthApp />
    </div>
  );
}

export default App;
