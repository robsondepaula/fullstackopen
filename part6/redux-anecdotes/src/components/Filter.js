import React from 'react'
import { update } from '../reducers/filterReducer'
import { connect } from 'react-redux'


const Filter = (props) => {

    const handleChange = (event) => {
        event.preventDefault()
        const filterValue = event.target.value
        props.update(filterValue)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
    update,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter