import React from 'react'
import PropTypes from 'prop-types'

const AddBlogForm = ({
    handleAddBlog,
    blogTitle,
    blogAuthor,
    blogUrl,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange
}) => {
    return (
        <form onSubmit={handleAddBlog}>
            <div>
                title: <input
                    type="text"
                    value={blogTitle}
                    name="Title"
                    onChange={handleTitleChange}
                />
            </div>
            <div>
                author: <input
                    type="text"
                    value={blogAuthor}
                    name="Author"
                    onChange={handleAuthorChange}
                />
            </div>
            <div>
                url: <input
                    type="text"
                    value={blogUrl}
                    name="Url"
                    onChange={handleUrlChange}
                />
            </div>
            <div>
                <button type="submit">create</button>
            </div>
        </form>
    )
}

AddBlogForm.propTypes = {
    handleAddBlog: PropTypes.func.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    handleAuthorChange: PropTypes.func.isRequired,
    handleUrlChange: PropTypes.func.isRequired,

    blogTitle: PropTypes.string.isRequired,
    blogAuthor: PropTypes.string.isRequired,
    blogUrl: PropTypes.string.isRequired

}

export default AddBlogForm