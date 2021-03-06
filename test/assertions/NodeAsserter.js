import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
const expect = chai.expect;



export default class NodeAsserter {

    constructor(parent, node) {
        console.info('NodeAsserter', node.dataset.reactid);
        this.parent = parent;
        this.node = node;
        this.toggle = node.children[0];
    }

    assertValue(expected) {
        expect(this.findValue(this.node)).to.contain(expected);
        return this;
    }

    expand() {
        this.assertIsCollapsed();
        TestUtils.Simulate.click(this.toggle);
        this.assertIsExpanded();
        return this;
    }

    collapse() {
        this.assertIsExpanded();
        TestUtils.Simulate.click(this.toggle);
        this.assertIsCollapsed();
        return this;
    }

    assertIsExpanded() {
        expect(this.toggle.className).to.contain('collapse');
        return this;
    }

    assertIsCollapsed() {
        expect(this.toggle.className).to.contain('expand');
        return this;
    }

    assertNumberOfChildren(expected) {
        let children = this.findChildren();
        expect(children.length).to.equal(expected);
        return this;
    }

    assertChildren(...expected) {
        let names = this.findChildren().map((child) => { return this.findValue(child); });
        expect(names).to.eql(expected);
        return this;
    }

    findChildNode(value) {
        let children = this.filterChildren((child) => {
            return !!(child.className === 'Node' && this.findValue(child) === value);
        });
        return new NodeAsserter(this, children[0]);
    }

    end() {
        return this.parent;
    }

    findValue(child) {
        return child.children[0].children[0].innerHTML;
    }

    findChildren() {
        return this.filterChildren((child) => {
            return child.className === 'Node';
        });
    }

    filterChildren(filter) {
        return [].slice.call(this.node.children).filter(filter);
    }
}
