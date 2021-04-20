import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://data-huddle-be.herokuapp.com/'
});


export default instance;