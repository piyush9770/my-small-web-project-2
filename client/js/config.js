// FIXED: localhost + 127.0.0.1 dono handle
const API =
  (window.location.hostname === "localhost" ||
   window.location.hostname === "127.0.0.1")
    ? "http://localhost:5000/api"
    : "https://my-small-web-project-2-backend.onrender.com/api";
