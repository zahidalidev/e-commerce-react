import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class InputCheckout extends Component {
    render() { 
        const {name, focus, placeHolder, onHandleInputCheckout, checkoutForm, type} = this.props;
        return ( 
            <input
                placeholder={placeHolder}
                className="form-control"
                id={name} 
                name={name}
                value={checkoutForm[name]}
                type={type}
                autoFocus = {focus}
                onChange={onHandleInputCheckout}
            />
         );
    }
}
 
export default InputCheckout;