import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Comprehensive global error handler to suppress all third-party script errors
window.addEventListener('error', (event) => {
  // Suppress generic "Script error" which comes from cross-origin scripts
  if (event.message === 'Script error.' || event.message === 'Script error') {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    return false;
  }

  // Suppress errors from third-party scripts (GTM, analytics, etc.)
  if (event.filename && (
    event.filename.includes('googletagmanager.com') ||
    event.filename.includes('google-analytics.com') ||
    event.filename.includes('analytics') ||
    event.filename.includes('gtm.js') ||
    event.filename === '' // Cross-origin script errors
  )) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    return false;
  }

  // Suppress errors at line 0, column 0 (generic cross-origin errors)
  if (event.lineno === 0 && event.colno === 0) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    return false;
  }
}, true); // Use capture phase to catch errors before they bubble

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  // Only log in development, suppress in production
  if (import.meta.env.DEV) {
    console.warn('Unhandled promise rejection:', event.reason);
  }
  event.preventDefault();
  return false;
});

// Override console.error to filter out known third-party errors
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  const message = args[0]?.toString() || '';
  
  // Filter out known third-party error messages
  if (
    message.includes('Script error') ||
    message.includes('googletagmanager') ||
    message.includes('ERR_BLOCKED_BY_CLIENT') ||
    message.includes('Failed to load resource')
  ) {
    return; // Suppress these errors
  }
  
  // Pass through other errors
  originalConsoleError.apply(console, args);
};

createRoot(document.getElementById("root")!).render(<App />);
