import React from 'react'

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

export default AddBlogForm