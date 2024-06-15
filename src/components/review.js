import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editSearchValue } from '../features/searchSlice';
import { changeCurrentViewing } from '../features/reviewsSlice';
import { editUserHistory, deleteReview } from '../api/reviews';

export default function Review(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div id="reviews">
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            component="img"
            alt={props.rating}
            height="140"
            width="300"
            image={props.img}
            style={{
                backgroundColor: `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`
            }}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {props.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.author}
            </Typography>
        </CardContent>
        <CardActions>
            {   props.profile &&
                <Button size="small" onClick={()=>{
                    deleteReview(props.id)
                    .then(res => {
                       if(!res.err) alert("Successfully deleted your review.");
                    })
                }}>Delete</Button> 
            }
            <Button size="small" onClick={()=>{
                dispatch(changeCurrentViewing({rating: props.rating, img: props.img, title: props.title, author: props.author, content: props.content, time: props.time, date: props.date}));
                dispatch(editSearchValue(props.title));
                navigate({
                    pathname: '/review',
                    search: `?q=${props.title}`
                })
            }}>Read</Button>
        </CardActions>
        </Card>
    </div>
  );
};
