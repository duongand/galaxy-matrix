import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

function TableForm({ searchBar, onChange, onSubmit }) {
    function handleChange(event) {
        onChange(event);
    };

    return (
        <div className="header-wrap">
            <h2 className="header--title">In a land far away...</h2>

            <Form className="search-bar" onSubmit={onSubmit}>
                <FormControl
                    name="name"
                    type="text"
                    placeholder="search character..."
                    onChange={handleChange}
                    value={searchBar.name}
                />
            </Form>
        </div>
    );
};

export default TableForm;