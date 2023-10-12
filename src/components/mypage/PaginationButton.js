import React from 'react';
import { PageButton } from '../../css/MyPageStyle';

export default function PaginationButton({ currentPage, totalPages, onPageChange }){

    const pages = [...Array(totalPages).keys()].map((i) => i + 1);

    return (
        <>
            {pages.map((page) => (
                <PageButton
                    key={page}
                    disabled={page === currentPage}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </PageButton>
            ))}
        </>
    )
}