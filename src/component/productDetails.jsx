import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';

import 'bootstrap/dist/css/bootstrap.min.css';
import StarRatings from "react-star-ratings";
import _ from "lodash";
import {Link } from "react-router-dom";
import ReactImageMagnify from 'react-image-magnify';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 451,
    height: 500,
    marginLeft: 70,
    marginTop: 70,
  },

  bottomSmall: {
    width: 70,
    height: 70,
    marginTop: 50,
    cursor: 'pointer'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  avatar: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function MediaControlCard({onSelectProduct, onHandleCart, onSubmitReview}) {

  
  const classes = useStyles();
  const theme = useTheme();

  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState("");

  const changeRating = ( newRating, name ) => {
    setRating(newRating);
  }
  const handelChangeReview = (event) => {
    setReview(event.currentTarget.value);
  }
  const submitReview = (event) => {
    event.preventDefault();
    onSubmitReview(rating, review);
  }
  const [originalImage, setOriginalImage] = React.useState(onSelectProduct.picture);

  const handleImage = (picture) => {
    setOriginalImage(picture);
  }
  let devider = 0;
  if(onSelectProduct.reviews[0].ratings === 0){
    devider = 1
  }else{
    devider = onSelectProduct.reviews[0].ratings;
  }
  return (
    <React.Fragment>
      <Card elevation={1} className={classes.root}>
          <div className="row">
              <div className="col-md-5" style={{marginLeft: 50, marginTop: 70, zIndex: 1}}>
                <span >
                  <ReactImageMagnify {...{
                      smallImage: {
                          alt: 'Wristwatch by Ted Baker London',
                          src: `/${originalImage}`,
                          width: 521,
                          height: 500,
                      },
                      largeImage: {
                          alt: '',
                          src: `/${originalImage}`,
                          width: 1400,  
                          height: 1500,
                      }
                  }} />
                </span>
              {/* other images */}
              <div className="row" style={{marginRight: -476, marginTop: -21, marginBottom: 52, marginLeft: 58}}  >
                  {onSelectProduct.pictures.map((picture, i) => 
                    <div className="col-md-2 d-flex justify-content-start" key={i}>
                        <ButtonBase
                            key={i}
                            onClick={() => handleImage(picture) }
                        >
                        <CardMedia
                            key={i}
                            className={classes.bottomSmall}
                            image={`/${picture}`}
                            title={onSelectProduct.title}
                        />
                        </ButtonBase>
                    </div>
                  )}  
              </div>

              </div>
          </div>
               
          <div className="rowNot" style={{marginRight: 0, display: 'flex', flexWrap: 'wrap', marginLeft: -15}}>
              <div className="col-md-7" style={{marginTop: 70, marginLeft: 30, marginBottom: 100}}>
                  <div className={classes.details} >
                      <CardContent className={classes.content} >
                          <Typography component="h4" variant="h4" align="left" color="inherit">
                              {onSelectProduct.title}
                          </Typography>
                          <span style={{marginLeft: -280}}>
                            {/* start rating */}
                            <StarRatings
                                rating={onSelectProduct.reviews[0].totalRating/devider}
                                starRatedColor="#ffb600"
                                numberOfStars={5}
                                name='rating'
                                starDimension="24px"
                                starSpacing="5px"
                            />
                            <Typography style={{fontSize: 14, marginLeft: 10, marginTop: 5}} align="left" color="inherit">
                              {onSelectProduct.reviews[0].ratings} customer ratings
                            </Typography>
                          </span>
                          <hr />
                          <Typography variant="body1" color="textSecondary"  align="left" color="inherit">
                              {onSelectProduct.about}
                          </Typography>
                          <Typography variant="body1" color="textSecondary"  align="left">
                              By: <span style={{color: 'blue'}}>{onSelectProduct.company}</span>
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary"  align="left" style={{marginTop: 20}}>
                              <b>Type: </b>{onSelectProduct.type}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary"  align="left">
                              <b>Gender: </b>{onSelectProduct.gender}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary"  align="left">
                              Color: 
                              {onSelectProduct.color.map((col, i) => (
                                <Box component="span" key={i} style={{marginLeft: 10}}>
                                    <Button style={{border: '1px solid black', backgroundColor: `${col}`, padding: 15}} />
                                </Box>
                              ))}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary"  align="left">
                              <b>Price: </b>{onSelectProduct.price}
                          </Typography>
                      </CardContent>
                      <div className={classes.controls}>
                        <button className="btn btn-primary btn-sm" style={{marginLeft: 10, whiteSpace: "nowrap"}} onClick={()=>onHandleCart(onSelectProduct)}>
                            {/* <Link style={{fontSize: 15, color: 'white'}} to={`/home/${onProduct.id}`}>Product Detail</Link> */}
                            Add to Cart
                        </button>
                      </div>
                      

                  </div>
              </div>
          </div>
          
      </Card>

      <div className="rowNot" style={{marginTop: 80, marginBottom: 150, marginRight: 0, display: 'flex', flexWrap: 'wrap', marginLeft: -15}} >
          <div className="col-md-1"></div>
          <div className="col-md-8" style={{marginLeft: 70}}>
          {/* add review */}
           
              <div className="row">
                <div className="col-md-9" style={{marginTop: 20, marginLeft: -8}} >
                  <h5 align="left" >Add a review</h5>
                  <label className="d-flex justify-content-start" for="exampleInputEmail1">Your rating</label> 
                  {/* star rating  */}
                  <span className="d-flex justify-content-start">
                    <StarRatings
                        rating={rating}
                        starRatedColor="blue"
                        changeRating={changeRating}
                        numberOfStars={5}
                        name='rating'
                        starDimension="24px"
                        starSpacing="5px"
                    />
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-9" style={{marginTop: 20, marginLeft: -8}} >
                  <form onSubmit={submitReview}>
                    <div className="form-group">
                      {/* comment box */}
                        <label className="d-flex justify-content-start" for="exampleInputEmail1">Your review *</label>        
                        <textarea 
                            className="form-control"
                            id="streetAddress" 
                            name="streetAddress"
                            value={review}
                            onChange={handelChangeReview}
                        />
                    </div>
                    <button
                      className="btn btn-outline-primary d-flex justify-content-start"
                      style={{marginTop: 20}}
                    >
                        Submit
                    </button>
                  </form>
                </div>
                <div className="col-md-3"></div>
              </div>
            
            {/* comments */}
              {onSelectProduct.reviews[0].comments.map((commentDetails, i) => (
                    <React.Fragment key={i}>
                        <div className="row" style={{marginTop: 40}}>
                          <div>
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                          </div>
                          <div style={{marginLeft: 10, marginTop: 5}}>
                            <p>{commentDetails.fullName}</p>
                          </div>
                        </div>
                        {/* rating starts */}
                        <div className="row">
                          <div className="col-md-5" style={{marginLeft: -115}}>
                            <StarRatings
                                rating={commentDetails.ratingStar}
                                starRatedColor="blue"
                                numberOfStars={5}
                                name='rating'
                                starDimension="24px"
                                starSpacing="5px"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-9" style={{marginTop: 20, marginLeft: -8}} >
                            <Typography align="left" >{commentDetails.comment}</Typography>
                          </div>
                          <div className="col-md-3"></div>
                        </div>
                    </React.Fragment>
                  )
                )
              }


          </div>
          <div className="col-md-3"></div>
      </div>

    </React.Fragment>
  );
}
