import React from 'react';

const Persons = ({ filteredNames }) => {
    return (
    <ul>
       {filteredNames.map(person => 
          <li key={person.name}>{person.name} {person.number}</li>
        )}
    </ul>
    // 
    )
  }

export default Persons;
