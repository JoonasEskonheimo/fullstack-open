import axios from "axios"
const baseUrl = `/api`
const personApiUrl = `${baseUrl}/persons`

const getAll = () => {
    return axios.get(personApiUrl).then(response => response.data)
}

const create = newObject => {
    return axios.post(personApiUrl, newObject).then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${personApiUrl}/${id}`, newObject).then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${personApiUrl}/${id}`).then(response => response)
}

export default { getAll, create, update, remove }