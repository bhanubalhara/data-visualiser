import axios from "axios";

const BASE_URL = 'https://dummyjson.com/';
const PRODUCTS_URL = "products/";
const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

export default function fetchDetailApiData(id){
    return axios.get(BASE_URL+PRODUCTS_URL+id);
}

export function fetchAllCategories(){
    return axios.get(BASE_URL+PRODUCTS_URL+'categories');
}

export function fetchDataByCategory(offset, limit, category){
    if(offset === undefined || offset === '') offset = DEFAULT_OFFSET;
    if(limit === undefined || limit === '') limit = DEFAULT_LIMIT;
    return axios.get(BASE_URL+PRODUCTS_URL+'category/'+category+"?skip="+offset+'&limit='+limit);
}