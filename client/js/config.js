// Auto detect environment
const API = window.location.hostname === "localhost"
  ? "http://localhost:5000/api"
  : "https://my-small-web-project-2-backend.onrender.com/api";
