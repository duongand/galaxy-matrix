import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

function TableHeader(props) {
    function handleChange(event) {
        props.onChange(event);
    };

    function handleSubmit(event) {
        event.preventDefault();
        props.onSubmit();
    };

    return (
        <header className="header-wrap">
            <h2 className="header--title">In a land far away...</h2>

            <Form className="search-bar" onSubmit={handleSubmit}>
                <FormControl
                    name="name"
                    type="text"
                    placeholder="search character..."
                    onChange={handleChange}
                    value={props.searchBar.name}
                />
            </Form>
        </header>
    );
};

export default TableHeader;