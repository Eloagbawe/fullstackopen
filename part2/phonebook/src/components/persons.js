import React from 'react';

const Persons = ({ filteredNames, deleteName }) => {
    return (
    <ul>
       {filteredNames.map(person => 
          <li key={person.name}>{person.name} {person.number} <button onClick = {() => deleteName(person.id)}>Delete</button></li>
        )}
    </ul>
    // 
    )
  }

export default Persons;
