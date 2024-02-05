import { Form, Image } from 'react-bootstrap';
import '../styles/row.css';

export default function RowData({props, checked, checkHandler}){
    return(
        <tr>
            <td>
                <Form.Check checked={checked} onChange={checkHandler} />
            </td>
            <td>{props.title}</td>
            <td>{props.brand}</td>
            <td>{props.category}</td>
            <td><Image className='thumbnail-image' src={props.thumbnail} roundedCircle /></td>
        </tr>
    );
}