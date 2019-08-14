import React from "react";
import { expect } from "chai";
import { assert, stub } from "sinon";
import { shallow } from "enzyme";
import Document from "./Document";

describe("Document", () => {
    it("renders without crashing", () => {
        shallow(<Document />);
    });

    describe("when provided with document details", () => {
        let wrapper;
        let initiateDeleteStub;

        beforeEach(() => {
            initiateDeleteStub = stub();
            wrapper = shallow(<Document title="Test title" size={ 1024 } id={ 5678 } initiateDelete={ initiateDeleteStub } />);
        });

        it("renders the correct document link", () => {
            const links = wrapper.find(".document__link");
            expect(links).to.have.lengthOf(1);

            const link = links.at(0);
            expect(link.props().href).to.equal("http://localhost:4000/api/view/5678");
        });

        it("renders the correct document title", () => {
            const titles = wrapper.find(".document__title");
            expect(titles).to.have.lengthOf(1);

            const title = titles.at(0);
            expect(title.text()).to.equal("Test title");
        });

        it("renders the correct document size", () => {
            const sizes = wrapper.find(".document__size");
            expect(sizes).to.have.lengthOf(1);

            const size = sizes.at(0);
            expect(size.text()).to.equal("1KB");
        });

        it("calls the initiateDelete function when the delete button is clicked", () => {
            const deleteButtons = wrapper.find(".document__delete");
            expect(deleteButtons).to.have.lengthOf(1);

            assert.notCalled(initiateDeleteStub);

            const deleteButton = deleteButtons.at(0);
            deleteButton.simulate("click");
            assert.calledOnce(initiateDeleteStub);
        });
    });
});
