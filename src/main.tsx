import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import { Room } from './pages/Room';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Room />} />
      <Route path="/room" element={<Room />} />
      <Route path="/app" element={<App />} />
    </Routes>
  </BrowserRouter>
);
