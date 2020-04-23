import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


import {Link } from "react-router-dom";
import { useAlert } from 'react-alert';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 340,
        maxHeight: 900,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function Product({onProduct, onHandleProduct, onHandleWishList, onHandleCart}) {
    
    const alert = useAlert();
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        
        <div>
            <Card className={classes.root}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    P
                </Avatar>
                }
            
                title={`${onProduct.title} Type: ${onProduct.type} Gender: ${onProduct.gender}`}
                subheader={`By: ${onProduct.company}`}
            />
            <CardMedia
                style={{cursor: 'pointer'}}
                className={classes.media}
                image={onProduct.picture}
                title={`Price: ${onProduct.price} Rs`}
            />
            {/* product price */}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Price: {onProduct.price} Rs
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
            
                {/* wish list button */}
                <IconButton aria-label="add to favorites" onClick={()=>{
                        onHandleWishList(onProduct);
                        alert.show(<div style={{ color: 'white' }}>Product added to wish list</div>, {type: 'success',});
                    }} title="Wish List">
                        <FavoriteIcon />
                </IconButton>
                {/* cart button */}
                <IconButton aria-label="add to cart" onClick={()=>{
                        onHandleCart(onProduct)
                        alert.show(<div style={{ color: 'white' }}>Product added to cart</div>, {type: 'success',});
                    }} title="shoping cart">
                        <ShoppingCartIcon />
                </IconButton>
                {/* added to cart */}
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                {/* order now */}
                <button onClick={onHandleProduct} className="btn btn-primary btn-sm" style={{marginLeft: 10}}>
                    <Link style={{fontSize: 15, color: 'white'}} to={`/home/${onProduct.id}`}>Product Detail</Link>
                </button>

                {/* descrption button */}
                <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                <Typography paragraph>Description:</Typography>
                <Typography paragraph>
                    {onProduct.about}
                </Typography>
                </CardContent>
            </Collapse>
            </Card>
        </div>
    );
}
