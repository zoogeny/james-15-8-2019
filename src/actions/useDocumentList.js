import { useState, useEffect, useCallback } from "react";

import useUpload from "./useUpload";
import useDelete from "./useDelete";

const API_URL = process.env.REACT_APP_API_URL;

const useDocumentList = (errorHandler: () => {}, messageHandler: () => {}) => {
    const [ documentList, setDocumentList ] = useState([]);

    // NOTE: useCallback allows the reuse of logic for loading the document
    // list both in the useEffect case as well as within an action
    const loadList = useCallback(() => {
        // NOTE: we have to wrap the async call since useEffect has specific
        // requirements on return types and promises are not valid return types
        const wrappedCall = async () => {
            const url = new URL(`${ API_URL }/list`);

            let response;
            try {
                response = await fetch(url);
            } catch(error) {
                errorHandler("Unable to connect to server");
                return;
            }


            if (response.status >= 400) {
                errorHandler("Unable to load document list");
                return;
            }

            let responseJson;
            try {
                responseJson = await response.json();
            } catch(error) {
                errorHandler("Unable to parse document list");
                return;
            }

            setDocumentList(responseJson.documents);
        }

        wrappedCall();
    }, [ errorHandler ]);

    const handleUploadSuccess = (uploadDetails) => {
        messageHandler(`Upload success: ${ uploadDetails.title }`);
        loadList();
    };

    const { initiateUpload } = useUpload(handleUploadSuccess, errorHandler);

    const handleDeleteSuccess = (deleteDetails) => {
        messageHandler(`Delete success: ${ deleteDetails.title }`);
        loadList();
    };

    const { initiateDelete } = useDelete(handleDeleteSuccess, errorHandler);

    // initial load
    useEffect(loadList, []);

    return { documentList, initiateUpload, initiateDelete };
}

export default useDocumentList;
