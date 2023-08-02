import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from "@apollo/client";

import { Routes, Route, Link } from 'react-router-dom'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem("library-user-token"));
  }, []);

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button><Link to="/">authors</Link></button>
        <button><Link to="/books">books</Link></button>
        {token ? (
          <>
        <button><Link to="/add_book">add book</Link></button>
        <button onClick={logout}>logout</button>

        </>) : (
          <button><Link to="/login">login</Link></button>
        )}
        
      </div>

      <Routes>
        <Route path="/" element={<Authors token={token}/>}/>
        <Route path="/authors" element={<Authors token={token}/>}/>
        <Route path="/books" element={<Books/>}/>
        <Route path="/add_book" element={<NewBook/>}/>
        <Route path="/login" element={<LoginForm setToken={setToken}/>}/>

      </Routes>
    </div>
  )
}

export default App
