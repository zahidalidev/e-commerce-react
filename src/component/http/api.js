import axios from "axios"

const apiEndpoint = 'https://my-json-server.typicode.com/zahidalidev/demo';


//products
const productsData = async() => {
    const {data} = await axios.get(`${apiEndpoint}/products`);
    return data;
}

// wishList
export const getWishList = async() => {
    const {data} = await axios.get(`${apiEndpoint}/wishList`);
    return data;
}

export const addProductWishList = async(product) => {
    const {data} = await axios.post(`${apiEndpoint}/wishList`, product);
    return data;
}

export const deleteProductFromWishList = async(id) => {
    const {data} = await axios.delete(`${apiEndpoint}/wishList/${id}`);
    return data;
}

//cart
export const getCart = async() =>{
    const {data} = await axios.get(`${apiEndpoint}/cart`);
    return data;
}
export const addToCart = async(product) => {
    const {data} = await axios.post(`${apiEndpoint}/cart`, product);
    return data;
}
export const deleteFromCart = async(id) => {
    const {data} = await axios.delete(`${apiEndpoint}/cart/${id}`);
    return data;
}

export default productsData;