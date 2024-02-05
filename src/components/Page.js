import { Col, Container, Navbar, Offcanvas, Row } from "react-bootstrap";
import fetchDetailApiData from "../services/filterApi";
import BarChart from "./BarChart";
import TableData from "./TableData";
import { useState } from "react";


function Page(){
    const [selectedData, setSelectedData] = useState([]);

    const handleDataSelect = async (selectedRows) => {
        const selectedApiData = await fetchSelectedData(selectedRows);
        setSelectedData(selectedApiData);
    };

    const fetchSelectedData = async (selectedRows) => {
        var result = [];
        await Promise.all(selectedRows.map((row) => fetchDetailApiData(row).then((res) => {
            if(res.status === 200){
                const obj = {
                    price : res.data.price,
                    discountPercentage : res.data.discountPercentage,
                    rating : res.data.rating,
                    stock : res.data.stock,
                    title : res.data.title
                }
                result.push(obj);
            }
        })));
        return result;
    };

    return(
        <div>
            <Navbar expand="lg" className="bg-body-tertiary" style={{marginBottom: '20px'}}>
                <Container>
                    <Navbar.Brand href="#"><strong>Data-Visualizer App</strong></Navbar.Brand>
                </Container>
            </Navbar>
            <Row>
                <Col lg='7' md='12' sm='12'><TableData onDataSelected={handleDataSelect} /></Col>
                <Col lg='5' md='12' sm='12'>{(selectedData !== undefined) && <BarChart data={ selectedData }/>}</Col>
            </Row>
        </div>
    );
}

export default Page;