import React from "react";
import { stub } from "sinon";
import { act } from "react-dom/test-utils";
import { mount } from 'enzyme';

const WrapperElement = ({ hook }) => {
    hook();
    return (<div />)
}

export const mountWrappedElement = async (hook) => {
    await act(async () => {
        mount(<WrapperElement hook={ hook } />);
    });
};

export const mockFetch = (status, response) => {
    return stub(global, "fetch").callsFake(() =>{
        return Promise.resolve({
            status,
            json: () => {
                return Promise.resolve(response);
            }
        });
    });
};

export const mockFetchNetworkError = () => {
    return stub(global, "fetch").callsFake(() => {
        throw new Error("Network connection failure");
    });
}

export const mockFetchJsonDecodeError = () => {
    return stub(global, "fetch").returns(
        Promise.resolve({
            status: 200,
            json: () => {
                throw new Error("bad json");
            }
        }));
};
