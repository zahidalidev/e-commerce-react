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
import {FacebookShareButton} from "react-share";


import {Link } from "react-router-dom";
import StarRatings from "react-star-ratings";


const useStyles = makeStyles((theme) => ({
    root: {
        // width: 270,
        // height: 370
        maxWidth: 270,
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
                image={`/${onProduct.picture}`}
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
                    }} title="Wish List">
                        <FavoriteIcon />
                </IconButton>
                {/* cart button */}
                <IconButton aria-label="add to cart" onClick={()=>{
                        onHandleCart(onProduct)
                    }} title="shoping cart">
                        <ShoppingCartIcon />
                </IconButton>
               {/* share button */}
                <FacebookShareButton style={{marginTop: -5, marginLeft: 10}} aria-label="share" title="Share on FaceBook" url={"http://mrfixer.pk/"}>
                    <ShareIcon />
                </FacebookShareButton>
                {/* order now */}
                <button onClick={onHandleProduct} className="btn btn-primary btn-sm" style={{marginLeft: 20}}>
                    <Link style={{fontSize: 13, color: 'white'}} to={`/home/${onProduct.id}`}>Details</Link>
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
