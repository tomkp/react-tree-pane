'use strict';

import React from 'react/addons';


let TreePane = React.createClass({

    render() {
        return (
            <div className="TreePane">
                <Node model={this.props.model} renderer={this.props.renderer} />
            </div>
        );
    }
});



let DefaultCellRenderer = React.createClass({
    render() {
        return <span>{this.props.model.name}</span>
    }
});


let Node = React.createClass({


    toggle() {
        this.setState({expanded: !this.state.expanded});
    },


    getInitialState() {
        return {
            expanded: true
        };
    },


    render() {
        let childNodes = [];
        let classes = [];
        const children = this.props.model.children;
        const renderer = this.props.renderer;

        if (children) {
            if (this.state.expanded) {
                childNodes = children.map(function (node, index) {
                    return <Node key={index} model={node} renderer={renderer} />
                });
            }
            classes.push('toggle');
            classes.push(this.state.expanded?'collapse':'expand');
        }


        let cellRenderer;

        if (renderer) {
            cellRenderer = React.addons.cloneWithProps(renderer, {
                model: this.props.model
            });
        } else {
            cellRenderer = <DefaultCellRenderer model={this.props.model} />;
        }

        return (
            <div className="Node">
                <div onClick={this.toggle} className={classes.join(' ')}>
                    {cellRenderer}
                </div>
                {childNodes}
            </div>
        );
    }
});

export default TreePane;
