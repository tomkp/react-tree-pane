import expect from 'expect.js';
import React from 'react/addons';
const { TestUtils } = React.addons;
import TreePane from '../src/TreePane';


describe('TreePane', function () {

    const treePane = TestUtils.renderIntoDocument(
        <TreePane />
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

}

