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

//order
export const getOrders = async() => {
    const {data} = await axios.get(`${apiEndpoint}/orders`)
    return data;
}

export const addToOrders = async(order) => {
    const {data} = await axios.post(`${apiEndpoint}/orders`, order);
    return data;
}

//register

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

//memebr

export const updateMember = async(member) => {
    const body = {...member};
    delete body.id;
    const {data} = await axios.put(`${apiEndpoint}/members/${member.id}`, body);
    return data;
}

export default productsData;