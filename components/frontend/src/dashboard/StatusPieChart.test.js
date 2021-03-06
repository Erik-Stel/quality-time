import React from 'react';
import { mount } from 'enzyme';
import { StatusPieChart } from './StatusPieChart';

describe("<StatusPieChart />", () => {
    it('renders correctly', () => {
        const wrapper = mount(<StatusPieChart red={1} green={2} yellow={1} white={0} grey={0} />);
        expect(wrapper.find("tspan").at(0).text()).toEqual("4")
    });
});

describe("<StatusPieChart />", () => {
    it('renders correctly', () => {
        const wrapper = mount(<StatusPieChart red={0} green={0} yellow={0} white={2} grey={1} />);
        expect(wrapper.find("tspan").at(0).text()).toEqual("3")
    });
});
