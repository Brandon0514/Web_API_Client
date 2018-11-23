import axios from 'axios';

export const register = newUser => {
    return axios
        .post('https://damp-garden-38136.herokuapp.com/register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password,
        })
        .then(res => {
            return res.data
        })
}
    
export const login = user => {
    return axios
        .post('https://damp-garden-38136.herokuapp.com/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

