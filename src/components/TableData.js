import { useState, useEffect } from "react";
import Header from "./Header";
import fetchApiData from "../services/api";
import PaginationComponent from "./Pagination";
import RowData from "./RowData";
import { Row, Table } from "react-bootstrap";
import { fetchDataByCategory } from "../services/filterApi";

function TableData({onDataSelected}){
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [recordsPerPage] = useState(10);

    const fetchData = () => {
        fetchApiData((currentPage-1)*recordsPerPage,recordsPerPage).then((res) => {
            if(res.status === 200 && res.data !== undefined && res.data.products !== undefined){
                setData(res.data.products);
                setTotalPages(res.data.total/recordsPerPage);
                setCurrentPage(res.data.skip/recordsPerPage+1);
            }
        });
    }

    const fetchCategoryData = (category) => {
        if(category === 'Category'){
            fetchData();
        }
        fetchDataByCategory(0, recordsPerPage, category).then((res) => {
            if(res.status === 200 && res.data !== undefined && res.data.products !== undefined){
                setData(res.data.products);
                setTotalPages(res.data.total/recordsPerPage);
                setCurrentPage(res.data.skip/recordsPerPage+1);
            }
        });
    }

    useEffect(() => {
        fetchData();
      }, [currentPage]);

    const updateCheckedRows =(id) => {
        const updatedRows = selectedRows.includes(id) 
                            ? selectedRows.filter((rowId) => rowId !== id) 
                            : [...selectedRows, id];

        setSelectedRows(updatedRows);
        onDataSelected(updatedRows);
    }

    return(
        <div style={{paddingLeft: '10px'}}>
            <Row>
            <Table striped bordered hover responsive>
            <thead>
                <Header categoryFilter={fetchCategoryData}/>
            </thead>
            <tbody>
            {(data !== undefined) && data.map((row) => (
                    <RowData key={row.id} props={row} checked={selectedRows.includes(row.id)} checkHandler={ () => updateCheckedRows(row.id)} />
                )) }
            </tbody>
            </Table>
            </Row>
            <Row className="float-end">
            {(data !== undefined) && (
                <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
            )}
            </Row>
        </div>
    );
}

export default TableData;