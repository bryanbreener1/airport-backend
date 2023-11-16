import axios from "axios"

export const httpClient = {
    get: async(url)=>{
        const {data} = await axios.get(url)
        return data
    },
    post: async(url, body)=>{
        throw new Error ('not implemented')
    },
    patch: async(url, body, term)=>{
        throw new Error ('not implemented')
    },    
    delete: async(url)=>{
        throw new Error ('not implemented')
    }
}