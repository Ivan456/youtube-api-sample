import React from 'react';

export default (props) => {
    return (
        <li className="card">
            <img className="card-img-top" alt="..." src={props.value.img }></img>
            <div className="card-body">
                <h5 className="card-title">{props.value.title }</h5>
                <p className="card-text">{props.value.description }</p>
                <p className="card-text"><small className="text-muted">Published: {props.value.publishedAt}</small></p>
            </div>
        </li>
    );
};
