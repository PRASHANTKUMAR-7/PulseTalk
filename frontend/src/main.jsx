import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "stream-chat-react/dist/css/v2/index.css"; //make sure it above index.css
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from "react-router";

//creating querry client to user tenstack
const queryClient = new QueryClient();
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
    
  </StrictMode>,
)
