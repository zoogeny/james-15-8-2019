import { expect } from "chai"
import { assert, stub } from "sinon";
import { act } from "react-dom/test-utils";
import { mountWrappedElement, mockFetch, mockFetchNetworkError, mockFetchJsonDecodeError } from "./testHookHelper";
import useDocumentList from "./useDocumentList";

describe("useDocumentList", () => {
    let fetchStub;
    let successHandlerStub;
    let errorHandlerStub;
    let documentListProps;

    beforeEach(() => {
        errorHandlerStub = stub();
        successHandlerStub = stub();
    });

    describe("when the server is unreachable", () => {
        beforeEach(async () => {
            fetchStub = mockFetchNetworkError();

            await mountWrappedElement(() => {
                documentListProps = useDocumentList(errorHandlerStub, successHandlerStub);
            });
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it("calls the error handler", () => {
            assert.calledWith(errorHandlerStub, "Unable to connect to server");
        });
    });

    describe("when the server returns an error", () => {
        beforeEach(async () => {
            fetchStub = mockFetch(500, {});

            await mountWrappedElement(() => {
                documentListProps = useDocumentList(errorHandlerStub, successHandlerStub);
            });
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it("calls the error handler", () => {
            assert.calledWith(errorHandlerStub, "Unable to load document list");
        });
    });

    describe("when the server returns invalid json", () => {
        beforeEach(async () => {
            fetchStub = mockFetchJsonDecodeError();

            await mountWrappedElement(() => {
                documentListProps = useDocumentList(errorHandlerStub, successHandlerStub);
            });
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it("calls the error handler", () => {
            assert.calledWith(errorHandlerStub, "Unable to parse document list");
        });
    });

    describe("when the server returns valid documents", () => {
        beforeEach(async () => {
            fetchStub = mockFetch(200, {
                documents: [ {"test": "props" }]
            });

            await mountWrappedElement(() => {
                documentListProps = useDocumentList(errorHandlerStub, successHandlerStub);
            });
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it("loads the document list", () => {
            expect(documentListProps.documentList).to.eql([{ "test": "props" }])
        });
    });

    describe("#initiateUpload", () => {
        beforeEach(async () => {
            fetchStub = mockFetch(200, {
                "title": "test"
            });

            await mountWrappedElement(() => {
                documentListProps = useDocumentList(errorHandlerStub, successHandlerStub);
            });

            await act(async () => {
                documentListProps.initiateUpload({
                    type: "image/png",
                    size: 1024
                });
            });
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it("calls the success callback", () => {
            assert.calledWith(successHandlerStub, "Upload success: test");
        });
    });

    describe("#initiateDelete", () => {
        beforeEach(async () => {
            fetchStub = mockFetch(200, {
                "title": "test"
            });

            await mountWrappedElement(() => {
                documentListProps = useDocumentList(errorHandlerStub, successHandlerStub);
            });

            await act(async () => {
                documentListProps.initiateDelete(1);
            });
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it("calls the success callback", () => {
            assert.calledWith(successHandlerStub, "Delete success: test");
        });
    });
});
