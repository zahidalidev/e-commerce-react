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
import {Link} from "react-router-dom";

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


export default function VendorProducts({onProducts, onHandleProductDelete, v_id}) {
  const vendorProducts = onProducts.filter(product => product.vendor_id === v_id);
  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={{marginTop: 100, marginRight: 100, width: '85%', paddingRight: 50, marginBottom: 150}}>
      <Typography variant='h4' style={{marginBottom: 50}}>All Products</Typography>
      <Table className={classes.table} aria-label="caption table">
      <caption>Total Products {vendorProducts.length}</caption>
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
          {vendorProducts.map((product, i) => (
            <TableRow key={i}>
                <CardMedia
                    className={classes.cover}
                    image={`/${product.picture}`}
                    title="Live from space album cover"
                />
                <TableCell align="right">{product.title}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">{product.stock}</TableCell>
                <TableCell style={{paddingLeft: 80}}>  
                    <Button variant="outlined" color="secondary" onClick={()=>onHandleProductDelete(product)} >
                        Delete
                    </Button>
                </TableCell>
                <TableCell >   
                    <Link to={`/home/vendor/products/${product.id}`}>
                        <Button variant="outlined" color="primary">
                            Edit
                        </Button>
                    </Link>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

