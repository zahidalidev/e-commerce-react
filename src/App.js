import React, { Component } from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import Joi from "joi-browser";
import jwt from "jwt-simple";
import jwtDecode from "jwt-decode";
import _ from 'lodash';
//component
import Products from "./component/products";
import ProductDetails from './component/productDetails';
import WishList from './component/wishList';
import NotFound from './component/notFound';
import PrimarySearchAppBar from "./component/navbar";
import Cart from "./component/cart";
import Checkout from "./component/checkout";
import LoginMember from "./component/loginMember";
import RegisterMember from './component/RegisterMember';
import Logout from './component/logout';
import Paginate from "./component/profile/paginate";
import AccountDetails from "./component/profile/accountDetails";
import Orders from './component/profile/orders';
import Admin from "./component/admin/admin"
// http 
import productsData from "./component/http/api";
import {updateMember} from "./component/http/api";
import {getOrders} from "./component/http/api";
import {getMembers} from "./component/http/api";
import {addMember} from "./component/http/api";
import {updateProduct} from "./component/http/api";

import './App.css';
import "react-toastify/dist/ReactToastify.css"



class App extends Component {
  state = { 
    products: [],
    originalProduct: [],
    selectedProduct: {},
    wishList: [],
    cart: [], 
    shipping: 100,
    checkoutForm: {fullName: "", country: "", streetAddress: "", city: "", state: "", postcode: "", phone: "", email: "", term: false, cart: []},
    orders: [],
    searchedValue: "",
    member: [],
    register: {fullName: "",email: "", phoneNumber: "", password: "", confirmPassword: ""},
    login: {email: "", password: ""},
    errors: {},
    currentUser: {}
   }
  
   async componentDidMount(){
     try{
        const products = await productsData();
        const orders = await getOrders();
        const member = await getMembers();
        const currentUser = await this.getCurrentUser();
        
        let wishList = [];
        let cart = [];
        if(!_.isEmpty(this.state.currentUser)){
          const currentMember = member.filter(user=>(user.email === currentUser.email));
          const index = member.indexOf(...currentMember)
          wishList = member[index].wishList;
          cart = member[index].cart;
        }

        // fill update form
        const register = {
          fullName: currentUser.fullName,
          email: currentUser.email,
          phoneNumber: currentUser.phoneNumber,
          password: currentUser.password,
          confirmPassword: currentUser.password
        }

        this.setState({products, wishList, cart, orders, originalProduct: products, member, currentUser, register});
     }catch(error){
       console.log(error.message);
     }
    }

    // current user
    getCurrentUser = async() => {
      try{
        const jwt = localStorage.getItem('token');
        const currentUser = jwtDecode(jwt);
        return currentUser;
      }catch(ex){
        console.log("getting user error: ", ex.message);
      }
    }

    // product details
    handleProduct = (product) => {
      this.setState({selectedProduct: product});
    }

    // wishlist
    handleWishList = async(product) => {
      if(!_.isEmpty(this.state.currentUser)){

        const member = [...this.state.member];
        const currentMember = member.filter(user=>(user.email === this.state.currentUser.email));
        const index = member.indexOf(...currentMember);

        const originalMember = [...member];
        const alreadyInWishList = member[index].wishList.filter(pro => pro.id === product.id);
        if(alreadyInWishList.length === 0){  
          // const wishList = [...this.state.wishList];
          member[index].wishList.push(product);
          this.setState({member, wishList: member[index].wishList});
          
          try{
            const result = await updateMember(member[index]);
          }catch(ex){
            if(ex.response && ex.response.request === 404){
              console.log("product alredy added");
            }
            else{
              this.setState({member: originalMember});
            }
          }
          toast.success("Product added to Wishlist");
        }else{
          toast.error("product alredy added");
        }

      }else{
        toast("you are not loged in login first")
      }  
    }

    handleDelete = async(product) => {
      const member = [...this.state.member];
      const currentMember = member.filter(user=>(user.email === this.state.currentUser.email));
      const index = member.indexOf(...currentMember);

      // const wishList = [...this.state.wishList];
      const filterWishlist = member[index].wishList.filter(wishlist => wishlist.id !== product.id);
      member[index].wishList = filterWishlist;
      this.setState({member, wishList: member[index].wishList});

      try{
        const result = await updateMember(member[index]);
      }catch(error){
        console.log("Wish error", error.message);
      }
    }

    // cart
    handleCart = async(product) => {
      if(!_.isEmpty(this.state.currentUser)){  

        const member = [...this.state.member];
        const currentMember = member.filter(user=>(user.email === this.state.currentUser.email));
        const index = member.indexOf(...currentMember);

        const alreadyInCart = member[index].cart.filter(cartProduct => cartProduct.id === product.id);
        const originalCart = [...member[index].cart];

        if(alreadyInCart.length === 0){

          // const cart = [...this.state.cart];
          const productWithQuantity = {...product, quantity: 1};

          member[index].cart.push(productWithQuantity);

          this.setState({member, cart: member[index].cart});
    
          try{
            const result = await updateMember(member[index]);
          }catch(error){
              console.log("cart error", error.message);
          }
          toast.success("Product added to shoping cart");
        }else{
          toast.error("product already added in shoping cart");
        }

      }else{
        toast("you are not loged in login first");
        
      }  
    }
    handleCartDelete = async(product) => {
      const member = [...this.state.member];
      const currentMember = member.filter(user=>(user.email === this.state.currentUser.email));
      const index = member.indexOf(...currentMember);

      const filterCart = member[index].cart.filter(pro => pro.id !== product.id);
      member[index].cart = filterCart;
      this.setState({member, cart: member[index].cart});

      try{
        const result = await updateMember(member[index]);
      }catch(error){
        console.log("cart delete error", error.message);
      }
      
    }

    handleCartDecrement = async(product) => {
      const member = [...this.state.member];
      const currentMember = member.filter(user=>(user.email === this.state.currentUser.email));
      const index = member.indexOf(...currentMember);

      const products = [...member[index].cart];

      const index2 = products.indexOf(product);
      member[index].cart[index2].quantity = member[index].cart[index2].quantity - 1;
      this.setState({member, cart: member[index].cart});
      try{
        const result = await updateMember(member[index]);
      }catch(error){
        console.log("cart delete error", error.message);
      }
    }
    handleCartIncrement = async(product) => {
      const member = [...this.state.member];
      const currentMember = member.filter(user=>(user.email === this.state.currentUser.email));
      const index = member.indexOf(...currentMember);

      const products = [...member[index].cart];

      const index2 = products.indexOf(product);
      member[index].cart[index2].quantity = member[index].cart[index2].quantity + 1;
      this.setState({member, cart: member[index].cart});

      try{
        const result = await updateMember(member[index]);
      }catch(error){
        console.log("cart delete error", error.message);
      }
    }

    // checkout
    handleInputCheckout = ({currentTarget: input}) => {
      const checkoutForm = {...this.state.checkoutForm};
      if(input.name !== "term"){
        checkoutForm[input.name] = input.value;
      }else{
        checkoutForm[input.name] = input.checked;
      }
      this.setState({checkoutForm});
    }
    //checkout submit
    handleSubmit = async() => {
      if(!_.isEmpty(this.state.currentUser)){  
        const originalOrders = [...this.state.orders];
        const checkoutForm = {...this.state.checkoutForm};
        checkoutForm.cart = this.state.cart;

        const member = [...this.state.member];
        const currentMember = member.filter(user=>(user.email === this.state.currentUser.email));
        const index = member.indexOf(...currentMember);
        const originalMemberOrders = [...member[index].orders];
        member[index].orders.push(checkoutForm);
        this.setState({member, orders: member[index].orders});
        
        try{
          const result = await updateMember(member[index]);
        }catch(error){
            console.log("cart error", error.message);
        }
        toast.success("Your Order is Placed Thanks for Shoping");

      }else{
        toast("you are not loged in login first"); 
      }
    }

    // catogries
    handleCatogriesProduct = (type) => {
      if(type !== "All"){
        const products = this.state.originalProduct.filter((product) => (
          product.type === type
        ));
        this.setState({products});
      }else{
        this.setState({products: this.state.originalProduct});
      }
    }

    // searching
    handleSearch = (event) => {
      this.setState({searchedValue: event.currentTarget.value});
      const products = this.state.originalProduct.filter(product => 
        product.title.toLowerCase().startsWith(event.currentTarget.value.toLowerCase())
      );
      this.setState({products});
    }

    schema = {
      fullName: Joi.string().required().label("FullName"),
      email: Joi.string().required().label("Email"),
      phoneNumber: Joi.string().required().label("Phone Number"),
      password: Joi.string().required().label("Password"),
      confirmPassword: Joi.string().required().label("Confirm Password")
    }

    validatePropperty = ({name, value}) => {
      const schema = {[name]: this.schema[name]};
      const obj = {[name]: value};
      const {error} = Joi.validate(obj, schema);
      return error ? error.details[0].message : null;
    }

// login user
    LoginSubmitSchema = {
      email: Joi.string().required().label("Email"),
      password: Joi.string().required().label("Password"),
    }
    submitLoginValidattion = () => {
      const options = {abortEarly: false};
      const {error} = Joi.validate(this.state.login, this.LoginSubmitSchema, options);
      if(!error) return null;
      const errors = [];
      for(let item of error.details) errors[item.path[0]] = item.message;
      return errors;
    }
    handleInput = (event) => {
      const errors = {...this.state.errors};
      const errorMessage = this.validatePropperty(event.currentTarget);
      if(errorMessage) errors[event.currentTarget.name] = errorMessage;
      else delete errors[event.currentTarget.name];

      const login = {...this.state.login};
      login[event.currentTarget.name] = event.currentTarget.value
      this.setState({login, errors});
    }
    loginSubmit = () => {
      const errors = this.submitLoginValidattion();
      this.setState({errors : errors || {}});
      if(errors) return;

      const {register} = this.state;
      const member = [...this.state.member];
      const login = {...this.state.login};
      const result = member.map(user=>{
        if((user.email === login.email) && (user.password === login.password)){
          return user;
        }
      })
      if(result.length === 0 || result[0] === undefined){
        const errors = {...this.state.errors};
        errors.email = "This email is not Registered or password is Wrong";
        this.setState({errors});
      }else{
        const jwtToken = result[0].token;
        localStorage.setItem('token', jwtToken);
        window.location = "/";
      }
    }

// register User
    validateRegisterSubmit = () => {
      const options = {abortEarly: false};
      const {error} = Joi.validate(this.state.register, this.schema, options);
      if(!error) return null;
      const errors = [];
      for(let item of error.details) errors[item.path[0]] = item.message;
      return errors;
    }
    handleRegInput = (event) => {
      const errors = {...this.state.errors};
      const errorMessage = this.validatePropperty(event.currentTarget);
      if(errorMessage) errors[event.currentTarget.name] = errorMessage;
      else delete errors[event.currentTarget.name];
      
      const register = {...this.state.register};
      register[event.currentTarget.name] = event.currentTarget.value

      if((event.currentTarget.name === "confirmPassword") && (event.currentTarget.value !== this.state.register.password)){
        errors[event.currentTarget.name] = "Password and Confirmed Password must be same";
      }

      this.setState({register, errors});
    }

    registerSubmit = async(e) => {
      const originalMembers = [...this.state.member];

      const errors = this.validateRegisterSubmit();
      this.setState({errors: errors || {}});
      if(errors) return;
      
      const {register} = this.state;
      const member = [...this.state.member];
      const result = member.filter(user => user.email === register.email);
      if(result.length !== 0){
        toast.error("this email is already registered try another one");
      }
      else if(result.length === 0){
        //creatting jwt
        var payload = {fullName: register.fullName, email: register.email, phoneNumber: register.phoneNumber};
        var secret = register.password;
        var jwtToken = jwt.encode(payload, secret);
        //adding user in member
        const registerWithTokenAndOrders = {...register, orders: [], cart: [], wishList: [], token: jwtToken, isAdmin: false}        
        member.push(registerWithTokenAndOrders);
        this.setState({member});
        //clearing register form
        toast.success("registered now login");
        const clearRegister = {fullName: "",email: "", phoneNumber: "", password: "", confirmPassword: ""};
        this.setState({register: clearRegister});
        //
        try{
          const result = await addMember(registerWithTokenAndOrders);
          //storing token to local Storage
          localStorage.setItem('token', jwtToken);
          window.location = "/";
        }catch(ex){
          console.log("register error: ", ex.message);
          this.setState({member: originalMembers});
        }
      }
    }

    // update user data
    updateUserSubmit = async() => {
      const originalMembers = [...this.state.member];
      // error handling
      const errors = this.validateRegisterSubmit();
      this.setState({errors: errors || {}});
      if(errors) return;
      // 
      const {register} = this.state;
      const member = [...this.state.member];
      const result = member.filter(user => user.email === register.email);
      // creating jwt
      var payload = {fullName: register.fullName, email: register.email, phoneNumber: register.phoneNumber};
      var secret = register.password;
      var jwtToken = jwt.encode(payload, secret);
    
      const index = member.indexOf(...result);    
      member[index].fullName = register.fullName
      member[index].email = register.email
      member[index].phoneNumber = register.phoneNumber
      member[index].password = register.password
      member[index].confirmPassword = register.confirmPassword
      member[index].token = jwtToken

      this.setState({member});
      toast.success("Updated");      
      try{
        const result = await updateMember(member[index]);
        console.log("updated result: ", result);
        //storing token to local Storage
        localStorage.setItem('token', jwtToken);
        window.location = "/home/profile/accountDetails";
      }catch(ex){
        console.log("register error: ", ex.message);
        this.setState({member: originalMembers});
      }
      
    }

    submitReview = async(newRating, review) => {
      if(!_.isEmpty(this.state.currentUser)){
        const {currentUser} = this.state;
        const products = [...this.state.products];
        const index = products.indexOf(this.state.selectedProduct);
        const comment = {
          email: currentUser.email,
          fullName: currentUser.fullName,
          ratingStar: newRating,
          comment: review
        }
        products[index].reviews[0].totalRating = products[index].reviews[0].totalRating + newRating;
        products[index].reviews[0].ratings = products[index].reviews[0].ratings + 1;

        products[index].reviews[0].comments.push(comment);
        this.setState({products, selectedProduct:  products[index]});

        try{
          const result = await updateProduct(products[index])
        }catch(ex){
          console.log("review error: ", ex.message);
        }
      }else{
        toast.error("login to submit your review");
      }
    }

    // renderProduct = async() => {
    //   const products = await productsData();
    //   this.setState({products});

    //   const selectedId = window.location.pathname.substr(6);
    //   const selectedProduct = products.filter(product => product.id === selectedId);
    //   this.setState({selectedProduct})
    //   console.log("renderProduct", selectedProduct);
    // }

    render() { 
      const {products, selectedProduct, wishList, cart, shipping, checkoutForm, originalProduct, searchedValue, login, register, errors, currentUser, member, orders} = this.state;
      console.log("checkout: ", this.state.orders);

      return ( 
        <div className="App">
            {/* toastify container */}
            <ToastContainer autoClose={2000} position={toast.POSITION.TOP_CENTER} />

            <PrimarySearchAppBar onCurrentUser={currentUser} wishList={wishList} cart={cart} onHandleSearch={this.handleSearch} searchedValue={searchedValue} onProducts={originalProduct} onHandleCatogriesProduct={this.handleCatogriesProduct} />
                <Switch>
                  <Route path="/home/logout" exact component={Logout} />
                  
                  <Route path="/home/wishList" exact render={(props)=> <WishList {...props} onCurrentUser={currentUser} onWishList={wishList} onHandleDelete={this.handleDelete} onHandleCart={this.handleCart} />} />
                  <Route path="/home/cart" exact render={(props)=> <Cart {...props} onCurrentUser={currentUser} shipping={shipping} onHandleCartDecrement={this.handleCartDecrement} onHandleCartIncrement={this.handleCartIncrement} onHandleDelete={this.handleCartDelete} onCart={cart} />} />
                  <Route path="/home/checkout" exact render={(props)=><Checkout {...props} shipping={shipping} onCart={cart} onHandleSubmit={this.handleSubmit} onHandleInputCheckout={this.handleInputCheckout} checkoutForm={checkoutForm} />} />
                  
                  <Route path="/home/login" exact render={(props)=> <LoginMember {...props} error={errors} loginSubmit={this.loginSubmit} onLogin={login} onHandleInput={this.handleInput}  />} />
                  <Route path="/home/register" exact render={(props)=><RegisterMember {...props} error={errors} registerSubmit={this.registerSubmit} onRegister={register} onHandleRedisterInput={this.handleRegInput} />} />
                {/* for nested routs */}
                  {!_.isEmpty(currentUser) ? 
                      <Route path='/home/profile/accountDetails' exact render={(props)=>(
                        <div className="ro" style={{marginRight: 0, display: 'flex', flexWrap: 'wrap', marginLeft: -15}}>
                          <div className="col-md-4 d-flex justify-content-center">
                            <Paginate {...props} />
                          </div>
                          <div className="col-md-6">
                            <AccountDetails {...props} error={errors} updateUserSubmit={this.updateUserSubmit} onRegister={register} onHandleRedisterInput={this.handleRegInput} />
                          </div>
                        </div>)} />
                    : <Redirect from="/home/profile" exact to="/home" />
                  }
                  {!_.isEmpty(currentUser) ? 
                      <Route path='/home/profile/orders' exact render={(props)=>(
                          <div className="ro" style={{marginRight: 0, display: 'flex', flexWrap: 'wrap', marginLeft: -15}}>
                            <div className="col-md-4 d-flex justify-content-center">
                              <Paginate />
                            </div>
                            <div className="col-md-8">
                              <Orders onOrder={orders} />
                            </div>
                          </div>
                        )} />
                    : <Redirect from="/home/profile" exact to="/home" />
                  }
                {/*============*/}
                  {!_.isEmpty(selectedProduct) ?
                    <Route path="/home/:id" exact render={(props)=> <ProductDetails {...props} onSubmitReview={this.submitReview} onHandleCart={this.handleCart} onSelectProduct={selectedProduct} />} />
                    : <Redirect from="/home/:id" exact to="/home" />
                  }
                  
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
