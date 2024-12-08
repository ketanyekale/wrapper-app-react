import { useEffect } from "react";

import AuthApp from "./auth-app-react/src/App";

function App(): JSX.Element {
  useEffect(() => {
    // Set a random UID (user1 or user2) in localStorage
    const randomUid = Math.random() < 0.5 ? "user1" : "user2";
    localStorage.setItem("uid", randomUid);
  }, []);

  return <AuthApp />;
}

export default App;
