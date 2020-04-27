import React, { Component } from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
//component
import Products from "./component/products";
import ProductDetails from './component/productDetails';
import WishList from './component/wishList';
import NotFound from './component/notFound';
import PrimarySearchAppBar from "./component/navbar";
import Cart from "./component/cart";
// http 
import productsData from "./component/http/api";
import {getWishList} from "./component/http/api";
import {addProductWishList} from "./component/http/api";
import {deleteProductFromWishList} from "./component/http/api";
import {getCart} from "./component/http/api";
import {addToCart} from "./component/http/api";
import {deleteFromCart} from "./component/http/api";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = { 
    products: [],
    selectedProduct: {},
    wishList: [],
    cart: []
   }

   async componentDidMount(){
     try{
        const products = await productsData();
        const wishList = await getWishList();
        const cart = await getCart();
        
        this.setState({products, wishList, cart});
     }catch(error){
       console.log(error.message);
     }
    }

    handleProduct = (product) => {
      this.setState({selectedProduct: product});
    }

    handleWishList = async(product) => {
      const originalWishList = [...this.state.wishList];
      const alreadyInWishList = this.state.wishList.filter(pro => pro.id === product.id);
      if(alreadyInWishList.length === 0){  
        const wishList = [...this.state.wishList];
        wishList.push(product);
        this.setState({wishList});

        try{
          const result = await addProductWishList(product);
        }catch(ex){
          if(ex.response && ex.response.request === 404){
            console.log("product alredy added");
          }
          else{
            this.setState({wishList: originalWishList});
          }
        }
      }else{
        alert("product alredy added");
      }
    }

    handleDelete = async(product) => {
      const wishList = [...this.state.wishList];
      const filterWishlist = wishList.filter(wishlist => wishlist.id !== product.id);
      this.setState({wishList: filterWishlist});

      try{
        await deleteProductFromWishList(product.id);
      }catch(error){
        console.log("Wish error", error.message);
      }
    }

    handleCart = async(product) => {
      const cart = [...this.state.cart];
      cart.push(product);
      this.setState({cart});

      try{
        await addToCart(product);
      }catch(error){
        console.log("cart error", error.message);
      }

      console.log("cart", product);
    }
    handleCartDelete = async(product) => {
      const cart = this.state.cart.filter(pro => pro.id !== product.id);
      this.setState({cart});

      try{
        await deleteFromCart(product.id);
      }catch(error){
        console.log("cart delete error", error.message);
      }
      
    }

    render() { 
      const {products, selectedProduct, wishList, cart} = this.state;
      return ( 
        <div className="App">
            <PrimarySearchAppBar wishList={wishList} cart={cart} />
                <Switch>
                  <Route path="/home/wishList" exact render={(props)=> <WishList {...props} onWishList={wishList} onHandleDelete={this.handleDelete} />} />
                  <Route path="/home/cart" exact render={(props)=> <Cart {...props} onHandleDelete={this.handleCartDelete} onCart={cart} />} />
                  <Route path="/home/:id" exact render={(props)=> <ProductDetails {...props} onSelectProduct={selectedProduct} />} />
                  <Route path="/home" render={(props) => <Products {...props} onProducts={products} onHandleCart={this.handleCart} onHandleProductDetail={this.handleProduct} onHandleWishList={this.handleWishList} />} />
                  <Route path="/not-found/" component={NotFound} />
                  <Redirect from = "/" exact to="home" />
                  <Redirect to="not-found" />
                </Switch>
          </div>
     );
  }
}
 
export default App;
