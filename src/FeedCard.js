import React, {useState, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Typography, IconButton, CardActions} from '@material-ui/core';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


export default function FeedCard({title, publisher, body, likes, dislikes, id}) {
  const classes = useStyles();
  const [like, setLike] = useState(likes);
  const [dislike, setDislike] = useState(dislikes);
  const [selectlike, setSelectlike] = useState(false);
  const [selectdislike, setSelectdislike] = useState(false);

  const handleLike = async (id) => {
    const res = await fetch(`https://cfsession.herokuapp.com/like/${id}`)
    const data = await res.json();
    if(res.status == 200) {
      setLike(like + 1)
      setSelectlike(true);
    }
  }
  const handleDislike = async (id) => {
    const res = await fetch(`https://cfsession.herokuapp.com/dislike/${id}`)
    if(res.status == 200) {
      setDislike(dislike+1);
      setSelectdislike(true);
    }
  }
  

  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {publisher}
        </Typography>
        <Typography variant="body2" component="p">
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => handleLike(id)} disabled={selectdislike || selectlike}> 
          <ThumbUpIcon style={{color: selectlike ? '3F51B5' : 'gray'}}/> 
        </IconButton>{like}
        <IconButton onClick={() => handleDislike(id)} disabled={selectlike || selectdislike}>
          <ThumbDownAltIcon style={{color: selectdislike ? '3F51B5' : 'gray'}}/> 
        </IconButton>{dislike}
      </CardActions>
    </Card>
  );
}