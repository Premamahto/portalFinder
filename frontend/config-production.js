// Production configuration - Auto-detects deployment type

const RENDER_BACKEND_URL = 'https://portalfinder.onrender.com';

const isVercelDeployment = window.location.hostname.includes('vercel.app');
const isNetlifyDeployment = window.location.hostname.includes('netlify.app') || window.location.hostname.includes('netlify.com');
const isRenderDeployment = window.location.hostname.includes('onrender.com');
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Set the backend API base URL
let BACKEND_URL;
if (isVercelDeployment || isNetlifyDeployment) {
  // Separate frontend deployment — point directly to Render backend
  BACKEND_URL = RENDER_BACKEND_URL;
} else {
  // Same-domain (Render full-stack) or localhost — use relative URLs
  BACKEND_URL = window.location.origin;
}

// Expose API config globally so script.js can use it
window.API_CONFIG = {
  STATES_API:  `${BACKEND_URL}/api/states`,
  SEARCH_API:  `${BACKEND_URL}/api/search`,
  CACHE_API:   `${BACKEND_URL}/api/cache`,
  BACKEND_URL: BACKEND_URL
};

window.IS_PRODUCTION = !isLocalhost;

console.log('[CONFIG] Deployment:', isVercelDeployment ? 'Vercel' : isNetlifyDeployment ? 'Netlify' : isRenderDeployment ? 'Render' : 'Localhost');
console.log('[CONFIG] Backend URL:', BACKEND_URL);
