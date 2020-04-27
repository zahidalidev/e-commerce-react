import React, { Component } from 'react';
import _ from 'lodash';

// loginSubmit onLogin onHandleInput email password
class LoginMember extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.loginSubmit();
    }
    render() { 
        const {onHandleInput, onLogin, error} = this.props;
        return ( 
            <div className="col-md-6 mx-auto" style={{marginTop: 150, marginLeft: 70, marginBottom: 100}}>
                <p style={{fontSize: 30}}>Login</p>
                <form onSubmit={this.handleSubmit} style={{padding: 40, marginTop: -20}} align="left">
                    <diV className="row">
                        <div className="form-group col-md-12">
                            <label for="exampleInputEmail1">Email Address</label>        
                            <input
                                style={{marginBottom: 20}}
                                placeholder="email"
                                className="form-control"
                                id="email" 
                                name="email"
                                value={onLogin.email}
                                type="email"
                                autoFocus = {true}
                                onChange={onHandleInput}
                            />
                            {error.email && <div className="alert alert-danger">{error.email}</div>}
                            <label for="exampleInputEmail1">Password</label>        
                            <input
                                placeholder="password"
                                className="form-control"
                                id="password" 
                                name="password"
                                value={onLogin.password}
                                type="password"
                                onChange={onHandleInput}
                            />
                            {error.password && <div className="alert alert-danger">{error.password}</div>}
                        </div>    
                    </diV>
                    <button
                        className="btn btn-outline-primary"
                        style={{width: '15%', marginTop: 10}}
                        disabled={!_.isEmpty(error)}
                    >
                    Login
                    </button>
                </form>
            </div>
         );
    }
}
 

export default LoginMember;