import React, { Component } from 'react';
import InputCheckout from "./input";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


import 'bootstrap/dist/css/bootstrap.min.css';

class Checkout extends Component {
    handleHistory = (event) => {
        event.preventDefault();
        this.props.history.push("/");
        this.props.onHandleSubmit();
    }
    render() { 
        const {checkoutForm, onHandleInputCheckout, onCart, shipping} = this.props;
        let subTotal = 0;
        onCart.map(product=>(
            subTotal = subTotal + (product.price * product.quantity)
        ))
        return ( 
            <div className="container-fluid">
                <div className="row" >
                    
                    <div className="col-md-5">
                        <TableContainer component={Paper} style={{ width: '85%', marginTop: 250, marginBottom: 50, marginLeft: 70}}>
                            <Typography variant='h6'>Your Order</Typography>
                            <Table aria-label="caption table">
                                <caption>Subtotal: Rs<span style={{color: '#3f51b5'}}>{subTotal}</span></caption>
                                <caption style={{marginTop: -20}}>Shipping Rs<span style={{color: '#3f51b5'}}>{shipping}</span></caption>
                                <caption style={{marginTop: -20}}>Total: Rs<span style={{color: '#3f51b5'}}>{subTotal+shipping}</span></caption>
                                <caption style={{marginTop: -20}}>Cash on delivery: Pay with cash upon delivery.</caption>
                                <TableHead>
                                    <TableRow >
                                        <TableCell style={{}} >Product</TableCell>
                                        <TableCell style={{}} >Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {onCart.map((product)=>(
                                                <TableRow>
                                                    <TableCell style={{}}>{`${product.title} x ${product.quantity}`}</TableCell>
                                                    <TableCell style={{color: '#3f51b5'}}>Rs{product.price * product.quantity}</TableCell>
                                                </TableRow>
                                            )
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className="col-md-6" style={{marginTop: 150, marginLeft: 70, marginBottom: 100}}>
                        <p style={{fontSize: 30}}>Billing details</p>
                        <form onSubmit={this.handleHistory} style={{padding: 10}} align="left">
                            <diV className="row">
                                <div className="form-group col-md-6">
                                    <label for="exampleInputEmail1">Full Name</label>        
                                    <InputCheckout
                                        placeHolder={"name"}
                                        name={"fullName"}
                                        focus = {true}
                                        checkoutForm={checkoutForm}
                                        onHandleInputCheckout={onHandleInputCheckout}
                                        type="text"
                                    />
                                </div>        
                                <div className="form-group col-md-6">
                                    <label for="exampleInputEmail1">Country</label>        
                                    <InputCheckout
                                        placeHolder={"country"}
                                        name={"country"}
                                        checkoutForm={checkoutForm}
                                        onHandleInputCheckout={onHandleInputCheckout}
                                        type="text"
                                    />
                                </div>    
                            </diV>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Street address</label>        
                                <textarea 
                                    placeholder="address"
                                    className="form-control"
                                    id="streetAddress" 
                                    name="streetAddress"
                                    value={checkoutForm.streetAddress}
                                    onChange={onHandleInputCheckout}
                                />
                            </div>
                            <diV className="row">        
                                <div className="form-group col-md-6">
                                    <label for="exampleInputEmail1">City</label>        
                                    <InputCheckout
                                        placeHolder={"City"}
                                        name={"city"}
                                        checkoutForm={checkoutForm}
                                        onHandleInputCheckout={onHandleInputCheckout}
                                        type="text"
                                    />
                                </div>        
                                <div className="form-group col-md-6">
                                    <label for="exampleInputEmail1">State</label>        
                                    <InputCheckout
                                        placeHolder={"state"}
                                        name={"state"}
                                        checkoutForm={checkoutForm}
                                        onHandleInputCheckout={onHandleInputCheckout}
                                        type="text"
                                    />
                                </div>
                            </diV>
                            <diV className="row">        
                                <div className="form-group col-md-6">
                                    <label for="exampleInputEmail1">Postcode/ZIP</label>        
                                    <InputCheckout
                                        placeHolder={"postcode"}
                                        name={"postcode"}
                                        checkoutForm={checkoutForm}
                                        onHandleInputCheckout={onHandleInputCheckout}
                                        type="text"
                                    />
                                </div>        
                                <div className="form-group col-md-6">
                                    <label for="exampleInputEmail1">Phone</label>        
                                    <InputCheckout
                                        placeHolder={"phone"}
                                        name={"phone"}
                                        checkoutForm={checkoutForm}
                                        onHandleInputCheckout={onHandleInputCheckout}
                                        type="text"
                                    />
                                </div>
                            </diV>        
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>        
                                <InputCheckout
                                    placeHolder={"email"}
                                    name={"email"}
                                    checkoutForm={checkoutForm}
                                    onHandleInputCheckout={onHandleInputCheckout}
                                    type="email"
                                />
                            </div>   
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    placeholder="term"
                                    id="term" 
                                    name="term"
                                    value={checkoutForm.term}
                                    type="checkbox"
                                    onChange={onHandleInputCheckout}
                                />
                                <label className="form-check-label" for="exampleCheck1">Terms and Conditions</label>        
                            </div>
                                 {/* Submit button */}
                            <button
                             className="btn btn-outline-primary"
                             style={{width: '20%', marginTop: 30}}
                            >
                                Place Order
                            </button>
                            {/* <Button
                             variant="contained"
                             color="primary"
                             spacing = {1}
                             style={{width: '50%', marginLeft: 150, marginTop: 30}}
                            >Submit</Button> */}
                        </form>
                    </div>
                </div>
             </div>
         );
    }
}
 
export default Checkout;
