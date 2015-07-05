'use strict';

import React from 'react';
import VendorPrefix from 'react-vendor-prefix';


let TreePane = React.createClass({


    propTypes: {
    },

    getInitialState() {
        return {

        };
    },

    getDefaultProps() {
        return {
        };
    },

    componentDidMount() {
    },


    componentWillUnmount() {
    },


    render() {
        const classes = ['TreePane'];
        return <div className={classes.join(' ')} ref="treePane">Tree Pane</div>
    }
});


export default TreePane;
