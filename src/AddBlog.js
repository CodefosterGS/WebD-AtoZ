import React, { useEffect, useState } from 'react'
import { TextField, Button, Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';


function AddBlog() {

    const [title, setTitle] = useState("");
    const [publisher, setPublisher] = useState("");
    const [text, setText] = useState("");
    const [success, setSuccess] = useState(false);

    const postBlog = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, publisher: publisher, text: text })
        };
        fetch('https://cfsession.herokuapp.com/blogs', requestOptions)
            .then(response => response.json());
        setSuccess(true)
        setTitle('')
        setPublisher('')
        setText('')
        setTimeout(() => setSuccess(false), 2000)
    }

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }
    const handlePublisher = (event) => {
        setPublisher(event.target.value)
    }
    const handleText = (event) => {
        setText(event.target.value)
    }

    return (
        <div>
            <Typography variant="h3" gutterBottom style={{ fontSize: '24px', fontStyle: 'italics' }}>
                Add Blog
            </Typography>
            <form noValidate
                autoComplete="off"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <div style={{ margin: '10px' }} />
                <TextField id="outlined-basic" style={{ width: '800px' }} value={title} label="Title" variant="outlined" onChange={handleTitle} />

                <div style={{ margin: '10px' }} />
                <TextField id="outlined-basic" style={{ width: '800px' }} value={publisher} label="Publisher" variant="outlined" onChange={handlePublisher} />

                <div style={{ margin: '10px' }} />
                <TextField id="outlined-basic" style={{ width: '800px' }} value={text} label="Article" multiline
                    rows={4} variant="outlined" onChange={handleText} />

                <div style={{ margin: '10px' }} />

                <Button variant="contained" color="primary" disabled={(title.length < 1) || (text.length < 1) || (publisher.length < 1)}
                    onClick={postBlog}
                >
                    Post
                </Button>
            </form>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={success}
                autoHideDuration={2000}
                message="Blog posted successfully!"
            />
        </div>
    )
}

export default AddBlog;