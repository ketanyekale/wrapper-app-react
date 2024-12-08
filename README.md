# Wrapper App React

This project demonstrates how to integrate the `auth-app-react` project as a Git submodule into `wrapper-app-react`. The `auth-app-react` application is included without modifying its original source code.

---

## **Steps to Set Up `wrapper-app-react`**

### **1. Clone `wrapper-app-react`**

Clone the repository:

```bash
git clone https://github.com/ketanyekale/wrapper-app-react.git
cd wrapper-app-react
```

### **2. Add `auth-app-react` as a Git Submodule**

Include the `auth-app-react` repository as a submodule:

```bash
git submodule add https://github.com/ketanyekale/auth-app-react src/auth-app-react
git submodule update --init --recursive
```

This ensures that the `auth-app-react` source code is included without modifying its original repository.

### **3. Install Dependencies**

Install the required dependencies for `wrapper-app-react`:

```bash
npm install
```

### **4. Update `App.tsx`**

Replace the content of `App.tsx` with the following code to use `auth-app-react` as part of the app:

```tsx
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
```

### **5. Start the Application**

Start the development server:

```bash
npm start
```

---

## **How It Works**

1. The `auth-app-react` project is added as a submodule to the `wrapper-app-react` project.
2. The `App.tsx` file dynamically sets a random UID in the local storage and renders the `auth-app-react` application.
3. Both apps share the same local storage and run seamlessly together.

---

## **Notes**

- If you update the `auth-app-react` submodule, ensure you commit the updated submodule reference:
  ```bash
  git submodule update --remote
  git add src/auth-app-react
  git commit -m "Update auth-app-react to the latest commit"
  git push
  ```
- Always run `git submodule update --init --recursive` after cloning the repository to initialize the submodules.
