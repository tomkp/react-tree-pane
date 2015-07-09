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


    const treePane = TestUtils.renderIntoDocument(
        <TreePane model={model} />
    );


    it('should render the tree pane', function () {
        new TreePaneAsserter(treePane);
    });


    it('should render the whole tree expanded', function () {
        new TreePaneAsserter(treePane)
            .findNode().assertValue('Default').assertIsExpanded().assertNumberOfChildren(1)
                .findChildNode('react-tree-pane').assertIsExpanded().assertNumberOfChildren(3)
                    .findChildNode('demo').assertIsExpanded().assertNumberOfChildren(2).end()
                    .findChildNode('src').assertIsExpanded().assertNumberOfChildren(1).end()
                    .findChildNode('test').assertIsExpanded().assertNumberOfChildren(1).end()
        ;
    });
});





class TreePaneAsserter {

    constructor(treePane) {
        this.treePane = treePane;
    }

    findNode() {
        return new NodeAsserter(this);
    }

}

class NodeAsserter {
    constructor(parent) {
        this.parent = parent;
    }

    findCell() {return new CellAsserter(this) }
    assertValue() { return this; }
    assertIsExpanded() { return this; }
    assertIsCollapsed() { return this; }
    assertNumberOfChildren(expected) { return this; }
    findChildNode(value) { return new NodeAsserter(this) }
    end() { return this.parent; }
}

class CellAsserter {
    constructor(parent) {
        this.parent = parent;
    }
    assertValue() { return this; }
    end() { return this.parent; }
}

