import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    const notificationStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification