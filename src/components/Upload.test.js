import React from "react";
import { expect } from "chai";
import { assert, stub } from "sinon";
import { shallow } from "enzyme";
import Upload from "./Upload";

describe("Upload", () => {
    it("renders without crashing", () => {
        shallow(<Upload />);
    });

    describe("when provided with an upload callback", () => {
        let wrapper;
        let initiateUploadStub;

        beforeEach(() => {
            initiateUploadStub = stub();
            wrapper = shallow(<Upload initiateUpload={ initiateUploadStub } />);
        });

        it("renders an upload input field", () => {
            const input = wrapper.find(`input[type="file"]`);
            expect(input).to.have.lengthOf(1);
        });

        it("renders an upload input label", () => {
            const input = wrapper.find(`.upload__label`);
            expect(input).to.have.lengthOf(1);
        });

        it("calls the inititate upload callback when the input field changes", () => {
            const input = wrapper.find(`input[type="file"]`);

            assert.notCalled(initiateUploadStub);
            input.simulate("change", { target: { files: [{}] } });
            assert.calledOnce(initiateUploadStub);
        });
    });
});
