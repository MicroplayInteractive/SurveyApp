import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import { Provider } from 'react-redux';
import { store } from './store/store';
import axios from "axios"
import AuthService from './services/AuthService';
import { socket } from './scripts/socket';

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = AuthService.GetToken();

declare global {
    interface Window {GetSocketRooms: any;}
}

window.GetSocketRooms = () => {
    socket.emit("GET_SOCKET_GROUPS", (e) => {
        console.log(e);
    });
};

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/app" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    </Provider>
);

reportWebVitals();