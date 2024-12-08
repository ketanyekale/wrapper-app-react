import { useEffect } from "react";
import AuthApp from "auth-app-react"; // Import `auth-app-react`

const App = () => {
  useEffect(() => {
    // Set a random UID (user1 or user2) in localStorage
    const randomUid = Math.random() < 0.5 ? "user1" : "user2";
    localStorage.setItem("uid", randomUid);
  }, []);

  return (
    <div>
      {/* Render the auth-app-react */}
      <AuthApp />
    </div>
  );
};

export default App;
