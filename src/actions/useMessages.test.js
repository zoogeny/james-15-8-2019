import { act } from "react-dom/test-utils";
import { expect } from "chai"
import { mountWrappedElement } from "./testHookHelper";
import useMessages from "./useMessages";

let messageProps;
mountWrappedElement(() => {
    messageProps = useMessages()
});

describe("useMessages", () => {

    describe("when messages are added", () => {
        it("adds the message to the element state", () => {
            act(() => {
                messageProps.addMessage("Some message");
            });

            expect(messageProps.messages).to.have.lengthOf(1);
            expect(messageProps.messages[0]).to.eql({
                type: "message",
                content: "Some message",
                messageId: 0
            });
        });
    });

    describe("when errors are added", () => {
        it("adds the message to the element state", () => {
            act(() => {
                messageProps.addError("Some error");
            });

            expect(messageProps.messages).to.have.lengthOf(2);
            expect(messageProps.messages[1]).to.eql({
                type: "error",
                content: "Some error",
                messageId: 1
            });
        });
    });

    describe("when messages are cleared", () => {
        it("removes the message at the index from the element state", () => {
            act(() => {
                messageProps.clearMessage(0);
            });

            expect(messageProps.messages).to.have.lengthOf(1);
            expect(messageProps.messages[0]).to.eql({
                type: "error",
                content: "Some error",
                messageId: 1
            });
        });
    });
});
