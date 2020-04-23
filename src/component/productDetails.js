import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import 'bootstrap/dist/css/bootstrap.min.css';

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
    marginTop: 70
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
}));

export default function MediaControlCard({onSelectProduct}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
        <div className="row">
            <div className="col-md-5">
            <CardMedia
                className={classes.cover}
                image={onSelectProduct.picture}
                title="Live from space album cover"
            />
            </div>
        </div>
        <div className="row ml-3">
            <div className="col-md-7" style={{marginTop: 70}}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h4" variant="h4" align="left" color="inherit">
                            {onSelectProduct.title}
                        </Typography>
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
                              <Box component="span" style={{marginLeft: 10}}>
                                  <Button style={{border: '1px solid black', backgroundColor: `${col}`, padding: 15}} />
                              </Box>
                            ))}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary"  align="left">
                            <b>Price: </b>{onSelectProduct.price}
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                    <button className="btn btn-primary btn-sm" style={{marginLeft: 10, whiteSpace: "nowrap"}}>
                        {/* <Link style={{fontSize: 15, color: 'white'}} to={`/home/${onProduct.id}`}>Product Detail</Link> */}
                        Order Now
                    </button>
                    </div>
                </div>
            </div>
        </div>     
    </Card>
  );
}
