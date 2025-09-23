import * as React from 'react';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';

const List = styled('ul')({
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
});

export default function UsePagination({ totalPages, currentPage, setPage }) {
    const { items } = usePagination({
        count: totalPages,
        page: currentPage,
        onChange: (event, value) => setPage(value),
    });


    return (
        <nav>
            <List>
                {items.map(({ page, type, selected, ...item }, index) => {
                    let children = null;

                    if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                        children = '…';
                    } else if (type === 'page') {
                        children = (
                            <button
                                className='btton'
                                type="button"
                                style={{
                                    fontWeight: selected ? 'bold' : undefined,
                                }}
                                {...item}
                            >
                                {page}
                            </button>
                        );
                    } else {
                        children = (
                            <button className='btton' type="button" {...item}>
                                {type}
                            </button>
                        );
                    }
                    return <li key={index}>{children}</li>;
                })}
            </List>
        </nav>
    );
}