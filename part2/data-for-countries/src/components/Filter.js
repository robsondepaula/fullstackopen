import React from 'react'

const Filter = ({ filterValue, handleFilterChange }) => {
    return (
        <div>
            find countries <input value={filterValue} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter