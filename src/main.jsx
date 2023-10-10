import React from 'react'
import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from './features/store.js';
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.scss'
import Loading from './scenes/loading/loading.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate loading={<Loading />} persistor={persistStore(store)} >
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
