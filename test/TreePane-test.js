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
            .findNode().assertValue('Default').assertIsExpanded().assertNumberOfChildren(1).assertChildren('react-tree-pane')
                .findChildNode('react-tree-pane').assertIsExpanded().assertNumberOfChildren(4).assertChildren('demo', 'src', 'test')
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
            .findNode().assertValue('Default').assertIsExpanded().collapse().end()
            .findNode().assertValue('Default').assertIsCollapsed()
        ;

        console.info('', element.innerHTML);
    });

});





class TreePaneAsserter {

    constructor(element) {
        this.element = element;
        //console.info('element', element.innerHTML);
    }

    findNode() {
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

    findCell() {
        //todo
        return new CellAsserter(this);
    }

    assertValue(expected) {
        expect(this.node.children[0].children[0].innerHTML).to.contain(expected);
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

    assertChildren(expected) {
        //todo
        return this;
    }

    findChildNode(value) {
        var children = this.filterChildren((child) => {
            return !!(child.className === 'Node' && child.children[0].children[0].innerHTML === value);
        });
        return new NodeAsserter(this, children[0]);
    }

    findChildren() {
        return this.filterChildren((child) => {
            return child.className === 'Node';
        });
    }

    filterChildren(filter) {
        return [].slice.call(this.node.children).filter(filter);
    }

    end() {
        return this.parent;
    }
}


class CellAsserter {
    constructor(parent) {
        this.parent = parent;
    }

    assertValue() {
        //todo
        return this;
    }

    end() {
        return this.parent;
    }
}

