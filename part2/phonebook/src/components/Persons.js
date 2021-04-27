import React from 'react'

const Persons = (props) => {
    return (
        <div>
            <label>
                {props.name} {props.number}
            </label>
            <button onClick={props.handleDelete}>
                delete
        </button>
        </div>
    )
}

export default Persons
