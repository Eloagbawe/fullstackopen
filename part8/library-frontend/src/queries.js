import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    author {
      name
    }
  }
`
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query findBooksByFilter($genre: String){
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!,
    $genres: [String!]!) {
      addBook(
        title: $title,
        author: $author,
        published: $published
        genres: $genres
      ) {
        ...BookDetails
      }
    }
    ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $birthYear: Int!) {
      editAuthor(
        name: $name,
        setBornTo: $birthYear
      ) {
        name
        born
      }
    }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const LOGGED_IN_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`