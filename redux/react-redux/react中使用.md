

eg:

使用 `async await` 的方式:

```
import React, { Component } from 'react'  
import { connect } from 'react-redux'  
import { createPost } from '../actions/post'

class PostEditForm extends Component {  
    async contributePost = e => {
        e.preventDefault()

        try {
            const result = await this.props.createPost(params)
            // show success message
        } catch (err) {
            // show error tips
        }
    }

    render () {
        return (
            <form onSubmit={this.contributePost}>
                <input name="title"/>
                <textarea name="content"/>
                <button>Create</button>
            </form>
        )
    }
}

export default connect(null, dispatch => {  
    return {
        createPost: params => dispatch(createPost(params))
    }
})(PostEditForm)
```