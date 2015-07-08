import expect from 'expect.js';
import React from 'react/addons';
const { TestUtils } = React.addons;
import TreePane from '../src/TreePane';


describe('TreePane', function () {


    const model = {
        name: 'Tom',
        children: [
            { name: 'Alice'}, { name: 'Jacob'}
        ]
    };

    const treePane = TestUtils.renderIntoDocument(
        <TreePane model={model} />
    );


    it('should render the tree pane', function () {
        new Asserter(treePane);
    });
});





class Asserter {

    constructor(treePane) {
        this.component = TestUtils.findRenderedDOMComponentWithClass(treePane, 'TreePane');
        this.treePane = treePane;
    }


    assertNumberOfChildren() {
        //expect(this.component.props.children.length).to.equal(3);
    }


    findChildren() {
        //return TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'Node');
    }

}

