import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const useSearch = (errorHandler: () => {}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState({
        documents: []
    });

    const performSearchOnTerm = async (term) => {
        const trimmedSearchTerm = term.trim();
        if (trimmedSearchTerm === searchTerm) {
            return;
        }

        setSearchTerm(trimmedSearchTerm);

        if (trimmedSearchTerm === "") {
            setSearchTerm("");
            setSearchResult({
                documents: []
            });
            return;
        }

        const url = new URL(`${ API_URL }/search`);
        url.searchParams.append("term", trimmedSearchTerm);

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

        setSearchResult({
            documents: responseJson.documents
        });
    }

    return { searchTerm, searchResult, performSearchOnTerm }
};

export default useSearch;
