import axios from "axios";
import Constants from 'expo-constants';

const requests = axios.create({
    baseURL: Constants!.expoConfig!.extra!.urlApi
});

export default requests;