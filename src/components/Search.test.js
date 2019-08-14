import React from "react";
import { expect } from "chai";
import { assert, stub } from "sinon";
import { shallow } from "enzyme";
import Search from "./Search";

describe("Search", () => {
    it("renders without crashing", () => {
        shallow(<Search />);
    });

    describe("when provided with a search callback", () => {
        let wrapper;
        let performSearchOnTermStub;

        beforeEach(() => {
            performSearchOnTermStub = stub();
            wrapper = shallow(<Search performSearchOnTerm={ performSearchOnTermStub } />);
        });

        it("renders a search input field", () => {
            const input = wrapper.find(`input[type="search"]`);
            expect(input).to.have.lengthOf(1);
        });

        it("calls the perform search callback when the input field changes", () => {
            const input = wrapper.find(`input[type="search"]`);

            assert.notCalled(performSearchOnTermStub);
            input.simulate("change", { target: { value: "" } });
            assert.calledOnce(performSearchOnTermStub);
        });
    });
});
