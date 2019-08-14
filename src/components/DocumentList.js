import React from "react";
import PropTypes from 'prop-types';
import Document from "./Document";
import "./DocumentList.scss";

function getTotalSize(documentList) {
    const totalSize = documentList.reduce((out, item) => {
        out += parseInt(item.size, 10);
        return out;
    }, 0);
    return `${ Math.floor(totalSize / 1024) }kb`;
}

function getDocumentItems(documentList, initiateDelete) {
    return documentList.map(item => (
        <li key={ item.id } className="documents__list__detail">
            <Document
                title={ item.title }
                size={ item.size }
                id={ item.id }
                initiateDelete={ initiateDelete } />
        </li>
    ));
}

const DocumentList = (props) => {
    return (
        <div className="documents">
            <div className="documents__header">
              <h2 className="documents__header__count">{ props.documentList.length } Documents</h2>
              <div className="documents__header__size">
                  Total Size: { getTotalSize(props.documentList) }
              </div>
            </div>
            <ul className="documents__list">
              { getDocumentItems(props.documentList, props.initiateDelete) }
            </ul>
        </div>
    );
}

DocumentList.propTypes = {
    documentList: PropTypes.arrayOf(PropTypes.shape({
        "id": PropTypes.number,
        "title": PropTypes.string,
        "size": PropTypes.number
    })),
    searchResult: PropTypes.arrayOf(PropTypes.shape({
        "id": PropTypes.number,
        "title": PropTypes.string,
        "size": PropTypes.number
    })),
    initiateDelete: PropTypes.func
};

DocumentList.defaultProps = {
    documentList: [],
    searchResult: [],
    initiateDelete: () => {}
};

export default DocumentList;
