import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons'

const create = personObject => {
    const request = axios.post(baseUrl,personObject)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const get = (id) => {
    const request = axios.get(`${baseUrl}?id=${id}`)
    return request.then(response => response.data)
}

const update = (id,personObject) => {
    const request = axios.put(`${baseUrl}/${id}`,personObject)
    return request.then(response => response.data)
}

const deleteId = id => {
   axios.delete(`${baseUrl}/${id}`)
}



export default { create, getAll, get, update, deleteId }