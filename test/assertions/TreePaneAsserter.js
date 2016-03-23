import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
const expect = chai.expect;
import NodeAsserter from './NodeAsserter';


export default class TreePaneAsserter {

    constructor(jsx) {
        this.element = document.createElement('div');
        ReactDOM.render(jsx, this.element);
    }

    findRootNode() {
        let childNode = this.element.children[0].children[0];
        return new NodeAsserter(this, childNode);
    }
}