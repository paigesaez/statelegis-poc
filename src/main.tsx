import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Vite provides import.meta.env.DEV, but TypeScript may need a type declaration. Add this above if needed:
// declare var import.meta: {
//   env: {
//     DEV: boolean;
//   };
// };

if (import.meta.env.DEV) {
  import('./mocks/browser').then(({ worker }) => {
    worker.start();
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 