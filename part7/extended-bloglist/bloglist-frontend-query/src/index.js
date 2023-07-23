import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NotificationContextProvider } from './store/notificationContext'
import { AuthContextProvider } from './store/authContext'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </QueryClientProvider>,
  document.getElementById('root')
)
