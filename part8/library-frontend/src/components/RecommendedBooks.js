import React from "react";
import { LOGGED_IN_USER, ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";

const RecommendedBooks = () => {
  const result = useQuery(LOGGED_IN_USER, {
    fetchPolicy: "cache-and-network",
  });
  const all_books = useQuery(ALL_BOOKS);

  if (result.loading || all_books.loading) {
    return <div>loading...</div>;
  }

  if (result.error || all_books.error) {
    return <div>An error occurred</div>;
  }

  const user = result.data.me;

  if (!user) {
    return <div>Please Log in to access this page</div>;
  }

  const books = all_books.data.allBooks.filter((book) =>
    book.genres.includes(user?.favoriteGenre)
  );

  return (
    <div>
      <h3>recommendations</h3>
      <p>books in your favorite genre patterns</p>

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
    </div>
  );
};

export default RecommendedBooks;
