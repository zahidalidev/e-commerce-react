import React, { Component } from 'react';
import _ from 'lodash';

// registerSubmit onRegister onHandleRedisterInput email password
class AccountDetails extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateUserSubmit();
    }
    render() { 
        const {onHandleRedisterInput, onRegister, error} = this.props;
        return ( 
            <div style={{marginTop: 100, marginBottom: 100}}>
                <p style={{fontSize: 30}}>Account Detail</p>
                <form onSubmit={this.handleSubmit} style={{padding: 40, marginTop: -20}} align="left">
                    <diV className="row">
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
                    </diV>
                    <button
                        className="btn btn-outline-primary"
                        style={{width: '15%', marginTop: 10}}
                        disabled = {!_.isEmpty(error)}
                    >
                    Update
                    </button>
                </form>
            </div>
         );
    }
}
 

export default AccountDetails;