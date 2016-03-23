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



var CustomCellRenderer = React.createClass({
    render() {
        return <span>{this.props.model.name}</span>
    }
});



var Example = React.createClass({
    render: function() {
        return <TreePane model={model} cellRenderer={<CustomCellRenderer />} />
    }
});


ReactDOM.render(<Example />, document.getElementById("container"));
