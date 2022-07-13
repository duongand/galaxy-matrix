import React from 'react';

function PageNavigation(props) {
    function changePage(event) {
        props.onClick(event);
    };

    const pageButtons = [];
    for (let i = 1; i <= props.maxPages; i++) {
        pageButtons.push((
            <button
                key={i}
                className="page-buttons"
                onClick={changePage}
                value={i}
            >
                {i}
            </button>
        ));
    };

    return (
        <div className="navigation-wrap">
            {pageButtons}
        </div>
    );
};

export default PageNavigation;