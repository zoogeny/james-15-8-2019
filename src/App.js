import React from "react";

import Message from "./components/Message";
import Search from "./components/Search";
import Upload from "./components/Upload";
import DocumentList from "./components/DocumentList";

import useMessages from "./actions/useMessages";
import useSearch from "./actions/useSearch";
import useDocumentList from "./actions/useDocumentList";

import "./App.scss";

const App = () => {
    const { messages, addMessage, addError, clearMessage } = useMessages();
    const { searchResult, performSearchOnTerm } = useSearch(addError);
    const { documentList, initiateUpload, initiateDelete } = useDocumentList(addError, addMessage);

    return (
        <div className="app">
            <Message
                messages={ messages }
                handleClearMessage={ clearMessage } />
            <div className="controls">
                <Search
                    performSearchOnTerm={ performSearchOnTerm } />
                <Upload
                    initiateUpload={ initiateUpload } />
            </div>
            <DocumentList
                documentList= { documentList }
                searchResult={ searchResult.documents }
                initiateDelete={ initiateDelete } />
        </div>
    );
}

export default App;
