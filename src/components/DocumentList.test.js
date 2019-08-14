import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import DocumentList from "./DocumentList";

import Document from "./Document";

describe("DocumentList", () => {
    let wrapper;

    it("renders without crashing", () => {
        shallow(<DocumentList />);
    });

    describe("when there are no documents", () => {
        beforeEach(() => {
            const documentList = [];
            const searchResult = [];
            wrapper = shallow(
                <DocumentList
                    documentList={ documentList }
                    searchTerm=""
                    searchResult={ searchResult } />
            );
        });

        it("renders the correct count", () => {
            const count = wrapper.find(".documents__header__count");
            expect(count.text()).to.equal("0 Documents");
        });

        it("renders the correct size", () => {
            const size = wrapper.find(".documents__header__size");
            expect(size.text()).to.equal("Total Size: 0KB");
        });

        it("renders the no document element", () => {
            const noDocElement = wrapper.find(".documents__no-docs");
            expect(noDocElement).to.have.lengthOf(1);
        });
    });

    describe("when there are documents and no search results", () => {
        beforeEach(() => {
            const documentList = mockDocuments(3);
            const searchResult = [];
            wrapper = shallow(
                <DocumentList
                    documentList={ documentList }
                    searchTerm=""
                    searchResult={ searchResult } />
            );
        });

        it("renders the correct count", () => {
            const count = wrapper.find(".documents__header__count");
            expect(count.text()).to.equal("3 Documents");
        });

        it("renders the correct size", () => {
            const size = wrapper.find(".documents__header__size");
            expect(size.text()).to.equal("Total Size: 3KB");
        });

        it("renders the document element", () => {
            const noDocElement = wrapper.find(".documents__list");
            expect(noDocElement).to.have.lengthOf(1);
        });

        it("renders the correct mumber of documents", () => {
            const docElements = wrapper.find(".documents__list__detail");
            expect(docElements).to.have.lengthOf(3);

            const documents = wrapper.find(Document);
            expect(documents).to.have.lengthOf(3);
        });
    });

    describe("when there is an active search and no search result", () => {
        beforeEach(() => {
            const documentList = mockDocuments(3);
            const searchResult = [];
            wrapper = shallow(
                <DocumentList
                    documentList={ documentList }
                    searchTerm="some search term"
                    searchResult={ searchResult } />
            );
        });

        it("renders the no document element", () => {
            const noDocElement = wrapper.find(".documents__no-docs");
            expect(noDocElement).to.have.lengthOf(1);
        });
    });

    describe("when there is an active search and search results", () => {
        beforeEach(() => {
            const documentList = mockDocuments(3);
            const searchResult = mockDocuments(2);
            wrapper = shallow(
                <DocumentList
                    documentList={ documentList }
                    searchTerm="some search term"
                    searchResult={ searchResult } />
            );
        });

        it("renders the correct count", () => {
            const count = wrapper.find(".documents__header__count");
            expect(count.text()).to.equal("2 Documents");
        });

        it("renders the correct size", () => {
            const size = wrapper.find(".documents__header__size");
            expect(size.text()).to.equal("Total Size: 2KB");
        });

        it("renders the document element", () => {
            const noDocElement = wrapper.find(".documents__list");
            expect(noDocElement).to.have.lengthOf(1);
        });

        it("renders the correct mumber of documents", () => {
            const docElements = wrapper.find(".documents__list__detail");
            expect(docElements).to.have.lengthOf(2);

            const documents = wrapper.find(Document);
            expect(documents).to.have.lengthOf(2);
        });
    });
});

const mockDocuments = (count) => {
    const documents = [];
    for (let i = 0; i < count; i++) {
        documents.push({
            id: i,
            title: `Document ${ i }`,
            size: 1024
        });
    }
    return documents;
};
