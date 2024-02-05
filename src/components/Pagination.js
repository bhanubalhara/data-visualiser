import React from 'react'
import { Pagination } from 'react-bootstrap'

const PaginationComponent = ({ currentPage, setCurrentPage, totalPages }) => {
    
    const goToNextPage = () => {
            if(currentPage !== totalPages) setCurrentPage(currentPage + 1)
    }
    const goToPrevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <Pagination>
            {(currentPage === 1) ? (
                <Pagination.Prev disabled />
            ) : (
                <Pagination.Prev onClick={goToPrevPage} /> 
            )}
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {(currentPage === totalPages) ? (
                <Pagination.Next disabled />
            ) : (
                <Pagination.Next onClick={goToNextPage} /> 
            )}
        </Pagination>
    );
}

export default PaginationComponent