import React from 'react'

const notificationStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
}

const errorStyle = {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 16
}

const Notification = ({ message, isError }) => {
    if (message === null) {
        return null
    }

    return (
        <div
            className={isError ? 'error' : 'notification'}
            style={isError ? errorStyle : notificationStyle}>
            {message}
        </div>
    )
}

export default Notification