import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Random } from "../utils/Random";
import { Copy } from "../icons/Copy";
export function Room() {
    const room = useRef(null);
    const user = useRef(null);
    const wsRef = useRef(null);
    const [generate, setGenerate] = useState(false);
    const [joined, setJoined] = useState(false);
    const navigate = useNavigate();
    const random = Random(6);
    const [randomState, setRandomState] = useState();
    const [copySuccess, setCopySucess] = useState(false);
    useEffect(() => {
        const ws = new WebSocket("wss:///flash-chat-backend-deploy.onrender.com");
        wsRef.current = ws;
        return () => {
            ws.close();
        };
    }, []);
    const join = () => {
        const roomId = room.current?.value;
        const username = user.current?.value;
        if (roomId && username) {
            setJoined(true);
        }
    };
    useEffect(() => {
        if (joined) {
            navigate("/app", { state: { roomId: room.current?.value, username: user.current?.value } });
        }
    }, [joined, navigate]);
    const generateString = () => {
        setGenerate(true);
        setRandomState(random);
    };
    const copyToClipboard = () => {
        if (randomState) {
            navigator.clipboard.writeText(randomState).then(() => {
            });
        }
        setCopySucess(true);
        setTimeout(() => {
            setCopySucess(false);
        }, 2000);
    };
    return (_jsxs("div", { className: "h-screen w-screen bg-black flex justify-center items-center", children: [_jsxs("div", { className: "bg-gradient-to-br bg-black text-white rounded-lg shadow-xl p-8 w-96 border border-gray-600", children: [_jsx("h2", { className: "text-2xl font-bold text-center mb-6", children: "Flash Chat" }), _jsx("div", { className: "flex justify-center mb-4 w-fill", children: _jsx("button", { onClick: generateString, className: "bg-white text-black hover:bg-gray-200 font-normal text-lg py-2 px-6 rounded-lg transition-all shadow-md hover:shadow-lg w-full", children: "Create New Room" }) }), generate && _jsx("div", { className: "flex justify-center mb-1 bg-neutral-900 p-4 rounded-md", children: _jsxs("div", { children: [_jsx("p", { className: "ml-2 text-xs", children: "Room Code" }), _jsxs("div", { className: "flex justify-center", children: [_jsx("p", { className: "mt-2 text-2xl", children: randomState }), _jsx("div", { className: "mt-3 ml-2 cursor-pointer", onClick: copyToClipboard, children: _jsx(Copy, {}) })] })] }) }), _jsx("input", { ref: user, placeholder: "Enter Your Name", className: "w-full bg-black mt-2 text-white rounded-lg p-3 mb-4 placeholder-gray-400 border border-gray-600 focus:ring-1 focus:ring-white" }), _jsx("input", { ref: room, placeholder: "Enter Room Code", className: "w-full bg-black text-white rounded-lg p-3 mb-4 placeholder-gray-400 border border-gray-600 focus:ring-1 focus:ring-white" }), _jsx("div", { className: "flex justify-center", children: _jsx("button", { onClick: join, className: "bg-white text-black hover:bg-gray-200 font-normal py-2 px-6 rounded-lg transition-all shadow-md hover:shadow-lg", children: "Join Room" }) })] }), copySuccess && (_jsx("div", { className: "fixed bottom-4 right-4 bg-black border border-gray-300 text-white pr-12 pl-4 pt-4 pb-4 rounded-lg", children: _jsx("p", { className: "text-xs", children: "Room Code copied to clipboard!" }) }))] }));
}
