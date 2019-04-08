import React from 'react';

const Books = props => (
    <div>
        {props.title && <p> Title: {props.title}</p>}
        {props.author && <p> Author: {props.author}</p>}
        {props.error && <p>{props.error}</p>}
    </div>
);
export default Books;