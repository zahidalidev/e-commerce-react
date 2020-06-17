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
import Admin from "./component/admin/adminProfile"
import AdminPaginate from "./component/admin/adminPaginate";
import AllProducts from "./component/admin/allProducts";
import EditProduct from "./component/admin/editProduct";
import Users from "./component/admin/users";
import NewProduct from "./component/admin/newProduct";
import Footer from "./component/footer/footer";
import VendorPaginate from "./component/vendor/vendorPaginate";
import VendorProducts from "./component/vendor/vendorProducts";
import Vendor from "./component/vendor/vendorProfile";
import RegisterAsVendor from "./component/vendor/vendorForm";
import VendorsOrders from "./component/vendor/vendorOrders";
import VendorsOrderEarning from "./component/vendor/vendorsOrderEarning";
import Slider from "./component/slider/slider";
// http 
import productsData from "./component/http/api";
import {updateMember} from "./component/http/api";
import {getOrders} from "./component/http/api";
import {getMembers} from "./component/http/api";
import {addMember} from "./component/http/api";
import {updateProduct} from "./component/http/api";
import {deleteProduct} from "./component/http/api";
import {deleteMember} from "./component/http/api";
import {addProduct} from "./component/http/api";
import {getVendors} from "./component/http/api";
import {updateOrder} from "./component/http/api";

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
    currentUser: {},
    productForm: {title: "", type: "", gender: "", company: "", price: "", stock: "", color: "", about: ""},
    editProductId: "",
    vendor_id: null,
    vendors: [],
   }
  
   async componentDidMount(){
     try{
        const products = await productsData();
        const orders = await getOrders();
        const member = await getMembers();
        const currentUser = await this.getCurrentUser();
        const vendors = await getVendors();
        
        let wishList = [];
        let cart = [];
        // console.log("(!_.isEmpty(currentMemberLogin))", (!_.isEmpty(currentUser)))
        ///////
        let userExistInDataBase = false;
        if(!_.isEmpty(currentUser)){
           member.map(user=>{
              if(user.email === currentUser.email){
                userExistInDataBase =  true;
              }
            }
          )
        }
        // console.log("userExistInDataBase", userExistInDataBase);
        ///////
        let currentMember = [];

        if(userExistInDataBase){
          currentMember = member.filter(user=>(user.email === currentUser.email));
          const index = member.indexOf(currentMember[0])
          // console.log("currentMember: ", currentMember[0], index, member);
          wishList = member[index].wishList;
          cart = member[index].cart;
        }
        const currentMemberLogin = {...currentMember[0]};
        // fill update form
        let register = {};
        if(userExistInDataBase){
          register = {
            fullName: currentMemberLogin.fullName,
            email: currentMemberLogin.email,
            phoneNumber: currentMemberLogin.phoneNumber,
            password: currentMemberLogin.password,
            confirmPassword: currentMemberLogin.password
          }
        }
        let vendor_id = null;
        if(currentMemberLogin.isVendor !== null){
          vendor_id = currentMemberLogin.vender_id;
        }
        this.setState({products, wishList, cart, orders, originalProduct: products, member, currentUser: currentMemberLogin, register, vendor_id, vendors});
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
        console.log("user error: ", ex.message);
      }
    }

    // product details
    handleProduct = (product) => {
      this.setState({selectedProduct: product});
      console.log("selectedProduct: ", product);
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
      if(member[index].cart[index2].quantity > 1){
        member[index].cart[index2].quantity = member[index].cart[index2].quantity - 1;
        this.setState({member, cart: member[index].cart});
        try{
          const result = await updateMember(member[index]);
        }catch(error){
          console.log("cart delete error", error.message);
        }
      }
      else{
        toast.error("minimumn 1 required");
      }
    }
    handleCartIncrement = async(product) => {
      const member = [...this.state.member];
      const currentMember = member.filter(user=>(user.email === this.state.currentUser.email));
      const index = member.indexOf(...currentMember);

      const products = [...member[index].cart];

      const index2 = products.indexOf(product);
      if(member[index].cart[index2].quantity < member[index].cart[index2].stock){
        member[index].cart[index2].quantity = member[index].cart[index2].quantity + 1;
        this.setState({member, cart: member[index].cart});
  
        try{
          const result = await updateMember(member[index]);
        }catch(error){
          console.log("cart delete error", error.message);
        }
      }
      else{
        toast.error("Out of stock");
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
        
        const date = new Date();
        const options = {year: 'numeric', month: 'numeric', day: 'numeric' };
        const orderDate = date.toLocaleDateString(undefined, options);
        
        const checkoutForm = {...this.state.checkoutForm, status: 'pending', orderDate: orderDate};
        checkoutForm.cart = this.state.cart;
        
        const member = [...this.state.member];
        const currentMember = member.filter(user=>(user.email === this.state.currentUser.email));

        const index = member.indexOf(...currentMember);
        // const originalMemberOrders = [...member[index].orders];
        
        member[index].orders[ member[index].orders.length] = checkoutForm;
        // console.log("member[index].orders: ", member[index].orders, checkoutForm, index);

        const products = [...this.state.products];
        for(let i = 0; i < this.state.cart.length; i++){

          const product = products.filter(pro=>pro.id === this.state.cart[i].id)
          let index = products.indexOf(...product);
          products[index].stock = products[index].stock - this.state.cart[i].quantity;
          try{
            const result = await updateProduct(products[index]);
          }catch(ex){
            console.log("product updating error: ", ex.message);
          }
        }
        member[index].cart = [];
        this.setState({member, orders: member[index].orders, products, originalProduct: products, cart: []});
        this.setState({member});
        
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
      let result = [];
      member.map(user=>{
        if((user.email === login.email) && (user.password === login.password)){
          result.push(user);
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
        this.setState({products, selectedProduct:  products[index], originalProduct: products});

        try{
          const result = await updateProduct(products[index])
        }catch(ex){
          console.log("review error: ", ex.message);
        }
      }else{
        toast.error("login to submit your review");
      }
    }

    // admin Product
    handleProductDelete = async(product) => {
      const products = this.state.products.filter(pro => pro.id !== product.id);;
      this.setState({products, originalProduct: products});
      toast.success(`${product.title} is deleted`)
      try{
        const result = await deleteProduct(product);
      }catch(ex){
        console.log("deleting product error", ex.message);
      }
    }
    // Admin User
    handleUserDelete = async(user) => {
      const member = this.state.member.filter(mem => mem.email !== user.email);
      this.setState({member});
      toast.success(`${user.email} is deleted`)
      try{
        const result = await deleteMember(user.id);
      }catch(ex){
        console.log("deleting product error", ex.message);
      }
    }
    // validation for add new product form
    productSchema = {
      title: Joi.string().required().label("Title"),
      type: Joi.string().required().label("Type"),
      gender: Joi.string().required().label("Gender"),
      company: Joi.string().required().label("Company"),
      price: Joi.string().required().label("price"),
      stock: Joi.string().required().label("Stock"),
      color: Joi.string().required().label("Colour"),
      about: Joi.string().required().min(160).label("about"),
    }
    validdateAddProduct = ({name, value}) => {
      const schema = {[name]: this.productSchema[name]};
      const obj = {[name]: value};
      const {error} = Joi.validate(obj, schema);
      return error ? error.details[0].message: null;
    }
    // product form
    handleProductFormInput = (event) => {
      const errors = {...this.state.errors};
      const errorMessage = this.validdateAddProduct(event.currentTarget);
      if(errorMessage) errors[event.currentTarget.name] = errorMessage;
      else delete errors[event.currentTarget.name];
      
      const productForm = {...this.state.productForm};
      productForm[event.currentTarget.name] = event.currentTarget.value;
      this.setState({productForm, errors});
      console.log("error: ", errors);
    }

    submitProductValidate = (imageUrl) => {
      const options = {abortEarly: false};
      const productForm = {...this.state.productForm};
      const {error} = Joi.validate(productForm, this.productSchema, options);
      if(!error) return null;
      const errors = [];
      for(let item of error.details) errors[item.path[0]] = item.message;
      return errors;
    }
          // add product
    submitProductForm = async(imageURL) => {
      const errors = this.submitProductValidate(imageURL);
      this.setState({errors: errors || {}});
      if(errors) return;

      const products = [...this.state.products];
      const {productForm} = this.state;
      const colorArray = productForm.color.split(',');
      const newProduct = {
        index: products.length,
        vendor_id: this.state.vendor_id,
        picture: imageURL[0],
        pictures: [...imageURL],
        price: parseInt(productForm.price),
        color: colorArray,
        stock: parseInt(productForm.stock),
        type: productForm.type,
        gender: productForm.gender,
        title: productForm.title,
        company: productForm.company,
        about: productForm.about,
        relatedProducts : [],
        reviews: [
          {totalRating: 0, ratings: 0, comments: []}  
        ]
      }
      try{
        const productWithId = await addProduct(newProduct);
        products.push(productWithId);
        this.setState({products, originalProduct: products})
        toast.success(`product ${newProduct.title} is added successfully`);
      }catch(ex){
        toast.error("product is not added error: ", ex.message);
      }
    }

    populateProduct = (id) => {
      const {products} = this.state;
      const product = products.filter(pro => pro.id === id);
      let color = "";
      for(let i = 0; i <= product[0].color.length; i++){
        color = product[0].color + ",";
      }
      color = color.substr(0, color.length - 1);
      const productForm = {
        title: product[0].title,
        type: product[0].type,
        gender: product[0].gender,
        company: product[0].company,
        price: product[0].price,
        stock: product[0].stock,
        color: color,
        about: product[0].about,
      }
      this.setState({productForm, editProductId: id});
    }
            // update product
    submitEditProductForm = async(imgURL) => {
      const products = [...this.state.products];
      const {productForm} = this.state;
      const colorArray = productForm.color.split(',');
      const product = products.filter(pro => pro.id === this.state.editProductId);
      
      const newProduct = {
        id: product[0].id,
        index: product[0].index,
        vendor_id: this.state.vendor_id,
        picture: imgURL[0],
        pictures: [...imgURL],
        price: productForm.price,
        color: colorArray,
        stock: productForm.stock,
        type: productForm.type,
        gender: productForm.gender,
        title: productForm.title,
        company: productForm.company,
        about: productForm.about,
        relatedProducts : product[0].relatedProducts,
        reviews: product[0].reviews
      }
      const index = products.indexOf(...product);
      products[index] = newProduct;
      this.setState({products, originalProduct: products})
      try{
        await updateProduct(newProduct);
        toast.success(`product ${newProduct.title} is updated successfully`);
      }catch(ex){
        toast.error("product is not added error: ", ex.message);
      }
    }

    // vendor data
    handleVendorSubmit = async(vendor) => {
      const originalMembers = [...this.state.member];
      const members = [...this.state.member];
      const currentUser = {...this.state.currentUser};
      const member = members.filter(user=> user.id === currentUser.id);
      const index = members.indexOf(...member);

      members[index].vender_id = vendor.id
      
      this.setState({members, vendor_id: vendor.id});
      try{
        await updateMember(members[index]);
        toast.success("request submitted");      
      }catch(ex){
        console.log("register error: ", ex.message);
        this.setState({member: originalMembers});
      }
    }
    handleVendorUpdate = (vendor) => {
      const vendors = [...this.state.vendors];
      const currentVendor = vendors.filter(ven=> ven.id === this.state.vendor_id);
      const index = vendors.indexOf(currentVendor[0]);
      vendors[index] = vendor;
      this.setState({vendors});
      toast.success("updated");
      console.log("indexx: ", vendors);
    }

    // update order status
    updateStatus = async(onOrder, status) => {
      const originalOrders = [...this.state.orders];
      const orders = [...this.state.orders];
      const index = orders.indexOf(onOrder);
      orders[index].status = status;
      this.setState({orders});
      try{
        const result = await updateOrder(orders[index]);
        console.log("onOrder: ", result);
      }catch(ex){
        console.log("Update product error: ",ex.message);
        this.setState({orders: originalOrders});
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
      const {products, selectedProduct, wishList, cart, shipping, checkoutForm, originalProduct, searchedValue, login, register, errors, currentUser, member, orders, productForm, vendor_id, vendors} = this.state;
      // console.log("selectedProduct render: ", selectedProduct);

      return ( 
        <div className="App">
            {/* toastify container */}
            <ToastContainer autoClose={2000} position={toast.POSITION.TOP_CENTER} />

            <PrimarySearchAppBar onVender_id={vendor_id} onCurrentUser={currentUser} wishList={wishList} cart={cart} onHandleSearch={this.handleSearch} searchedValue={searchedValue} onProducts={originalProduct} onHandleCatogriesProduct={this.handleCatogriesProduct} />
            {
              window.location.pathname === "/home" ?
              <Slider startTimeInSeconds="300" /> : null
            }    
                <Switch>
                  <Route path="/home/logout" exact component={Logout} />
                  
                  <Route path="/home/wishList" exact render={(props)=> <WishList {...props} onCurrentUser={currentUser} onWishList={wishList} onHandleDelete={this.handleDelete} onHandleCart={this.handleCart} />} />
                  <Route path="/home/cart" exact render={(props)=> <Cart {...props} onCurrentUser={currentUser} shipping={shipping} onHandleCartDecrement={this.handleCartDecrement} onHandleCartIncrement={this.handleCartIncrement} onHandleDelete={this.handleCartDelete} onCart={cart} />} />
                  <Route path="/home/checkout" exact render={(props)=><Checkout {...props} shipping={shipping} onCart={cart} onHandleSubmit={this.handleSubmit} onHandleInputCheckout={this.handleInputCheckout} checkoutForm={checkoutForm} />} />
                  
                  <Route path="/home/login" exact render={(props)=> <LoginMember {...props} error={errors} loginSubmit={this.loginSubmit} onLogin={login} onHandleInput={this.handleInput}  />} />
                  <Route path="/home/register" exact render={(props)=><RegisterMember {...props} error={errors} registerSubmit={this.registerSubmit} onRegister={register} onHandleRedisterInput={this.handleRegInput} />} />

                {/* user nested routs */}
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
                              <Orders {...props} onOrder={orders} />
                            </div>
                          </div>
                        )} />
                    : <Redirect from="/home/profile" exact to="/home" />
                  }
                {/* admin Routes nested */}

                {!_.isEmpty(currentUser) ? 
                      <Route path='/home/admin/profile' exact render={(props)=>(
                        <div className="ro" style={{marginRight: 0, display: 'flex', flexWrap: 'wrap', marginLeft: -20}}>
                          <div className="col-md-2 d-flex justify-content-center">
                            <AdminPaginate {...props} />
                          </div>
                          <div className="col-md-8">
                            <Admin {...props} error={errors} updateUserSubmit={this.updateUserSubmit} onRegister={register} onHandleRedisterInput={this.handleRegInput} />
                          </div>
                        </div>)} />
                    : <Redirect from="/home/admin" exact to="/home" />
                  }
                  {!_.isEmpty(currentUser) ? 
                      <Route path='/home/admin/products' exact render={(props)=>(
                          <div className="ro" style={{marginRight: 0, display: 'flex', flexWrap: 'wrap', marginLeft: -20}}>
                            <div className="col-md-2 d-flex justify-content-center">
                              <AdminPaginate />
                            </div>
                            <div className="col-md-10" >
                              <AllProducts {...props} onProducts={products} onHandleProductDelete = {this.handleProductDelete} />
                            </div>
                          </div>
                        )} />
                    : <Redirect from="/home/admin" exact to="/home" />
                  }
                  {!_.isEmpty(currentUser) ? 
                      <Route path='/home/admin/users' exact render={(props)=>(
                          <div className="ro" style={{marginRight: 0, display: 'flex', flexWrap: 'wrap', marginLeft: -20}}>
                            <div className="col-md-2 d-flex justify-content-center">
                              <AdminPaginate />
                            </div>
                            <div className="col-md-10" >
                              <Users {...props} onUsers={member} onHandleUserDelete={this.handleUserDelete} />
                            </div>
                          </div>
                        )} />
                    : <Redirect from="/home/admin" exact to="/home" />
                  }
                  {/* new product */}
                  {!_.isEmpty(currentUser) ? 
                      <Route path='/home/admin/newproduct' exact render={(props)=>(
                          <div className="ro" style={{marginRight: 0, display: 'flex', flexWrap: 'wrap', marginLeft: -20}}>
                            <div className="col-md-2 d-flex justify-content-center">
                              <AdminPaginate />
                            </div>
                            <div className="col-md-8 mx-auto" >
                              <NewProduct {...props}  error={errors} onSubmitProductForm = {this.submitProductForm} onProductForm={productForm} onHandleProductInput={this.handleProductFormInput} />
                            </div>
                          </div>
                        )} />
                    : <Redirect from="/home/admin" exact to="/home" />
                  }
                  {/* edit product */}
                  {!_.isEmpty(currentUser) ? 
                      <Route path='/home/admin/products/:id' exact render={(props)=>(
                          <div className="ro" style={{marginRight: 0, display: 'flex', flexWrap: 'wrap', marginLeft: -20}}>
                            <div className="col-md-2 d-flex justify-content-center">
                              <AdminPaginate />
                            </div>
                            <div className="col-md-8 mx-auto" >
                              <EditProduct {...props} error={errors} onPopulateProduct={this.populateProduct} onSubmitProductForm = {this.submitEditProductForm} onProductForm={productForm} onHandleProductInput={this.handleProductFormInput} />
                            </div>
                          </div>
                        )} />
                    : <Redirect from="/home/admin" exact to="/home" />
                  }

                  {/* ************ */}

                  {/* Vendor */}

                  {!_.isEmpty(currentUser) ? 
                      <Route path='/home/vendor/profile' exact render={(props)=>(
                        <div className="ro" style={{marginRight: 0, display: 'flex', flexWrap: 'wrap', marginLeft: -20}}>
                          <div className="col-md-2 d-flex justify-content-center">
                            <VendorPaginate {...props} />
                          </div>
                          <div className="col-md-8">
                            <Vendor {...props}  onVendors = {vendors} onVendor_id = {vendor_id} onHandleVendorUpdate={this.handleVendorUpdate} error={errors} updateUserSubmit={this.updateUserSubmit} onRegister={register} onHandleRedisterInput={this.handleRegInput} />
                          </div>
                        </div>)} />
                    : <Redirect from="/home/vendor" exact to="/home" />
                  }
                  {!_.isEmpty(currentUser) ? 
                      <Route path='/home/vendor/products' exact render={(props)=>(
                          <div className="ro" style={{marginRight: 0, display: 'flex', flexWrap: 'wrap', marginLeft: -20}}>
                            <div className="col-md-2 d-flex justify-content-center">
                              <VendorPaginate />
                            </div>
                            <div className="col-md-10" >
                              <VendorProducts {...props} v_id={vendor_id} onProducts={products} onHandleProductDelete = {this.handleProductDelete} />
                            </div>
                          </div>
                        )} />
                    : <Redirect from="/home/admin" exact to="/home" />
                  }
                  {/* new product */}
                  {!_.isEmpty(currentUser) ? 
                      <Route path='/home/vendor/newproduct' exact render={(props)=>(
                          <div className="ro" style={{marginRight: 0, display: 'flex', flexWrap: 'wrap', marginLeft: -20}}>
                            <div className="col-md-2 d-flex justify-content-center">
                              <VendorPaginate />
                            </div>
                            <div className="col-md-8 mx-auto" >
                              <NewProduct {...props}  error={errors} onSubmitProductForm = {this.submitProductForm} onProductForm={productForm} onHandleProductInput={this.handleProductFormInput} />
                            </div>
                          </div>
                        )} />
                    : <Redirect from="/home/admin" exact to="/home" />
                  }
                  {/* edit product */}
                  {!_.isEmpty(currentUser) ? 
                      <Route path='/home/vendor/products/:id' exact render={(props)=>(
                          <div className="ro" style={{marginRight: 0, display: 'flex', flexWrap: 'wrap', marginLeft: -20}}>
                            <div className="col-md-2 d-flex justify-content-center">
                              <VendorPaginate />
                            </div>
                            <div className="col-md-8 mx-auto" >
                              <EditProduct {...props} error={errors} onPopulateProduct={this.populateProduct} onSubmitProductForm = {this.submitEditProductForm} onProductForm={productForm} onHandleProductInput={this.handleProductFormInput} />
                            </div>
                          </div>
                        )} />
                    : <Redirect from="/home/admin" exact to="/home" />
                  }
                  {/* order products */}
                  {!_.isEmpty(currentUser) ? 
                      <Route path='/home/vendor/orders' exact render={(props)=>(
                        <div className="ro" style={{marginRight: 0, display: 'flex', flexWrap: 'wrap', marginLeft: -23}}>
                          <div className="col-md-2 d-flex justify-content-center">
                            <VendorPaginate />
                          </div>
                          <div className="col-md-8 mx-auto">
                            <VendorsOrders {...props} onOrder={orders} onVendor_id = {vendor_id} onUpdateStatus={this.updateStatus} />
                          </div>
                        </div>
                      )} />
                    : <Redirect from="/home/admin" exact to="/home" />
                  }
                  {/* earning */}
                  {!_.isEmpty(currentUser) ? 
                      <Route path='/home/vendor/earning' exact render={(props)=>(
                        <div className="ro" style={{marginRight: 0, display: 'flex', flexWrap: 'wrap', marginLeft: -20}}>
                          <div className="col-md-2 d-flex justify-content-center">
                            <VendorPaginate />
                          </div>
                          <div className="col-md-8 mx-auto">
                            <VendorsOrderEarning {...props} onOrder={orders} onVendor_id = {vendor_id} />
                          </div>
                        </div>
                      )} />
                    : <Redirect from="/home/admin" exact to="/home" />
                  }
                  
                  {/* ************ */}
                  
                  <Route path="/home/register_as_vendor" exact render={(props) => <RegisterAsVendor onHandleVendorSubmit={this.handleVendorSubmit} {...props} />} />



                  {!_.isEmpty(selectedProduct) ?
                    <Route path="/home/:id" exact render={(props)=> <ProductDetails {...props} onSubmitReview={this.submitReview} onHandleCart={this.handleCart} onSelectProduct={selectedProduct} />} />
                    : <Redirect from="/home/:id" exact to="/home" />
                  }
                  
                  <Route path="/home" render={(props) => <Products {...props} onProducts={products} onHandleCart={this.handleCart} onHandleProductDetail={this.handleProduct} onHandleWishList={this.handleWishList} />} />
                  
                  <Route path="/not-found/" component={NotFound} />
                  <Redirect from = "/" exact to="home" />
                  <Redirect to="not-found" />
                  
                </Switch>
             <Footer />
          </div>
     );
  }
}
 
export default App;
