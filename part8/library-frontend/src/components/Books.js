import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = () => {
  const [filter, setFilter] = useState('all');

  const booksByGenre = useQuery(ALL_BOOKS, {
    variables: { genre: filter },
    skip: !filter,
  });
  const all_books = useQuery(ALL_BOOKS, {
    variables: { genre: 'all' }
  })
  const [books, setBooks] = useState(null);

  useEffect(() => {
    if (booksByGenre.data) {
      const data = booksByGenre.data.allBooks;
      setBooks(data);
    }
  }, [booksByGenre.data]);



  if (booksByGenre.loading || all_books.loading) {
    return <div>loading...</div>;
  }

  const genres =  [...new Set(all_books.data.allBooks.map(book => book.genres).flat(1))]

  const filterBooks = (filter) => {
    setFilter(filter)
  };

  return (
    <div>
      <h2>books</h2>
      <p>in genre patterns</p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books?.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "1rem" }}>
        {genres?.map((genre, index) => (
          <button onClick={() => filterBooks(genre)} key={index}>
            {genre}
          </button>
        ))}
        <button onClick={() => filterBooks("all")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
