"use client";
import './globals.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex items-center justify-center">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <div className="w-full max-w-4xl mx-auto px-4">{children}</div>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}