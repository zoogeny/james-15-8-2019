import React from "react";
import { expect } from "chai";
import { assert, stub } from "sinon";
import { shallow } from "enzyme";
import Message from "./Message";

describe("Message", () => {
    let wrapper;
    let handleClearMessageStub;

    it("renders without crashing", () => {
        shallow(<Message />);
    });

    describe("when provided with a single message", () => {
        beforeEach(() => {
            const messages = mockMessages(1, "message");
            handleClearMessageStub = stub();

            wrapper = shallow(<Message messages={ messages } handleClearMessage={ handleClearMessageStub } />);
        });

        it("renders a single message item", () => {
            const messages = wrapper.find(".message__item");
            expect(messages).to.have.lengthOf(1);
        });

        it("renders the correct message text", () => {
            const messages = wrapper.find(".message__item__text");
            expect(messages.text()).to.equal("Test message 0");
        });

        it("calls the clear message callback when the close button is clicked", () => {
            const clearButton = wrapper.find(".message__item__clear");

            assert.notCalled(handleClearMessageStub);
            clearButton.simulate("click", { target: { dataset: {} } });
            assert.calledOnce(handleClearMessageStub);
        });
    });

    describe("when provided with a multiple messages", () => {
        beforeEach(() => {
            const messages = mockMessages(2, "message");
            const errors = mockMessages(1, "error");
            handleClearMessageStub = stub();

            wrapper = shallow(<Message messages={ messages.concat(errors) } handleClearMessage={ handleClearMessageStub } />);
        });

        it("renders multiple message items", () => {
            const messages = wrapper.find(".message__item");
            expect(messages).to.have.lengthOf(3);
        });

        it("renders the correct number of error items", () => {
            const errors = wrapper.find(".message__item--error");
            expect(errors).to.have.lengthOf(1);
        });
    });
});

const mockMessages = (count, type) => {
    const messages = [];
    for (let i = 0; i < count; i++) {
        messages.push({
            type,
            content: `Test ${ type } ${ i }`,
            messageId: i
        });
    }
    return messages;
};
