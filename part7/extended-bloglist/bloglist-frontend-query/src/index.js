import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NotificationContextProvider } from './store/notificationContext'
import { AuthContextProvider } from './store/authContext'

import App from './App'
const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </AuthContextProvider>
  </QueryClientProvider>,
  document.getElementById('root')
)
