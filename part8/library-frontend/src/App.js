import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import RecommendedBooks from './components/RecommendedBooks'
import { useApolloClient, useSubscription } from "@apollo/client"
import { BOOK_ADDED, ALL_BOOKS } from './queries'

import { Routes, Route, Link } from 'react-router-dom'

export const updateCache = (cache, query, bookAdded) => {
  // helper that is used to eliminate saving same book twice
  const uniqByTitle = (books) => {
    let seen = new Set()
    return books.filter((item) => {
      let title = item.title
      return seen.has(title) ? false : seen.add(title)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(bookAdded)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      window.alert(`A new book titled ${addedBook.title} by ${addedBook.author.name} added!`)
      updateCache(client.cache, {query: ALL_BOOKS, variables: { genre: 'all' }}, addedBook)
    }
  })

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
        <button><Link to="/recommend">recommend</Link></button>

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
        <Route path="/recommend" element={<RecommendedBooks/>}/>
      </Routes>
    </div>
  )
}

export default App
