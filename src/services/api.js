import axios from "axios";

const BASE_URL = 'https://dummyjson.com/';
const PRODUCTS_URL = "products?select=id,title,brand,category,thumbnail";
const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

export default function fetchApiData(offset, limit){
    if(offset === undefined || offset === '') offset = DEFAULT_OFFSET;
    if(limit === undefined || limit === '') limit = DEFAULT_LIMIT;
    return axios.get(BASE_URL+PRODUCTS_URL+'&skip='+offset+'&limit='+limit);
}