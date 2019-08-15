import React from "react";
import { act } from "react-dom/test-utils";
import { expect } from "chai"
import { assert, stub } from "sinon";
import { mount } from "enzyme";
import { mountWrappedElement, mockFetch } from "./testHookHelper";
import useUpload from "./useUpload";

describe("useSearch", () => {
    let fetchStub;
    let uploadProps;
    let successHandlerStub;
    let errorHandlerStub;

    describe("when file type is not allowed", () => {
        beforeEach(async () => {
            fetchStub = mockFetch(200, {});
            successHandlerStub = stub();
            errorHandlerStub = stub();
            await mountWrappedElement(() => {
                uploadProps = useUpload(successHandlerStub, errorHandlerStub);
            });

            await act(async () => {
                const file = fileMock("application/xml", 1024);
                uploadProps.initiateUpload(file);
            });
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it("calls the error handler", () => {
            assert.calledWith(errorHandlerStub, "Selected file type not allowed");
        });
    });

    describe("when file size is too large", () => {
        beforeEach(async () => {
            fetchStub = mockFetch(200, {});
            successHandlerStub = stub();
            errorHandlerStub = stub();
            await mountWrappedElement(() => {
                uploadProps = useUpload(successHandlerStub, errorHandlerStub);
            });

            await act(async () => {
                const file = fileMock("image/png", 12 * 1024 * 1024);
                uploadProps.initiateUpload(file);
            });
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it("calls the error handler", () => {
            assert.calledWith(errorHandlerStub, "Selected file above max file size of 10MB.");
        });
    });

    describe("when the server returns an error", () => {
        beforeEach(async () => {
            fetchStub = mockFetch(500, {});
            successHandlerStub = stub();
            errorHandlerStub = stub();
            await mountWrappedElement(() => {
                uploadProps = useUpload(successHandlerStub, errorHandlerStub);
            });

            await act(async () => {
                const file = fileMock("image/png", 5 * 1024 * 1024);
                uploadProps.initiateUpload(file);
            });
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it("calls the error handler", () => {
            assert.calledWith(errorHandlerStub, "Unable to upload file ");
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
                uploadProps = useUpload(successHandlerStub, errorHandlerStub);
            });

            await act(async () => {
                const file = fileMock("image/png", 5 * 1024 * 1024);
                uploadProps.initiateUpload(file);
            });
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it("calls the error handler", () => {
            assert.calledWith(errorHandlerStub, "Invalid response from server during upload");
        });
    });

    describe("when the server returns valid upload response", () => {
        beforeEach(async () => {
            fetchStub = mockFetch(200, {
                "response": "test"
            });
            successHandlerStub = stub();
            errorHandlerStub = stub();
            await mountWrappedElement(() => {
                uploadProps = useUpload(successHandlerStub, errorHandlerStub);
            });

            await act(async () => {
                const file = fileMock("image/png", 5 * 1024 * 1024);
                uploadProps.initiateUpload(file);
            });
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it("calls the success handler", () => {
            assert.calledWith(successHandlerStub, {
                "response": "test"
            });
        });
    });
});

const fileMock = (type, size) => {
    return {
        type,
        size
    }
}
