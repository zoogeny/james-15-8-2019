import React from "react";
import PropTypes from "prop-types";
import Document from "./Document";
import "./DocumentList.scss";

const getTotalSize = (documentList) => {
    const totalSize = documentList.reduce((out, item) => {
        out += parseInt(item.size, 10);
        return out;
    }, 0);
    return `${ Math.floor(totalSize / 1024) }KB`;
}

const getDocumentItems = (documentList, initiateDelete) => {
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

const getDocumentElement = (documentList, searchTerm, searchResult, initiateDelete) => {
    if (documentList.length === 0) {
        return (
            <div className="documents__no-docs">
                There are no documents in the document storage
            </div>
        );
    }

    const hasSearch = searchTerm !== "";
    return hasSearch
        ? getSearchResults(searchResult, initiateDelete)
        : getDefaultList(documentList, initiateDelete);
}

const getDefaultList = (documentList, initiateDelete) => {
    return (
        <ul className="documents__list">
            { getDocumentItems(documentList, initiateDelete) }
        </ul>
    );
}

const getSearchResults = (searchResult, initiateDelete) => {
    if (searchResult.length === 0) {
        return (
            <div className="documents__no-docs">
                There are no documents that match your search
            </div>
        );
    }

    return (
        <div>
            <h3>Seach Results:</h3>
            <ul className="documents__list">
                { getDocumentItems(searchResult, initiateDelete) }
            </ul>
        </div>
    );
}

const DocumentList = (props) => {
    const documentHeaderDocs = props.searchTerm ? props.searchResult : props.documentList;
    return (
        <div className="documents">
            <div className="documents__header">
              <h2 className="documents__header__count">{ documentHeaderDocs.length } Documents</h2>
              <div className="documents__header__size">
                  Total Size: { getTotalSize(documentHeaderDocs) }
              </div>
            </div>
            { getDocumentElement(props.documentList, props.searchTerm, props.searchResult, props.initiateDelete) }
        </div>
    );
}

DocumentList.propTypes = {
    documentList: PropTypes.arrayOf(PropTypes.shape({
        "id": PropTypes.number,
        "title": PropTypes.string,
        "size": PropTypes.number
    })),
    searchTerm: PropTypes.string,
    searchResult: PropTypes.arrayOf(PropTypes.shape({
        "id": PropTypes.number,
        "title": PropTypes.string,
        "size": PropTypes.number
    })),
    initiateDelete: PropTypes.func
};

DocumentList.defaultProps = {
    documentList: [],
    searchTerm: "",
    searchResult: [],
    initiateDelete: () => {}
};

export default DocumentList;
