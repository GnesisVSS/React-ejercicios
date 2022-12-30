import axios from 'axios';

// Default config for AXIOS
export default axios.create(
    {
        baseURL: 'https://api.chucknorris.io',
        responseType: 'json',
        success: function (data) {
            console.log(data);
        },
        // la app falla luego de los 6 seg
        timeout: 6000
    }
)
