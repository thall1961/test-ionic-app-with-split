import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import {createRoot} from "react-dom/client";

// ReactDOM.render(<App />, document.getElementById('root'));
const appContainer = document.getElementById('root');
const root = createRoot(appContainer!);
console.log('app container', root);

root.render(<App />);
