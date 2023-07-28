import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = () => {
  const result = useQuery(ALL_AUTHORS);
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    editAuthor({ variables: { name, birthYear: parseInt(birthYear) } });
    setName("");
    setBirthYear("");
  };
  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <select id="name" onChange={(e) => setName(e.target.value)}>
            {authors.map((a, key) => (
              <option key={key} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="birthYear">Born: </label>
          <input
            name="birthYear"
            id="birthYear"
            type="number"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default Authors;
