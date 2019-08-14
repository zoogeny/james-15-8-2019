import React from "react";
import PropTypes from 'prop-types';
import "./Document.scss";

function getDocumentSize(size) {
    return `${ Math.floor(size / 1024) }kb`;
}

const Document = (props) => {
    return (
        <div className="document">
            <h3 className="document__title">{ props.title }</h3>
            <div className="document__size">{ getDocumentSize(props.size) }</div>
            <button className="document__delete" onClick={ event => props.initiateDelete(props.id) }>Delete</button>
        </div>
    );
}

Document.propTypes = {
    title: PropTypes.string,
    size: PropTypes.number,
    id: PropTypes.number,
    initiateDelete: PropTypes.func
}

Document.defaultProps = {
    initiateDelete: () => {}
}

export default Document;
