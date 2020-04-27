import React, { Component } from 'react';
import _ from 'lodash';

// registerSubmit onRegister onHandleRedisterInput email password
class RegisterMember extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.registerSubmit();
    }
    render() { 
        const {onHandleRedisterInput, onRegister, error} = this.props;
        return ( 
            <div className="col-md-6 mx-auto" style={{marginTop: 100, marginLeft: 70, marginBottom: 100}}>
                <p style={{fontSize: 30}}>Register</p>
                <form onSubmit={this.handleSubmit} style={{padding: 40, marginTop: -20}} align="left">
                    <diV className="row">
                        <div className="form-group col-md-12">
                            <label for="exampleInputEmail1">Full Name</label>        
                            <input
                                style={{marginBottom: 20}}
                                placeholder="fullName"
                                className="form-control"
                                id="fullName" 
                                name="fullName"
                                value={onRegister.fullName}
                                type="text"
                                autoFocus = {true}
                                onChange={onHandleRedisterInput}
                            />
                            {error.fullName && <div className="alert alert-danger">{error.fullName}</div>}
                            <label for="exampleInputEmail1">Email Address</label>        
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
                            <label for="exampleInputEmail1">Phone Number</label>        
                            <input
                                style={{marginBottom: 20}}
                                placeholder="phone number"
                                className="form-control"
                                id="phoneNumber" 
                                name="phoneNumber"
                                value={onRegister.phoneNumber}
                                type="text"
                                onChange={onHandleRedisterInput}
                            />
                            {error.phoneNumber && <div className="alert alert-danger">{error.phoneNumber}</div>}
                            <label for="exampleInputEmail1">Password</label>        
                            <input
                                style={{marginBottom: 20}}
                                placeholder="password"
                                className="form-control"
                                id="password" 
                                name="password"
                                value={onRegister.password}
                                type="password"
                                onChange={onHandleRedisterInput}
                            />
                            {error.password && <div className="alert alert-danger"> {error.password} </div>}
                            <label for="exampleInputEmail1">Confirm Password</label>        
                            <input
                                placeholder="confirm password"
                                className="form-control"
                                id="confirmPassword" 
                                name="confirmPassword"
                                value={onRegister.confirmPassword}
                                type="password"
                                onChange={onHandleRedisterInput}
                            />
                            {error.confirmPassword && <div className="alert alert-danger">{error.confirmPassword}</div>}
                        </div>    
                    </diV>
                    <button
                        className="btn btn-outline-primary"
                        style={{width: '15%', marginTop: 10}}
                        disabled = {!_.isEmpty(error)}
                    >
                    Register
                    </button>
                </form>
            </div>
         );
    }
}
 

export default RegisterMember;