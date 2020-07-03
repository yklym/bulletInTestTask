import React from "react";

import Pagination from "react-bootstrap/Pagination";
import "./Pagination.component.scss";

export default function PaginationComponent(props) {
    if (props.maxPage <= 1) {
        return (
            <Pagination className="justify-content-center border-secondary">

                <Pagination.Prev disabled />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Next disabled />
            </Pagination>
        );
    }
    return (
        <Pagination className="justify-content-center border-secondary">
            {props.currPage === 1 ? (
                <>
                    <Pagination.Prev disabled />
                    <Pagination.Item active>{1}</Pagination.Item>
                </>
            ) : (
                <>
                    <Pagination.Prev
                        onClick={() => props.renderPage(props.currPage - 1)}
                    />
                    <Pagination.Item onClick={() => props.renderPage(1)}>
                        {1}
                    </Pagination.Item>
                    {1 - props.currPage <= -3 ? <Pagination.Ellipsis disabled /> : <></>}
                </>
            )}

            {renderPagesSelector(props)}

            {props.currPage === props.maxPage ? (
                <>
                    <Pagination.Item active>{props.maxPage}</Pagination.Item>
                    <Pagination.Next disabled />
                </>
            ) : (
                <>
                    {props.maxPage - props.currPage >= 3 ? (
                        <Pagination.Ellipsis disabled />
                    ) : (
                        <></>
                    )}

                    <Pagination.Item onClick={() => props.renderPage(props.maxPage)}>
                        {props.maxPage}
                    </Pagination.Item>
                    <Pagination.Next
                        onClick={() => props.renderPage(props.currPage + 1)}
                    />
                </>
            )}
        </Pagination>
    );
}

function renderPagesSelector({ currPage, maxPage, renderPage }) {
    const pagesArray = [];
    for (
        let i = Math.max(currPage - 3, 2);
        i <= Math.min(currPage + 3, maxPage - 1);
        i++
    ) {
        if (i === currPage) {
            pagesArray.push(
                <Pagination.Item active key={i}>
                    {i}
                </Pagination.Item>
            );
            continue;
        }
        pagesArray.push(
            <Pagination.Item onClick={() => renderPage(i)} key={i}>
                {i}
            </Pagination.Item>
        );
    }
    return pagesArray;
}