import React from 'react';
import { Pagination } from 'react-bootstrap';

const PageComponent = ({ totalPages, currentPage, onPageChange }) => {
    const handlePageClick = (page) => {
        onPageChange(page);
    };

    const renderPaginationItems = () => {
        const items = [];
        const startPage = currentPage - 5 >= 0 ? currentPage - 5 : 0;
        const endPage = Math.min(startPage + 10, totalPages);

        // 이전 10개 페이지 버튼
        if (startPage > 0) {
            items.push(
                <Pagination.Item key="prev10" onClick={() => handlePageClick(startPage - 1)}>
                    이전
                </Pagination.Item>
            );
        }

        for (let i = startPage; i < endPage; i++) {
            items.push(
                <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageClick(i)}>
                    {i + 1}
                </Pagination.Item>
            );
        }

        // 다음 10개 페이지 버튼
        if (endPage < totalPages) {
            items.push(
                <Pagination.Item key="next10" onClick={() => handlePageClick(endPage)}>
                    다음
                </Pagination.Item>
            );
        }

        return items;
    };

    return (
        <Pagination>
            {renderPaginationItems()}
        </Pagination>
    );
};

export default PageComponent;
