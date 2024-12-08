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
