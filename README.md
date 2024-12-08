# Wrapper App React

This project integrates the `auth-app-react` application as a dynamically loaded module, allowing both apps to share the same local storage context. Follow the steps below to set up and run the `wrapper-app-react` application.

---

## **Steps to Integrate `auth-app-react`**

### **1. Build `auth-app-react`**

Clone the `auth-app-react` repository:

```bash
git clone https://github.com/ketanyekale/auth-app-react
```

Navigate to the `auth-app-react` directory:

```bash
cd auth-app-react
```

Install dependencies and build the app:

```bash
npm install
npm run build
```

This will generate a `build` folder with static assets.

---

### **2. Include `auth-app-react` Build in `wrapper-app-react`**

Copy the `build` folder of `auth-app-react` into the `public` folder of `wrapper-app-react`:

```bash
cp -r auth-app-react/build wrapper-app-react/public/auth-app
```

The `auth-app-react` assets are now accessible at `/auth-app` when `wrapper-app-react` runs.

---

### **3. Dynamically Load `auth-app-react`**

Create a utility file in `wrapper-app-react`:

```typescript
// src/utils/loadAuthApp.ts

// Declare the global object where auth-app-react components will be exposed
declare global {
  interface Window {
    authApp: any; // Replace `any` with a specific type if you know the structure
  }
}

export function loadAuthApp(): Promise<any> {
  return new Promise((resolve, reject) => {
    // Fetch the manifest file
    fetch("/auth-app/asset-manifest.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load asset-manifest.json");
        }
        return response.json();
      })
      .then((manifest) => {
        // Get the hashed main.js file path
        const mainJsPath = manifest.files["main.js"];
        if (!mainJsPath) {
          throw new Error("main.js not found in asset-manifest.json");
        }

        // Dynamically load the hashed script
        const script = document.createElement("script");
        script.src = `/auth-app${mainJsPath}`;
        script.async = true;
        script.onload = () => {
          if (window.authApp) {
            resolve(window.authApp);
          } else {
            reject(new Error("AuthApp module not found on window."));
          }
        };
        script.onerror = () =>
          reject(new Error(`Failed to load script: ${mainJsPath}`));
        document.body.appendChild(script);
      })
      .catch((error) => reject(error));
  });
}
```

---

### **4. Render `auth-app-react` Components**

Dynamically load and use the `auth-app-react` components in your `wrapper-app-react` app:

```tsx
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
```

---

### **5. Run `wrapper-app-react`**

Start the `wrapper-app-react` app:

```bash
npm start
```

Open the app in your browser. The `auth-app-react` components will load dynamically and share the same local storage context.

---

## **How It Works**

- `auth-app-react` is built and its static assets are placed in the `public` folder of `wrapper-app-react`.
- A utility script dynamically loads the `auth-app-react` components during runtime by reading the `asset-manifest.json` file.
- Both apps share the same local storage, ensuring seamless integration.

---

## Help and Support

Feel free to fork, create [issues](https://github.com/ketanyekale/wrapper-app-react/issues) and raise PR.
