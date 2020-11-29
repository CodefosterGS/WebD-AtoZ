import React, { useEffect, useState } from 'react'
import { Typography, CircularProgress } from '@material-ui/core';
import FeedCard from './FeedCard';

function Feeds() {
    const [blogs, setBlogs] = useState(null);
    useEffect(() => {
        getBlogs();
    }, [])

    const getBlogs = async () => {
        const res = await fetch('https://cfsession.herokuapp.com/blogs')
        const data = await res.json();
        setBlogs(data);
    }

    if (!blogs) return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: '100vh' }}>
            <CircularProgress />
        </div>
    )
    else {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
                <Typography variant="h4" gutterBottom>
                    Feeds
                </Typography>
                {blogs.map(blog => <div>
                    <FeedCard
                        title={blog.title}
                        publisher={blog.publisher}
                        body={blog.text}
                        likes={blog.likes}
                        dislikes={blog.dislikes}
                        key={blog.id}
                        id={blog.id}
                    />
                    <div style={{ margin: '10px'}} />
                </div>
                )}
            </div>
        )
    }
}

export default Feeds
