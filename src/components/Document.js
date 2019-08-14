import React from "react";
import PropTypes from 'prop-types';
import "./Document.scss";

const API_URL = process.env.REACT_APP_API_URL;

function getDocumentSize(size) {
    return `${ Math.floor(size / 1024) }kb`;
}

const Document = (props) => {
    return (
        <div className="document">
            <a className="document__link" href={ `${ API_URL }/view/${ props.id }`} target="_blank">
                <h3 className="document__title">{ props.title }</h3>
            </a>
            <div className="document__bottom">
                <div className="document__size">{ getDocumentSize(props.size) }</div>
                <button className="document__delete" onClick={ event => props.initiateDelete(props.id) }>Delete</button>
            </div>
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
