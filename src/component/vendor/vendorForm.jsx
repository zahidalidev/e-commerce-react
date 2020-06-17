import React, { Component } from 'react';
import {addVendor} from "../http/api";

class RegisterAsVendor extends Component {
    state = {
        vendorForm: {shopName: "", shopType: "", address: "", city: "", country: "", website: ""}
    }

    handleVendorInput = (event) => {
        const vendorForm = {...this.state.vendorForm};
        vendorForm[event.currentTarget.name] = event.currentTarget.value;
        this.setState({vendorForm});
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        try{
            const result = await addVendor(this.state.vendorForm);
            this.props.onHandleVendorSubmit(result);
            console.log(result);
        }catch(ex){
            console.log("vendor added failed: ", ex.message);
        }
    }
    render() { 
        const {vendorForm} = this.state;
        return ( 
            <div className="col-md-6 mx-auto" style={{marginTop: 100, marginLeft: 70, marginBottom: 100}}>
                <p style={{fontSize: 30}}>Register as Vendor</p>
                <form onSubmit={this.handleSubmit} style={{padding: 40, marginTop: -20}} align="left">
                    <diV className="row">
                        <div className="form-group col-md-12">
                            <label for="exampleInputEmail1">Shop Name</label>        
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
                            {/* {error.fullName && <div className="alert alert-danger">{error.fullName}</div>} */}
                            <label for="exampleInputEmail1">shop Type</label>        
                            <input
                                placeholder="shopType"
                                className="form-control"
                                id="shopType" 
                                name="shopType"
                                value={vendorForm.shopType}
                                type="text"
                                onChange={this.handleVendorInput}
                            />
                            {/* {error.email && <div className="alert alert-danger">{error.email}</div>} */}
                            <label for="exampleInputEmail1">shop address</label>        
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
                            <label for="exampleInputEmail1">City</label>        
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
                            <label for="exampleInputEmail1">Country</label>        
                            <input
                                placeholder="country"
                                className="form-control"
                                id="country" 
                                name="country"
                                value={vendorForm.country}
                                type="text"
                                onChange={this.handleVendorInput}
                            />
                            {/* {error.confirmPassword && <div className="alert alert-danger">{error.confirmPassword}</div>} */}
                            <label for="exampleInputEmail1">Website</label>        
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
                    </diV>
                    <button
                        className="btn btn-outline-primary"
                        style={{marginTop: 10}}
                        // disabled = {!_.isEmpty(error)}
                    >
                    Register As Vendor
                    </button>
                </form>
            </div>
         );
    }
}
 
export default RegisterAsVendor;