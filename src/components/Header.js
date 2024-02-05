import { Dropdown, Form } from 'react-bootstrap';
import '../styles/header.css';
import { useEffect, useState } from 'react';
import { fetchAllCategories } from '../services/filterApi';

export default function Header({categoryFilter}){
    const [categories, setCategories] = useState([]);

    const fetchData = () => {
        fetchAllCategories().then((res) => {
            if(res.status === 200 && res.data !== undefined){
                setCategories(res.data);
            }
        });
    }

    const filterByCategory = (event) => {
        const category = event.target.value;
        categoryFilter(category);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <tr>
            <th>###</th>
            <th>Title</th>
            <th>Brand</th>
            <th>
            <Form.Select aria-label="Default select example" onChange={filterByCategory}>
                <option>Category</option>
                {(categories !== undefined) && (categories.map((category) => (
                                <option key={category} value={category} >{category}</option>
                            )))}
            </Form.Select>
            </th>
            <th>Thumbnail</th>
        </tr>
    );
}