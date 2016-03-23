import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import TreePane from '../src/TreePane';
import TreePaneAsserter from './assertions/TreePaneAsserter'
import NodeAsserter from './assertions/NodeAsserter'


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
                    {name: 'tree-pane-tests.js'}
                ]},
                {name: 'package.json'}
            ]}
        ]
    };



    it('should render the whole tree expanded', function () {

        var treePane = <TreePane model={model}/>;

        new TreePaneAsserter(treePane)
            .findRootNode().assertValue('Default').assertIsExpanded().assertNumberOfChildren(1).assertChildren('react-tree-pane')
                .findChildNode('react-tree-pane').assertIsExpanded().assertNumberOfChildren(4).assertChildren('demo', 'src', 'test', 'package.json')
                    .findChildNode('demo').assertIsExpanded().assertNumberOfChildren(2).end()
                    .findChildNode('src').assertIsExpanded().assertNumberOfChildren(1).end()
                    .findChildNode('test').assertIsExpanded().assertNumberOfChildren(1).end()
                    .findChildNode('package.json').assertNumberOfChildren(0).end() // isLeaf
        ;
    });



    it('should collapse whole tree', function () {

        var treePane = <TreePane model={model}/>;

        new TreePaneAsserter(treePane)
            .findRootNode().assertValue('Default').assertIsExpanded().collapse().end()
            .findRootNode().assertValue('Default').assertIsCollapsed()
        ;
    });

});






