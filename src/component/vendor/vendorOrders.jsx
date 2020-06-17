import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useState, useEffect} from 'react';
import Divider from '@material-ui/core/Divider';

import _ from "lodash";

const useStyles = makeStyles((theme) =>({
  table: {
    minWidth: 650,
  },
  head: {
    fontWeight: 'bold',
  },
  cover: {
    width: 60,
    height: 60,
    margin: 20
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));


export default function VendorsOrders({onOrder, onVendor_id, onUpdateStatus}) {
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [pending, Setpending] = useState("");
  const [processed, setProcessed] = useState("");
  const [shipped, setShipped] = useState("");
  const [delivered, setDelivered] = useState("");
  let orderLength = 0;
  
  let count = 0;
  useEffect(() => {
    setFilteredOrders(onOrder);
    Setpending("contained");
  }, [count]);
  const classes = useStyles();
  if(onOrder.length === 0) return <h1 style={{marginTop: 266}}>you have no new Orders</h1>
  
  
  const filterOrder = (status) => {
    const filterOder = onOrder.filter(order => order.status === status);
    setFilteredOrders(filterOder);
    console.log("filterOder", filterOder, filteredOrders);
    if(status === 'pending'){
      Setpending("contained");
      setProcessed("");
      setShipped("")
      setDelivered("")
    }
    else if(status === 'processed'){
      Setpending("");
      setProcessed("contained");
      setShipped("")
      setDelivered("")
    }
    else if(status === 'shipped'){
      Setpending("");
      setProcessed("");
      setShipped("contained")
      setDelivered("")
    }
    else if(status === 'delivered'){
      Setpending("");
      setProcessed("");
      setShipped("")
      setDelivered("contained")
    }
  
  }
  const updateStatus = (order, status) => {
    onUpdateStatus(order, status);
    filterOrder('pending');
  }
  
  // console.log("onOrder: ", onOrder, filteredOrders);
  return (
    <React.Fragment>
      <Typography variant='h4' style={{marginBottom: 40, marginTop: 100}}>Orders</Typography>

      <div className={classes.root}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button onClick={()=> filterOrder('pending')}  variant={pending}>Pending</Button>
          <Button onClick={()=> filterOrder('processed')} variant={processed} >Processed</Button>
          <Button onClick={()=> filterOrder('shipped')} variant={shipped} >Shipped</Button>
          <Button onClick={()=> filterOrder('delivered')} variant={delivered} >Delivered</Button>
        </ButtonGroup>
      </div>
      {/* onOrder.map(orders => {
            let ord = orders.cart.filter(order => order.vendor_id === onVendor_id);
            if(ord.length > 0){
                vendorOrders.push(ord);
            }
        }) */}
      
      {filteredOrders.map((order, j) => {
        let vendorOrders =  order.cart.filter(ord => ord.vendor_id === onVendor_id);
        if(vendorOrders.length === 0){
          return null;
        }
        orderLength = orderLength + 1
        console.log("vendorOrders: ", orderLength);
         { 
          return (
            <div className="row">
              <h4 align="right" style={{marginTop: 121, whiteSpace: 'nowrap', color: '#3f51b5', marginLeft: -63}}>Status:   
                  <span style={{color: 'white' ,backgroundColor: '#752525', borderRadius: '5px', marginLeft: 15, paddingLeft: 16, paddingRight: 16, paddingBottom: 6, paddingTop: 3, fontSize: 17}}>
                    {order.status}
                  </span>
              </h4>
              <div className="col-md-9" style={{marginLeft: -228, marginTop: 120}}>
              <h4 style={{whiteSpace: 'nowrap', color: 'black', marginBottom: 50}}>Products Details</h4>
                <TableContainer component={Paper} style={{marginRight: 100, width: '100%', paddingRight: 50}}>
                  <Table className={classes.table} aria-label="caption table">
                    <caption>Total Orders {orderLength}</caption>
                    <TableHead>
                      <TableRow>
                        <TableCell  className={classes.head}></TableCell>
                        <TableCell  className={classes.head} align="right">PRODUCT NAME</TableCell>
                        <TableCell  className={classes.head} align="right">UNIT PRICE</TableCell>
                        <TableCell  className={classes.head} align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
              
                      {
                        vendorOrders.map((product, i) => ( 
                            <React.Fragment>
                                <TableRow key={i}>
                                    <CardMedia
                                        className={classes.cover}
                                        image={`/${product.picture}`}
                                        title="Live from space album cover"
                                    />
                                    <TableCell align="right">{product.title}</TableCell>
                                    <TableCell align="right">{product.price}</TableCell>
                                    <TableCell align="right">{product.price}<span style={{marginLeft: 5, marginRight: 5}}>x</span>{product.quantity}</TableCell>
                                </TableRow>
                            </React.Fragment>
                        )) 
                      }
                      
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className="col-md-3" style={{marginLeft: 56, marginTop: 120}}>
                  <h4 style={{whiteSpace: 'nowrap', color: 'black', marginBottom: 69}}>Customer Details</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <p style={{whiteSpace: 'nowrap'}} ><span style={{color: '#3f51b5'}} >Oder Date: </span>{order.orderDate}</p>
                      <p style={{whiteSpace: 'nowrap'}} ><span style={{color: '#3f51b5'}} >Name: </span>{order.fullName}</p>
                      <p style={{whiteSpace: 'nowrap'}} ><span style={{color: '#3f51b5'}} >Email address: </span>{order.email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <p style={{whiteSpace: 'nowrap'}} ><span style={{color: '#3f51b5'}} >Contact number: </span>{order.phone}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <p style={{whiteSpace: 'nowrap'}} ><span style={{color: '#3f51b5'}} >Country: </span>{order.country}</p>
                      <p style={{whiteSpace: 'nowrap'}} ><span style={{color: '#3f51b5'}} >State: </span>{order.state}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <p style={{whiteSpace: 'nowrap'}} ><span style={{color: '#3f51b5'}} >City: </span>{order.city}</p>
                      <p style={{whiteSpace: 'nowrap'}} ><span style={{color: '#3f51b5'}} >Postcode: </span>{order.postcode}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div align="center">
                      <p><span style={{color: '#3f51b5'}} >Full address: </span>{order.streetAddress}</p>
                    </div>
                  </div> 
              </div>
              <div className="row" style={{marginBottom: 60, marginTop: 50}}>
                <div style={{whiteSpace: "nowrap"}} className="col-md-4">
                  <Button variant="contained" onClick={()=>updateStatus(order, 'processed')}>
                    update status to Processed
                  </Button>
                </div>
                <div style={{whiteSpace:"nowrap"}} className="col-md-4">
                  <Button variant="contained" color="primary" onClick={()=>updateStatus(order, 'shipped')} >
                    update status to Shipped
                  </Button>
                </div>
                <div style={{whiteSpace:"nowrap"}} className="col-md-4">
                  <Button variant="contained" color="secondary" onClick={()=>updateStatus(order, 'delivered')} >
                    update status to Delivered
                  </Button>
                </div>
              </div>
              <Divider style={{width: '121%', marginLeft: '-117px'}} />
            </div>
          )
         }
        
      })}
    </React.Fragment>
  );
}



