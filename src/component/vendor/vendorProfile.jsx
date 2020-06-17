import React, { Component } from 'react';
import _ from 'lodash';
import {updateVendor} from "../http/api";

class Vendor extends Component {

    state = {
        vendorForm: {shopName: "", shopType: "", address: "", city: "", country: "", website: ""},
        vendorId: this.props.onVendor_id,
        allVendors: this.props.onVendors
    }
    componentDidMount = () => {
        const currentVendor = this.state.allVendors.filter(ven => ven.id === this.state.vendorId);
        const vendorForm = {
            id: this.state.vendorId,
            shopName: currentVendor[0].shopName,
            shopType: currentVendor[0].shopType, 
            address: currentVendor[0].address, 
            city: currentVendor[0].city,
            country: currentVendor[0].country, 
            website: currentVendor[0].website, 
        }
        this.setState({vendorForm});
    }

    handleVendorInput = (event) => {
        const vendorForm = {...this.state.vendorForm};
        vendorForm[event.currentTarget.name] = event.currentTarget.value;
        this.setState({vendorForm});
    }

    handleSubmitVendor = async(event) => {
        event.preventDefault();
        try{
            const result = await updateVendor(this.state.vendorForm);
            this.props.onHandleVendorUpdate(result);
            console.log(result);
        }catch(ex){
            console.log("vendor added failed: ", ex.message);
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateUserSubmit();
    }
    render() { 
        const {onHandleRedisterInput, onRegister, error} = this.props;
        const {vendorForm} = this.state;
        return ( 
            <div style={{marginTop: 100, marginBottom: 100}}>
                <p style={{fontSize: 30}}>Personal Details</p>
                <form onSubmit={this.handleSubmit} style={{padding: 40, marginTop: -20}} align="left">
                    <div className="row">
                        <div className="form-group col-md-12">
                            <div className="row">
                                <div className="col-md-3">
                                    <label for="exampleInputEmail1">Full Name</label>        
                                </div>
                                <div className="col-md-9 d-flex content-justify-left">
                                    <input
                                        style={{marginBottom: 20}}
                                        placeholder="full name"
                                        className="form-control"
                                        id="fullName" 
                                        name="fullName"
                                        value={onRegister.fullName}
                                        type="text"
                                        autoFocus = {true}
                                        onChange={onHandleRedisterInput}
                                    />
                                    {error.fullName && <div className="alert alert-danger">{error.fullName}</div>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <label for="exampleInputEmail1">Email Address</label>        
                                </div>
                                <div className="col-md-9">
                                    <input
                                        placeholder="email"
                                        className="form-control"
                                        id="email" 
                                        name="email"
                                        value={onRegister.email}
                                        type="email"
                                        onChange={onHandleRedisterInput}
                                    />
                                    {error.email && <div className="alert alert-danger">{error.email}</div>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3" style={{ marginTop: 20}}>
                                    <label for="exampleInputEmail1">Phone Number</label>        
                                </div>
                                <div className="col-md-9">
                                    <input
                                        style={{marginBottom: 20, marginTop: 20}}
                                        placeholder="phone number"
                                        className="form-control"
                                        id="phoneNumber" 
                                        name="phoneNumber"
                                        value={onRegister.phoneNumber}
                                        type="text"
                                        onChange={onHandleRedisterInput}
                                    />
                                    {error.phoneNumber && <div className="alert alert-danger">{error.phoneNumber}</div>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <label for="exampleInputEmail1">Password</label>        
                                </div>
                                <div className="col-md-9">
                                    <input
                                        style={{marginBottom: 20}}
                                        placeholder="password"
                                        className="form-control"
                                        id="password" 
                                        name="password"
                                        value={onRegister.password}
                                        type="text"
                                        onChange={onHandleRedisterInput}
                                    />
                                    {error.password && <div className="alert alert-danger"> {error.password} </div>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <label for="exampleInputEmail1">Confirm Password</label>        
                                </div>
                                <div className="col-md-9">
                                    <input
                                        placeholder="confirm password"
                                        className="form-control"
                                        id="confirmPassword" 
                                        name="confirmPassword"
                                        value={onRegister.confirmPassword}
                                        type="text"
                                        onChange={onHandleRedisterInput}
                                    />
                                    {error.confirmPassword && <div className="alert alert-danger">{error.confirmPassword}</div>}
                                    </div>
                                </div>

                        </div>    
                    </div>
                    <button
                        className="btn btn-outline-primary"
                        style={{width: '15%', marginTop: 10}}
                        disabled = {!_.isEmpty(error)}
                    >
                    Update
                    </button>
                </form>
{/* vendor details */}
                <p style={{fontSize: 30}}>Shop Details</p>
                <form onSubmit={this.handleSubmitVendor} style={{padding: 40, marginTop: -20}} align="left">
                    <diV className="row">
                        <div className="form-group col-md-12">
                            <div className="row">
                                <div className="col-md-3">
                                    <label for="exampleInputEmail1">Shop Name</label> 
                                </div>
                                <div className="col-md-9 d-flex content-justify-left">       
                                    <input
                                        style={{marginBottom: 20}}
                                        placeholder="shop name"
                                        className="form-control"
                                        id="shopName" 
                                        name="shopName"
                                        value={vendorForm.shopName}
                                        type="text"
                                        autoFocus = {true}
                                        onChange={this.handleVendorInput}
                                    />
                                </div>
                                {/* {error.fullName && <div className="alert alert-danger">{error.fullName}</div>} */}
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <label for="exampleInputEmail1">shop Type</label>        
                                </div>
                                <div className="col-md-9 d-flex content-justify-left"> 
                                    <input
                                        style={{marginBottom: 20}}
                                        placeholder="shopType"
                                        className="form-control"
                                        id="shopType" 
                                        name="shopType"
                                        value={vendorForm.shopType}
                                        type="text"
                                        onChange={this.handleVendorInput}
                                    />
                                    {/* {error.email && <div className="alert alert-danger">{error.email}</div>} */}
                                </div>      
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <label for="exampleInputEmail1">shop address</label>        
                                </div>
                                <div className="col-md-9 d-flex content-justify-left"> 
                                    <input
                                        style={{marginBottom: 20}}
                                        placeholder="address"
                                        className="form-control"
                                        id="address" 
                                        name="address"
                                        value={vendorForm.address}
                                        type="text"
                                        onChange={this.handleVendorInput}
                                    />
                                    {/* {error.phoneNumber && <div className="alert alert-danger">{error.phoneNumber}</div>} */}
                                </div>      
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <label for="exampleInputEmail1">City</label>        
                                </div>
                                <div className="col-md-9 d-flex content-justify-left"> 
                                    <input
                                        style={{marginBottom: 20}}
                                        placeholder="city"
                                        className="form-control"
                                        id="city" 
                                        name="city"
                                        value={vendorForm.city}
                                        type="text"
                                        onChange={this.handleVendorInput}
                                    />
                                    {/* {error.password && <div className="alert alert-danger"> {error.password} </div>} */}
                                </div>      
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <label for="exampleInputEmail1">Country</label>        
                                </div>
                                <div className="col-md-9 d-flex content-justify-left"> 
                                    <input
                                        style={{marginBottom: 20}}
                                        placeholder="country"
                                        className="form-control"
                                        id="country" 
                                        name="country"
                                        value={vendorForm.country}
                                        type="text"
                                        onChange={this.handleVendorInput}
                                    />
                                    {/* {error.confirmPassword && <div className="alert alert-danger">{error.confirmPassword}</div>} */}
                                </div>      
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <label for="exampleInputEmail1">Website</label>        
                                </div>
                                <div className="col-md-9 d-flex content-justify-left"> 
                                    <input
                                        placeholder="website"
                                        className="form-control"
                                        id="website" 
                                        name="website"
                                        value={vendorForm.website}
                                        type="text"
                                        onChange={this.handleVendorInput}
                                    />
                                    {/* {error.confirmPassword && <div className="alert alert-danger">{error.confirmPassword}</div>} */}
                                </div>      
                            </div>
                        </div>    
                    </diV>
                    <button
                        className="btn btn-outline-primary"
                        style={{width: '15%', marginTop: 10}}
                        // disabled = {!_.isEmpty(error)}
                    >
                    Update
                    </button>
                </form>
            </div>
         );
    }
}
 

 
export default Vendor;