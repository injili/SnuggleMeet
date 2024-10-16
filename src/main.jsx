import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <Auth0Provider
  domain='dev-wddm4b32vawbrco2.us.auth0.com'
  clientId='mBbWPk8Ows7w5LN0aKfyKYwlvHOLgHoL'
  authorizationParams={{ redirect_url: window.location.origin }}>
    <App />
  </Auth0Provider>,
)
