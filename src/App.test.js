import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import App from "./App";

import DocumentList from "./components/DocumentList";
import Message from "./components/Message";
import Search from "./components/Search";
import Upload from "./components/Upload";

describe("App", () => {
    it("renders without crashing", () => {
        shallow(<App />);
    });

    describe("it renders child components", () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallow(<App />);
        });

        it("contains a document list component", () => {
            expect(wrapper.find(DocumentList)).to.have.lengthOf(1);
        });

        it("contains a message component", () => {
            expect(wrapper.find(Message)).to.have.lengthOf(1);
        });

        it("contains a search component", () => {
            expect(wrapper.find(Search)).to.have.lengthOf(1);
        });

        it("contains a upload component", () => {
            expect(wrapper.find(Upload)).to.have.lengthOf(1);
        });
    });
});
