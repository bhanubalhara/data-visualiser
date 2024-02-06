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
    const [category, setCategory] = useState('Category');
    const [firstLoad, setFirstLoad] = useState(true);

    const fetchData = async () => {
        fetchApiData((currentPage-1)*recordsPerPage,recordsPerPage).then((res) => {
            if(res.status === 200 && res.data !== undefined && res.data.products !== undefined){
                const result = res.data.products;
                setTotalPages(res.data.total/recordsPerPage);
                setCurrentPage(res.data.skip/recordsPerPage+1);
                setData(result);
            }
        });
    }

    const fetchCategoryData = (category) => {
        fetchDataByCategory(0, recordsPerPage, category).then((res) => {
            if(res.status === 200 && res.data !== undefined && res.data.products !== undefined){
                setData(res.data.products);
                console.log('currentPage: '+currentPage);
                console.log('totalPage: '+totalPages);
            }
        });
    }

    useEffect(() => {
        fetchData();
      }, [currentPage]);

    useEffect(() => {
        console.log(firstLoad);
        if(firstLoad === true){
            initializeChecks();
        }
    },[data]);

    useEffect(() => {
        if(category === 'Category'){
            fetchData();
        }else{
            setCurrentPage(1);
            setTotalPages(1);
            fetchCategoryData(category);
        }
      }, [category]);

    useEffect(() => {
        if(firstLoad === false){
            const updatedRows = [];
            setSelectedRows(updatedRows);
            onDataSelected(updatedRows);
        }
    },[firstLoad]);

    const initializeChecks = () => {
        if(currentPage === 1 && category === 'Category'){
            const updatedRows = [];
            data.slice(0,5).map((row) => {
                updatedRows.push(row.id);
            });

            setSelectedRows(updatedRows);
            onDataSelected(updatedRows);
        }else{
            setFirstLoad(false);
        }
    }

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
                <Header categoryFilter={fetchCategoryData} categoryHandler={setCategory} />
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
