import axios from "axios"

const apiEndpoint = 'https://my-json-server.typicode.com/zahidalidev/fakeJsonProducts';


//products
const productsData = async() => {
    const {data} = await axios.get(`${apiEndpoint}/products`);
    return data;
}
export const updateProduct = async(product) => {
    const body = {...product};
    delete body.id;
    const {data} = await axios.put(`${apiEndpoint}/products/${product.id}`, body);
    return data;
}
export const deleteProduct = async(product) => {
    const {data} = await axios.delete(`${apiEndpoint}/products/${product.id}`);
    return data;
}

export const addProduct = async(product) =>{
    const {data} = await axios.post(`${apiEndpoint}/products`, product);
    return data;
}
//order
export const getOrders = async() => {
    const {data} = await axios.get(`${apiEndpoint}/orders`)
    return data;
}

export const addToOrders = async(order) => {
    const {data} = await axios.post(`${apiEndpoint}/orders`, order);
    return data;
}
export const updateOrder = async(order) => {
    const body = {...order};
    delete body.id;
    const {data} = await axios.put(`${apiEndpoint}/orders/${order.id}`, body);
    return data;
}

//register

export const getVendors = async() => {
    const {data} = await axios.get(`${apiEndpoint}/vendors`);
    return data;
}
export const addVendor = async(vendor) => {
    const {data} = await axios.post(`${apiEndpoint}/vendors`, vendor);
    return data;
}
export const deleteVendor = async(ID) => {
    const {data} = await axios.delete(`${apiEndpoint}/vendors/${ID}`);
    return data;
}

export const updateVendor = async(vendor) => {
    const body = {...vendor};
    delete body.id;
    const {data} = await axios.put(`${apiEndpoint}/vendors/${vendor.id}`, body);
    return data;
}

// vendor

export const getMembers = async() => {
    const {data} = await axios.get(`${apiEndpoint}/members`);
    return data;
}
export const addMember = async(user) => {
    const {data} = await axios.post(`${apiEndpoint}/members`, user);
    return data;
}
export const deleteMember = async(ID) => {
    const {data} = await axios.delete(`${apiEndpoint}/members/${ID}`);
    return data;
}

export const updateMember = async(member) => {
    const body = {...member};
    delete body.id;
    const {data} = await axios.put(`${apiEndpoint}/members/${member.id}`, body);
    return data;
}

export default productsData;