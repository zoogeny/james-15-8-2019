import { assert, stub, match } from "sinon";
import { mockFetch, mockFetchNetworkError, mockFetchJsonDecodeError } from "./testHookHelper";
import useDelete from "./useDelete";

describe("useDelete", () => {
    let fetchStub;
    let initiateDelete;
    let successHandlerStub;
    let errorHandlerStub;

    beforeEach(() => {
        successHandlerStub = stub();
        errorHandlerStub = stub();
        initiateDelete = useDelete(successHandlerStub, errorHandlerStub).initiateDelete;
    });

    describe("when the server is unreachable", () => {
        beforeEach(async () => {
            fetchStub = mockFetchNetworkError();
            await initiateDelete(12);
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it("calls the error handler", () => {
            assert.calledWith(errorHandlerStub, "Unable to connect to server");
        });
    });

    describe("when the server responds with an error", () => {
        beforeEach(async () => {
            fetchStub = mockFetch(500, {});
            await initiateDelete(12);
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it("calls the error handler", () => {
            assert.calledWith(errorHandlerStub, "Unable to delete file");
        });
    });

    describe("when the server responds with invalid JSON", () => {
        beforeEach(async () => {
            fetchStub = mockFetchJsonDecodeError();
            await initiateDelete(12);
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it("calls the error handler", () => {
            assert.calledWith(errorHandlerStub, "Unable to parse delete repsonse");
        });
    });

    describe("when the server responds with valid json", () => {
        beforeEach(async () => {
            fetchStub = mockFetch(200, { response: "test" });
            await initiateDelete(12);
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it("calls the success handler", () => {
            assert.calledWith(successHandlerStub, match({ response: "test" }));
        });
    });
});
