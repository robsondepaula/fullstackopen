import React from 'react'

const Country = ({ name, handleShowDetails }) => {
    return (
        <div>
            <label>
                {name}
            </label>
            <button onClick={handleShowDetails}>
                show
            </button>
        </div>
    )
}

export default Country