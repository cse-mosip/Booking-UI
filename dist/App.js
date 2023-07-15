import React from 'react';
import Routes from 'src/navigation/routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'src/redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
    return (React.createElement("div", { className: "App" },
        React.createElement(Provider, { store: store },
            React.createElement(PersistGate, { loading: null, persistor: persistor },
                React.createElement(ToastContainer, { position: "bottom-right", autoClose: 5000, hideProgressBar: false, newestOnTop: false, closeOnClick: true, rtl: false, pauseOnFocusLoss: true, draggable: true, pauseOnHover: true }),
                React.createElement(Routes, null)))));
}
export default App;
//# sourceMappingURL=App.js.map