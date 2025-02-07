import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import {store, persistor} from './store/store.js';
import App from './App.jsx';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
)
