import React, { Component } from 'react';

import Product from "../component/product";

class Products extends Component {

    render() { 
        const {onProducts, onHandleWishList, onHandleCart} = this.props;
        if(!onProducts) return <div>Loading...</div>
        //  console.log(onProducts);
        return ( 
            <div className="row-Not">
                <div className="col-md-12 mx-auto" style={{marginTop: 100}}>
                    <div className="row">
                        {onProducts.map(((product, i) =>( 
                            <div key={i} className="col-md-4" style={{marginBottom: 80, marginLeft: 60, marginRight: -100}}>
                                <Product onProduct={product} onHandleCart={onHandleCart} onHandleWishList={onHandleWishList} onHandleProduct={()=>this.props.onHandleProductDetail(product)} key={i}/> 
                            </div>
                        )))}  
                    </div>
                </div>
          </div>
         );
    }
}
 
export default Products;