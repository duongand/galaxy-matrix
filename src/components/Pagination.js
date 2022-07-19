import React from 'react';

function Pagination({ numberOfCharacters, onClick }) {
    const pageButtons = [];
    for (let i = 1; i <= Math.ceil(numberOfCharacters / 10); i++) {
        pageButtons.push((
            <button
                key={i}
                className="page-buttons"
                onClick={onClick}
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

export default Pagination;