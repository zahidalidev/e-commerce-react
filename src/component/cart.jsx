import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import {Link } from "react-router-dom";
import _ from "lodash";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  head: {
    fontWeight: 'bold',
  },
  cover: {
    width: 120,
    height: 120,
    margin: 20
  },
  root: {
    minWidth: 275,
    marginTop: 80,
    marginLeft: 100,
    width: '20%'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function AcccessibleTable({onCart, onHandleDelete, onHandleCartIncrement, onHandleCartDecrement, shipping, onCurrentUser}) {
  
  const classes = useStyles();
  
  let subTotal = 0;
  onCart.map(product => {
    subTotal = subTotal + (product.price * product.quantity)
  })
  
  
  if(_.isEmpty(onCurrentUser)) return <h1 style={{marginTop: 200}}>Login to see your shoping Cart</h1>;
  
  return (
      <React.Fragment>
        <TableContainer component={Paper} style={{marginTop: 100, marginLeft: 100, marginRight: 100, width: '85%'}}>
          <Typography variant='h4' style={{marginBottom: 50}}>My Shoping Cart</Typography>
          <Table className={classes.table} aria-label="caption table">
            <caption>A basic table example with a caption</caption>
            <TableHead>
              <TableRow >
                <TableCell  className={classes.head}></TableCell>
                <TableCell style={{paddingLeft: 100}} className={classes.head}>PRODUCT NAME</TableCell>
                <TableCell style={{paddingLeft: 100}} className={classes.head}>UNIT PRICE</TableCell>
                <TableCell style={{paddingLeft: 100}} className={classes.head}>Total Price</TableCell>
                <TableCell style={{paddingLeft: 100}} className={classes.head}>QUANTITY</TableCell>
                <TableCell style={{paddingLeft: 100}} className={classes.head}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {onCart.map((product, i) => (
                <TableRow key={i}>
                    <CardMedia
                        className={classes.cover}
                        image={`/${product.picture}`}
                        title="Live from space album cover"
                    />
                    <TableCell style={{paddingRight: 50}} align="right">{product.title}</TableCell>
                    <TableCell style={{paddingRight: 50}} align="right">{product.price}</TableCell>
                    <TableCell style={{paddingRight: 50}} align="right">{product.quantity * product.price}</TableCell>
                    <TableCell style={{paddingLeft: 50}} >   
                        <Button variant="outlined" color="secondary" style={{paddingLeft: -10}} onClick={()=>onHandleCartDecrement(product)}>
                            - 
                        </Button>
                        <span style={{marginLeft: 15, marginRight: 15}}>{product.quantity}</span>
                        <Button variant="outlined" color="primary" style={{paddingRight: -10}} onClick={()=>onHandleCartIncrement(product)}>
                            + 
                        </Button>
                    </TableCell>
                    <TableCell>  
                        <Button variant="outlined" color="secondary" onClick={()=>onHandleDelete(product)} >
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

         {/* total card */}
        <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h6" component="h2" align="left" style={{marginLeft: 30}}>
          Subtotal <span style={{color: '#3f51b5', marginLeft: 50}}>Rs{subTotal}</span>
          </Typography>
        </CardContent>
      </Card>

        <Card className={classes.root} variant="outlined" style={{marginTop: 10}}>
        <CardContent>
          <Typography variant="h6"  gutterBottom>
            Shipping
          </Typography>
          <Typography component="h2" color="inherit">
            Flate rate: <span style={{color: '#3f51b5'}}>Rs{shipping}</span> 
          </Typography>
          <Typography component="h2" color="textSecondary">
            Shipping options will be updated during checkout. 
          </Typography>
        </CardContent>
      </Card>
        <Card className={classes.root} variant="outlined" style={{marginTop: 10, marginBottom: 20}}>
        <CardContent>
          <Typography variant="h6" component="h2"> 
              Total <span style={{color: '#3f51b5', marginLeft: 50}}>Rs{subTotal + shipping}</span>
          </Typography>
        </CardContent>
      </Card>
      <div className="rownot">
        <div className="col-6" style={{marginTop: -30, marginBottom: 200, marginLeft: -110}}>
          <Button variant="outlined" color="primary" style={{width: '32%'}}>
            <Link to="/home">
              Continue Shoping
            </ Link>
          </Button>
          <Button variant="outlined" color="secondry" style={{marginTop: 100, marginLeft: -215}}>
            <Link to="/home/checkout" style={{color: 'red'}}>
              Proceed to Checkout
            </ Link>
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}
