import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const useSearch = (errorHandler: () => {}) => {
    const [searchResult, setSearchResult] = useState([]);

    const performSearchOnTerm = async (term) => {
        const url = new URL(`${ API_URL }/search`);
        const params = { term };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const response = await fetch(url);
        if (response.status >= 400) {
            errorHandler("Unable to perform search");
            return;
        }

        let responseJson;
        try {
            responseJson = await response.json();
        } catch (error) {
            errorHandler("Unable to parse search results");
            return;
        }

        handleSearchResult(responseJson);
    }

    const handleSearchResult = (searchResult) => {
        setSearchResult(searchResult);
    }

    return { searchResult, performSearchOnTerm }
};

export default useSearch;
