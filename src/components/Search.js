import React from "react";
import PropTypes from 'prop-types';
import "./Search.scss";

const Search = (props) => {
    return (
        <input
            type="search"
            className="search"
            placeholder="Search Documents ..."
            onChange={ event => props.performSearchOnTerm(event.target.value) } />
    );
}

Search.propTypes = {
    performSearchOnTerm: PropTypes.func
};

Search.defaultProps = {
    performSearchOnTerm: () => {}
};

export default Search;
