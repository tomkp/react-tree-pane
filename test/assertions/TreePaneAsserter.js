import React from 'react/addons';
import chai from 'chai';
const { TestUtils } = React.addons;
const expect = chai.expect;
import NodeAsserter from './NodeAsserter';


export default class TreePaneAsserter {

    constructor(jsx) {
        this.element = document.createElement('div');
        React.render(jsx, this.element);
    }

    findRootNode() {
        let childNode = this.element.children[0].children[0];
        return new NodeAsserter(this, childNode);
    }
}