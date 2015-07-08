import React from 'react';
import TreePane from '../lib/TreePane';


var CustomCellRenderer = React.createClass({
    render() {
        return <span>{this.props.model.name}</span>
    }
});


var Example = React.createClass({

    render: function() {

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

        return (
            <TreePane model={model}>
                <CustomCellRenderer />
            </TreePane>
        );
    }

});

React.render(<Example />, document.body);