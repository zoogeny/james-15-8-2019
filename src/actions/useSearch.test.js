import React from "react";
import { act } from "react-dom/test-utils";
import { expect } from "chai"
import { assert, stub } from "sinon";
import { mount } from "enzyme";
import { mountWrappedElement, mockFetch } from "./testHookHelper";
import useSearch from "./useSearch";

describe("useSearch", () => {
    let fetchStub;
    let searchProps;
    let errorHandlerStub;

    describe("when the server returns an error", () => {
        beforeEach(async () => {
            fetchStub = mockFetch(500, {});
            errorHandlerStub = stub();
            await mountWrappedElement(() => {
                searchProps = useSearch(errorHandlerStub);
            });

            act(() => {
                searchProps.performSearchOnTerm("whatever");
            });
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it("calls the error handler", () => {
            assert.calledWith(errorHandlerStub, "Unable to perform search");
        });
    });

    describe("when the server returns invalid json", () => {
        beforeEach(async () => {
            fetchStub = stub(global, "fetch").returns(
                Promise.resolve({
                    status: 200,
                    json: () => {
                        throw new Error("bad json")
                    }
                }));
            errorHandlerStub = stub();
            await mountWrappedElement(() => {
                searchProps = useSearch(errorHandlerStub);
            });

            act(() => {
                searchProps.performSearchOnTerm("whatever");
            });
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it("calls the error handler", () => {
            assert.calledWith(errorHandlerStub, "Unable to parse search results");
        });
    });

    describe("when the server returns valid search results", () => {
        beforeEach(async () => {
            fetchStub = mockFetch(200, { error: null, documents: [ {test: "inside" } ]});
            errorHandlerStub = stub();
            await mountWrappedElement(() => {
                searchProps = useSearch(errorHandlerStub);
            });

            await act(async () => {
                searchProps.performSearchOnTerm("whatever");
            });
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it("does not call the error handler", () => {
            assert.notCalled(errorHandlerStub);
        });

        it("updates the search term", () => {
            expect(searchProps.searchTerm).to.equal("whatever");
        });

        it("sets the search results", () => {
            expect(searchProps.searchResult).to.eql({ documents: [ {test: "inside" } ]});
        });

        describe("when the search term is empty after a successful search", () => {
            beforeEach(async () => {
                act(() => {
                    searchProps.performSearchOnTerm("");
                })
            });

            it("clears the search results withut making a call to the backend", () => {
                expect(searchProps.searchResult).to.eql({ documents: [] });
            });
        });
    });



});
