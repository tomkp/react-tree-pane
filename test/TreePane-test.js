import expect from 'expect.js';
import React from 'react/addons';
const { TestUtils } = React.addons;
import TreePane from '../src/TreePane';


describe('TreePane', function () {


    const model = {
        name: 'Default',
        children: [
            { name: 'react-tree-pane', children:[
                {name: 'demo', children: [
                    {name: 'bundle.js'},
                    {name: 'Example.js'}
                ]},
                {name: 'src', children: [
                    {name: 'TreePane.js'}
                ]},
                {name: 'test', children: [
                    {name: 'TreePane-test.js'}
                ]},
                {name: 'package.json'}
            ]}
        ]
    };



    it('should render the whole tree expanded', function () {

        var element = document.createElement('div');
        React.render(<TreePane model={model} />, element);

        new TreePaneAsserter(element)
            .findRootNode().assertValue('Default').assertIsExpanded().assertNumberOfChildren(1).assertChildren('react-tree-pane')
                .findChildNode('react-tree-pane').assertIsExpanded().assertNumberOfChildren(4).assertChildren('demo', 'src', 'test', 'package.json')
                    .findChildNode('demo').assertIsExpanded().assertNumberOfChildren(2).end()
                    .findChildNode('src').assertIsExpanded().assertNumberOfChildren(1).end()
                    .findChildNode('test').assertIsExpanded().assertNumberOfChildren(1).end()
                    .findChildNode('package.json').assertNumberOfChildren(0).end() // isLeaf
        ;
    });



    it('should collapse whole tree', function () {

        var element = document.createElement('div');
        React.render(<TreePane model={model} />, element);

        new TreePaneAsserter(element)
            .findRootNode().assertValue('Default').assertIsExpanded().collapse().end()
            .findRootNode().assertValue('Default').assertIsCollapsed()
        ;
    });

});





class TreePaneAsserter {

    constructor(element) {
        this.element = element;
    }

    findRootNode() {
        let treePane = this.element.children[0];
        let childNode = treePane.children[0];
        return new NodeAsserter(this, childNode);
    }
}



class NodeAsserter {

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


