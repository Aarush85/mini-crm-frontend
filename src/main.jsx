import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <Router>
    <AuthProvider>
      <Toaster position="top-right" />
      <App />
    </AuthProvider>
  </Router>
);