import APIRequest from "../utils/config/axios.config";

export function getRandomJoke(){
    return APIRequest.get('/jokes/random'); //respuesta que trae desde https://randomuser.me/api/
}