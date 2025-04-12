import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // StrictMode는 개발 중 중복 호출 체크를 위해 활성화되므로, 필요 시 제거 가능
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();
