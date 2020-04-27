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
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
];

export default function AcccessibleTable({onWishList, onHandleDelete, onHandleCart, onCurrentUser}) {
  const classes = useStyles();

  if(_.isEmpty(onCurrentUser)) return <h1 style={{marginTop: 200}}>Login to see your Wishlist</h1>;

  return (
    <TableContainer component={Paper} style={{marginTop: 100, marginLeft: 100, marginRight: 100, width: '85%'}}>
      <Typography variant='h4' style={{marginBottom: 50}}>My Wish List</Typography>
      <Table className={classes.table} aria-label="caption table">
        <caption>Total Products {onWishList.length}</caption>
        <TableHead>
          <TableRow>
            <TableCell  className={classes.head}></TableCell>
            <TableCell  className={classes.head} align="right">PRODUCT NAME</TableCell>
            <TableCell  className={classes.head} align="right">UNIT PRICE</TableCell>
            <TableCell  className={classes.head} align="right">STOCK STATUS</TableCell>
            <TableCell  className={classes.head} align="right"></TableCell>
            <TableCell  className={classes.head} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {onWishList.map((product, i) => (
            <TableRow key={i}>
                <CardMedia
                    className={classes.cover}
                    image={product.picture}
                    title="Live from space album cover"
                />
                <TableCell align="right">{product.title}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">{product.stock}</TableCell>
                <TableCell style={{paddingLeft: 80}}>  
                    <Button variant="outlined" color="secondary" onClick={()=>onHandleDelete(product)} >
                        Delete
                    </Button>
                </TableCell>
                <TableCell >   
                    <Button variant="outlined" color="primary" onClick={()=>onHandleCart(product)}>
                        Add to Cart
                    </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
