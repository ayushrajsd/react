import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-burgrrr.firebaseio.com/'
})

export default instance;