import React, { Component } from 'react';
import axios from 'axios';
import _ from "lodash";
const BASE_URL = 'http://localhost:5000/';
 
class NewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            imageUrls: [],
            message: '',
            fileError: {file: null}
        }
    }
    selectImages = (event) => {
        let images = []
        for (var i = 0; i < event.target.files.length; i++) {
            images[i] = event.target.files.item(i);
        }
        images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
        let message = `${images.length} valid images selected`;

        let fileError = {};
        if(images.length === 0){
            fileError.file = "Upload picture";
        }

        this.setState({ images, message, fileError})
    }
 
    uploadImages = async(event) => {
        event.preventDefault();
        let imgURL = []
        const uploaders = this.state.images.map(async(image) => {
            const data2 = new FormData();
            data2.append("image", image, image.name);
            // Make an AJAX upload request using Axios
            const {data} = await axios.post(BASE_URL + 'upload', data2);
            this.setState({
                imageUrls: [data.imageUrl, ...this.state.imageUrls ]
            });
            imgURL.push(data.imageUrl);
            return data;
        });
        // Once all the files are uploaded 
        try{
            await axios.all(uploaders);
            console.log("done");
        }catch(ex){
            alert(ex.message);
        }
        this.props.onSubmitProductForm(imgURL);

        let fileError = {};
        if(this.state.images.length === 0){
            fileError.file = "Upload picture";
        }
        this.setState({fileError});

    }
 
    render() {
        const {onProductForm, onHandleProductInput, error} = this.props;
        const {fileError} = this.state;
       
        return (
        <React.Fragment>
            <p style={{fontSize: 30, marginTop: 100}}>New Product</p>
            <form onSubmit={this.uploadImages} style={{padding: 10}} align="left">
                            <diV className="row">
                                <div className="form-group col-md-6">
                                <label for="exampleInputEmail1">Pictures (maximum 4)*</label>        
                                <input 
                                    style={{paddingBottom: 35}}
                                    className="form-control"
                                    type="file" 
                                    onChange={this.selectImages} 
                                    multiple
                                />
                                {fileError.file && <div className="alert alert-danger">{fileError.file}</div>}
                                </div>        
                                <div className="form-group col-md-6">
                                    <p style={{marginTop: 40}} className="text-info">{this.state.message}</p>
                                </div>    
                            </diV>
                            <diV className="row">
                                <div className="form-group col-md-6">
                                    <label for="exampleInputEmail1">Title*</label>        
                                    <input
                                        style={{marginBottom: 20}}
                                        placeholder="title"
                                        className="form-control"
                                        id="title" 
                                        name="title"
                                        value={onProductForm.title}
                                        type="text"
                                        autoFocus = {true}
                                        onChange={onHandleProductInput}
                                    />
                                    {error.title && <div className="alert alert-danger">{error.title}</div>}
                                </div>        
                                <div className="form-group col-md-6">
                                    <label for="exampleInputEmail1">Type*</label>        
                                    <input
                                        style={{marginBottom: 20}}
                                        placeholder="type"
                                        className="form-control"
                                        id="type" 
                                        name="type"
                                        value={onProductForm.type}
                                        type="text"
                                        autoFocus = {true}
                                        onChange={onHandleProductInput}
                                    />
                                    {error.type && <div className="alert alert-danger">{error.type}</div>}
                                </div>    
                            </diV>
                            
                            <diV className="row">        
                                <div className="form-group col-md-6">
                                    <label for="exampleInputEmail1">Gender*</label>        
                                    <input
                                        style={{marginBottom: 20}}
                                        placeholder="gender"
                                        className="form-control"
                                        id="gender" 
                                        name="gender"
                                        value={onProductForm.gender}
                                        type="text"
                                        autoFocus = {true}
                                        onChange={onHandleProductInput}
                                    />
                                    {error.gender && <div className="alert alert-danger">{error.gender}</div>}
                                </div>        
                                <div className="form-group col-md-6">
                                    <label for="exampleInputEmail1">Company*</label>        
                                    <input
                                        style={{marginBottom: 20}}
                                        placeholder="company"
                                        className="form-control"
                                        id="company" 
                                        name="company"
                                        value={onProductForm.company}
                                        type="text"
                                        autoFocus = {true}
                                        onChange={onHandleProductInput}
                                    />
                                    {error.company && <div className="alert alert-danger">{error.company}</div>}
                                </div>
                            </diV>
                            <diV className="row">        
                                <div className="form-group col-md-2">
                                    <label for="exampleInputEmail1">Price*</label>        
                                    <input
                                        style={{marginBottom: 20}}
                                        placeholder="price"
                                        className="form-control"
                                        id="price" 
                                        name="price"
                                        value={onProductForm.price}
                                        type="text"
                                        autoFocus = {true}
                                        onChange={onHandleProductInput}
                                    />
                                    {error.price && <div className="alert alert-danger">{error.price}</div>}
                                </div>        
                                <div className="form-group col-md-2">
                                    <label for="exampleInputEmail1">Stock*</label>        
                                    <input
                                        style={{marginBottom: 20}}
                                        placeholder="stock"
                                        className="form-control"
                                        id="stock" 
                                        name="stock"
                                        value={onProductForm.stock}
                                        type="text"
                                        autoFocus = {true}
                                        onChange={onHandleProductInput}
                                    />
                                    {error.stock && <div className="alert alert-danger">{error.stock}</div>}
                                </div>
                                <div className="form-group col-md-8">
                                    <label for="exampleInputEmail1">Colours*</label>        
                                    <input
                                        style={{marginBottom: 20}}
                                        placeholder="Enter comma seperated values eg. red,green,blue"
                                        className="form-control"
                                        id="color" 
                                        name="color"
                                        value={onProductForm.color}
                                        type="text"
                                        autoFocus = {true}
                                        onChange={onHandleProductInput}
                                    />
                                    {error.color && <div className="alert alert-danger">{error.color}</div>}
                                </div>
                            </diV>        
                            <div className="form-group">
                                <label for="exampleInputEmail1">Description*</label>        
                                <textarea
                                    style={{marginBottom: 20}}
                                    placeholder="about"
                                    className="form-control"
                                    id="about" 
                                    name="about"
                                    value={onProductForm.about}
                                    type="text"
                                    autoFocus = {true}
                                    onChange={onHandleProductInput}
                                />
                                {error.about && <div className="alert alert-danger">{error.about}</div>}      
                            </div>
                                 {/* Submit button */}
                            <button
                                disabled={(!_.isEmpty(error)) || (fileError.file === null)}
                                className="btn btn-outline-primary"
                                style={{marginTop: 30, marginBottom: 150}}
                            >
                                Add Product
                            </button>
                        </form>
        </React.Fragment>
        );
        }
    }

export default NewProduct;