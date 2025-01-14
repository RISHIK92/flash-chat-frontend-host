import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App.tsx';
import { Room } from './pages/Room.tsx';
createRoot(document.getElementById('root')).render(_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/room", element: _jsx(Room, {}) }), _jsx(Route, { path: "/app", element: _jsx(App, {}) })] }) }));
