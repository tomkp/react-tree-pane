'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TreePane from '../lib/TreePane';

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


const CustomCellRenderer = ({model}) => { return <span>{model.name}</span> };
const Example = ({model}) => { return <TreePane model={model} cellRenderer={<CustomCellRenderer />} /> };

ReactDOM.render(<Example model={model} />, document.getElementById("container"));
