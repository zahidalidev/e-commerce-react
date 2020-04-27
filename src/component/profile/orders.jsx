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


export default function Orders({onOrder}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={{marginTop: 100, marginRight: 100, width: '85%', paddingRight: 50, marginBottom: 150}}>
      <Typography variant='h4' style={{marginBottom: 50}}>My Orders</Typography>
      <Table className={classes.table} aria-label="caption table">
        <caption>Total Orders {onOrder.length}</caption>
        <TableHead>
          <TableRow>
            <TableCell  className={classes.head}></TableCell>
            <TableCell  className={classes.head} align="right">PRODUCT NAME</TableCell>
            <TableCell  className={classes.head} align="right">UNIT PRICE</TableCell>
            <TableCell  className={classes.head} align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {onOrder.map((order) => (
               order.cart.map((product, i) => ( 
                    <TableRow key={i}>
                        <CardMedia
                            className={classes.cover}
                            image={product.picture}
                            title="Live from space album cover"
                        />
                        <TableCell align="right">{product.title}</TableCell>
                        <TableCell align="right">{product.price}</TableCell>
                        <TableCell align="right">{product.price}<span style={{marginLeft: 5, marginRight: 5}}>x</span>{product.quantity}</TableCell>
                    </TableRow>
               )) 
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
