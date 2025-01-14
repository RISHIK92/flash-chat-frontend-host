import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import './App.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Light } from './icons/Light';
import { Dark } from './icons/Dark';
import { Exit } from './icons/Exit';
import { Copy } from './icons/Copy';
function App() {
    const location = useLocation();
    const roomId = location.state?.roomId;
    const username = location.state?.username;
    const [darkMode, setDarkMode] = useState(true);
    const [userTyping, setUserTyping] = useState(null);
    const [m, setM] = useState([]);
    const wsRef = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const [randomState, setRandomState] = useState();
    const [copySuccess, setCopySucess] = useState(false);
    useEffect(() => {
        const ws = new WebSocket("wss:///flash-chat-backend-deploy.onrender.com");
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.username && data.message) {
                setM((prevMessages) => [...prevMessages, { status: data.status, username: data.username, message: data.message }]);
            }
            if (data.status === "typing") {
                setUserTyping(data.username);
                setTimeout(() => {
                    setUserTyping(null);
                }, 1500);
            }
        };
        wsRef.current = ws;
        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "join",
                payload: {
                    roomId: roomId,
                    username: username
                }
            }));
        };
        return () => {
            ws.close();
        };
    }, [roomId, username]);
    const handleTyping = () => {
        if (inputRef.current && wsRef.current) {
            wsRef.current.send(JSON.stringify({
                type: "typing",
                payload: { roomId, username },
            }));
        }
    };
    const send = () => {
        if (inputRef.current && wsRef.current) {
            const mg = inputRef.current?.value;
            wsRef.current?.send(JSON.stringify({
                type: "chat",
                payload: {
                    roomId: roomId,
                    message: mg,
                    username: username,
                },
            }));
            inputRef.current.value = '';
        }
    };
    const copyToClipboard = () => {
        setRandomState(roomId);
        if (randomState) {
            navigator.clipboard.writeText(randomState).then(() => {
            });
        }
        setCopySucess(true);
        setTimeout(() => {
            setCopySucess(false);
        }, 2000);
    };
    return (_jsxs("div", { className: `h-screen ${darkMode ? 'bg-black' : 'bg-gray-100'} flex flex-col transition-all duration-300`, children: [_jsxs("div", { className: "flex justify-between items-center p-4", children: [_jsx("h1", { className: `text-xl font-bold ${darkMode ? 'text-white' : 'text-black'}`, children: "Chat Room" }), _jsxs("div", { className: `flex ${darkMode ? "bg-black" : "text-white"} w-46 mr-[64rem] p-3 rounded-lg border`, children: [_jsx("p", { className: `${darkMode ? "text-white" : "text-black"} mr-2`, children: "Room Code:" }), _jsx("div", { className: `${darkMode ? "text-white" : "text-black"}`, children: roomId }), _jsx("div", { className: `${darkMode ? "text-neutral-400" : "text-black"} ml-2`, onClick: copyToClipboard, children: _jsx(Copy, {}) })] }), _jsx("div", { className: "fixed top-4 right-4", children: _jsx("button", { onClick: () => setDarkMode(!darkMode), className: `p-2 ${darkMode ? 'bg-black border border-neutral-800 hover:bg-neutral-900' : 'bg-white hover:bg-neutral-100'} rounded-md transition-all duration-300`, children: darkMode ? _jsx(Dark, {}) : _jsx(Light, {}) }) })] }), _jsx("div", { className: "flex-1 overflow-y-auto p-4 space-y-2 m-2", children: m.map((message, index) => (_jsx("div", { className: `m-2 ${message.status === "sent" ? "flex justify-end" : "flex justify-start"}`, children: _jsxs("div", { children: [_jsx("div", { className: `${message.status === "sent" ? "flex justify-end" : "flex justify-start"}`, children: _jsx("p", { className: `text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-600"} mb-1`, children: message.username }) }), _jsx("div", { className: `rounded-md pr-3 pl-3 pt-1 pb-1 mb-4 max-w-xs w-fit ${message.status === "sent" ? darkMode ? "bg-white text-black border border-white" : "bg-black text-white border border-neutral-800" : darkMode ? "bg-black text-white border border-neutral-800" : "bg-white text-black border border-white"} shadow-lg transition-all duration-300`, children: _jsx("p", { className: "text-lg", children: message.message }) })] }) }, index))) }), _jsx("div", { className: 'flex justify-center', children: userTyping && _jsxs("p", { className: darkMode ? "text-white" : "text-black", children: [userTyping, " Typing..."] }) }), _jsx("div", { className: `w-full ${darkMode ? "bg-black" : "bg-gray-100"} flex justify-center items-center p-2 xs:p-4`, children: _jsxs("div", { className: `w-full sm:w-2/4 mr-6 xs:mr-4 ${darkMode ? "bg-black" : "bg-gray-100"} border ${darkMode ? "border-neutral-600" : "border-neutral-300"} p-3 xs:p-4 rounded-lg shadow-lg flex items-center space-x-4`, children: [_jsx("input", { ref: inputRef, className: `flex-1 ${darkMode ? "bg-black text-white placeholder-neutral-400" : "bg-gray-100 text-black placeholder-neutral-600"} rounded-md xs:rounded-lg p-1 xs:p-3 outline-none border ${darkMode ? "border-neutral-600" : "border-neutral-300"} focus:ring-1 focus:ring-white`, type: "text", placeholder: "Type a message...", onChange: handleTyping }), _jsx("button", { className: `font-semibold px-2 py-1 xs:px-4 xs:py-2 rounded-lg ${darkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`, onClick: send, children: "Send" })] }) }), _jsx("div", { className: "fixed bottom-0 right-0 sm:bottom-4 sm:right-4", children: _jsx("button", { className: `rounded-full ${darkMode ? 'text-white' : 'text-black'} transition-all duration-30`, onClick: () => {
                        if (wsRef.current) {
                            wsRef.current.close();
                        }
                        navigate("/room");
                    }, children: _jsx(Exit, {}) }) }), copySuccess && (_jsx("div", { className: "fixed bottom-4 right-4 bg-black border border-gray-300 text-white pr-12 pl-4 pt-4 pb-4 rounded-lg", children: _jsx("p", { className: "text-xs", children: "Room Code copied to clipboard!" }) }))] }));
}
export default App;
