import React from 'react';

const FilterInput = ({filter, handleSearch}) =>{
    return(
        <div>
            <p>find countries <input value = {filter} onChange={handleSearch}/></p>
            
        </div>
    )
}

export default FilterInput;