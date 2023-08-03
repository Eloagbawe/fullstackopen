import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS, LOGGED_IN_USER } from "../queries";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [addBook] = useMutation(ADD_BOOK, {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS, variables: { genre: 'all'} }, (data) => {
        if (data && data.allBooks) {
          return { allBooks: data.allBooks.concat(response.data.addBook)}
        }
        return
      })
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const result = useQuery(LOGGED_IN_USER, {
    fetchPolicy: 'cache-and-network'
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  const user = result.data.me;
 
  if (!user) {
    return <div>Please Log in to access this page</div>;
  }


  const submit = async (event) => {
    event.preventDefault();

    console.log("add book...");
    addBook({
      variables: { title, author, published: parseInt(published), genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
