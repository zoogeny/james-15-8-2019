import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const useSearch = (errorHandler: () => {}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const performSearchOnTerm = async (term) => {
        const trimmedSearchTerm = term.trim();
        if (trimmedSearchTerm === searchTerm) {
            return;
        }

        setSearchTerm(trimmedSearchTerm);

        if (trimmedSearchTerm === "") {
            setSearchTerm("");
            setSearchResult([]);
            return;
        }

        const url = new URL(`${ API_URL }/search`);
        const params = { term: trimmedSearchTerm };
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

        setSearchResult(responseJson);
    }

    return { searchTerm, searchResult, performSearchOnTerm }
};

export default useSearch;
