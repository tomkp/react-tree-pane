import React from 'react';
import TreePane from '../lib/TreePane';


var Example = React.createClass({

    render: function() {
        return (
            <TreePane />
        );
    }

});

React.render(<Example />, document.body);