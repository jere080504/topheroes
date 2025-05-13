import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Append global styles
const style = document.createElement('style');
style.innerHTML = `
  body {
    background-color: #F5F7FF;
    background-image: url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    background-blend-mode: overlay;
  }
  .game-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(8px);
    transition: all 0.3s ease;
  }
  .game-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(26, 28, 42, 0.15);
  }
  .resource-icon {
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
  }
  .section-tab.active {
    border-bottom: 3px solid #4A67D0;
    color: #4A67D0;
  }
  /* Custom range input styling */
  input[type="range"] {
    -webkit-appearance: none;
    height: 8px;
    background: #d3d3d3;
    border-radius: 8px;
    outline: none;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: #4A67D0;
    border-radius: 50%;
    cursor: pointer;
  }
  .search-input {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' /%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 20px;
    padding-left: 40px;
  }
  .font-heading {
    font-family: 'Montserrat', sans-serif;
  }
  .font-body {
    font-family: 'Roboto', sans-serif;
  }
  .font-ui {
    font-family: 'Poppins', sans-serif;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
